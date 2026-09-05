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

const pay = (cost: number, riskDelta: number, delayed = 0): EventOption => ({
  id: 'pay',
  text: 'Zaplatiť',
  cost,
  riskDelta,
  delayedRiskDelta: delayed,
})

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

export const EVENTS: GameEvent[] = [
  JOURNALIST,
  {
    id: 'evt_audit',
    type: 'threat',
    tags: ['audit'],
    name: 'Kontrola z ministerstva',
    description: 'Ministerstvo posiela audit. Čo urobíš?',
    incomingRisk: 30,
    options: [pay(40000, -20), { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
  {
    id: 'evt_protests',
    type: 'threat',
    tags: ['press'],
    name: 'Protesty verejnosti',
    description: 'Ľudia protestujú pred policajným zborom.',
    incomingRisk: 15,
    options: [pay(20000, -10), { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
  {
    id: 'evt_trial',
    type: 'threat',
    tags: ['court'],
    name: 'Súdne pojednávanie',
    description: 'Kauza Očistec ide pred súd.',
    incomingRisk: 40,
    options: [pay(80000, -25), { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
  GOV_SUPPORT,
  {
    id: 'evt_minister_call',
    type: 'satire',
    tags: ['political'],
    name: 'Minister vnútra volá',
    description: 'Pýta sa, či potrebuješ pomoc. Za 100 000 € ťa podrží.',
    incomingRisk: 10,
    options: [pay(100000, -30), { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
  {
    id: 'evt_press_worms',
    type: 'satire',
    tags: ['press'],
    name: 'Novinárski červi',
    description: 'Aktuality.sk, Denník N, SME — všetci píšu. Zaplať im.',
    incomingRisk: 25,
    options: [pay(50000, -20), { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
  {
    id: 'evt_water_cannon',
    type: 'satire',
    tags: ['audit'],
    name: 'Protesty pred policajtom',
    description: 'Dav skanduje. Poslať vodné delo, alebo zaplatiť ticho?',
    incomingRisk: 15,
    options: [pay(25000, -10), { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
  {
    id: 'evt_court_day',
    type: 'satire',
    tags: ['court'],
    name: 'Súdny deň',
    description: 'Kauza ide pred súd. Zaplať prokurátorovi?',
    incomingRisk: 35,
    options: [pay(90000, -20), { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
  {
    id: 'evt_leak',
    type: 'threat',
    tags: ['press'],
    name: 'Únik spisu',
    description: 'Časť spisu unikla. Noviny volajú o komentár.',
    incomingRisk: 18,
    options: [pay(22000, -12), { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
  {
    id: 'evt_whistle',
    type: 'threat',
    tags: ['audit'],
    name: 'Interný udavač',
    description: 'Niekto z vnútra nosí papiere von.',
    incomingRisk: 22,
    options: [pay(35000, -15), { id: 'ignore', text: 'Ignorovať', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
  {
    id: 'evt_ally_cover',
    type: 'gift',
    tags: ['political'],
    name: 'Krytie zhora',
    description: 'Spojenec v parlamente ťa verejne chváli.',
    incomingRisk: -10,
    options: [{ id: 'ok', text: 'OK', cost: 0, riskDelta: 0, delayedRiskDelta: 0 }],
  },
]

export function eventById(id: string) {
  return EVENTS.find((event) => event.id === id)
}

export function nextQueuedEvent(seenEventIds: string[]) {
  const unused = EVENTS.filter((event) => !seenEventIds.includes(event.id))
  return unused[0] ?? EVENTS[0]!
}
