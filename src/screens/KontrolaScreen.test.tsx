import { render, screen, userEvent } from '@testing-library/react-native'
import {
  CONTINUE,
  EXPOSED_BODY,
  EXPOSED_STAMP,
  KONTROLA_TITLE,
  MENU,
  NEW_CAREER,
  SURVIVED,
} from '@/copy/sk'
import { KontrolaScreen } from '@/screens/KontrolaScreen'

describe('KontrolaScreen', () => {
  it('shows survive copy and returns to the hub', async () => {
    const user = userEvent.setup()
    const onContinue = jest.fn()
    await render(
      <KontrolaScreen status="checkpoint" risk={100} onContinue={onContinue} onNewCareer={jest.fn()} onMenu={jest.fn()} />,
    )
    expect(screen.getByText(KONTROLA_TITLE)).toBeOnTheScreen()
    expect(screen.getByText(SURVIVED)).toBeOnTheScreen()
    await user.press(screen.getByRole('button', { name: CONTINUE }))
    expect(onContinue).toHaveBeenCalledTimes(1)
  })

  it('stamps ODHALENÝ and offers a new career when exposed', async () => {
    const user = userEvent.setup()
    const onNewCareer = jest.fn()
    const onMenu = jest.fn()
    await render(
      <KontrolaScreen
        status="exposed"
        risk={101}
        onContinue={jest.fn()}
        onNewCareer={onNewCareer}
        onMenu={onMenu}
      />,
    )
    expect(screen.getByText(EXPOSED_STAMP)).toBeOnTheScreen()
    expect(screen.getByText(EXPOSED_BODY)).toBeOnTheScreen()
    await user.press(screen.getByRole('button', { name: NEW_CAREER }))
    expect(onNewCareer).toHaveBeenCalledTimes(1)
    await user.press(screen.getByRole('button', { name: MENU }))
    expect(onMenu).toHaveBeenCalledTimes(1)
  })
})
