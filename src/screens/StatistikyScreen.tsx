import { useEffect, useState } from 'react'
import { router, type Href } from 'expo-router'
import Storage from '@/save/kvStore'
import type { CareerState } from '@/career/career'
import { createCareerRepository } from '@/save/careerSave'
import { CareerScreen } from '@/screens/CareerScreen'

const repo = createCareerRepository(Storage)

export function StatistikyScreen() {
  const [career, setCareer] = useState<CareerState | null>(null)
  useEffect(() => {
    repo.load().then(setCareer)
  }, [])
  if (!career) {
    return null
  }
  return (
    <CareerScreen
      career={career}
      onLeaderboards={() => router.push('/rebricky' as Href)}
      onAchievements={() => router.push('/achievementy' as Href)}
    />
  )
}
