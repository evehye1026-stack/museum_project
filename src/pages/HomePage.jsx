import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { useMuseumData } from '../hooks/useMuseumData'
import '../components/PreferenceWidget.css'
import '../styles/layout.css'
import './HomePage.css'

function HomePage() {
  const { loading, courses } = useMuseumData()

  return (
    <section className="page">
      <div className="page-inner">
        <p className="hero-eyebrow">고담</p>
        <h2 className="hero-subtitle">전국 국립 박물관 코스</h2>

        <Link to="/for-you" className="preference-widget preference-teaser">
          취향 코스 추천
        </Link>

        {loading ? (
          <p className="hero-loading">코스 정보를 불러오는 중...</p>
        ) : (
          <>
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
