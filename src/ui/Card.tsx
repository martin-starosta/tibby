import { StyleSheet, View, type ViewProps } from 'react-native'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { shadows } from '@/theme/shadows'
import { spacing } from '@/theme/spacing'

type Props = ViewProps & {
  padded?: boolean
}

export function Card({ padded = true, style, children, ...rest }: Props) {
  return (
    <View style={[styles.card, padded ? styles.padded : null, style]} {...rest}>
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: colors.border,
    overflow: 'hidden',
    ...shadows.card,
  },
  padded: {
    padding: spacing.lg,
    gap: spacing.md,
  },
})
