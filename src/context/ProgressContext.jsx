import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { getDeviceId } from '../utils/deviceId'

const ProgressContext = createContext(null)

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({})

  useEffect(() => {
    let active = true

    supabase
      .from('course_progress')
      .select('course_id, step_order')
      .eq('device_id', getDeviceId())
      .then(({ data, error }) => {
        if (!active || error) {
          if (error) console.error('진도를 불러오지 못했습니다', error)
          return
        }
        const next = {}
        for (const row of data) {
          if (!next[row.course_id]) next[row.course_id] = []
          next[row.course_id].push(row.step_order)
        }
        setProgress(next)
      })

    return () => {
      active = false
    }
  }, [])

  const isStepDone = useCallback(
    (courseId, stepOrder) => progress[courseId]?.includes(stepOrder) ?? false,
    [progress],
  )

  const toggleStep = useCallback(
    (courseId, stepOrder) => {
      const done = progress[courseId]?.includes(stepOrder) ?? false

      setProgress((prev) => {
        const list = prev[courseId] ?? []
        const next = done ? list.filter((o) => o !== stepOrder) : [...list, stepOrder]
        return { ...prev, [courseId]: next }
      })

      const deviceId = getDeviceId()
      const query = done
        ? supabase
            .from('course_progress')
            .delete()
            .match({ device_id: deviceId, course_id: courseId, step_order: stepOrder })
        : supabase
            .from('course_progress')
            .insert({ device_id: deviceId, course_id: courseId, step_order: stepOrder })

      query.then(({ error }) => error && console.error('진도 동기화 실패', error))
    },
    [progress],
  )

  const getDoneCount = useCallback(
    (courseId) => progress[courseId]?.length ?? 0,
    [progress],
  )

  return (
    <ProgressContext.Provider value={{ isStepDone, toggleStep, getDoneCount }}>
      {children}
    </ProgressContext.Provider>
  )
}

export function useProgress() {
  const ctx = useContext(ProgressContext)
  if (!ctx) throw new Error('useProgress must be used within ProgressProvider')
  return ctx
}
