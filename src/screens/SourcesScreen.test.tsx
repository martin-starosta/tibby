import { render, screen } from '@testing-library/react-native'
import { SourcesScreen, contentSourceUrls } from '@/screens/SourcesScreen'

describe('SourcesScreen', () => {
  it('renders at least one URL from fixture content', async () => {
    expect(contentSourceUrls()[0]).toMatch(/^https:\/\//)
    await render(<SourcesScreen />)
    expect(screen.getByText(contentSourceUrls()[0]!)).toBeOnTheScreen()
  })
})
