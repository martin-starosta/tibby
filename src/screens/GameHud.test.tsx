import { render, screen, userEvent } from '@testing-library/react-native'
import { GameHud } from '@/screens/GameHud'

describe('GameHud', () => {
  it('tapping the risk chip opens Quick Cover', async () => {
    const user = userEvent.setup()
    const onPressRisk = jest.fn()
    await render(<GameHud money={80000} risk={80} onPressRisk={onPressRisk} />)

    await user.press(screen.getByRole('button', { name: 'RIZIKO 80%' }))
    expect(onPressRisk).toHaveBeenCalledTimes(1)
  })
})
