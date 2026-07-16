import { useState } from 'react'
import { findRelicByName, fetchRelicDetail } from '../data/emuseumApi'

function ArtifactItem({ name }) {
  const [status, setStatus] = useState('idle')
  const [detail, setDetail] = useState(null)
  const [error, setError] = useState(null)

  const handleClick = async () => {
    if (status === 'loading') return
    setStatus('loading')
    setError(null)

    try {
      const match = await findRelicByName(name)
      if (!match) {
        setStatus('notfound')
        return
      }
      const detailData = await fetchRelicDetail(match.id)
      setDetail(detailData)
      setStatus('done')
    } catch (err) {
      setError(err.message)
      setStatus('error')
    }
  }

  return (
    <li>
      <button onClick={handleClick}>{name}</button>
      {status === 'loading' && <span> 불러오는 중...</span>}
      {status === 'notfound' && <span> e뮤지엄에서 매칭되는 유물을 찾지 못함</span>}
      {status === 'error' && <span> 에러: {error}</span>}
      {status === 'done' && detail && (
        <div>
          <p>{detail.desc}</p>
          <p>
            시대: {detail.nationalityName1} {detail.nationalityName2}
          </p>
          <p>
            재질: {detail.materialName1} {detail.materialName2}
          </p>
          {detail.imgUri && <img src={detail.imgUri} alt={name} width="150" />}
        </div>
      )}
    </li>
  )
}

export default ArtifactItem
