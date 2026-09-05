import { render, screen, userEvent } from '@testing-library/react-native'
import { QuickCoverSheet } from '@/screens/QuickCoverSheet'

describe('QuickCoverSheet', () => {
  it('shows five rows and disables unaffordable ones with the missing amount', async () => {
    const user = userEvent.setup()
    const onPick = jest.fn()
    const onClose = jest.fn()
    await render(<QuickCoverSheet money={80000} onPick={onPick} onClose={onClose} />)

    expect(screen.getByText('Politické krytie')).toBeOnTheScreen()
    expect(screen.getByText('Zastrašenie novinárov')).toBeOnTheScreen()
    expect(screen.getByText('Úplatok prokurátorovi')).toBeOnTheScreen()
    expect(screen.getByText('Falošné alibi')).toBeOnTheScreen()
    expect(screen.getByText('Zničenie dôkazov')).toBeOnTheScreen()
    expect(screen.getByText('Chýba €20,000')).toBeOnTheScreen()

    await user.press(screen.getByRole('button', { name: 'Politické krytie' }))
    expect(onPick).toHaveBeenCalledWith('cover_political')
    expect(onClose).toHaveBeenCalledTimes(1)
  })

  it('does not pick an unaffordable row', async () => {
    const user = userEvent.setup()
    const onPick = jest.fn()
    await render(<QuickCoverSheet money={80000} onPick={onPick} onClose={jest.fn()} />)

    await user.press(screen.getByRole('button', { name: 'Úplatok prokurátorovi' }))
    expect(onPick).not.toHaveBeenCalled()
  })
})
