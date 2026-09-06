import { render, screen, userEvent } from '@testing-library/react-native'
import { BootGate } from '@/screens/BootGate'
import { CONTINUE, START_GAME, TITLE_LOCKUP, DISCLAIMER_TEXT } from '@/copy/sk'
import { AGE_CONFIRM, AGE_GATE_COPY } from '@/screens/AgeGateScreen'
import { createAgeStore } from '@/onboarding/ageStore'
import { createDisclaimerStore } from '@/onboarding/disclaimerStore'

function memoryPair() {
  const memory = new Map<string, string>()
  const kv = {
    getItem: async (key: string) => memory.get(key) ?? null,
    setItem: async (key: string, value: string) => {
      memory.set(key, value)
    },
  }
  return { store: createDisclaimerStore(kv), ageStore: createAgeStore(kv) }
}

describe('BootGate', () => {
  it('blocks ZAČAŤ HRU until age and disclaimer are confirmed', async () => {
    const user = userEvent.setup()
    const onStartGame = jest.fn()
    await render(<BootGate {...memoryPair()} onStartGame={onStartGame} />)

    expect(await screen.findByText(AGE_GATE_COPY)).toBeOnTheScreen()
    expect(screen.queryByRole('button', { name: START_GAME })).toBeNull()
    await user.press(screen.getByRole('button', { name: AGE_CONFIRM }))
    expect(await screen.findByText(DISCLAIMER_TEXT)).toBeOnTheScreen()
    await user.press(screen.getByRole('button', { name: CONTINUE }))
    expect(await screen.findByText(TITLE_LOCKUP)).toBeOnTheScreen()
  })

  it('starts the hub from the title', async () => {
    const user = userEvent.setup()
    const onStartGame = jest.fn()
    const pair = memoryPair()
    await pair.ageStore.confirm()
    await pair.store.acknowledge()
    await render(<BootGate {...pair} onStartGame={onStartGame} />)

    await user.press(await screen.findByRole('button', { name: START_GAME }))
    expect(onStartGame).toHaveBeenCalledTimes(1)
  })
})
