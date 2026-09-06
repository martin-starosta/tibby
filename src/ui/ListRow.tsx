import { Pressable, StyleSheet, View } from 'react-native'
import type { ReactNode } from 'react'
import { GameImage } from '@/ui/GameImage'
import { Text } from '@/ui/Text'
import { type IconId } from '@/theme/assets'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { spacing } from '@/theme/spacing'

type Props = {
  title: string
  description?: string
  icon?: IconId
  trailing?: ReactNode
  disabled?: boolean
  selected?: boolean
  onPress?: () => void
  accessibilityLabel?: string
}

export function ListRow({
  title,
  description,
  icon,
  trailing,
  disabled,
  selected,
  onPress,
  accessibilityLabel,
}: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={accessibilityLabel ?? title}
      accessibilityState={{ disabled, selected }}
      disabled={disabled}
      onPress={onPress}
      style={[
        styles.row,
        selected ? styles.selected : null,
        disabled ? styles.disabled : null,
      ]}
    >
      {icon ? (
        <GameImage
          source={{ kind: 'icon', id: icon }}
          style={styles.icon}
          contentFit="contain"
          recyclingKey={icon}
        />
      ) : null}
      <View style={styles.copy}>
        <Text variant="button" color="text">
          {title}
        </Text>
        {description ? (
          <Text variant="caption" color="muted">
            {description}
          </Text>
        ) : null}
      </View>
      {trailing ? <View style={styles.trailing}>{trailing}</View> : null}
    </Pressable>
  )
}

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    borderWidth: 1,
    borderColor: colors.border,
    padding: spacing.md,
  },
  selected: {
    borderColor: colors.blue,
  },
  disabled: {
    opacity: 0.4,
  },
  icon: {
    width: 44,
    height: 44,
    borderRadius: radii.iconButton,
    borderCurve: 'continuous',
  },
  copy: {
    flex: 1,
    gap: 2,
  },
  trailing: {
    alignItems: 'flex-end',
  },
})
