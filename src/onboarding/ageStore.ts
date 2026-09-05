export const AGE_STORAGE_KEY = 'ocistec.age.confirmed'

export function createAgeStore(storage: {
  getItem: (key: string) => Promise<string | null>
  setItem: (key: string, value: string) => Promise<void>
}) {
  return {
    async hasConfirmed() {
      return (await storage.getItem(AGE_STORAGE_KEY)) === '1'
    },
    async confirm() {
      await storage.setItem(AGE_STORAGE_KEY, '1')
    },
  }
}
