export type BootRoute = 'disclaimer' | 'title'

export function initialRoute(disclaimerAcknowledged: boolean): BootRoute {
  return disclaimerAcknowledged ? 'title' : 'disclaimer'
}
