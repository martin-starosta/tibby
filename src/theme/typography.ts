export const fonts = {
  display: 'StardosStencil-Bold',
  body: 'IBMPlexSans',
  bodySemiBold: 'IBMPlexSans-SemiBold',
  bodyBold: 'IBMPlexSans-Bold',
} as const

export const typography = {
  display: {
    fontFamily: fonts.display,
    fontSize: 36,
    lineHeight: 42,
    fontWeight: '700' as const,
  },
  title: {
    fontFamily: fonts.bodyBold,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: '700' as const,
  },
  body: {
    fontFamily: fonts.body,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: '400' as const,
  },
  caption: {
    fontFamily: fonts.body,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: '400' as const,
  },
  button: {
    fontFamily: fonts.bodyBold,
    fontSize: 16,
    lineHeight: 20,
    fontWeight: '700' as const,
  },
} as const

export type TextVariant = keyof typeof typography
