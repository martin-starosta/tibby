import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { HOW_TO_PLAY } from '@/copy/howTo'
import {
  ACHIEVEMENTS,
  LEADERBOARDS,
  SETTINGS,
  SOURCES,
  START_GAME,
  TAGLINE,
  TITLE_LOCKUP,
} from '@/copy/sk'
import { colors } from '@/theme/colors'

type Props = {
  onStartGame: () => void
  onSettings?: () => void
  onLeaderboards?: () => void
  onAchievements?: () => void
  onHowToPlay?: () => void
  onSources?: () => void
}

export function TitleScreen({
  onStartGame,
  onSettings,
  onLeaderboards,
  onAchievements,
  onHowToPlay,
  onSources,
}: Props) {
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.hero}>
        <Text style={styles.title}>{TITLE_LOCKUP}</Text>
        <Text style={styles.tagline}>{TAGLINE}</Text>
      </View>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={START_GAME}
        onPress={onStartGame}
        style={styles.start}
      >
        <Text style={styles.startLabel}>{START_GAME}</Text>
      </Pressable>
      <View style={styles.secondary}>
        <SecondaryButton label={SETTINGS} onPress={onSettings} />
        <SecondaryButton label={HOW_TO_PLAY} onPress={onHowToPlay} />
        <SecondaryButton label={SOURCES} onPress={onSources} />
        <SecondaryButton label={LEADERBOARDS} onPress={onLeaderboards} />
        <SecondaryButton label={ACHIEVEMENTS} onPress={onAchievements} />
      </View>
    </SafeAreaView>
  )
}

function SecondaryButton({
  label,
  onPress,
}: {
  label: string
  onPress?: () => void
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.iconButton}
    >
      <Text style={styles.iconLabel}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    gap: 32,
  },
  hero: {
    alignItems: 'center',
    gap: 8,
  },
  title: {
    color: colors.text,
    fontWeight: '700',
    textAlign: 'center',
  },
  tagline: {
    color: colors.muted,
    textAlign: 'center',
  },
  start: {
    backgroundColor: colors.gold,
    borderRadius: 12,
    borderCurve: 'continuous',
    paddingHorizontal: 32,
    paddingVertical: 16,
  },
  startLabel: {
    color: colors.background,
    fontWeight: '700',
  },
  secondary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  iconButton: {
    paddingHorizontal: 8,
    paddingVertical: 8,
  },
  iconLabel: {
    color: colors.muted,
    fontWeight: '600',
  },
})
