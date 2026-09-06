import { STORE_LISTING } from '@/legal/listing'

describe('store listing', () => {
  it('states satire, not reporting, and 16+', () => {
    expect(STORE_LISTING).toMatch(/satir/i)
    expect(STORE_LISTING).toMatch(/Nie je reportáž/)
    expect(STORE_LISTING).toMatch(/16\+/)
  })
})
