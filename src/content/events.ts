export type EventOption = {
  id: string
  text: string
  cost: number
  riskDelta: number
  delayedRiskDelta: number
}

export type GameEvent = {
  id: string
  type: 'threat' | 'gift' | 'satire'
  tags: string[]
  name: string
  description: string
  incomingRisk: number
  options: EventOption[]
}

export const JOURNALIST: GameEvent = {
  id: 'novinar',
  type: 'threat',
  tags: ['press'],
  name: 'Novinár na stope',
  description: 'Novinár z Aktuality.sk píše článok o tvojich úplatkoch. Čo urobíš?',
  incomingRisk: 20,
  options: [
    { id: 'pay', text: 'Zaplatiť mu', cost: 30000, riskDelta: -20, delayedRiskDelta: 0 },
    { id: 'threaten', text: 'Zastrašiť', cost: 10000, riskDelta: -10, delayedRiskDelta: 10 },
    { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 },
  ],
}

export const GOV_SUPPORT: GameEvent = {
  id: 'politicka-podpora',
  type: 'gift',
  tags: ['political'],
  name: 'Politická podpora',
  description: 'Vláda ťa verejne podporuje.',
  incomingRisk: -20,
  options: [{ id: 'ok', text: 'OK', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
}
