import { Link } from 'react-router-dom'
import './PreferenceWidget.css'

function PreferenceWidget() {
  return (
    <section className="preference-widget">
      <h2 className="preference-title">취향 코스 찾기</h2>
      <p className="preference-subtitle">
        질문 5개로 나에게 맞는 코스를 찾아드려요. MBTI 하듯 가볍게 해보세요.
      </p>
      <Link to="/for-you" className="preference-cta">
        취향 코스 찾기 시작하기 →
      </Link>
    </section>
  )
}

export default PreferenceWidget
