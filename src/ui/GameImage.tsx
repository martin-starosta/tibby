import { Image } from 'expo-image'
import { StyleSheet, type ImageStyle, type StyleProp } from 'react-native'
import {
  icons,
  illustrations,
  logo,
  stamps,
  type IconId,
} from '@/theme/assets'

type SourceKey =
  | { kind: 'icon'; id: IconId }
  | { kind: 'illustration'; id: keyof typeof illustrations }
  | { kind: 'stamp'; id: keyof typeof stamps }
  | { kind: 'logo'; id: keyof typeof logo }

type Props = {
  source: SourceKey
  style?: StyleProp<ImageStyle>
  contentFit?: 'cover' | 'contain' | 'fill'
  recyclingKey?: string
}

function resolve(source: SourceKey) {
  switch (source.kind) {
    case 'icon':
      return icons[source.id]
    case 'illustration':
      return illustrations[source.id]
    case 'stamp':
      return stamps[source.id]
    case 'logo':
      return logo[source.id]
  }
}

export function GameImage({
  source,
  style,
  contentFit = 'cover',
  recyclingKey,
}: Props) {
  return (
    <Image
      source={resolve(source)}
      style={[styles.base, style]}
      contentFit={contentFit}
      recyclingKey={recyclingKey}
    />
  )
}

const styles = StyleSheet.create({
  base: {
    width: '100%',
    height: '100%',
  },
})
