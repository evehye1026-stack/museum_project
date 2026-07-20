import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import ArtifactCard from '../components/ArtifactCard'
import { CardSkeletonGrid } from '../components/Skeleton'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './ArtifactsPage.css'
import './CoursesPage.css'

// module-scoped so filters/scroll survive leaving and returning to this page
// (e.g. clicking an artifact, then "← 유물 도감") without persisting across a reload
const lastVisit = {
  query: '',
  museum: '전체',
  room: '전체',
  sort: 'name',
  scrollY: 0,
}

function ArtifactsPage() {
  const { loading, artifacts, museums } = useMuseumData()
  const [query, setQuery] = useState(lastVisit.query)
  const [museum, setMuseum] = useState(lastVisit.museum)
  const [room, setRoom] = useState(lastVisit.room)
  const [sort, setSort] = useState(lastVisit.sort)
  const restoredScroll = useRef(false)

  const rooms = useMemo(() => {
    const pool = museum === '전체' ? artifacts : artifacts.filter((a) => a.museum === museum)
    return [...new Set(pool.map((a) => a.room).filter(Boolean))].sort((a, b) =>
      a.localeCompare(b, 'ko'),
    )
  }, [artifacts, museum])

  useEffect(() => {
    if (room !== '전체' && !rooms.includes(room)) setRoom('전체')
  }, [rooms, room])

  useEffect(() => {
    lastVisit.query = query
    lastVisit.museum = museum
    lastVisit.room = room
    lastVisit.sort = sort
  }, [query, museum, room, sort])

  useEffect(() => {
    const handleScroll = () => {
      lastVisit.scrollY = window.scrollY
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useLayoutEffect(() => {
    if (loading || restoredScroll.current) return
    restoredScroll.current = true
    window.scrollTo(0, lastVisit.scrollY)
  }, [loading])

  const filtered = artifacts
    .filter((a) => {
      const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase())
      const matchesMuseum = museum === '전체' || a.museum === museum
      const matchesRoom = room === '전체' || a.room === room
      return matchesQuery && matchesMuseum && matchesRoom
    })
    .sort((a, b) =>
      sort === 'museum'
        ? a.museum.localeCompare(b.museum, 'ko') ||
          a.hall.localeCompare(b.hall, 'ko') ||
          a.name.localeCompare(b.name, 'ko')
        : a.name.localeCompare(b.name, 'ko'),
    )

  return (
    <section className="page">
      <div className="page-inner">
        <h1 className="section-title" style={{ fontSize: 28, marginTop: 0 }}>
          유물 도감
        </h1>
        <p style={{ color: 'var(--text-muted)', margin: '0 0 24px', fontSize: 14.5 }}>
          국립박물관 유물 {artifacts.length}점을 검색하고, 궁금한 유물과 직접
          대화해보세요.
        </p>

        <div className="artifact-filters">
          <input
            type="search"
            placeholder="유물명 검색"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="artifact-search"
          />
          <div className="hall-chip-row course-chip-row">
            {['전체', ...museums].flatMap((m) => [
              ...(m === '국립대구박물관'
                ? [<span key="break" className="course-chip-break" aria-hidden="true" />]
                : []),
              <button
                key={m}
                type="button"
                className={`hall-chip course-chip${museum === m ? ' active' : ''}`}
                onClick={() => setMuseum(m)}
              >
                {m}
              </button>,
            ])}
          </div>
          <div className="artifact-secondary-filters">
            <select
              value={room}
              onChange={(e) => setRoom(e.target.value)}
              className="artifact-select"
              aria-label="전시실 필터"
            >
              <option value="전체">전시실 전체</option>
              {rooms.map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="artifact-select"
              aria-label="정렬 기준"
            >
              <option value="name">이름순</option>
              <option value="museum">전시관순</option>
            </select>
          </div>
        </div>

        {loading ? (
          <CardSkeletonGrid count={9} />
        ) : filtered.length === 0 ? (
          <p style={{ color: 'var(--text-muted)' }}>검색 결과가 없어요.</p>
        ) : (
          <div className="card-grid">
            {filtered.map((artifact) => (
              <ArtifactCard key={artifact.id} artifact={artifact} />
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default ArtifactsPage
