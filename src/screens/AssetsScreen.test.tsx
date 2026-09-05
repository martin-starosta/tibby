import { render, screen } from '@testing-library/react-native'
import { AssetsScreen } from '@/screens/AssetsScreen'

describe('AssetsScreen', () => {
  it('shows empty copy when nothing is owned', async () => {
    await render(<AssetsScreen ownedIds={[]} />)
    expect(screen.getByText('Zatiaľ žiadny majetok.')).toBeOnTheScreen()
  })

  it('lists owned investment names', async () => {
    await render(<AssetsScreen ownedIds={['inv_security']} />)
    expect(screen.getByText('Ochranná služba')).toBeOnTheScreen()
    expect(screen.getByText('Tichí muži, ktorí vedia, kto sa pýta.')).toBeOnTheScreen()
  })
})
