import { Pressable, ScrollView, StyleSheet } from 'react-native'
import { SETTINGS } from '@/copy/sk'
import type { SettingsState } from '@/settings/settingsStore'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { spacing } from '@/theme/spacing'

type Props = {
  settings: SettingsState
  onChange: (next: SettingsState) => void
}

export function SettingsScreen({ settings, onChange }: Props) {
  return (
    <Screen edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text variant="title" color="text">
          {SETTINGS}
        </Text>
        <Toggle label="Zvuky" value={settings.sfx} onToggle={() => onChange({ ...settings, sfx: !settings.sfx })} />
        <Toggle label="Haptika" value={settings.haptics} onToggle={() => onChange({ ...settings, haptics: !settings.haptics })} />
        <Toggle
          label="Menej pohybu"
          value={settings.reduceMotion}
          onToggle={() => onChange({ ...settings, reduceMotion: !settings.reduceMotion })}
        />
        <Toggle
          label="Väčší text"
          value={settings.textScale > 1}
          onToggle={() => onChange({ ...settings, textScale: settings.textScale > 1 ? 1 : 1.5 })}
        />
        <Toggle
          label="Stíšiť poradkyňu"
          value={settings.advisorMuted}
          onToggle={() => onChange({ ...settings, advisorMuted: !settings.advisorMuted })}
        />
      </ScrollView>
    </Screen>
  )
}

function Toggle({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      accessibilityState={{ selected: value }}
      onPress={onToggle}
      style={styles.row}
    >
      <Text variant="body" color="text">
        {label}
      </Text>
      <Text variant="button" color="green">
        {value ? 'Zapnuté' : 'Vypnuté'}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  body: { padding: spacing.xl, gap: spacing.md },
  row: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderWidth: 1,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    padding: spacing.md,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
})
