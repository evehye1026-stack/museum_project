import { useState } from 'react'
import CourseCard from '../components/CourseCard'
import QuizVisual from '../components/QuizVisual'
import { QUESTIONS, scoreResult } from '../data/quizData'
import { useMuseumData } from '../hooks/useMuseumData'
import { recommendCourses } from '../utils/recommend'
import '../styles/layout.css'
import '../components/QuizVisual.css'
import './ForYouPage.css'

function ForYouPage() {
  const { loading, courses } = useMuseumData()
  const [step, setStep] = useState(0)
  const [answers, setAnswers] = useState([])

  const isResult = step >= QUESTIONS.length

  function handleAnswer(type) {
    setAnswers((prev) => [...prev, type])
    setStep((prev) => prev + 1)
  }

  function handleRestart() {
    setAnswers([])
    setStep(0)
  }

  if (loading) {
    return (
      <section className="page">
        <div className="page-inner">
          <p style={{ color: 'var(--text-muted)' }}>코스 정보를 불러오는 중...</p>
        </div>
      </section>
    )
  }

  if (!isResult) {
    const question = QUESTIONS[step]
    const progress = Math.round((step / QUESTIONS.length) * 100)

    return (
      <section className="page">
        <div className="page-inner">
          <div className="quiz-layout">
            <QuizVisual step={step} total={QUESTIONS.length} />

            <div className="quiz-panel">
              <h1 className="quiz-panel-title">취향 코스 찾기</h1>
              <p className="quiz-panel-subtitle">
                질문 5개로 나에게 맞는 코스를 찾아드려요.
              </p>

              <div className="quiz-card">
                <div className="quiz-progress">
                  <div className="quiz-progress-bar" style={{ width: `${progress}%` }} />
                </div>
                <p className="quiz-step-label">
                  {step + 1} / {QUESTIONS.length}
                </p>
                <h3 className="quiz-question">{question.text}</h3>
                <div className="quiz-options">
                  {question.options.map((option) => (
                    <button
                      key={option.label}
                      type="button"
                      className="quiz-option"
                      onClick={() => handleAnswer(option.type)}
                    >
                      {option.label}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

  const result = scoreResult(answers)
  const recommended = recommendCourses(courses, { themes: [result.field] }).slice(0, 5)

  return (
    <section className="page">
      <div className="page-inner">
        <div className="quiz-result-header">
          <p className="quiz-result-eyebrow">당신의 취향 유형은</p>
          <h1 className="quiz-result-name">{result.name}</h1>
          <p className="quiz-result-field">#{result.field}</p>
          <p className="quiz-result-desc">{result.desc}</p>
          <button type="button" className="quiz-restart" onClick={handleRestart}>
            다시 하기
          </button>
        </div>

        {recommended.length > 0 && (
          <>
            <h3 className="section-title">이런 코스는 어떠세요?</h3>
            <div className="card-grid">
              {recommended.map((course) => (
                <CourseCard key={course.id} course={course} />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default ForYouPage
