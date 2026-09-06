import { Pressable } from 'react-native'
import * as WebBrowser from 'expo-web-browser'
import { CONTINUE, IN_REALITY } from '@/copy/sk'
import type { CaseFact } from '@/game/reducer'
import { Button } from '@/ui/Button'
import { Card } from '@/ui/Card'
import { Text } from '@/ui/Text'

type Props = {
  fact: CaseFact
  moneyDelta: number
  riskDelta: number
  onContinue: () => void
}

export function FactSheet({ fact, moneyDelta, riskDelta, onContinue }: Props) {
  return (
    <Card>
      <Text variant="button" color="green">
        {`${moneyDelta >= 0 ? '+' : ''}${moneyDelta} €`}
      </Text>
      <Text variant="button" color="red">
        {`${riskDelta >= 0 ? '+' : ''}${riskDelta} % riziko`}
      </Text>
      <Text variant="title" color="text">
        {IN_REALITY}
      </Text>
      <Text variant="body" color="text">
        {fact.text}
      </Text>
      <Pressable
        accessibilityRole="link"
        accessibilityLabel={fact.sourceName}
        onPress={() => {
          WebBrowser.openBrowserAsync(fact.sourceUrl)
        }}
      >
        <Text variant="body" color="blue">
          {fact.sourceName}
        </Text>
      </Pressable>
      <Button variant="primary" accessibilityLabel={CONTINUE} onPress={onContinue}>
        <Button.Text variant="primary">{CONTINUE}</Button.Text>
      </Button>
    </Card>
  )
}
