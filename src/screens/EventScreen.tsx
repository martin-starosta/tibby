import { ScrollView, StyleSheet, View } from 'react-native'
import type { EventOption, GameEvent } from '@/content/events'
import { formatEuros } from '@/game/format'
import { Card } from '@/ui/Card'
import { GameImage } from '@/ui/GameImage'
import { ListRow } from '@/ui/ListRow'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

type Props = {
  event: GameEvent
  money: number
  riskAfterIncoming: number
  focusedOptionId: string
  onFocusOption: (id: string) => void
  onPickOption: (id: string) => void
}

export function EventScreen({
  event,
  money,
  riskAfterIncoming,
  focusedOptionId,
  onFocusOption,
  onPickOption,
}: Props) {
  const focused = event.options.find((option) => option.id === focusedOptionId) ?? event.options[0]
  const footer = Math.max(0, riskAfterIncoming + (focused?.riskDelta ?? 0))
  return (
    <Screen edges={['top']}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        <Card padded={false}>
          <View style={styles.header}>
            <Text variant="button" color="onPrimary">
              EVENT!
            </Text>
          </View>
          <View style={styles.inner}>
            <GameImage
              source={{ kind: 'illustration', id: 'eventJournalist' }}
              style={styles.art}
              contentFit="cover"
            />
            <Text variant="title" color="text">
              {event.name.toUpperCase()}
            </Text>
            <Text variant="body" color="text">
              {event.description}
            </Text>
          </View>
        </Card>
        {event.options.map((option) => (
          <EventOptionRow
            key={option.id}
            option={option}
            disabled={option.cost > money}
            selected={option.id === focused?.id}
            onFocus={() => onFocusOption(option.id)}
            onPick={() => onPickOption(option.id)}
          />
        ))}
        <Text variant="button" color="red">
          {`Po rozhodnutí: ${footer}%`}
        </Text>
      </ScrollView>
    </Screen>
  )
}

function EventOptionRow({
  option,
  disabled,
  selected,
  onFocus,
  onPick,
}: {
  option: EventOption
  disabled: boolean
  selected: boolean
  onFocus: () => void
  onPick: () => void
}) {
  return (
    <ListRow
      title={option.text}
      description={`${formatEuros(option.cost)} · ${option.riskDelta}%`}
      icon="envelope"
      disabled={disabled}
      selected={selected}
      accessibilityLabel={option.text}
      onPress={() => {
        onFocus()
        onPick()
      }}
    />
  )
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  header: {
    backgroundColor: colors.red,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  inner: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  art: {
    width: 96,
    height: 96,
    borderRadius: 48,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
    alignSelf: 'center',
  },
})
