import { useEffect, useState } from 'react'
import Papa from 'papaparse'
import MuseumSelector from './components/MuseumSelector'
import CourseCard from './components/CourseCard'

function App() {
  const [rows, setRows] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedMuseum, setSelectedMuseum] = useState(null)

  useEffect(() => {
    fetch('/courses.csv')
      .then((res) => res.text())
      .then((text) => {
        const clean = text.charCodeAt(0) === 0xfeff ? text.slice(1) : text
        const parsed = Papa.parse(clean, {
          header: true,
          skipEmptyLines: true,
        })
        setRows(parsed.data)
        setLoading(false)
      })
  }, [])

  if (loading) {
    return <p>불러오는 중...</p>
  }

  const museums = [...new Set(rows.map((row) => row['박물관명']))]

  const museumRows = rows.filter((row) => row['박물관명'] === selectedMuseum)

  const courseMap = {}
  for (const row of museumRows) {
    const courseName = row['추천코스명']
    if (!courseMap[courseName]) {
      courseMap[courseName] = {
        name: courseName,
        time: row['전체 관람 시간'],
        count: 0,
      }
    }
    courseMap[courseName].count += 1
  }
  const courses = Object.values(courseMap)

  return (
    <div>
      <h1>박물관 코스 요약</h1>

      <MuseumSelector
        museums={museums}
        selectedMuseum={selectedMuseum}
        onSelect={setSelectedMuseum}
      />

      {selectedMuseum && (
        <div>
          <h2>{selectedMuseum}</h2>
          <ul>
            {courses.map((course) => (
              <CourseCard key={course.name} course={course} />
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}

export default App
