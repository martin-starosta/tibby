export const colors = {
  background: '#F7F5F0',
  surface: '#FFFFFF',
  surfaceMuted: '#EDEAE3',
  text: '#1C1B1A',
  muted: '#6B6760',
  green: '#2F9E62',
  red: '#C43C3C',
  blue: '#2F6FED',
  gold: '#E6C35C',
  border: '#D9D4CA',
  stamp: '#C43C3C',
  onPrimary: '#FFFFFF',
} as const

export type ColorName = keyof typeof colors
