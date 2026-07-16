import { Link } from 'react-router-dom'
import './CourseCard.css'

function CourseCard({ course }) {
  return (
    <Link to={`/courses/${course.id}`} className="rec-card">
      <div
        className="rec-thumb"
        style={{
          background: `linear-gradient(135deg, ${course.colors[0]} 0%, ${course.colors[2] || course.colors[0]} 100%)`,
        }}
      />
      <div className="rec-body">
        <p className="rec-museum">{course.museum}</p>
        <h4 className="rec-title">{course.name}</h4>
        <div className="rec-meta">
          <span>⏱ {course.totalMinutes}분</span>
          <span>· 유물 {course.artifactCount}점</span>
        </div>
      </div>
    </Link>
  )
}

export default CourseCard
