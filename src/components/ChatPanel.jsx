import { useEffect, useRef, useState } from 'react'
import ArtifactVisual from './ArtifactVisual'
import { useChatbot } from '../context/ChatbotContext'
import { useEmuseumRelic } from '../hooks/useEmuseumRelic'
import { useMuseumData } from '../hooks/useMuseumData'
import { buildSystemPrompt, getGreeting, isChatEnabled } from '../lib/personaBuilder'
import './ChatPanel.css'

const SUGGESTED_QUESTIONS = ['당신은 누구신가요?', '여긴 어떤 곳인가요?', '지금 세상은 어떤가요?']

function ChatPickCard({ artifact, onClick }) {
  const { detail } = useEmuseumRelic(artifact.name)

  return (
    <button type="button" className="chat-pick-card" onClick={onClick}>
      <span className="chat-pick-thumb">
        {detail?.imgUri ? (
          <img src={detail.imgUri} alt="" />
        ) : (
          <ArtifactVisual className="chat-pick-thumb-svg" />
        )}
      </span>
      <span className="chat-pick-info">
        <span className="chat-pick-name">{artifact.name}</span>
        <span className="chat-pick-hall">{artifact.hall} · {artifact.room}</span>
      </span>
    </button>
  )
}

function ChatPanel() {
  const { isOpen, artifact, openChat, closeChat, resetArtifact } = useChatbot()
  const { artifacts } = useMuseumData()
  const { detail: emuseumDetail } = useEmuseumRelic(artifact?.name)
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const [tooltipDismissed, setTooltipDismissed] = useState(false)
  const listRef = useRef(null)

  const pickableArtifacts = artifacts.filter(isChatEnabled)

  useEffect(() => {
    if (artifact) {
      setMessages([{ role: 'artifact', text: getGreeting(artifact) }])
    } else {
      setMessages([])
    }
  }, [artifact])

  useEffect(() => {
    const handleScroll = () => setTooltipDismissed(window.scrollY > 0)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages, loading])

  async function send(text) {
    const trimmed = text.trim()
    if (!trimmed || loading || !artifact) return

    const history = messages
    setMessages((prev) => [...prev, { role: 'user', text: trimmed }])
    setInput('')
    setLoading(true)
    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          systemPrompt: buildSystemPrompt(artifact),
          history,
          message: trimmed,
        }),
      })
      const data = await res.json()
      setMessages((prev) => [
        ...prev,
        { role: 'artifact', text: data.text ?? '…(유물이 말을 아끼고 있습니다)' },
      ])
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'artifact', text: '…(유물이 잠시 침묵합니다. 다시 말을 걸어보세요.)' },
      ])
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      {!isOpen && !tooltipDismissed && (
        <div className="chat-fab-tooltip">
          유물을 누르면 숨겨진
          <br />옛 이야기가 시작됩니다.
        </div>
      )}

      <button
        className="chat-fab"
        type="button"
        onClick={() => openChat()}
        aria-label="유물과 대화하기"
      >
        💬
      </button>

      {isOpen && (
        <div className="chat-panel">
          <div className="chat-panel-header">
            {artifact ? (
              <>
                <div className="chat-panel-avatar">
                  {emuseumDetail?.imgUri ? (
                    <img src={emuseumDetail.imgUri} alt="" className="chat-panel-avatar-img" />
                  ) : (
                    <ArtifactVisual className="chat-panel-avatar-svg" />
                  )}
                </div>
                <div>
                  <p className="chat-panel-name">{artifact.name}</p>
                  <p className="chat-panel-hall">
                    {artifact.hall} · {artifact.room}
                  </p>
                </div>
              </>
            ) : (
              <div>
                <p className="chat-panel-name">유물 챗봇과 대화해보세요</p>
                <p className="chat-panel-hall">아래에서 유물을 하나 골라보세요</p>
              </div>
            )}
            <div className="chat-panel-actions">
              {artifact && (
                <button
                  className="chat-panel-restart"
                  onClick={resetArtifact}
                  disabled={loading}
                  aria-label="다른 유물 고르기"
                  title="다른 유물 고르기"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                    <path
                      d="M4 11.5L12 4l8 7.5"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 10v9h12v-9"
                      stroke="currentColor"
                      strokeWidth="1.8"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              )}
              <button className="chat-panel-close" onClick={closeChat} aria-label="닫기">
                ✕
              </button>
            </div>
          </div>

          <div className="chat-panel-body" ref={listRef}>
            {!artifact && (
              <div className="chat-pick-list">
                {pickableArtifacts.map((a) => (
                  <ChatPickCard key={a.id} artifact={a} onClick={() => openChat(a)} />
                ))}
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="chat-bubble artifact typing">…</div>}
          </div>

          {artifact && (
            <div className="chat-suggested">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button key={q} type="button" disabled={loading} onClick={() => send(q)}>
                  {q}
                </button>
              ))}
            </div>
          )}

          <form
            className="chat-input-row"
            onSubmit={(e) => {
              e.preventDefault()
              send(input)
            }}
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={artifact ? '무엇이든 물어보세요' : '유물을 먼저 선택해주세요'}
              disabled={!artifact || loading}
            />
            <button type="submit" disabled={!artifact || loading}>
              전송
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatPanel
