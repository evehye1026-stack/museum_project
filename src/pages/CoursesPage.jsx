import { useState } from 'react'
import CourseCard from '../components/CourseCard'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './ArtifactsPage.css'

function CoursesPage() {
  const { loading, courses, museums } = useMuseumData()
  const [museum, setMuseum] = useState('전체')

  const filtered =
    museum === '전체' ? courses : courses.filter((c) => c.museum === museum)

  return (
    <section className="page">
      <div className="page-inner">
        <h1 className="section-title" style={{ fontSize: 28, marginTop: 0 }}>
          전시 코스
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 20px', fontSize: 14.5 }}>
          국립박물관이 준비한 {courses.length}개의 추천 코스입니다. 관심 있는 코스를 눌러
          자세한 관람 순서를 확인해보세요.
        </p>

        <div className="hall-chip-row" style={{ marginBottom: 24 }}>
          {['전체', ...museums].map((m) => (
            <button
              key={m}
              type="button"
              className={`hall-chip${museum === m ? ' active' : ''}`}
              onClick={() => setMuseum(m)}
            >
              {m}
            </button>
          ))}
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>코스 정보를 불러오는 중...</p>
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>해당 박물관의 코스가 없어요.</p>
        ) : (
          <div className="card-grid">
            {filtered.map((course) => (
              <CourseCard key={course.id} course={course} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default CoursesPage
