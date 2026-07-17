import { Link } from 'react-router-dom'
import CourseCard from '../components/CourseCard'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './HomePage.css'

function HomePage() {
  const { loading, courses } = useMuseumData()

  return (
    <section className="page">
      <div className="page-inner">
        <p className="hero-eyebrow">
          고담<span className="hero-eyebrow-hanja">古談</span>
        </p>
        <h2 className="hero-subtitle">전국 국립 박물관 코스</h2>

        <div className="home-split-row">
          <Link to="/for-you" className="home-split-card home-split-card--course">
            <div className="home-split-visual home-split-visual--icon">
              <img
                src="/images/course-icon.png"
                alt="처마 지붕 아이콘"
                className="home-split-icon-img"
              />
            </div>
            <div className="home-split-body home-split-body--center">
              <h3 className="home-split-title">나의 옛이야기 찾기</h3>
              <p className="home-split-desc">
                몇 가지 질문으로 만나는 나만의 관람 코스
              </p>
              <span className="home-split-cta">추천 코스 보기 →</span>
            </div>
          </Link>

          <Link to="/artifacts" className="home-split-card home-split-card--artifact">
            <div className="home-split-visual home-split-visual--icon">
              <img
                src="/images/artifact-icon.png"
                alt="청화백자 항아리 아이콘"
                className="home-split-icon-img"
              />
            </div>
            <div className="home-split-body home-split-body--center">
              <h3 className="home-split-title">유물이 들려주는 이야기</h3>
              <p className="home-split-desc">
                유물과 나누는 이야기를 새로운 시선으로 탐색해보세요
              </p>
              <span className="home-split-cta">도감 보기 →</span>
            </div>
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
