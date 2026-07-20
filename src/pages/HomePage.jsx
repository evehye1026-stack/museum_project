import { useState } from 'react'
import { Link } from 'react-router-dom'
import ArtifactCard from '../components/ArtifactCard'
import IntroSplash from '../components/IntroSplash'
import { useRecentlyViewed } from '../context/RecentlyViewedContext'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './HomePage.css'

const INTRO_SEEN_KEY = 'godam-intro-seen'

function shouldShowIntro() {
  return !sessionStorage.getItem(INTRO_SEEN_KEY)
}

function HomePage() {
  const [showIntro, setShowIntro] = useState(shouldShowIntro)
  const { recentIds } = useRecentlyViewed()
  const { artifacts } = useMuseumData()

  function dismissIntro() {
    sessionStorage.setItem(INTRO_SEEN_KEY, '1')
    setShowIntro(false)
  }

  const recentArtifacts = recentIds
    .map((id) => artifacts.find((a) => a.id === id))
    .filter(Boolean)
    .slice(0, 6)

  return (
    <section className="page">
      {showIntro && <IntroSplash onDone={dismissIntro} />}
      <div className="page-inner">
        <p className="hero-eyebrow">고담 : 오래되고 아름다운 이야기, 옛이야기</p>
        <p className="hero-intro-body">
          전국 국립박물관 방방곡곡에는 저마다의 시간과 사연을 품은 유물들이 잠들어 있습니다.
          <br />
          고담은 그 오래된 이야기들을 꺼내어 당신만의 관람 코스로
          <br className="mobile-break" /> 엮어드려요.
          <br />
          몇 가지 질문에 답하여 취향에 꼭 맞는 산책 코스를 추천받고,
          <br />
          유물 하나하나가 들려주는 옛이야기에
          <br className="mobile-break" /> 조용히 귀 기울여보세요.
        </p>

        <div className="home-split-row">
          <Link to="/for-you" className="home-split-card home-split-card--course">
            <div className="home-split-body">
              <h3 className="home-split-title">나의 옛이야기 찾기</h3>
              <p className="home-split-desc">
                몇 가지 질문으로 만나는 나만의 산책 코스
              </p>
              <span className="home-split-cta">추천 코스 보기 →</span>
            </div>
          </Link>

          <Link to="/artifacts" className="home-split-card home-split-card--artifact">
            <div className="home-split-body">
              <h3 className="home-split-title">유물이 들려주는 이야기</h3>
              <p className="home-split-desc">
                유물과 나누는 이야기를 새로운 시선으로 탐색해보세요
              </p>
              <span className="home-split-cta">도감 보기 →</span>
            </div>
          </Link>
        </div>

        {recentArtifacts.length > 0 && (
          <div className="home-recent-section">
            <h3 className="section-title" style={{ fontSize: 18 }}>
              최근 본 유물
            </h3>
            <div className="card-grid">
              {recentArtifacts.map((artifact) => (
                <ArtifactCard key={artifact.id} artifact={artifact} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  )
}

export default HomePage
