import { Pressable, StyleSheet } from 'react-native'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import type { IconId } from '@/theme/assets'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { spacing } from '@/theme/spacing'

type Props = {
  label: string
  icon?: IconId
  selected?: boolean
  onPress?: () => void
}

/** Segmented tab: white card, gold when selected, optional kit icon above the label. */
export function Chip({ label, icon, selected, onPress }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[styles.chip, selected ? styles.on : null]}
    >
      {icon ? (
        <GameImage source={{ kind: 'icon', id: icon }} style={styles.icon} contentFit="contain" />
      ) : null}
      <Text variant="caption" color="text" style={styles.label}>
        {label.toUpperCase()}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  chip: {
    flex: 1,
    alignItems: 'center',
    gap: 2,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: spacing.sm,
    paddingVertical: spacing.sm,
    overflow: 'hidden',
  },
  on: {
    backgroundColor: '#FFF3D6',
    borderColor: colors.gold,
  },
  icon: {
    width: 28,
    height: 28,
  },
  label: {
    fontWeight: '700',
    fontSize: 11,
  },
})
