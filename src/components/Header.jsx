import { NavLink } from 'react-router-dom'
import Logo from './Logo'
import './Header.css'

const NAV_ITEMS = [
  { to: '/', label: '홈', end: true },
  { to: '/courses', label: '전시 코스' },
  { to: '/for-you', label: '취향 코스 추천' },
  { to: '/artifacts', label: '유물 도감' },
]

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
  return (
    <>
      <header className="header">
        <div className="header-top">
          <NavLink to="/" className="logo" aria-label="처마 홈으로 이동">
            <Logo />
            <span className="logo-text">처마</span>
          </NavLink>
        </div>

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
