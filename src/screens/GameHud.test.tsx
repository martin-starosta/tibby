import { render, screen, userEvent } from '@testing-library/react-native'
import { GameHud } from '@/screens/GameHud'

describe('GameHud', () => {
  it('tapping the risk chip opens Quick Cover and + opens the gauge', async () => {
    const user = userEvent.setup()
    const onPressRisk = jest.fn()
    const onLongPressRisk = jest.fn()
    await render(
      <GameHud
        money={80000}
        risk={80}
        onPressRisk={onPressRisk}
        onLongPressRisk={onLongPressRisk}
      />,
    )

    await user.press(screen.getByRole('button', { name: 'RIZIKO 80%' }))
    expect(onPressRisk).toHaveBeenCalledTimes(1)
    expect(onLongPressRisk).not.toHaveBeenCalled()

    await user.press(screen.getByRole('button', { name: '+' }))
    expect(onLongPressRisk).toHaveBeenCalledTimes(1)
  })
})
