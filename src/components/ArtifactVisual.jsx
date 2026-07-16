function ArtifactVisual({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 100 130"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <ellipse cx="50" cy="118" rx="34" ry="8" fill="#D9B36C" opacity="0.25" />
      <path
        d="M50 8c9 0 15 7 15 15c0 6-3 10-6 12c8 3 14 10 14 20v10H27v-10c0-10 6-17 14-20c-3-2-6-6-6-12c0-8 6-15 15-15z"
        fill="#E7C687"
      />
      <circle cx="50" cy="23" r="13" fill="#F0D89E" />
      <path
        d="M20 68c0 22 12 38 30 38s30-16 30-38"
        stroke="#D9B36C"
        strokeWidth="2"
        fill="none"
        opacity="0.6"
      />
      <path
        d="M32 70c4 10 4 20 -2 28"
        stroke="#C9A45A"
        strokeWidth="2"
        fill="none"
        opacity="0.5"
      />
    </svg>
  )
}

export default ArtifactVisual
