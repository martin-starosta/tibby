export type SettingsState = {
  sfx: boolean
  haptics: boolean
  reduceMotion: boolean
  textScale: number
  advisorMuted: boolean
}

export const DEFAULT_SETTINGS: SettingsState = {
  sfx: true,
  haptics: true,
  reduceMotion: false,
  textScale: 1,
  advisorMuted: false,
}

export const SETTINGS_STORAGE_KEY = 'ocistec.settings.v1'

export function deserializeSettings(raw: string | null): SettingsState {
  if (!raw) {
    return { ...DEFAULT_SETTINGS }
  }
  try {
    const parsed = JSON.parse(raw) as Partial<SettingsState>
    return { ...DEFAULT_SETTINGS, ...parsed }
  } catch {
    return { ...DEFAULT_SETTINGS }
  }
}

export function createSettingsStore(storage: {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
}) {
  return {
    async load() {
      return deserializeSettings(await storage.getItem(SETTINGS_STORAGE_KEY))
    },
    async save(state: SettingsState) {
      await storage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(state))
    },
  }
}
