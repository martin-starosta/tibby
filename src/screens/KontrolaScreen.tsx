import { StyleSheet, View } from 'react-native'
import {
  CONTINUE,
  EXPOSED_BODY,
  EXPOSED_STAMP,
  KONTROLA_TITLE,
  MENU,
  NEW_CAREER,
  SURVIVED,
} from '@/copy/sk'
import { formatRiskChip } from '@/game/format'
import type { RunState } from '@/game/reducer'
import { Button } from '@/ui/Button'
import { GameImage } from '@/ui/GameImage'
import { Screen } from '@/ui/Screen'
import { Stamp } from '@/ui/Stamp'
import { Text } from '@/ui/Text'
import { colors } from '@/theme/colors'
import { spacing } from '@/theme/spacing'

type Props = {
  status: Extract<RunState['status'], 'checkpoint' | 'exposed'>
  risk: number
  onContinue: () => void
  onNewCareer: () => void
  onMenu: () => void
}

export function KontrolaScreen({ status, risk, onContinue, onNewCareer, onMenu }: Props) {
  const exposed = status === 'exposed'
  return (
    <Screen edges={['top', 'bottom']} style={styles.screen}>
      <View style={styles.banner}>
        <Text variant="title" color="onPrimary">
          {KONTROLA_TITLE}
        </Text>
      </View>
      <GameImage
        source={{ kind: 'illustration', id: 'kontrola' }}
        style={styles.art}
        contentFit="cover"
      />
      <Text variant="button" color="text">
        {formatRiskChip(risk)}
      </Text>
      {exposed ? <Stamp label={EXPOSED_STAMP} /> : null}
      <Text variant="body" color="text">
        {exposed ? EXPOSED_BODY : SURVIVED}
      </Text>
      {exposed ? (
        <View style={styles.actions}>
          <Button variant="danger" accessibilityLabel={NEW_CAREER} onPress={onNewCareer}>
            <Button.Text variant="danger">{NEW_CAREER}</Button.Text>
          </Button>
          <Button variant="outline" accessibilityLabel={MENU} onPress={onMenu}>
            <Button.Text variant="outline">{MENU}</Button.Text>
          </Button>
        </View>
      ) : (
        <Button variant="primary" accessibilityLabel={CONTINUE} onPress={onContinue}>
          <Button.Text variant="primary">{CONTINUE}</Button.Text>
        </Button>
      )}
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: spacing.xxl,
    gap: spacing.lg,
    justifyContent: 'center',
  },
  banner: {
    backgroundColor: colors.red,
    borderRadius: 12,
    borderCurve: 'continuous',
    padding: spacing.md,
    alignItems: 'center',
  },
  art: {
    width: '100%',
    height: 180,
    borderRadius: 12,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
  actions: {
    gap: spacing.md,
  },
})
