import { useState } from 'react'
import './ShareButton.css'

const SHARE_ICON = (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <circle cx="18" cy="5" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="6" cy="12" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <circle cx="18" cy="19" r="2.6" stroke="currentColor" strokeWidth="1.6" />
    <path
      d="M8.3 10.7l7.4-4.2M8.3 13.3l7.4 4.2"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  </svg>
)

function ShareButton({ title, text, variant = 'inline', className = '' }) {
  const [toast, setToast] = useState('')

  const handleClick = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    const shareUrl = window.location.href

    if (navigator.share) {
      try {
        await navigator.share({ title, text, url: shareUrl })
      } catch {
        // user closed the native share sheet — nothing to do
      }
      return
    }

    try {
      await navigator.clipboard.writeText(shareUrl)
      setToast('링크 복사됨')
    } catch {
      setToast('복사에 실패했어요')
    }
    setTimeout(() => setToast(''), 1800)
  }

  return (
    <div className="share-btn-wrap">
      <button
        type="button"
        className={`share-btn share-btn-${variant}${className ? ` ${className}` : ''}`}
        onClick={handleClick}
        aria-label="공유하기"
      >
        {SHARE_ICON}
      </button>
      {toast && <span className="share-btn-toast">{toast}</span>}
    </div>
  )
}

export default ShareButton
