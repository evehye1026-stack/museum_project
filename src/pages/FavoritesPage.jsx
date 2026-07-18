import ArtifactCard from '../components/ArtifactCard'
import CourseCard from '../components/CourseCard'
import { CardSkeletonGrid } from '../components/Skeleton'
import { useFavorites } from '../context/FavoritesContext'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './CoursesPage.css'
import './FavoritesPage.css'

function FavoritesPage() {
  const { loading, artifacts, courses } = useMuseumData()
  const { favorites } = useFavorites()

  const favoriteCourses = courses.filter((c) => favorites.course.includes(c.id))
  const favoriteArtifacts = artifacts.filter((a) => favorites.artifact.includes(a.id))
  const isEmpty = favoriteCourses.length === 0 && favoriteArtifacts.length === 0

  return (
    <section className="page">
      <div className="page-inner">
        <h1 className="section-title" style={{ fontSize: 28, marginTop: 0 }}>
          즐겨찾기
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 24px', fontSize: 14.5 }}>
          하트를 눌러 저장한 코스와 유물을 모아볼 수 있어요.
        </p>

        {loading ? (
          <CardSkeletonGrid count={6} />
        ) : isEmpty ? (
          <p style={{ color: 'var(--text-muted)' }}>
            아직 즐겨찾기한 코스나 유물이 없어요. 코스·유물 카드의 하트를 눌러 저장해보세요.
          </p>
        ) : (
          <>
            {favoriteCourses.length > 0 && (
              <div className="favorites-section">
                <h3 className="section-title" style={{ fontSize: 18 }}>
                  저장한 코스 ({favoriteCourses.length})
                </h3>
                <div className="card-grid">
                  {favoriteCourses.map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </div>
            )}

            {favoriteArtifacts.length > 0 && (
              <div className="favorites-section">
                <h3 className="section-title" style={{ fontSize: 18 }}>
                  저장한 유물 ({favoriteArtifacts.length})
                </h3>
                <div className="card-grid">
                  {favoriteArtifacts.map((artifact) => (
                    <ArtifactCard key={artifact.id} artifact={artifact} />
                  ))}
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </section>
  )
}

export default FavoritesPage
