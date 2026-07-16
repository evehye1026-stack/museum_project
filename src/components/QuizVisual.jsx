const ILLUSTRATIONS = [
  // Q1: 박물관 입장
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <rect x="30" y="60" width="140" height="120" rx="6" fill="rgba(255,255,255,0.08)" />
      <rect x="42" y="72" width="50" height="70" rx="4" fill="rgba(255,255,255,0.12)" />
      <rect x="108" y="72" width="50" height="70" rx="4" fill="rgba(255,255,255,0.12)" />
      <ellipse cx="67" cy="118" rx="14" ry="18" fill="#E7C687" opacity="0.9" />
      <ellipse cx="133" cy="118" rx="14" ry="18" fill="#C9D4E8" opacity="0.85" />
      <path d="M20 180h160" stroke="rgba(255,255,255,0.3)" strokeWidth="2" />
      <path d="M60 180v-20M100 180v-20M140 180v-20" stroke="rgba(255,255,255,0.2)" strokeWidth="1.5" />
      <circle cx="100" cy="38" r="18" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
      <path d="M88 38h24M100 26v24" stroke="rgba(255,255,255,0.5)" strokeWidth="1.5" />
    </svg>
  ),
  // Q2: 대화
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <path
        d="M40 90c0-16 14-28 32-28h56c18 0 32 12 32 28v28c0 16-14 28-32 28H82l-22 18v-18H72c-18 0-32-12-32-28V90z"
        fill="rgba(255,255,255,0.1)"
      />
      <path
        d="M110 130c0-12 10-22 22-22h28c12 0 22 10 22 22v20c0 12-10 22-22 22h-14l-12 10v-10h-4c-12 0-22-10-22-22v-20z"
        fill="rgba(255,255,255,0.15)"
      />
      <circle cx="80" cy="104" r="4" fill="rgba(255,255,255,0.6)" />
      <circle cx="100" cy="104" r="4" fill="rgba(255,255,255,0.6)" />
      <circle cx="120" cy="104" r="4" fill="rgba(255,255,255,0.6)" />
      <ellipse cx="136" cy="148" rx="10" ry="4" fill="rgba(255,255,255,0.4)" />
      <path
        d="M100 170c0 22 12 38 30 38"
        stroke="#E7C687"
        strokeWidth="2"
        fill="none"
        opacity="0.7"
      />
      <ellipse cx="130" cy="208" rx="30" ry="8" fill="#D9B36C" opacity="0.25" />
    </svg>
  ),
  // Q3: 여행
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <path
        d="M20 170c30-30 60-40 90-30s60 20 70 50"
        stroke="rgba(255,255,255,0.25)"
        strokeWidth="2"
        fill="none"
      />
      <circle cx="60" cy="130" r="6" fill="#E7C687" />
      <circle cx="100" cy="118" r="6" fill="rgba(255,255,255,0.5)" />
      <circle cx="140" cy="108" r="6" fill="rgba(255,255,255,0.5)" />
      <path d="M60 130l40-12 40-10" stroke="rgba(255,255,255,0.35)" strokeWidth="1.5" strokeDasharray="4 4" />
      <path
        d="M148 88l16-8 4 12 12 4-16 8-4-12-12-4z"
        fill="rgba(255,255,255,0.2)"
        stroke="rgba(255,255,255,0.4)"
        strokeWidth="1"
      />
      <rect x="36" y="56" width="28" height="20" rx="3" fill="rgba(255,255,255,0.1)" />
      <rect x="72" y="48" width="28" height="20" rx="3" fill="rgba(255,255,255,0.08)" />
      <rect x="108" y="40" width="28" height="20" rx="3" fill="rgba(255,255,255,0.06)" />
    </svg>
  ),
  // Q4: 색과 질감
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <circle cx="70" cy="100" r="32" fill="#485A7E" opacity="0.6" />
      <circle cx="120" cy="90" r="28" fill="#E7C687" opacity="0.7" />
      <circle cx="100" cy="140" r="26" fill="#C9A45A" opacity="0.5" />
      <rect x="50" y="175" width="100" height="14" rx="7" fill="rgba(255,255,255,0.1)" />
      <rect x="50" y="175" width="35" height="14" rx="7" fill="#12205A" opacity="0.5" />
      <rect x="85" y="175" width="30" height="14" rx="7" fill="#E7C687" opacity="0.6" />
      <rect x="115" y="175" width="35" height="14" rx="7" fill="#5C73A5" opacity="0.5" />
      <path
        d="M60 60c8-6 18-6 26 0M114 52c8-6 18-6 26 0"
        stroke="rgba(255,255,255,0.3)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
  // Q5: 사색
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <ellipse cx="100" cy="200" rx="50" ry="10" fill="#D9B36C" opacity="0.2" />
      <path
        d="M100 50c10 0 16 8 16 16c0 6-3 10-6 12c8 3 14 10 14 20v12H76v-12c0-10 6-17 14-20c-3-2-6-6-6-12c0-8 6-16 16-16z"
        fill="#E7C687"
        opacity="0.85"
      />
      <circle cx="100" cy="64" r="14" fill="#F0D89E" />
      <path
        d="M70 120c0 24 14 40 30 40s30-16 30-40"
        stroke="#D9B36C"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
      <path
        d="M40 80c6-10 16-16 28-16M132 64c12 0 22 6 28 16"
        stroke="rgba(255,255,255,0.2)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  ),
]

function QuizVisual({ step, total }) {
  const illustration = ILLUSTRATIONS[step] ?? ILLUSTRATIONS[0]

  return (
    <div className="quiz-visual">
      <div className="quiz-visual-bg" />
      <p className="quiz-visual-eyebrow">처마</p>
      <h2 className="quiz-visual-title">취향을 찾는 여정</h2>
      <p className="quiz-visual-desc">
        유물과의 만남, 당신만의 관람 스타일을 알아가는 시간이에요.
      </p>
      <div className="quiz-visual-art">{illustration}</div>
      <div className="quiz-visual-dots" aria-hidden="true">
        {Array.from({ length: total }).map((_, i) => (
          <span key={i} className={i === step ? 'active' : ''} />
        ))}
      </div>
    </div>
  )
}

export default QuizVisual
