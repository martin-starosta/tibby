import { StyleSheet, View } from 'react-native'
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
import { Button } from '@/ui/Button'
import { GameImage } from '@/ui/GameImage'
import { Screen } from '@/ui/Screen'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { spacing } from '@/theme/spacing'

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
    <Screen edges={['top', 'bottom']} style={styles.container}>
      <View style={styles.hero}>
        <Text variant="display" color="text" style={styles.title}>
          {TITLE_LOCKUP}
        </Text>
        <GameImage
          source={{ kind: 'illustration', id: 'titleHero' }}
          style={styles.art}
          contentFit="contain"
        />
        <Text variant="caption" color="muted" style={styles.tagline}>
          {TAGLINE}
        </Text>
      </View>
      <Button
        variant="primary"
        accessibilityLabel={START_GAME}
        onPress={onStartGame}
        style={styles.start}
      >
        <Button.Text variant="primary">{START_GAME}</Button.Text>
      </Button>
      <View style={styles.secondary}>
        <SecondaryButton label={SETTINGS} onPress={onSettings} />
        <SecondaryButton label={LEADERBOARDS} onPress={onLeaderboards} />
        <SecondaryButton label={ACHIEVEMENTS} onPress={onAchievements} />
        <SecondaryButton label={HOW_TO_PLAY} onPress={onHowToPlay} />
        <SecondaryButton label={SOURCES} onPress={onSources} />
      </View>
    </Screen>
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
    <Button
      variant="ghost"
      accessibilityLabel={label}
      onPress={onPress}
      style={styles.iconButton}
    >
      <Button.Text variant="ghost">{label}</Button.Text>
    </Button>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.xxxl,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
  },
  title: {
    textAlign: 'center',
  },
  art: {
    width: '100%',
    height: 220,
    borderRadius: radii.card,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
  tagline: {
    textAlign: 'center',
  },
  start: {
    minWidth: 220,
  },
  secondary: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: spacing.md,
  },
  iconButton: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
    minWidth: 100,
  },
})
