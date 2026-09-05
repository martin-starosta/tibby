import { render, screen, userEvent } from '@testing-library/react-native'
import { BootGate } from '@/screens/BootGate'
import { CONTINUE, START_GAME, TITLE_LOCKUP, DISCLAIMER_TEXT } from '@/copy/sk'
import { createDisclaimerStore } from '@/onboarding/disclaimerStore'

function memoryStore() {
  const memory = new Map<string, string>()
  return createDisclaimerStore({
    getItem: async (key) => memory.get(key) ?? null,
    setItem: async (key, value) => {
      memory.set(key, value)
    },
  })
}

describe('BootGate', () => {
  it('shows the disclaimer until it is acknowledged, then the title', async () => {
    const user = userEvent.setup()
    const onStartGame = jest.fn()
    await render(<BootGate store={memoryStore()} onStartGame={onStartGame} />)

    expect(await screen.findByText(DISCLAIMER_TEXT)).toBeOnTheScreen()
    await user.press(screen.getByRole('button', { name: CONTINUE }))
    expect(await screen.findByText(TITLE_LOCKUP)).toBeOnTheScreen()
    expect(screen.queryByText(DISCLAIMER_TEXT)).toBeNull()
  })

  it('starts the hub from the title', async () => {
    const user = userEvent.setup()
    const onStartGame = jest.fn()
    const store = memoryStore()
    await store.acknowledge()
    await render(<BootGate store={store} onStartGame={onStartGame} />)

    await user.press(await screen.findByRole('button', { name: START_GAME }))
    expect(onStartGame).toHaveBeenCalledTimes(1)
  })
})
