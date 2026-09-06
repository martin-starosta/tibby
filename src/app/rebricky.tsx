import { useEffect, useState } from 'react'
import Storage from '@/save/kvStore'
import type { CareerState } from '@/career/career'
import { createCareerRepository } from '@/save/careerSave'
import { LeaderboardsScreen } from '@/screens/LeaderboardsScreen'

const repo = createCareerRepository(Storage)

export default function RebrickyRoute() {
  const [career, setCareer] = useState<CareerState | null>(null)
  useEffect(() => {
    repo.load().then(setCareer)
  }, [])
  if (!career) {
    return null
  }
  return <LeaderboardsScreen career={career} />
}
