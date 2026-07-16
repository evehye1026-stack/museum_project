export const TIME_OPTIONS = [
  { id: 'short', label: '30~45분', test: (min) => min <= 45 },
  { id: 'medium', label: '46~70분', test: (min) => min > 45 && min <= 70 },
  { id: 'long', label: '70분 이상', test: (min) => min > 70 },
]

export function recommendCourses(courses, { themes = [], timeId = null } = {}) {
  const timeOption = TIME_OPTIONS.find((t) => t.id === timeId)
  // 관람 시간은 하드 필터: 사용자가 고른 시간대를 벗어난 코스는 추천하지 않는다.
  // 테마는 그 안에서의 우선순위(정렬 기준)로만 사용한다.
  const pool = timeOption ? courses.filter((c) => timeOption.test(c.totalMinutes)) : courses

  return [...pool]
    .map((course) => ({
      course,
      themeMatch: themes.length
        ? course.themeTags.filter((t) => themes.includes(t)).length
        : 0,
    }))
    .sort((a, b) => b.themeMatch - a.themeMatch)
    .map((r) => r.course)
}
