import { useEffect, useState } from 'react'
import { findRelicByName, fetchRelicDetail } from '../data/emuseumApi'

// 유물명으로 e뮤지엄에서 매칭되는 항목을 찾아 상세(이미지 포함)를 가져온다.
export function useEmuseumRelic(name) {
  const [status, setStatus] = useState('idle')
  const [detail, setDetail] = useState(null)

  useEffect(() => {
    if (!name) return

    let cancelled = false
    setStatus('loading')
    setDetail(null)

    findRelicByName(name)
      .then((match) => {
        if (cancelled) return
        if (!match) {
          setStatus('notfound')
          return
        }
        return fetchRelicDetail(match.id).then((data) => {
          if (cancelled) return
          setDetail(data)
          setStatus('done')
        })
      })
      .catch(() => {
        if (!cancelled) setStatus('error')
      })

    return () => {
      cancelled = true
    }
  }, [name])

  return { status, detail }
}
