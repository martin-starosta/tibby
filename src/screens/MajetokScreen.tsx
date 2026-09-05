import { useRun } from '@/save/useRun'
import { AssetsScreen } from '@/screens/AssetsScreen'

export function MajetokScreen() {
  const { run } = useRun()

  if (!run) {
    return null
  }

  return <AssetsScreen ownedIds={run.ownedInvestmentIds} />
}
