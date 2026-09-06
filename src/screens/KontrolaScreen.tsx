import { StyleSheet, View } from 'react-native'
import {
  CONTINUE,
  EXPOSED_BODY,
  EXPOSED_STAMP,
  KONTROLA_RESULT,
  KONTROLA_SUBTITLE,
  KONTROLA_TITLE,
  MENU,
  NEW_CAREER,
  SURVIVED,
  YOUR_RISK,
} from '@/copy/sk'
import type { RunState } from '@/game/reducer'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
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
      <Card style={styles.panel}>
        <Text variant="title" color="text" style={styles.centered}>
          {KONTROLA_TITLE}
        </Text>
        <Text variant="body" color="text" style={styles.centered}>
          {KONTROLA_SUBTITLE}
        </Text>
        <Text variant="button" color="text" style={styles.centered}>
          {`${YOUR_RISK} `}
          <Text variant="button" color="red">
            {`${Math.trunc(risk)}%`}
          </Text>
        </Text>
        <View style={styles.artWrap}>
          <GameImage
            source={{ kind: 'illustration', id: 'kontrola' }}
            style={styles.art}
            contentFit="cover"
          />
          {exposed ? (
            <View style={styles.stampWrap}>
              <Stamp label={EXPOSED_STAMP} />
            </View>
          ) : null}
        </View>
        <View style={styles.result}>
          <Text variant="button" color="text" style={styles.centered}>
            {KONTROLA_RESULT}
          </Text>
          <Text variant="button" color={exposed ? 'red' : 'green'} style={styles.centered}>
            {exposed ? EXPOSED_BODY : SURVIVED}
          </Text>
        </View>
        {exposed ? (
          <View style={styles.actions}>
            <Button
              variant="use"
              accessibilityLabel={MENU}
              onPress={onMenu}
              style={styles.action}
            >
              <Button.Text variant="use">{MENU}</Button.Text>
            </Button>
            <Button
              variant="danger"
              accessibilityLabel={NEW_CAREER}
              onPress={onNewCareer}
              style={styles.action}
            >
              <Button.Text variant="danger">{NEW_CAREER}</Button.Text>
            </Button>
          </View>
        ) : (
          <Button variant="primary" accessibilityLabel={CONTINUE} onPress={onContinue}>
            <Button.Text variant="primary">{CONTINUE}</Button.Text>
          </Button>
        )}
      </Card>
    </Screen>
  )
}

const styles = StyleSheet.create({
  screen: {
    padding: spacing.xl,
    justifyContent: 'center',
  },
  panel: {
    borderColor: colors.red,
    borderWidth: 2,
  },
  centered: {
    textAlign: 'center',
  },
  artWrap: {
    position: 'relative',
  },
  art: {
    width: '100%',
    height: 170,
    borderRadius: 8,
    borderCurve: 'continuous',
    backgroundColor: colors.surfaceMuted,
  },
  stampWrap: {
    position: 'absolute',
    inset: 0,
    alignItems: 'center',
    justifyContent: 'center',
  },
  result: {
    backgroundColor: colors.background,
    borderRadius: 8,
    borderCurve: 'continuous',
    padding: spacing.md,
    gap: spacing.xs,
  },
  actions: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  action: {
    flex: 1,
  },
})
