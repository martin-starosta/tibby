import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import type { RunState } from '@/game/reducer'
import { createRunRepository } from '@/save/runSave'
import { AssetsScreen } from '@/screens/AssetsScreen'

const repo = createRunRepository(AsyncStorage)

export function MajetokScreen() {
  const [run, setRun] = useState<RunState | null>(null)

  useEffect(() => {
    repo.load().then(setRun)
  }, [])

  if (!run) {
    return null
  }

  return <AssetsScreen ownedIds={run.ownedInvestmentIds} />
}
