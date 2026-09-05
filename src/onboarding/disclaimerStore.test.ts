import {
  DISCLAIMER_STORAGE_KEY,
  createDisclaimerStore,
} from '@/onboarding/disclaimerStore'

describe('disclaimer store', () => {
  it('starts unseen and persists acknowledgement', async () => {
    const memory = new Map<string, string>()
    const store = createDisclaimerStore({
      getItem: async (key) => memory.get(key) ?? null,
      setItem: async (key, value) => {
        memory.set(key, value)
      },
    })

    expect(await store.hasAcknowledged()).toBe(false)
    await store.acknowledge()
    expect(await store.hasAcknowledged()).toBe(true)
    expect(memory.get(DISCLAIMER_STORAGE_KEY)).toBe('1')
  })
})
