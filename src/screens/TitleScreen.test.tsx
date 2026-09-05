import { render, screen, userEvent } from '@testing-library/react-native'
import { TitleScreen } from '@/screens/TitleScreen'
import {
  TITLE_LOCKUP,
  TAGLINE,
  START_GAME,
  SETTINGS,
  LEADERBOARDS,
  ACHIEVEMENTS,
} from '@/copy/sk'

describe('TitleScreen', () => {
  it('shows lockup, tagline, start, and secondary actions', async () => {
    const user = userEvent.setup()
    const onStart = jest.fn()
    await render(<TitleScreen onStartGame={onStart} />)

    expect(screen.getByText(TITLE_LOCKUP)).toBeOnTheScreen()
    expect(screen.getByText(TAGLINE)).toBeOnTheScreen()
    expect(screen.getByRole('button', { name: SETTINGS })).toBeOnTheScreen()
    expect(screen.getByRole('button', { name: LEADERBOARDS })).toBeOnTheScreen()
    expect(screen.getByRole('button', { name: ACHIEVEMENTS })).toBeOnTheScreen()

    await user.press(screen.getByRole('button', { name: START_GAME }))
    expect(onStart).toHaveBeenCalledTimes(1)
  })
})
