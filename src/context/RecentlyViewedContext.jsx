import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getDeviceId } from '../utils/deviceId'

const MAX_ITEMS = 12
const RecentlyViewedContext = createContext(null)

export function RecentlyViewedProvider({ children }) {
  const [recentIds, setRecentIds] = useState([])

  useEffect(() => {
    let active = true

    supabase
      .from('recently_viewed')
      .select('item_id')
      .eq('device_id', getDeviceId())
      .order('viewed_at', { ascending: false })
      .limit(MAX_ITEMS)
      .then(({ data, error }) => {
        if (!active || error) {
          if (error) console.error('최근 본 항목을 불러오지 못했습니다', error)
          return
        }
        setRecentIds(data.map((row) => row.item_id))
      })

    return () => {
      active = false
    }
  }, [])

  const recordView = useCallback((id) => {
    setRecentIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX_ITEMS))

    supabase
      .from('recently_viewed')
      .upsert(
        { device_id: getDeviceId(), item_id: id, viewed_at: new Date().toISOString() },
        { onConflict: 'device_id,item_id' },
      )
      .then(({ error }) => error && console.error('최근 본 항목 동기화 실패', error))
  }, [])

  return (
    <RecentlyViewedContext.Provider value={{ recentIds, recordView }}>
      {children}
    </RecentlyViewedContext.Provider>
  )
}

export function useRecentlyViewed() {
  const ctx = useContext(RecentlyViewedContext)
  if (!ctx) throw new Error('useRecentlyViewed must be used within RecentlyViewedProvider')
  return ctx
}
