import { useFavorites } from '../context/FavoritesContext'
import './FavoriteButton.css'

const HEART_PATH =
  'M12 20.5s-7.5-4.6-10-9.3C.6 8 1.8 4.4 5 3.3c2.2-.7 4.3.2 5.5 2 .4.6.8 1.2 1.5 1.2s1.1-.6 1.5-1.2c1.2-1.8 3.3-2.7 5.5-2 3.2 1.1 4.4 4.7 3 7.9-2.5 4.7-10 9.3-10 9.3z'

function FavoriteButton({ type, id, variant = 'inline', className = '' }) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const active = isFavorite(type, id)

  const handleClick = (e) => {
    e.preventDefault()
    e.stopPropagation()
    toggleFavorite(type, id)
  }

  return (
    <button
      type="button"
      className={`favorite-btn favorite-btn-${variant}${active ? ' active' : ''}${className ? ` ${className}` : ''}`}
      onClick={handleClick}
      aria-pressed={active}
      aria-label={active ? '즐겨찾기에서 삭제' : '즐겨찾기에 추가'}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill={active ? 'currentColor' : 'none'}>
        <path d={HEART_PATH} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
      </svg>
    </button>
  )
}

export default FavoriteButton
