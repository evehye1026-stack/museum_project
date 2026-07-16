import { useMemo, useState } from 'react'
import CourseCard from '../components/CourseCard'
import CourseFeature from '../components/CourseFeature'
import { useMuseumData } from '../hooks/useMuseumData'
import { THEME_OPTIONS, TIME_OPTIONS, recommendCourses } from '../utils/recommend'
import '../styles/layout.css'
import '../components/PreferenceWidget.css'

function ForYouPage() {
  const { loading, courses } = useMuseumData()
  const [themes, setThemes] = useState([])
  const [timeId, setTimeId] = useState(null)

  const recommended = useMemo(
    () => recommendCourses(courses, { themes, timeId }),
    [courses, themes, timeId],
  )

  const [top, ...rest] = recommended
  const hasPreference = themes.length > 0 || timeId !== null

  function toggleTheme(theme) {
    setThemes((prev) =>
      prev.includes(theme) ? prev.filter((t) => t !== theme) : [...prev, theme],
    )
  }

  return (
    <section className="page">
      <div className="page-inner">
        <h1 className="section-title" style={{ fontSize: 28, marginTop: 0 }}>
          취향 코스 추천
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 28px', fontSize: 14.5 }}>
          관심 테마와 관람 시간을 선택하면, 지금 당신에게 맞는 코스를 순위대로 보여드려요.
        </p>

        <div className="preference-widget">
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
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>코스 정보를 불러오는 중...</p>
        ) : hasPreference && top ? (
          <>
            <h3 className="section-title">1순위 추천 코스</h3>
            <CourseFeature course={top} />

            {rest.length > 0 && (
              <>
                <h3 className="section-title">그 다음으로 어울리는 코스</h3>
                <div className="card-grid">
                  {rest.slice(0, 5).map((course) => (
                    <CourseCard key={course.id} course={course} />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <p style={{ color: 'var(--text-muted)' }}>
            테마나 시간을 선택하면 맞춤 코스를 추천해드려요.
          </p>
        )}
      </div>
    </section>
  )
}

export default ForYouPage
