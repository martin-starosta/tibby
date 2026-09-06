import { ScrollView, StyleSheet, View } from 'react-native'
import type { EventOption, GameEvent } from '@/content/events'
import { EVENT_QUESTION, RISK_AFTER_EVENT } from '@/copy/sk'
import { formatEuros } from '@/game/format'
import { Card } from '@/ui/Card'
import { GameImage } from '@/ui/GameImage'
import { ListRow } from '@/ui/ListRow'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import type { IconId } from '@/theme/assets'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'
import { fonts } from '@/theme/typography'

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
        <Card padded={false} style={styles.panel}>
          <View style={styles.header}>
            <Text variant="title" color="onPrimary" style={styles.centered}>
              EVENT!
            </Text>
          </View>
          <View style={styles.inner}>
            <Text variant="title" color="blue" style={styles.centered}>
              {event.name.toUpperCase()}
            </Text>
            <GameImage
              source={{ kind: 'illustration', id: 'eventJournalist' }}
              style={styles.art}
              contentFit="cover"
            />
            <Text variant="body" color="blue" style={[styles.centered, styles.description]}>
              {event.description}
            </Text>
            <Text variant="button" color="text" style={styles.centered}>
              {EVENT_QUESTION}
            </Text>
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
            <Text variant="button" color="text" style={styles.centered}>
              {RISK_AFTER_EVENT}{' '}
              <Text variant="title" color="red">
                {`${footer}%`}
              </Text>
            </Text>
          </View>
        </Card>
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
  const riskLabel = `${option.riskDelta > 0 ? '+' : ''}${option.riskDelta}% riziko`
  return (
    <ListRow
      title={option.text.toUpperCase()}
      icon={OPTION_ICON[option.id] ?? 'envelope'}
      disabled={disabled}
      selected={selected}
      accessibilityLabel={option.text}
      trailing={
        <>
          <Text variant="button" color="green">
            {formatEuros(option.cost)}
          </Text>
          <Text variant="caption" color={option.riskDelta < 0 ? 'green' : 'muted'}>
            {riskLabel}
          </Text>
        </>
      }
      onPress={() => {
        onFocus()
        onPick()
      }}
    />
  )
}

const OPTION_ICON: Record<string, IconId> = {
  pay: 'money',
  threaten: 'fist',
  ignore: 'eye',
  ok: 'document',
}

const styles = StyleSheet.create({
  body: {
    padding: spacing.xl,
    gap: spacing.md,
  },
  panel: {
    borderColor: colors.red,
    borderWidth: 2,
  },
  header: {
    backgroundColor: colors.red,
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.sm,
  },
  centered: {
    textAlign: 'center',
  },
  description: {
    fontFamily: fonts.bodySemiBold,
  },
  inner: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  art: {
    width: '100%',
    height: 150,
    borderRadius: 8,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
})
