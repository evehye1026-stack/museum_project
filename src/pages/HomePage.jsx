import CourseCard from '../components/CourseCard'
import PreferenceWidget from '../components/PreferenceWidget'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './HomePage.css'

function HomePage() {
  const { loading, courses } = useMuseumData()

  return (
    <section className="page">
      <div className="page-inner">
        <p className="hero-eyebrow">처마</p>
        <h1 className="hero-title">한칸인의 명조 &amp; 고딕</h1>
        <h2 className="hero-subtitle">국립중앙박물관 코스</h2>

        {loading ? (
          <p className="hero-loading">코스 정보를 불러오는 중...</p>
        ) : (
          <>
            <PreferenceWidget courses={courses} />

            <h3 className="section-title">전시 코스 둘러보기</h3>
            <div className="card-grid">
              {courses.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default HomePage
