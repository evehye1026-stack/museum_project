import { useEffect, useState } from 'react'
import Papa from 'papaparse'

const TARGET_MUSEUM = '국립중앙박물관'

const HALL_THEMES = {
  '역사의 길': ['역사'],
  '선사·고대관': ['역사', '고고'],
  '중·근세관': ['역사', '왕실·금속공예'],
  '서화관': ['회화·서화'],
  '조각·공예관': ['조각·불교미술', '도자·공예'],
  '사유의 방': ['조각·불교미술'],
  '세계문화관': ['세계문화'],
}

const CARD_PALETTES = [
  ['#5C73A5', '#0078FF', '#1B2A5E'],
  ['#485A7E', '#738ABC', '#12205A'],
  ['#12205A', '#0078FF', '#5C73A5'],
  ['#1B2A5E', '#738ABC', '#485A7E'],
]

const STEP_COLORS = ['#5C73A5', '#485A7E', '#738ABC']

// react-router already decodes the URL segment before handing it to
// useParams, so this must stay a plain (non percent-encoded) string —
// otherwise ids built here never match the params read back out.
export function slugify(text) {
  return text.trim()
}

function groupConsecutiveByHall(rows) {
  const groups = []
  for (const row of rows) {
    const hall = row['전시관명']
    const last = groups[groups.length - 1]
    if (last && last.hall === hall) {
      last.rows.push(row)
    } else {
      groups.push({ hall, rows: [row] })
    }
  }
  return groups
}

function buildSteps(rows, totalMinutes) {
  const groups = groupConsecutiveByHall(rows)
  const base = Math.floor(totalMinutes / groups.length)
  const remainder = totalMinutes - base * groups.length

  return groups.map((group, i) => {
    const rooms = [...new Set(group.rows.map((r) => r['전시실명']))]
    const artifactNames = group.rows.map((r) => r['유물명'])
    return {
      order: i + 1,
      hall: group.hall,
      rooms,
      artifactCount: group.rows.length,
      artifactNames,
      time: base + (i < remainder ? 1 : 0),
      color: STEP_COLORS[i % STEP_COLORS.length],
    }
  })
}

function buildCourses(rows) {
  const byCourse = new Map()
  for (const row of rows) {
    const name = (row['추천코스명'] || '').trim()
    if (!name) continue
    if (!byCourse.has(name)) byCourse.set(name, [])
    byCourse.get(name).push(row)
  }

  return [...byCourse.entries()].map(([name, courseRows], index) => {
    const totalMinutes = Number(courseRows[0]['전체 관람 시간']) || 0
    const halls = [...new Set(courseRows.map((r) => r['전시관명']))]
    const themeTags = [
      ...new Set(halls.flatMap((h) => HALL_THEMES[h] || [])),
    ]
    const highlightArtifact = courseRows[0]?.['유물명'] || ''

    return {
      id: slugify(name),
      name,
      museum: TARGET_MUSEUM,
      totalMinutes,
      halls,
      themeTags,
      highlightArtifact,
      artifactCount: courseRows.length,
      colors: CARD_PALETTES[index % CARD_PALETTES.length],
      steps: buildSteps(courseRows, totalMinutes),
      rows: courseRows,
    }
  })
}

function buildArtifacts(rows) {
  const byName = new Map()
  for (const row of rows) {
    const name = row['유물명']
    if (!name) continue
    if (!byName.has(name)) {
      byName.set(name, {
        id: slugify(name),
        name,
        museum: TARGET_MUSEUM,
        hall: row['전시관명'],
        room: row['전시실명'],
        caseNo: row['진열장 번호'],
        courses: new Set(),
      })
    }
    byName.get(name).courses.add((row['추천코스명'] || '').trim())
  }

  return [...byName.values()]
    .map((a) => ({ ...a, courses: [...a.courses] }))
    .sort((a, b) => a.name.localeCompare(b.name, 'ko'))
}

export function useMuseumData() {
  const [rows, setRows] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    fetch('/courses.csv')
      .then((res) => res.text())
      .then((text) => {
        const clean = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
        const parsed = Papa.parse(clean, {
          header: true,
          skipEmptyLines: true,
        })
        setRows(parsed.data.filter((r) => r['박물관명'] === TARGET_MUSEUM))
      })
      .catch((err) => setError(err))
  }, [])

  const loading = rows === null && !error
  const courses = rows ? buildCourses(rows) : []
  const artifacts = rows ? buildArtifacts(rows) : []

  return { loading, error, courses, artifacts }
}
