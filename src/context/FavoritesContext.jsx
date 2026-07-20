import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getDeviceId } from '../utils/deviceId'

const FavoritesContext = createContext(null)

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState({ artifact: [], course: [] })

  useEffect(() => {
    let active = true

    supabase
      .from('favorites')
      .select('item_type, item_id')
      .eq('device_id', getDeviceId())
      .then(({ data, error }) => {
        if (!active || error) {
          if (error) console.error('즐겨찾기를 불러오지 못했습니다', error)
          return
        }
        const next = { artifact: [], course: [] }
        for (const row of data) {
          next[row.item_type]?.push(row.item_id)
        }
        setFavorites(next)
      })

    return () => {
      active = false
    }
  }, [])

  const isFavorite = useCallback(
    (type, id) => favorites[type]?.includes(id) ?? false,
    [favorites],
  )

  const toggleFavorite = useCallback(
    (type, id) => {
      const currentlyFavorite = favorites[type]?.includes(id) ?? false

      setFavorites((prev) => {
        const list = prev[type] ?? []
        const next = currentlyFavorite ? list.filter((x) => x !== id) : [...list, id]
        return { ...prev, [type]: next }
      })

      const deviceId = getDeviceId()
      const query = currentlyFavorite
        ? supabase.from('favorites').delete().match({ device_id: deviceId, item_type: type, item_id: id })
        : supabase.from('favorites').insert({ device_id: deviceId, item_type: type, item_id: id })

      query.then(({ error }) => error && console.error('즐겨찾기 동기화 실패', error))
    },
    [favorites],
  )

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
