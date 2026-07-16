import { useEffect, useRef, useState } from 'react'
import ArtifactVisual from './ArtifactVisual'
import { useChatbot } from '../context/ChatbotContext'
import { generateReply, greeting, SUGGESTED_QUESTIONS } from '../utils/artifactPersona'
import './ChatPanel.css'

function ChatPanel() {
  const { isOpen, artifact, openChat, closeChat } = useChatbot()
  const [messages, setMessages] = useState([])
  const [input, setInput] = useState('')
  const listRef = useRef(null)

  useEffect(() => {
    if (artifact) {
      setMessages([{ role: 'artifact', text: greeting(artifact) }])
    } else {
      setMessages([])
    }
  }, [artifact])

  useEffect(() => {
    listRef.current?.scrollTo({ top: listRef.current.scrollHeight })
  }, [messages])

  function send(text) {
    const trimmed = text.trim()
    if (!trimmed) return
    const reply = generateReply(artifact, trimmed)
    setMessages((prev) => [
      ...prev,
      { role: 'user', text: trimmed },
      { role: 'artifact', text: reply },
    ])
    setInput('')
  }

  return (
    <>
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
                  <ArtifactVisual className="chat-panel-avatar-svg" />
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
                <p className="chat-panel-name">유물과 대화하기</p>
                <p className="chat-panel-hall">유물 도감에서 유물을 선택해보세요</p>
              </div>
            )}
            <button className="chat-panel-close" onClick={closeChat} aria-label="닫기">
              ✕
            </button>
          </div>

          <div className="chat-panel-body" ref={listRef}>
            {messages.length === 0 && (
              <p className="chat-empty">
                유물 도감에서 "이 유물과 대화하기"를 눌러 대화를 시작해보세요.
              </p>
            )}
            {messages.map((m, i) => (
              <div key={i} className={`chat-bubble ${m.role}`}>
                {m.text}
              </div>
            ))}
          </div>

          {artifact && (
            <div className="chat-suggested">
              {SUGGESTED_QUESTIONS.map((q) => (
                <button key={q} type="button" onClick={() => send(q)}>
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
              disabled={!artifact}
            />
            <button type="submit" disabled={!artifact}>
              전송
            </button>
          </form>
        </div>
      )}
    </>
  )
}

export default ChatPanel
