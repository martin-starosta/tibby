import { StyleSheet, Text as RNText, type TextProps } from 'react-native'
import { colors } from '@/theme/colors'
import { typography, type TextVariant } from '@/theme/typography'

type Props = TextProps & {
  variant?: TextVariant
  color?: keyof typeof colors
}

export function Text({
  variant = 'body',
  color = 'text',
  style,
  ...rest
}: Props) {
  return (
    <RNText
      {...rest}
      style={[styles.base, typography[variant], { color: colors[color] }, style]}
    />
  )
}

const styles = StyleSheet.create({
  base: {
    color: colors.text,
  },
})
