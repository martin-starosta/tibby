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
    <Text variant="button" color={labelColor[variant]} style={styles.label}>
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
  icon: {
    alignItems: 'center',
    justifyContent: 'center',
  },
})
