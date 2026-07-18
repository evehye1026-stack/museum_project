import { Link, useParams } from 'react-router-dom'
import CourseFeature from '../components/CourseFeature'
import { DetailSkeleton } from '../components/Skeleton'
import { useProgress } from '../context/ProgressContext'
import { useMuseumData, slugify } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './CourseDetailPage.css'

function CourseDetailPage() {
  const { courseId } = useParams()
  const { loading, courses } = useMuseumData()
  const { isStepDone, toggleStep, getDoneCount } = useProgress()

  if (loading) {
    return (
      <section className="page">
        <div className="page-inner">
          <DetailSkeleton />
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

  const doneCount = getDoneCount(course.id)
  const totalSteps = course.steps.length
  const percent = totalSteps ? Math.round((doneCount / totalSteps) * 100) : 0

  return (
    <section className="page">
      <div className="page-inner">
        <Link to="/courses" className="back-link">
          ← 전시 코스 목록
        </Link>

        <CourseFeature course={course} />

        <div className="course-progress">
          <div className="course-progress-header">
            <h3 className="section-title" style={{ margin: 0 }}>
              관람 순서
            </h3>
            <span className="course-progress-count">
              {doneCount}/{totalSteps} 완료
            </span>
          </div>
          <div className="course-progress-bar">
            <div className="course-progress-fill" style={{ width: `${percent}%` }} />
          </div>
        </div>

        <div className="course-steps-detail">
          {course.steps.map((step) => {
            const done = isStepDone(course.id, step.order)
            return (
              <div className={`course-step-block${done ? ' done' : ''}`} key={step.order}>
                <div
                  className="course-step-badge"
                  style={{ background: step.color }}
                >
                  {step.order}
                </div>
                <div className="course-step-content">
                  <div className="course-step-heading">
                    <h4>
                      {step.hall} <span>· {step.time}분</span>
                    </h4>
                    <label className="course-step-check">
                      <input
                        type="checkbox"
                        checked={done}
                        onChange={() => toggleStep(course.id, step.order)}
                      />
                      관람 완료
                    </label>
                  </div>
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
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default CourseDetailPage
