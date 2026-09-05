export const DISCLAIMER_STORAGE_KEY = 'ocistec.disclaimer.acknowledged'

export type KeyValueStore = {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
}

export function createDisclaimerStore(storage: KeyValueStore) {
  return {
    async hasAcknowledged() {
      return (await storage.getItem(DISCLAIMER_STORAGE_KEY)) === '1'
    },
    async acknowledge() {
      await storage.setItem(DISCLAIMER_STORAGE_KEY, '1')
    },
  }
}
