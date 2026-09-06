import { createSettingsStore, deserializeSettings, DEFAULT_SETTINGS } from '@/settings/settingsStore'

describe('settings store', () => {
  it('round-trips all five toggles', async () => {
    const memory = new Map<string, string>()
    const store = createSettingsStore({
      getItem: async (key) => memory.get(key) ?? null,
      setItem: async (key, value) => {
        memory.set(key, value)
      },
    })
    const next = {
      sfx: false,
      haptics: false,
      reduceMotion: true,
      textScale: 2,
      advisorMuted: true,
    }
    await store.save(next)
    expect(await store.load()).toEqual(next)
    expect(deserializeSettings(null)).toEqual(DEFAULT_SETTINGS)
  })
})
