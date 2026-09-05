export type BootRoute = 'age' | 'disclaimer' | 'title'

export function initialRoute(ageConfirmed: boolean, disclaimerAcknowledged: boolean): BootRoute {
  if (!ageConfirmed) {
    return 'age'
  }
  if (!disclaimerAcknowledged) {
    return 'disclaimer'
  }
  return 'title'
}
