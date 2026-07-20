import { useEffect } from 'react'
import { Link, useLocation, useParams } from 'react-router-dom'
import ArtifactVisual from '../components/ArtifactVisual'
import FavoriteButton from '../components/FavoriteButton'
import ShareButton from '../components/ShareButton'
import { DetailSkeleton } from '../components/Skeleton'
import { useChatbot } from '../context/ChatbotContext'
import { useRecentlyViewed } from '../context/RecentlyViewedContext'
import { ARTIFACT_PHOTOS } from '../data/artifactPhotos'
import { useEmuseumRelic } from '../hooks/useEmuseumRelic'
import { useMuseumData, slugify } from '../hooks/useMuseumData'
import { isChatEnabled } from '../lib/personaBuilder'
import '../styles/layout.css'
import './ArtifactDetailPage.css'

function ArtifactDetailPage() {
  const { artifactId } = useParams()
  const location = useLocation()
  const { loading, artifacts, courses } = useMuseumData()
  const { openChat } = useChatbot()
  const { recordView } = useRecentlyViewed()

  const cameFromCourse = location.state?.from === 'course'
  const backTo = cameFromCourse ? `/courses/${location.state.courseId}` : '/artifacts'
  const backLabel = cameFromCourse ? location.state.courseName : '유물 도감'

  const activeCourse = cameFromCourse
    ? courses.find((c) => c.id === location.state.courseId)
    : null
  const courseArtifactIds = activeCourse
    ? activeCourse.steps.flatMap((step) =>
        step.artifactNames.map((name) => slugify(`${activeCourse.museum} ${name}`)),
      )
    : []
  const courseIndex = courseArtifactIds.indexOf(artifactId)
  const prevArtifactId = courseIndex > 0 ? courseArtifactIds[courseIndex - 1] : null
  const nextArtifactId =
    courseIndex !== -1 && courseIndex < courseArtifactIds.length - 1
      ? courseArtifactIds[courseIndex + 1]
      : null
  const courseNavState = cameFromCourse
    ? { from: 'course', courseId: location.state.courseId, courseName: location.state.courseName }
    : undefined

  const artifact = artifacts.find((a) => a.id === artifactId)
  const { status: emuseumStatus, detail: emuseumDetail } = useEmuseumRelic(artifact?.name)

  useEffect(() => {
    if (artifact) recordView(artifact.id)
  }, [artifact?.id, recordView])

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [artifactId])

  if (loading) {
    return (
      <section className="page">
        <div className="page-inner">
          <DetailSkeleton />
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
  const photo = ARTIFACT_PHOTOS[artifact.id] || emuseumDetail?.imgUri

  return (
    <section className="page">
      <div className="page-inner">
        <Link to={backTo} className="back-link">
          ← {backLabel}
        </Link>

        {activeCourse && courseIndex !== -1 && (
          <div className="artifact-course-nav">
            {prevArtifactId ? (
              <Link
                to={`/artifacts/${prevArtifactId}`}
                state={courseNavState}
                className="artifact-course-nav-btn prev"
              >
                ← 이전 유물
              </Link>
            ) : (
              <span className="artifact-course-nav-btn prev disabled">← 이전 유물</span>
            )}
            <span className="artifact-course-nav-count">
              {courseIndex + 1} / {courseArtifactIds.length}
            </span>
            {nextArtifactId ? (
              <Link
                to={`/artifacts/${nextArtifactId}`}
                state={courseNavState}
                className="artifact-course-nav-btn next"
              >
                다음 유물 →
              </Link>
            ) : (
              <span className="artifact-course-nav-btn next disabled">다음 유물 →</span>
            )}
          </div>
        )}

        <div className="artifact-detail">
          <div className="artifact-detail-visual">
            {photo ? (
              <img src={photo} alt={artifact.name} className="artifact-detail-photo" />
            ) : (
              <ArtifactVisual className="artifact-detail-svg" />
            )}
          </div>
          <div className="artifact-detail-body">
            <p className="artifact-detail-hall">
              {artifact.museum} · {artifact.hall} · {artifact.room}
            </p>
            <div className="artifact-detail-title-row">
              <h1 className="artifact-detail-name">{artifact.name}</h1>
              <FavoriteButton type="artifact" id={artifact.id} />
              <ShareButton
                title={artifact.name}
                text={`${artifact.museum} · ${artifact.hall}`}
              />
            </div>
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

            {isChatEnabled(artifact) && (
              <button
                type="button"
                className="chat-cta"
                onClick={() => openChat(artifact)}
              >
                💬 이 유물과 대화하기
              </button>
            )}

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
