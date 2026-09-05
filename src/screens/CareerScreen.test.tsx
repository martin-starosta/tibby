import { render, screen } from '@testing-library/react-native'
import { createInitialCareer } from '@/career/career'
import { CareerScreen } from '@/screens/CareerScreen'

describe('CareerScreen', () => {
  it('shows the career header and XP bar fields', async () => {
    await render(
      <CareerScreen career={{ ...createInitialCareer(), level: 2, xp: 40, bribesAccepted: 3 }} />,
    )
    expect(screen.getByText('KARIÉRA — ŠÉF')).toBeOnTheScreen()
    expect(screen.getByText('Level 2')).toBeOnTheScreen()
    expect(screen.getByText('XP 40 / 200')).toBeOnTheScreen()
    expect(screen.getByText('Úplatky 3')).toBeOnTheScreen()
  })
})
