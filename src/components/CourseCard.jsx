import { Link } from 'react-router-dom'
import FavoriteButton from './FavoriteButton'
import { MUSEUM_PHOTOS } from '../data/museumPhotos'
import './CourseCard.css'

function CourseCard({ course }) {
  const photo = MUSEUM_PHOTOS[course.museum]
  const gradient = `linear-gradient(135deg, ${course.colors[0]} 0%, ${course.colors[2] || course.colors[0]} 100%)`

  return (
    <Link to={`/courses/${course.id}`} className="rec-card">
      <div
        className="rec-thumb"
        style={{
          background: photo
            ? `linear-gradient(135deg, rgba(27,42,94,0.45), rgba(92,115,165,0.35)), url(${photo}) center/cover no-repeat`
            : gradient,
        }}
      >
        <FavoriteButton type="course" id={course.id} variant="overlay-right" />
      </div>
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
