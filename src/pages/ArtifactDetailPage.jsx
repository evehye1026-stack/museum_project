import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ArtifactVisual from '../components/ArtifactVisual'
import { useChatbot } from '../context/ChatbotContext'
import { findRelicByName, fetchRelicDetail } from '../data/emuseumApi'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './ArtifactDetailPage.css'

function useEmuseumRelic(name) {
  const [status, setStatus] = useState('idle')
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    if (!name) return

    let cancelled = false
    setStatus('loading')
    setDetail(null)

    findRelicByName(name)
      .then((match) => {
        if (cancelled) return
        if (!match) {
          setStatus('notfound')
          return
        }
        return fetchRelicDetail(match.id).then((data) => {
          if (cancelled) return
          setDetail(data)
          setStatus('done')
        })
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [name])

  return { status, detail }
}

function ArtifactDetailPage() {
  const { artifactId } = useParams()
  const { loading, artifacts, courses } = useMuseumData()
  const { openChat } = useChatbot()

  const artifact = artifacts.find((a) => a.id === artifactId)
  const { status: emuseumStatus, detail: emuseumDetail } = useEmuseumRelic(artifact?.name)

  if (loading) {
    return (
      <section className="page">
        <div className="page-inner">
          <p style={{ color: 'var(--text-muted)' }}>유물 정보를 불러오는 중...</p>
        </div>
      </section>
    )
  }

  if (!artifact) {
    return (
      <section className="page">
        <div className="page-inner">
          <p>유물을 찾을 수 없어요.</p>
          <Link to="/artifacts">유물 도감으로 돌아가기</Link>
        </div>
      </section>
    )
  }

  const relatedCourses = courses.filter((c) => artifact.courses.includes(c.name))

  return (
    <section className="page">
      <div className="page-inner">
        <Link to="/artifacts" className="back-link">
          ← 유물 도감
        </Link>

        <div className="artifact-detail">
          <div className="artifact-detail-visual">
            {emuseumDetail?.imgUri ? (
              <img
                src={emuseumDetail.imgUri}
                alt={artifact.name}
                className="artifact-detail-photo"
              />
            ) : (
              <ArtifactVisual className="artifact-detail-svg" />
            )}
          </div>
          <div className="artifact-detail-body">
            <p className="artifact-detail-hall">
              {artifact.museum} · {artifact.hall} · {artifact.room}
            </p>
            <h1 className="artifact-detail-name">{artifact.name}</h1>
            <p className="artifact-detail-case">진열장 번호: {artifact.caseNo}</p>

            {emuseumStatus === 'loading' && (
              <p className="emuseum-status">e뮤지엄 정보 불러오는 중...</p>
            )}
            {emuseumStatus === 'notfound' && (
              <p className="emuseum-status">e뮤지엄에서 매칭되는 유물 정보를 찾지 못했어요.</p>
            )}
            {emuseumStatus === 'error' && (
              <p className="emuseum-status">e뮤지엄 정보를 불러오는 중 오류가 발생했어요.</p>
            )}
            {emuseumStatus === 'done' && emuseumDetail && (
              <div className="emuseum-info">
                {(emuseumDetail.nationalityName1 || emuseumDetail.materialName1) && (
                  <p className="emuseum-info-meta">
                    {[emuseumDetail.nationalityName1, emuseumDetail.nationalityName2]
                      .filter(Boolean)
                      .join(' · ')}
                    {emuseumDetail.materialName1 && ' / '}
                    {[emuseumDetail.materialName1, emuseumDetail.materialName2]
                      .filter(Boolean)
                      .join(' · ')}
                  </p>
                )}
                {emuseumDetail.desc && (
                  <p className="emuseum-info-desc">{emuseumDetail.desc}</p>
                )}
              </div>
            )}

            <button
              type="button"
              className="chat-cta"
              onClick={() => openChat(artifact)}
            >
              💬 이 유물과 대화하기
            </button>

            {relatedCourses.length > 0 && (
              <div className="artifact-detail-courses">
                <h3 className="section-title" style={{ fontSize: 16, margin: '28px 0 12px' }}>
                  이 유물이 포함된 코스
                </h3>
                <ul className="related-course-list">
                  {relatedCourses.map((c) => (
                    <li key={c.id}>
                      <Link to={`/courses/${c.id}`}>{c.name}</Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default ArtifactDetailPage
