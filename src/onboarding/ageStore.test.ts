import { createAgeStore } from '@/onboarding/ageStore'

describe('age store', () => {
  it('persists 16+ confirmation', async () => {
    const memory = new Map<string, string>()
    const store = createAgeStore({
      getItem: async (key) => memory.get(key) ?? null,
      setItem: async (key, value) => {
        memory.set(key, value)
      },
    })
    expect(await store.hasConfirmed()).toBe(false)
    await store.confirm()
    expect(await store.hasConfirmed()).toBe(true)
  })
})
