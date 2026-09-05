import type { RunState } from '@/game/reducer'
import { createInitialRun } from '@/game/reducer'

export const RUN_STORAGE_KEY = 'ocistec.run.v1'

export type RunStorage = {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
}

export function serializeRun(state: RunState): string {
  return JSON.stringify(state)
}

export function deserializeRun(raw: string | null): RunState {
  if (!raw) {
    return createInitialRun()
  }
  try {
    const parsed = JSON.parse(raw) as Partial<RunState>
    if (parsed.schema !== 1 || typeof parsed.caseIndex !== 'number') {
      return createInitialRun()
    }
    return { ...createInitialRun(), ...parsed, schema: 1 }
  } catch {
    return createInitialRun()
  }
}

export function createRunRepository(storage: RunStorage) {
  return {
    async load() {
      return deserializeRun(await storage.getItem(RUN_STORAGE_KEY))
    },
    async save(state: RunState) {
      await storage.setItem(RUN_STORAGE_KEY, serializeRun(state))
    },
  }
}
