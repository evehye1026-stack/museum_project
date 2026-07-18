import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'godam-favorites'
const FavoritesContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { artifact: [], course: [] }
    const parsed = JSON.parse(raw)
    return {
      artifact: Array.isArray(parsed.artifact) ? parsed.artifact : [],
      course: Array.isArray(parsed.course) ? parsed.course : [],
    }
  } catch {
    return { artifact: [], course: [] }
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const isFavorite = useCallback(
    (type, id) => favorites[type]?.includes(id) ?? false,
    [favorites],
  )

  const toggleFavorite = useCallback((type, id) => {
    setFavorites((prev) => {
      const list = prev[type] ?? []
      const next = list.includes(id) ? list.filter((x) => x !== id) : [...list, id]
      return { ...prev, [type]: next }
    })
  }, [])

  return (
    <FavoritesContext.Provider value={{ favorites, isFavorite, toggleFavorite }}>
      {children}
    </FavoritesContext.Provider>
  )
}

export function useFavorites() {
  const ctx = useContext(FavoritesContext)
  if (!ctx) throw new Error('useFavorites must be used within FavoritesProvider')
  return ctx
}
