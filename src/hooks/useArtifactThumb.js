import { useEffect, useRef, useState } from 'react'
import { findRelicByName } from '../data/emuseumApi'

// 유물 도감의 카드 수가 많아 한 번에 다 조회하면 e뮤지엄 API 호출량이 커지므로,
// 카드가 화면에 보일 때만 조회하고(IntersectionObserver) 유물명 단위로 캐싱한다.
// 목록 검색(findRelicByName) 응답에 이미 썸네일 URL이 들어있어 상세 조회는 필요 없다.
const thumbCache = new Map()

export function useArtifactThumb(name) {
  const ref = useRef(null)
  const [thumbUrl, setThumbUrl] = useState(() => thumbCache.get(name) ?? null)

  useEffect(() => {
    if (!name || thumbCache.has(name)) return
    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      (entries) => {
        if (!entries[0].isIntersecting) return
        observer.disconnect()

        findRelicByName(name)
          .then((match) => {
            const url = match?.imgThumUriM || match?.imgThumUriS || null
            thumbCache.set(name, url)
            setThumbUrl(url)
          })
          .catch(() => {
            thumbCache.set(name, null)
          })
      },
      { rootMargin: '200px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [name])

  return { ref, thumbUrl }
}
