import { render, screen, userEvent } from '@testing-library/react-native'
import { INVESTMENTS } from '@/content/investments'
import { ShopScreen } from '@/screens/ShopScreen'

describe('ShopScreen', () => {
  it('lists all five items and filters by category chips', async () => {
    const user = userEvent.setup()
    await render(
      <ShopScreen money={400000} ownedIds={[]} onBuy={jest.fn()} />,
    )

    for (const item of INVESTMENTS) {
      expect(screen.getByText(item.name)).toBeOnTheScreen()
    }

    await user.press(screen.getByRole('button', { name: 'Zisk' }))
    expect(screen.getByText('Firma na pranie špinavých peňazí')).toBeOnTheScreen()
    expect(screen.queryByText('Vlastné médium')).toBeNull()
  })

  it('buys an affordable item once and disables unaffordable or owned rows', async () => {
    const user = userEvent.setup()
    const onBuy = jest.fn()
    await render(
      <ShopScreen money={50000} ownedIds={['inv_laundry']} onBuy={onBuy} />,
    )

    await user.press(screen.getByRole('button', { name: 'Ochranná služba' }))
    expect(onBuy).toHaveBeenCalledWith('inv_security')

    onBuy.mockClear()
    await user.press(screen.getByRole('button', { name: 'Firma na pranie špinavých peňazí' }))
    expect(onBuy).not.toHaveBeenCalled()

    await user.press(screen.getByRole('button', { name: 'Vlastné médium' }))
    expect(onBuy).not.toHaveBeenCalled()
  })
})
