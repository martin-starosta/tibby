import { useEffect, useState } from 'react'
import Storage from '@/save/kvStore'
import type { CareerState } from '@/career/career'
import { createCareerRepository } from '@/save/careerSave'
import { AchievementsScreen } from '@/screens/AchievementsScreen'

const repo = createCareerRepository(Storage)

export default function AchievementyRoute() {
  const [career, setCareer] = useState<CareerState | null>(null)
  useEffect(() => {
    repo.load().then(setCareer)
  }, [])
  if (!career) {
    return null
  }
  return <AchievementsScreen career={career} />
}
