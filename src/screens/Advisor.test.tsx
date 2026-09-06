import { render, screen } from '@testing-library/react-native'
import { ADVISOR_TIP } from '@/copy/howTo'
import { Advisor, advisorVisible } from '@/screens/Advisor'

describe('Advisor', () => {
  it('is visible only when unmuted and not dismissed', async () => {
    expect(advisorVisible(false, false)).toBe(true)
    expect(advisorVisible(true, false)).toBe(false)
    expect(advisorVisible(false, true)).toBe(false)
    await render(<Advisor visible onDismiss={jest.fn()} />)
    expect(screen.getByText(ADVISOR_TIP)).toBeOnTheScreen()
  })
})
