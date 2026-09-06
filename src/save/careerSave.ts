import { createInitialCareer, type CareerState } from '@/career/career'

export const CAREER_STORAGE_KEY = 'ocistec.career.v1'

export type CareerStorage = {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
}

export function deserializeCareer(raw: string | null): CareerState {
  if (!raw) {
    return createInitialCareer()
  }
  try {
    const parsed = JSON.parse(raw) as Partial<CareerState>
    if (parsed.schema !== 1) {
      return createInitialCareer()
    }
    return { ...createInitialCareer(), ...parsed, schema: 1 }
  } catch {
    return createInitialCareer()
  }
}

export function createCareerRepository(storage: CareerStorage) {
  return {
    async load() {
      return deserializeCareer(await storage.getItem(CAREER_STORAGE_KEY))
    },
    async save(state: CareerState) {
      await storage.setItem(CAREER_STORAGE_KEY, JSON.stringify(state))
    },
  }
}
