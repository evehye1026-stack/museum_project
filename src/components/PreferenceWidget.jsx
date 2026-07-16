import { useMemo, useState } from 'react'
import CourseFeature from './CourseFeature'
import { THEME_OPTIONS, TIME_OPTIONS, recommendCourses } from '../utils/recommend'
import './PreferenceWidget.css'

function PreferenceWidget({ courses }) {
  const [themes, setThemes] = useState([])
  const [timeId, setTimeId] = useState(null)

  const recommended = useMemo(
    () => recommendCourses(courses, { themes, timeId }),
    [courses, themes, timeId],
  )

  const top = recommended[0]
  const hasPreference = themes.length > 0 || timeId !== null

  function toggleTheme(theme) {
    setThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme],
    )
  }

  return (
    <section className="preference-widget">
      <h2 className="preference-title">취향 코스 추천</h2>
      <p className="preference-subtitle">
        관심 있는 테마와 관람 시간을 골라보세요. 지금 이 순간 당신에게 맞는 코스를 찾아드려요.
      </p>

      <div className="chip-group">
        <span className="chip-group-label">관심 테마</span>
        <div className="chip-row">
          {THEME_OPTIONS.map((theme) => (
            <button
              key={theme}
              className={`chip${themes.includes(theme) ? ' active' : ''}`}
              onClick={() => toggleTheme(theme)}
              type="button"
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      <div className="chip-group">
        <span className="chip-group-label">관람 시간</span>
        <div className="chip-row">
          {TIME_OPTIONS.map((option) => (
            <button
              key={option.id}
              className={`chip${timeId === option.id ? ' active' : ''}`}
              onClick={() =>
                setTimeId((prev) => (prev === option.id ? null : option.id))
              }
              type="button"
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      {hasPreference && top && (
        <div className="preference-result">
          <p className="preference-result-label">이런 코스는 어떠세요?</p>
          <CourseFeature course={top} />
        </div>
      )}
    </section>
  )
}

export default PreferenceWidget
