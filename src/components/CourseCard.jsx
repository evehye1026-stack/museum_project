function CourseCard({ course }) {
  return (
    <li>
      {course.name} / 유물 {course.count}개 / {course.time}분
    </li>
  )
}

export default CourseCard
