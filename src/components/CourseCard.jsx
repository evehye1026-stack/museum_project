import { useState } from 'react'
import ArtifactItem from './ArtifactItem'

function CourseCard({ course }) {
  const [expanded, setExpanded] = useState(false)

  return (
    <li>
      <button onClick={() => setExpanded((value) => !value)}>
        {expanded ? '▼' : '▶'} {course.name} / 유물 {course.count}개 / {course.time}분
      </button>
      {expanded && (
        <ul>
          {course.artifacts.map((name, index) => (
            <ArtifactItem key={`${name}-${index}`} name={name} />
          ))}
        </ul>
      )}
    </li>
  )
}

export default CourseCard
