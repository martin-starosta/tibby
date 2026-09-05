import { render, screen } from '@testing-library/react-native'
import { RiskGaugeScreen } from '@/screens/RiskGaugeScreen'

describe('RiskGaugeScreen', () => {
  it('shows Na hrane at 58 and owned bonuses only', async () => {
    await render(
      <RiskGaugeScreen risk={58} ownedIds={['inv_media']} onClose={jest.fn()} />,
    )
    expect(screen.getByText('Na hrane')).toBeOnTheScreen()
    expect(screen.getByText('Eventy')).toBeOnTheScreen()
    expect(screen.getByText(/Vlastné médium/)).toBeOnTheScreen()
    expect(screen.queryByText(/Ochranná služba/)).toBeNull()
  })
})
