import {
  Pressable,
  StyleSheet,
  View,
  type PressableProps,
  type StyleProp,
  type ViewStyle,
} from 'react-native'
import type { ReactNode } from 'react'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { shadows } from '@/theme/shadows'
import { spacing } from '@/theme/spacing'

type Variant = 'primary' | 'accept' | 'refuse' | 'ghost' | 'use' | 'danger' | 'outline'

type ButtonProps = PressableProps & {
  variant?: Variant
  style?: StyleProp<ViewStyle>
  children?: ReactNode
}

const bg: Record<Variant, string> = {
  primary: colors.green,
  accept: colors.green,
  refuse: colors.red,
  ghost: colors.surfaceMuted,
  use: colors.blue,
  danger: colors.red,
  outline: 'transparent',
}

/** Glossy game-style faces for the decision buttons (matches the design PNGs). */
const greenFace: ViewStyle = {
  experimental_backgroundImage: 'linear-gradient(180deg, #7FC13A 0%, #4E9A16 100%)',
  borderWidth: 2,
  borderColor: '#3B7A0F',
  ...shadows.raised,
}

const redFace: ViewStyle = {
  experimental_backgroundImage: 'linear-gradient(180deg, #F0553A 0%, #C92E12 100%)',
  borderWidth: 2,
  borderColor: '#9E240E',
  ...shadows.raised,
}

const blueFace: ViewStyle = {
  experimental_backgroundImage: 'linear-gradient(180deg, #4C8DF5 0%, #2457C9 100%)',
  borderWidth: 2,
  borderColor: '#1B449E',
  ...shadows.raised,
}

const face: Partial<Record<Variant, ViewStyle>> = {
  primary: greenFace,
  accept: greenFace,
  refuse: redFace,
  danger: redFace,
  use: blueFace,
}

const labelColor: Record<Variant, keyof typeof colors> = {
  primary: 'onPrimary',
  accept: 'onPrimary',
  refuse: 'onPrimary',
  ghost: 'text',
  use: 'onPrimary',
  danger: 'onPrimary',
  outline: 'text',
}

export function Button({
  variant = 'primary',
  style,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <Pressable
      accessibilityRole="button"
      disabled={disabled}
      style={[
        styles.base,
        { backgroundColor: bg[variant] },
        variant === 'outline' ? styles.outline : null,
        face[variant],
        disabled ? styles.disabled : null,
        style,
      ]}
      {...rest}
    >
      {children}
    </Pressable>
  )
}

function ButtonText({
  variant = 'primary',
  children,
}: {
  variant?: Variant
  children: ReactNode
}) {
  return (
    <Text
      variant="button"
      color={labelColor[variant]}
      style={[styles.label, face[variant] ? styles.embossed : null]}
    >
      {children}
    </Text>
  )
}

function ButtonIcon({ children }: { children: ReactNode }) {
  return <View style={styles.icon}>{children}</View>
}

Button.Text = ButtonText
Button.Icon = ButtonIcon

const styles = StyleSheet.create({
  base: {
    borderRadius: radii.button,
    borderCurve: 'continuous',
    paddingHorizontal: spacing.xl,
    paddingVertical: spacing.md,
    alignItems: 'center',
    justifyContent: 'center',
    gap: spacing.xs,
  },
  outline: {
    borderWidth: 1,
    borderColor: colors.border,
  },
  disabled: {
    opacity: 0.4,
  },
  label: {
    textAlign: 'center',
  },
  embossed: {
    fontSize: 20,
    lineHeight: 24,
    textShadowColor: 'rgba(0, 0, 0, 0.6)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 1,
  },
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
