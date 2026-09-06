const memory = new Map<string, string>()

function read(key: string): string | null {
  try {
    if (typeof localStorage !== 'undefined') {
      return localStorage.getItem(key)
    }
  } catch {
    // private mode / blocked storage
  }
  return memory.get(key) ?? null
}

function write(key: string, value: string): void {
  memory.set(key, value)
  try {
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem(key, value)
    }
  } catch {
    // keep in-memory fallback
  }
}

/** Web Metro cannot load expo-sqlite’s wasm worker; localStorage mirrors the same API. */
const Storage = {
  getItem(key: string): Promise<string | null> {
    return Promise.resolve(read(key))
  },
  setItem(key: string, value: string): Promise<void> {
    write(key, value)
    return Promise.resolve()
  },
  removeItem(key: string): Promise<void> {
    memory.delete(key)
    try {
      if (typeof localStorage !== 'undefined') {
        localStorage.removeItem(key)
      }
    } catch {
      // ignore
    }
    return Promise.resolve()
  },
}

export default Storage
