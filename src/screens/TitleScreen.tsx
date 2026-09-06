import { Pressable, StyleSheet, View } from 'react-native'
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
import { Card } from '@/ui/Card'
import { Screen } from '@/ui/Screen'
import type { IconId } from '@/theme/assets'
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
        <View style={styles.taglineWrap}>
          <Text variant="button" color="text" style={styles.tagline}>
            {TAGLINE}
          </Text>
        </View>
        <GameImage
          source={{ kind: 'illustration', id: 'titleHero' }}
          style={styles.art}
          contentFit="contain"
        />
      </View>
      <Button
        variant="primary"
        accessibilityLabel={START_GAME}
        onPress={onStartGame}
        style={styles.start}
      >
        <Button.Text variant="primary">{START_GAME}</Button.Text>
      </Button>
      <Card padded={false} style={styles.menu}>
        <MenuButton label={SETTINGS} glyph="⚙" onPress={onSettings} />
        <MenuButton label={LEADERBOARDS} icon="trophy" onPress={onLeaderboards} />
        <MenuButton label={ACHIEVEMENTS} icon="star" onPress={onAchievements} last />
      </Card>
      <View style={styles.links}>
        <Button variant="ghost" accessibilityLabel={HOW_TO_PLAY} onPress={onHowToPlay} style={styles.link}>
          <Button.Text variant="ghost">{HOW_TO_PLAY}</Button.Text>
        </Button>
        <Button variant="ghost" accessibilityLabel={SOURCES} onPress={onSources} style={styles.link}>
          <Button.Text variant="ghost">{SOURCES}</Button.Text>
        </Button>
      </View>
    </Screen>
  )
}

function MenuButton({
  label,
  icon,
  glyph,
  last,
  onPress,
}: {
  label: string
  icon?: IconId
  glyph?: string
  last?: boolean
  onPress?: () => void
}) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={[styles.menuItem, last ? null : styles.menuDivider]}
    >
      {icon ? (
        <GameImage source={{ kind: 'icon', id: icon }} style={styles.menuIcon} contentFit="contain" />
      ) : (
        <Text style={styles.menuGlyph}>{glyph}</Text>
      )}
      <Text variant="caption" color="text" style={styles.menuLabel}>
        {label}
      </Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: spacing.xxl,
    gap: spacing.xl,
  },
  hero: {
    alignItems: 'center',
    gap: spacing.sm,
    width: '100%',
  },
  title: {
    textAlign: 'center',
  },
  taglineWrap: {
    backgroundColor: colors.gold,
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.xs,
    transform: [{ rotate: '-2deg' }],
  },
  tagline: {
    textAlign: 'center',
    fontSize: 14,
    lineHeight: 18,
  },
  art: {
    width: '100%',
    height: 220,
    borderRadius: radii.card,
    borderCurve: 'continuous',
  },
  start: {
    minWidth: 240,
  },
  menu: {
    flexDirection: 'row',
    alignSelf: 'stretch',
  },
  menuItem: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.md,
  },
  menuDivider: {
    borderRightWidth: 1,
    borderRightColor: colors.border,
  },
  menuIcon: {
    width: 32,
    height: 32,
  },
  menuGlyph: {
    fontSize: 28,
    lineHeight: 32,
    color: colors.text,
  },
  menuLabel: {
    fontWeight: '700',
    fontSize: 11,
  },
  links: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  link: {
    paddingHorizontal: spacing.md,
    paddingVertical: spacing.sm,
  },
})
