/**
 * Typed game art catalog. Drop replacement PNGs at the same paths —
 * no code change needed. See assets/game/README.md for sizes.
 */
export const illustrations = {
  titleHero: require('../../assets/game/illustrations/title-hero.png'),
  caseBribe: require('../../assets/game/illustrations/case-bribe.png'),
  eventJournalist: require('../../assets/game/illustrations/event-journalist.png'),
  kontrola: require('../../assets/game/illustrations/kontrola.png'),
  finaleCourt: require('../../assets/game/illustrations/finale-court.png'),
  careerBoss: require('../../assets/game/illustrations/career-boss.png'),
  advisor: require('../../assets/game/illustrations/advisor.png'),
} as const

export const icons = {
  money: require('../../assets/game/icons/money.png'),
  shield: require('../../assets/game/icons/shield.png'),
  phone: require('../../assets/game/icons/phone.png'),
  envelope: require('../../assets/game/icons/envelope.png'),
  fist: require('../../assets/game/icons/fist.png'),
  eye: require('../../assets/game/icons/eye.png'),
  document: require('../../assets/game/icons/document.png'),
  fire: require('../../assets/game/icons/fire.png'),
  safe: require('../../assets/game/icons/safe.png'),
  car: require('../../assets/game/icons/car.png'),
  monitor: require('../../assets/game/icons/monitor.png'),
  building: require('../../assets/game/icons/building.png'),
  briefcase: require('../../assets/game/icons/briefcase.png'),
  scales: require('../../assets/game/icons/scales.png'),
  trophy: require('../../assets/game/icons/trophy.png'),
  star: require('../../assets/game/icons/star.png'),
} as const

export type IconId = keyof typeof icons

export const stamps = {
  odhaleny: require('../../assets/game/stamps/odhaleny.png'),
} as const

export const buttons = {
  accept: require('../../assets/game/ui-elements/btn-accept.png'),
  reject: require('../../assets/game/ui-elements/btn-reject.png'),
} as const

export const logo = {
  lockup: require('../../assets/game/logo/lockup.png'),
} as const

/** Shop / cover / event icon roles mapped to catalog ids. */
export const contentIcons: Record<string, IconId> = {
  money: 'money',
  shield: 'shield',
  phone: 'phone',
  envelope: 'envelope',
  fist: 'fist',
  eye: 'eye',
  document: 'document',
  fire: 'fire',
  safe: 'safe',
  car: 'car',
  monitor: 'monitor',
  building: 'building',
  briefcase: 'briefcase',
  scales: 'scales',
  trophy: 'trophy',
  star: 'star',
}
