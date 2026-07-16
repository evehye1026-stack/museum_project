import CourseCard from '../components/CourseCard'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'

function CoursesPage() {
  const { loading, courses } = useMuseumData()

  return (
    <section className="page">
      <div className="page-inner">
        <h1 className="section-title" style={{ fontSize: 28, marginTop: 0 }}>
          전시 코스
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 28px', fontSize: 14.5 }}>
          국립중앙박물관이 준비한 {courses.length}개의 추천 코스입니다. 관심 있는 코스를 눌러
          자세한 관람 순서를 확인해보세요.
        </p>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>코스 정보를 불러오는 중...</p>
        ) : (
          <div className="card-grid">
            {courses.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CoursesPage
