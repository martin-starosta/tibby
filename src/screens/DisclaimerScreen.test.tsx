import { render, screen, userEvent } from '@testing-library/react-native'
import { DisclaimerScreen } from '@/screens/DisclaimerScreen'
import { DISCLAIMER_TEXT, CONTINUE } from '@/copy/sk'

describe('DisclaimerScreen', () => {
  it('renders the canonical disclaimer and continues on press', async () => {
    const user = userEvent.setup()
    const onContinue = jest.fn()
    await render(<DisclaimerScreen onContinue={onContinue} />)

    expect(screen.getByText(DISCLAIMER_TEXT)).toBeOnTheScreen()
    await user.press(screen.getByRole('button', { name: CONTINUE }))
    expect(onContinue).toHaveBeenCalledTimes(1)
  })
})
