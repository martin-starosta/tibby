import { render, screen, userEvent } from '@testing-library/react-native'
import { CASES } from '@/content/deck'
import { EXPOSED_STAMP, FINALE_LOSE, FINALE_WIN, NEW_CAREER, SOURCES } from '@/copy/sk'
import { seedFinale } from '@/game/devSeed'
import { RecapScreen } from '@/screens/RecapScreen'

describe('RecapScreen', () => {
  it('shows win copy and keeps money', async () => {
    await render(
      <RecapScreen
        run={seedFinale(49)}
        cases={CASES}
        sourcesOpen={false}
        onToggleSources={jest.fn()}
        onNewCareer={jest.fn()}
        onMenu={jest.fn()}
      />,
    )
    expect(screen.getByText(FINALE_WIN)).toBeOnTheScreen()
    expect(screen.getByText('Peniaze 80\u00A0000\u00A0€')).toBeOnTheScreen()
    expect(screen.getByText('Ochranná služba')).toBeOnTheScreen()
  })

  it('shows lose stamp, seizes money, and lists resolved sources', async () => {
    const user = userEvent.setup()
    const onToggle = jest.fn()
    await render(
      <RecapScreen
        run={seedFinale(50)}
        cases={CASES}
        sourcesOpen
        onToggleSources={onToggle}
        onNewCareer={jest.fn()}
        onMenu={jest.fn()}
      />,
    )
    expect(screen.getByText(FINALE_LOSE)).toBeOnTheScreen()
    expect(screen.getByText(EXPOSED_STAMP)).toBeOnTheScreen()
    expect(screen.getByText('Peniaze 0\u00A0€')).toBeOnTheScreen()
    expect(screen.getByText(CASES[0]!.fact.sourceUrl)).toBeOnTheScreen()
    await user.press(screen.getByRole('button', { name: SOURCES }))
    expect(onToggle).toHaveBeenCalled()
    expect(screen.getByRole('button', { name: NEW_CAREER })).toBeOnTheScreen()
  })
})
