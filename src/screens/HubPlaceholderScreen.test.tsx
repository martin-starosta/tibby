import { render, screen } from '@testing-library/react-native'
import { HubPlaceholderScreen } from '@/screens/HubPlaceholderScreen'

describe('HubPlaceholderScreen', () => {
  it('renders the tab label as an empty placeholder', async () => {
    await render(<HubPlaceholderScreen label="Kauzy" />)
    expect(screen.getByText('Kauzy')).toBeOnTheScreen()
  })
})
