import { Link, useParams } from 'react-router-dom'
import CourseFeature from '../components/CourseFeature'
import { useMuseumData, slugify } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './CourseDetailPage.css'

function CourseDetailPage() {
  const { courseId } = useParams()
  const { loading, courses } = useMuseumData()

  if (loading) {
    return (
      <section className="page">
        <div className="page-inner">
          <p style={{ color: 'var(--text-muted)' }}>코스 정보를 불러오는 중...</p>
        </div>
      </section>
    )
  }

  const course = courses.find((c) => c.id === courseId)

  if (!course) {
    return (
      <section className="page">
        <div className="page-inner">
          <p>코스를 찾을 수 없어요.</p>
          <Link to="/courses">전시 코스 목록으로 돌아가기</Link>
        </div>
      </section>
    )
  }

  return (
    <section className="page">
      <div className="page-inner">
        <Link to="/courses" className="back-link">
          ← 전시 코스 목록
        </Link>

        <CourseFeature course={course} />

        <h3 className="section-title">관람 순서</h3>
        <div className="course-steps-detail">
          {course.steps.map((step) => (
            <div className="course-step-block" key={step.order}>
              <div
                className="course-step-badge"
                style={{ background: step.color }}
              >
                {step.order}
              </div>
              <div className="course-step-content">
                <h4>
                  {step.hall} <span>· {step.time}분</span>
                </h4>
                <p className="course-step-rooms">{step.rooms.join(', ')}</p>
                <ul className="course-step-artifacts">
                  {step.artifactNames.map((name, i) => (
                    <li key={`${step.order}-${i}-${name}`}>
                      <Link to={`/artifacts/${slugify(`${course.museum} ${name}`)}`}>
                        {name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default CourseDetailPage
