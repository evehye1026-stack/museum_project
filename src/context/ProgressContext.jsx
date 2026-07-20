import { createContext, useCallback, useContext, useEffect, useState } from 'react'

const STORAGE_KEY = 'godam-progress'
const ProgressContext = createContext(null)

function loadInitial() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return {}
    const parsed = JSON.parse(raw)
    return parsed && typeof parsed === 'object' ? parsed : {}
  } catch {
    return {}
  }
}

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState(loadInitial)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress))
  }, [progress])

  const isStepDone = useCallback(
    (courseId, stepOrder) => progress[courseId]?.includes(stepOrder) ?? false,
    [progress],
  )

  const toggleStep = useCallback((courseId, stepOrder) => {
    setProgress((prev) => {
      const done = prev[courseId] ?? []
      const next = done.includes(stepOrder)
        ? done.filter((o) => o !== stepOrder)
        : [...done, stepOrder]
      return { ...prev, [courseId]: next }
    })
  }, [])

  const getDoneCount = useCallback(
    (courseId) => progress[courseId]?.length ?? 0,
    [progress],
  )

  return (
    <ProgressContext.Provider value={{ progress, isStepDone, toggleStep, getDoneCount }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
