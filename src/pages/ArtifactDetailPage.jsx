import { Link, useParams } from 'react-router-dom'
import ArtifactVisual from '../components/ArtifactVisual'
import { useChatbot } from '../context/ChatbotContext'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './ArtifactDetailPage.css'

function ArtifactDetailPage() {
  const { artifactId } = useParams()
  const { loading, artifacts, courses } = useMuseumData()
  const { openChat } = useChatbot()

  if (loading) {
    return (
      <section className="page">
        <div className="page-inner">
          <p style={{ color: 'var(--text-muted)' }}>유물 정보를 불러오는 중...</p>
        </div>
      </section>
    )
  }

  const artifact = artifacts.find((a) => a.id === artifactId)

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
            <ArtifactVisual className="artifact-detail-svg" />
          </div>
          <div className="artifact-detail-body">
            <p className="artifact-detail-hall">
              {artifact.museum} · {artifact.hall} · {artifact.room}
            </p>
            <h1 className="artifact-detail-name">{artifact.name}</h1>
            <p className="artifact-detail-case">진열장 번호: {artifact.caseNo}</p>

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
