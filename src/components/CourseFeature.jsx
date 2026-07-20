import ArtifactVisual from './ArtifactVisual'
import FavoriteButton from './FavoriteButton'
import ShareButton from './ShareButton'
import StepTimeline from './StepTimeline'
import { ARTIFACT_PHOTOS } from '../data/artifactPhotos'
import { MUSEUM_PHOTOS } from '../data/museumPhotos'
import './CourseFeature.css'

function CourseFeature({ course }) {
  const photo = MUSEUM_PHOTOS[course.museum]
  const highlightPhoto =
    ARTIFACT_PHOTOS[`${course.museum} ${course.highlightArtifact}`.trim()]

  return (
    <div className="course-feature">
      <div
        className="course-card"
        style={
          photo
            ? {
                backgroundImage: `url(${photo})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }
            : undefined
        }
      >
        <div className="course-card-bg" />
        {photo && <div className="course-card-darken" />}
        <div className="course-card-actions">
          <ShareButton
            title={course.name}
            text={`${course.museum} · 유물 ${course.artifactCount}점`}
            variant="overlay"
          />
          <FavoriteButton type="course" id={course.id} variant="overlay-inline" />
        </div>
        <p className="course-card-museum">{course.museum}</p>
        <h3 className="course-card-title">{course.name}</h3>
        {highlightPhoto ? (
          <img
            src={highlightPhoto}
            alt={course.highlightArtifact}
            className="artifact-visual artifact-visual-photo"
          />
        ) : (
          <ArtifactVisual className="artifact-visual" />
        )}
        <ul className="color-tags">
          {course.colors.map((c) => (
            <li key={c}>
              <span className="color-dot" style={{ background: c }} />
            </li>
          ))}
        </ul>
      </div>

      <div className="course-info">
        <h4>코스 소개</h4>
        <p>
          {course.museum} {course.halls.join(' · ')}을 거치며 총{' '}
          {course.artifactCount}점의 유물을 만나는 코스입니다. 대표 유물{' '}
          <strong>{course.highlightArtifact}</strong>부터 순서대로 둘러보세요.
        </p>
        <StepTimeline steps={course.steps} />
      </div>
    </div>
  )
}

export default CourseFeature
