import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import type { EventOption, GameEvent } from '@/content/events'
import { formatEuros } from '@/game/format'
import { colors } from '@/theme/colors'

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
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentInsetAdjustmentBehavior="automatic" contentContainerStyle={styles.body}>
        <Text style={styles.title}>{event.name.toUpperCase()}</Text>
        <Text style={styles.copy}>{event.description}</Text>
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
        <Text style={styles.footer}>{`Po rozhodnutí: ${footer}%`}</Text>
      </ScrollView>
    </SafeAreaView>
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
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={option.text}
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={() => {
        onFocus()
        onPick()
      }}
      style={[styles.option, selected ? styles.optionSelected : null, disabled ? styles.disabled : null]}
    >
      <Text style={styles.optionText}>{option.text}</Text>
      <Text style={styles.optionMeta}>{`${formatEuros(option.cost)} · ${option.riskDelta}%`}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },
  body: {
    padding: 20,
    gap: 12,
  },
  title: {
    color: colors.gold,
    fontWeight: '700',
  },
  copy: {
    color: colors.text,
  },
  option: {
    borderColor: colors.muted,
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 14,
    gap: 4,
  },
  optionSelected: {
    borderColor: colors.gold,
  },
  disabled: {
    opacity: 0.4,
  },
  optionText: {
    color: colors.text,
    fontWeight: '700',
  },
  optionMeta: {
    color: colors.muted,
  },
  footer: {
    color: colors.gold,
    fontWeight: '700',
  },
})
