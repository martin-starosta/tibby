import { useCallback, useState } from 'react'
import { useFocusEffect } from 'expo-router'
import Storage from 'expo-sqlite/kv-store'
import type { RunState } from '@/game/reducer'
import { createRunRepository } from '@/save/runSave'

const repo = createRunRepository(Storage)

/** Reloads the saved run every time the tab gains focus, so a change made on
 *  one tab (a pending event, a purchase) is visible on the others. */
export function useRun() {
  const [run, setRun] = useState<RunState | null>(null)

  useFocusEffect(
    useCallback(() => {
      let cancelled = false
      repo.load().then((loaded) => {
        if (!cancelled) {
          setRun(loaded)
        }
      })
      return () => {
        cancelled = true
      }
    }, []),
  )

  const update = useCallback(async (next: RunState) => {
    setRun(next)
    await repo.save(next)
  }, [])

  return { run, update }
}
