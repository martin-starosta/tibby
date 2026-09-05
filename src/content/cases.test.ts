import { parseCaseCard } from '@/content/cases'

describe('parseCaseCard', () => {
  it('rejects a case missing sourceUrl', () => {
    expect(() =>
      parseCaseCard({
        id: 'bad',
        act: 1,
        title: 'X',
        prompt: 'Y',
        accept: { money: 1, risk: 1 },
        refuse: { money: 0, risk: 0 },
        fact: { text: 'no', sourceName: 'N' },
      }),
    ).toThrow(/sourceUrl/)
  })
})
