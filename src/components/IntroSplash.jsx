import { useState } from 'react'
import './IntroSplash.css'

const DOOR_DURATION = 1400

// 문처럼 생긴 첫 화면. 자동으로 넘어가지 않고, 마우스를 올리면 문틈이
// 은은하게 빛나다가 클릭(또는 Enter/Space)하면 열리며 메인 페이지로 들어간다.
function IntroSplash({ onDone }) {
  const [open, setOpen] = useState(false)

  function enter() {
    if (open) return
    setOpen(true)
    setTimeout(onDone, DOOR_DURATION)
  }

  return (
    <div
      className={`intro-splash${open ? ' intro-splash--open' : ''}`}
      onClick={enter}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') enter()
      }}
      role="button"
      tabIndex={0}
      aria-label="고담 입장하기"
    >
      <div className="intro-door intro-door--left" />
      <div className="intro-door intro-door--right" />
      <div className="intro-seam" />

      <svg
        className="intro-roof"
        viewBox="0 0 100 20"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <path
          d="M0 0H100V14C84 14 76 4 50 4C24 4 16 14 0 14Z"
          fill="var(--navy-deep)"
        />
      </svg>

      <div className="intro-content">
        <p className="intro-text">
          고담<span className="intro-text-hanja">古談</span>
        </p>
        <p className="intro-hint">이야기 속으로</p>
      </div>
    </div>
  )
}

export default IntroSplash
