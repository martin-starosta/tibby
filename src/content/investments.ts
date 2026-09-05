export type InvestmentModifier =
  | { when: 'eventIncoming'; tags: string[]; riskDelta: number }
  | { when: 'caseRiskGain'; riskDelta: number }
  | { when: 'bribeMoney'; moneyFactor: number }

export type Investment = {
  id: string
  name: string
  flavor: string
  cost: number
  categories: Array<'ochrana' | 'zisk' | 'vplyv'>
  modifiers: InvestmentModifier[]
}

export const INVESTMENTS: Investment[] = [
  {
    id: 'inv_media',
    name: 'Vlastné médium',
    flavor: 'Keď píšu o tebe, píšu to, čo im diktuješ.',
    cost: 200000,
    categories: ['ochrana', 'vplyv'],
    modifiers: [{ when: 'eventIncoming', tags: ['*'], riskDelta: -10 }],
  },
  {
    id: 'inv_judge',
    name: 'Korumpovaný sudca',
    flavor: 'Súdny deň je len ďalší deň v kancelárii.',
    cost: 150000,
    categories: ['ochrana'],
    modifiers: [{ when: 'eventIncoming', tags: ['court'], riskDelta: -15 }],
  },
  {
    id: 'inv_ally',
    name: 'Politický spojenec',
    flavor: 'Jeden telefonát a audit sa stratí v šuplíku.',
    cost: 300000,
    categories: ['vplyv'],
    modifiers: [{ when: 'eventIncoming', tags: ['audit'], riskDelta: -20 }],
  },
  {
    id: 'inv_laundry',
    name: 'Firma na pranie špinavých peňazí',
    flavor: 'Úplatok vyzerá ako faktúra za konzultácie.',
    cost: 100000,
    categories: ['zisk'],
    modifiers: [{ when: 'bribeMoney', moneyFactor: 1.2 }],
  },
  {
    id: 'inv_security',
    name: 'Ochranná služba',
    flavor: 'Tichí muži, ktorí vedia, kto sa pýta.',
    cost: 50000,
    categories: ['ochrana'],
    modifiers: [
      { when: 'caseRiskGain', riskDelta: -5 },
      { when: 'eventIncoming', tags: ['*'], riskDelta: -5 },
    ],
  },
]
