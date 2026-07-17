import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import RoofIcon from '../components/RoofIcon'
import VaseIcon from '../components/VaseIcon'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './HomePage.css'

function HomePage() {
  const { loading, courses } = useMuseumData()

  return (
    <section className="page">
      <div className="page-inner">
        <p className="hero-eyebrow">처마</p>
        <h2 className="hero-subtitle">전국 국립 박물관 코스</h2>

        <div className="home-split-row">
          <Link to="/for-you" className="home-split-card">
            <div className="home-split-icon">
              <RoofIcon />
            </div>
            <h3 className="home-split-title">취향 코스 추천</h3>
            <p className="home-split-desc">
              몇 가지 질문으로 만나는 나만의 관람 코스
            </p>
            <span className="home-split-cta">추천 코스 보기 →</span>
          </Link>

          <Link to="/artifacts" className="home-split-card">
            <div className="home-split-icon">
              <VaseIcon />
            </div>
            <h3 className="home-split-title">유물 도감</h3>
            <p className="home-split-desc">
              유물과 나누는 이야기를 새로운 시선으로 탐색해보세요
            </p>
            <span className="home-split-cta">도감 보기 →</span>
          </Link>
        </div>

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
