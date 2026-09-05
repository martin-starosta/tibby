import { Pressable, ScrollView, StyleSheet, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { SETTINGS } from '@/copy/sk'
import type { SettingsState } from '@/settings/settingsStore'
import { colors } from '@/theme/colors'

type Props = {
  settings: SettingsState
  onChange: (next: SettingsState) => void
}

export function SettingsScreen({ settings, onChange }: Props) {
  return (
    <SafeAreaView style={styles.screen} edges={['top']}>
      <ScrollView contentContainerStyle={styles.body}>
        <Text style={styles.title}>{SETTINGS}</Text>
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
    </SafeAreaView>
  )
}

function Toggle({ label, value, onToggle }: { label: string; value: boolean; onToggle: () => void }) {
  return (
    <Pressable accessibilityRole="button" accessibilityLabel={label} accessibilityState={{ selected: value }} onPress={onToggle} style={styles.row}>
      <Text style={styles.label}>{label}</Text>
      <Text style={styles.value}>{value ? 'Zapnuté' : 'Vypnuté'}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: colors.background },
  body: { padding: 20, gap: 12 },
  title: { color: colors.gold, fontWeight: '700' },
  row: {
    borderColor: colors.muted,
    borderWidth: 1,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: 14,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  label: { color: colors.text },
  value: { color: colors.gold },
})
