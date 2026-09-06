import { render, screen } from '@testing-library/react-native'
import { createInitialCareer } from '@/career/career'
import { CareerScreen } from '@/screens/CareerScreen'

describe('CareerScreen', () => {
  it('shows the career header and XP bar fields', async () => {
    await render(
      <CareerScreen career={{ ...createInitialCareer(), level: 2, xp: 40, bribesAccepted: 3 }} />,
    )
    expect(screen.getByText('KARIÉRA')).toBeOnTheScreen()
    expect(screen.getByText('ÚROVEŇ 2')).toBeOnTheScreen()
    expect(screen.getByText('40 / 200 XP')).toBeOnTheScreen()
    expect(screen.getByText('PRIJATÉ ÚPLATKY')).toBeOnTheScreen()
    expect(screen.getByText('3')).toBeOnTheScreen()
  })
})
