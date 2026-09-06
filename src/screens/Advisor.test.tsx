import { render, screen } from '@testing-library/react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { ADVISOR_TIP } from '@/copy/howTo'
import { Advisor, advisorVisible } from '@/screens/Advisor'

describe('Advisor', () => {
  it('is visible only when unmuted and not dismissed', async () => {
    expect(advisorVisible(false, false)).toBe(true)
    expect(advisorVisible(true, false)).toBe(false)
    expect(advisorVisible(false, true)).toBe(false)
    await render(
      <SafeAreaProvider
        initialMetrics={{
          frame: { x: 0, y: 0, width: 390, height: 844 },
          insets: { top: 0, left: 0, right: 0, bottom: 34 },
        }}
      >
        <Advisor visible onDismiss={jest.fn()} />
      </SafeAreaProvider>,
    )
    expect(screen.getByText(ADVISOR_TIP)).toBeOnTheScreen()
  })
})
