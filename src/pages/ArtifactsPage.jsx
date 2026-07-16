import { useState } from 'react'
import ArtifactCard from '../components/ArtifactCard'
import { useMuseumData } from '../hooks/useMuseumData'
import '../styles/layout.css'
import './ArtifactsPage.css'

function ArtifactsPage() {
  const { loading, artifacts, museums } = useMuseumData()
  const [query, setQuery] = useState('')
  const [museum, setMuseum] = useState('전체')

  const filtered = artifacts.filter((a) => {
    const matchesQuery = a.name.toLowerCase().includes(query.toLowerCase())
    const matchesMuseum = museum === '전체' || a.museum === museum
    return matchesQuery && matchesMuseum
  })

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
          <div className="hall-chip-row">
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
        </div>

        {loading ? (
          <p style={{ color: 'var(--text-muted)' }}>유물 정보를 불러오는 중...</p>
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
