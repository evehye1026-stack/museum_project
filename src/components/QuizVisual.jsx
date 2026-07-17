// 고담(古談=옛이야기) 컨셉에 맞춰, 펼쳐진 두루마리 책을 모든 일러스트가 공유하는 이야기 모티프로 사용한다.
function TaleBook({ opacity = 0.55 }) {
  const stroke = `rgba(255,255,255,${opacity})`
  return (
    <g>
      <ellipse cx="100" cy="220" rx="66" ry="9" fill="#D9B36C" opacity="0.16" />
      <path
        d="M100 172c-16-9-40-11-58-6c-4 1.2-6 4-6 7.5v32c0 4 3 6.4 7 5.3c17-5 40-3.6 57 5.7z"
        fill="rgba(255,255,255,0.14)"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <path
        d="M100 172c16-9 40-11 58-6c4 1.2 6 4 6 7.5v32c0 4-3 6.4-7 5.3c-17-5-40-3.6-57 5.7z"
        fill="rgba(255,255,255,0.14)"
        stroke={stroke}
        strokeWidth="1.2"
      />
      <line x1="100" y1="172" x2="100" y2="216" stroke={stroke} strokeWidth="1.5" />
      <path d="M44 182c13-4 27-4 39 0M44 192c13-4 27-4 39 0M44 202c13-4 27-4 39 0" stroke={stroke} strokeWidth="1" opacity="0.75" />
      <path d="M117 182c12-4 26-4 38 0M117 192c12-4 26-4 38 0M117 202c12-4 26-4 38 0" stroke={stroke} strokeWidth="1" opacity="0.75" />
    </g>
  )
}

const ILLUSTRATIONS = [
  // Q1: 박물관 입장 — 이야기책 위로 열리는 박물관 대문
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <TaleBook />
      <path d="M50 62C50 36 150 36 150 62" stroke="rgba(255,255,255,0.5)" strokeWidth="2" fill="none" strokeLinecap="round" />
      <rect x="46" y="62" width="9" height="102" rx="2" fill="rgba(255,255,255,0.2)" />
      <rect x="145" y="62" width="9" height="102" rx="2" fill="rgba(255,255,255,0.2)" />
      <ellipse cx="76" cy="118" rx="12" ry="16" fill="#E7C687" opacity="0.9" />
      <ellipse cx="124" cy="118" rx="12" ry="16" fill="#C9D4E8" opacity="0.85" />
    </svg>
  ),
  // Q2: 대화 — 이야기책을 사이에 두고 마주 앉은 두 사람
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <TaleBook />
      <path d="M46 168c0-21 9-36 18-36s18 15 18 36z" fill="rgba(255,255,255,0.16)" />
      <circle cx="64" cy="118" r="11" fill="rgba(255,255,255,0.55)" />
      <path d="M118 168c0-21 9-36 18-36s18 15 18 36z" fill="rgba(255,255,255,0.16)" />
      <circle cx="136" cy="118" r="11" fill="rgba(255,255,255,0.55)" />
      <rect x="92" y="147" width="16" height="16" rx="3" fill="#E7C687" opacity="0.85" transform="rotate(45 100 155)" />
      <circle cx="82" cy="88" r="3" fill="rgba(255,255,255,0.55)" />
      <circle cx="92" cy="82" r="2.4" fill="rgba(255,255,255,0.4)" />
      <circle cx="118" cy="88" r="3" fill="rgba(255,255,255,0.55)" />
    </svg>
  ),
  // Q3: 여행 — 이야기책에서 시작해 여러 곳을 거쳐 온 여정의 길
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <TaleBook />
      <g transform="translate(14 20) scale(0.32)" opacity="0.55">
        <TaleBook />
      </g>
      <g transform="translate(126 8) scale(0.24)" opacity="0.6">
        <TaleBook />
      </g>
      <path
        d="M28 150c26-24 50-30 72-18s48 26 72 6"
        stroke="rgba(255,255,255,0.35)"
        strokeWidth="2"
        fill="none"
        strokeDasharray="4 5"
        strokeLinecap="round"
      />
      <circle cx="52" cy="140" r="5" fill="#E7C687" />
      <circle cx="100" cy="128" r="5" fill="rgba(255,255,255,0.55)" />
      <circle cx="150" cy="132" r="5" fill="rgba(255,255,255,0.55)" />
    </svg>
  ),
  // Q4: 색과 질감 — 이야기책 위에 펼쳐 놓은 색과 질감
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <TaleBook />
      <circle cx="66" cy="96" r="26" fill="#485A7E" opacity="0.6" />
      <circle cx="112" cy="88" r="23" fill="#E7C687" opacity="0.7" />
      <circle cx="94" cy="130" r="21" fill="#C9A45A" opacity="0.5" />
      <rect x="50" y="152" width="100" height="14" rx="7" fill="rgba(255,255,255,0.1)" />
      <rect x="50" y="152" width="35" height="14" rx="7" fill="#12205A" opacity="0.5" />
      <rect x="85" y="152" width="30" height="14" rx="7" fill="#E7C687" opacity="0.6" />
      <rect x="115" y="152" width="35" height="14" rx="7" fill="#5C73A5" opacity="0.5" />
    </svg>
  ),
  // Q5: 사색 — 이야기책 위에 고요히 앉은 사유의 모습
  (
    <svg viewBox="0 0 200 240" fill="none" aria-hidden="true">
      <TaleBook />
      <path
        d="M100 84c10 0 16 8 16 16c0 6-3 10-6 12c8 3 14 10 14 20v22H76v-22c0-10 6-17 14-20c-3-2-6-6-6-12c0-8 6-16 16-16z"
        fill="#E7C687"
        opacity="0.85"
      />
      <circle cx="100" cy="98" r="13" fill="#F0D89E" />
      <path
        d="M72 152c0 22 13 37 28 37s28-15 28-37"
        stroke="#D9B36C"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
    </svg>
  ),
]

function QuizVisual({ step, total }) {
  const illustration = ILLUSTRATIONS[step] ?? ILLUSTRATIONS[0]

  return (
    <div className="quiz-visual">
      <div className="quiz-visual-bg" />
      <p className="quiz-visual-eyebrow">고담</p>
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
