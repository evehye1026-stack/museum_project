import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'godam-recently-viewed'
const MAX_ITEMS = 12
const RecentlyViewedContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    const parsed = raw ? JSON.parse(raw) : []
    return Array.isArray(parsed) ? parsed : []
  } catch {
    return []
  }
}

export function RecentlyViewedProvider({ children }) {
  const [recentIds, setRecentIds] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(recentIds))
  }, [recentIds])

  const recordView = useCallback((id) => {
    setRecentIds((prev) => [id, ...prev.filter((x) => x !== id)].slice(0, MAX_ITEMS))
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
