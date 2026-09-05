import { createInitialRun } from '@/game/reducer'
import { createRunRepository, deserializeRun, serializeRun } from '@/save/runSave'

describe('run save', () => {
  it('round-trips a run and treats garbage as a new run', async () => {
    const memory = new Map<string, string>()
    const repo = createRunRepository({
      getItem: async (key) => memory.get(key) ?? null,
      setItem: async (key, value) => {
        memory.set(key, value)
      },
    })
    const run = { ...createInitialRun(), money: 50000, risk: 20, caseIndex: 2 }
    await repo.save(run)
    expect(await repo.load()).toMatchObject({ money: 50000, risk: 20, caseIndex: 2 })
    expect(deserializeRun('not-json')).toEqual(createInitialRun())
    expect(serializeRun(run)).toContain('"schema":1')
  })
})
