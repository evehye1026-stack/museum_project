import { useEffect, useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { useProgress } from '../context/ProgressContext'
import { useMuseumData } from '../hooks/useMuseumData'
import './Header.css'

const NAV_ITEMS = [
  { to: '/', label: '홈', end: true },
  { to: '/courses', label: '전시 코스' },
  { to: '/for-you', label: '취향 코스 추천' },
  { to: '/artifacts', label: '유물 도감' },
]

const FAVORITE_ICON = (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
    <path d="M12 20.5s-7.5-4.6-10-9.3C.6 8 1.8 4.4 5 3.3c2.2-.7 4.3.2 5.5 2 .4.6.8 1.2 1.5 1.2s1.1-.6 1.5-1.2c1.2-1.8 3.3-2.7 5.5-2 3.2 1.1 4.4 4.7 3 7.9-2.5 4.7-10 9.3-10 9.3z" />
  </svg>
)

const CONTINUE_ICON = (
  <svg width="21" height="21" viewBox="0 0 24 24" fill="currentColor">
    <path d="M8 5v14l11-7-11-7z" />
  </svg>
)

const TAB_ITEMS = [
  {
    to: '/',
    label: '홈',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M4 11.5L12 4l8 7.5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6 10v9h12v-9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: '/courses',
    label: '전시 코스',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="4"
          y="5"
          width="16"
          height="14"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <path
          d="M8 9h8M8 13h5"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
  {
    to: '/for-you',
    label: '취향 추천',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <path
          d="M12 20s-7-4.35-7-9.5A4.5 4.5 0 0 1 12 7a4.5 4.5 0 0 1 7 3.5C19 15.65 12 20 12 20z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    ),
  },
  {
    to: '/artifacts',
    label: '유물 도감',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
        <rect
          x="5"
          y="4"
          width="14"
          height="16"
          rx="1.5"
          stroke="currentColor"
          strokeWidth="1.6"
        />
        <line
          x1="8"
          y1="9"
          x2="16"
          y2="9"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
        <line
          x1="8"
          y1="13"
          x2="16"
          y2="13"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    ),
  },
]

function Header() {
  const { progress } = useProgress()
  const { courses } = useMuseumData()
  const navigate = useNavigate()
  const [continueOpen, setContinueOpen] = useState(false)
  const continueRef = useRef(null)

  const continueCourses = Object.entries(progress)
    .map(([courseId, doneSteps]) => {
      const course = courses.find((c) => c.id === courseId)
      return course && doneSteps.length > 0 && doneSteps.length < course.steps.length
        ? { course, done: doneSteps.length, total: course.steps.length }
        : null
    })
    .filter(Boolean)

  useEffect(() => {
    if (!continueOpen) return
    function handleClickOutside(e) {
      if (continueRef.current && !continueRef.current.contains(e.target)) {
        setContinueOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [continueOpen])

  function handleContinueClick() {
    if (continueCourses.length === 1) {
      navigate(`/courses/${continueCourses[0].course.id}`)
    } else {
      setContinueOpen((open) => !open)
    }
  }

  return (
    <>
      <header className="header">
        <div className="header-top">
          <NavLink to="/" className="logo" aria-label="고담 홈으로 이동">
            <span className="logo-text">고담</span>
            <span className="logo-hanja">古談</span>
          </NavLink>
          <div className="header-icons">
            {continueCourses.length > 0 && (
              <div className="header-continue-wrap" ref={continueRef}>
                <button
                  type="button"
                  className="header-continue"
                  aria-label="코스 이어보기"
                  title="코스 이어보기"
                  onClick={handleContinueClick}
                >
                  {CONTINUE_ICON}
                </button>
                {continueOpen && continueCourses.length > 1 && (
                  <div className="header-continue-menu">
                    {continueCourses.map(({ course, done, total }) => (
                      <NavLink
                        key={course.id}
                        to={`/courses/${course.id}`}
                        className="header-continue-menu-item"
                        onClick={() => setContinueOpen(false)}
                      >
                        <span className="header-continue-menu-name">{course.name}</span>
                        <span className="header-continue-menu-count">
                          {done}/{total}
                        </span>
                      </NavLink>
                    ))}
                  </div>
                )}
              </div>
            )}
            <NavLink
              to="/favorites"
              className={({ isActive }) => `header-favorite${isActive ? ' active' : ''}`}
              aria-label="즐겨찾기"
            >
              {FAVORITE_ICON}
            </NavLink>
          </div>
        </div>

        <div className="nav-menu-band">
          <nav className="nav-menu">
            {NAV_ITEMS.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                end={item.end}
                className={({ isActive }) => (isActive ? 'active' : '')}
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>

      <nav className="mobile-tabbar">
        {TAB_ITEMS.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            end
            className={({ isActive }) => `tab-btn${isActive ? ' active' : ''}`}
            aria-label={item.label}
          >
            {item.icon}
          </NavLink>
        ))}
      </nav>
    </>
  )
}

export default Header
