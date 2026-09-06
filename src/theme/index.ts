import { colors } from '@/theme/colors'
import { radii } from '@/theme/radii'
import { shadows } from '@/theme/shadows'
import { spacing } from '@/theme/spacing'
import { fonts, typography } from '@/theme/typography'

export { colors } from '@/theme/colors'
export { radii } from '@/theme/radii'
export { shadows } from '@/theme/shadows'
export { spacing } from '@/theme/spacing'
export { fonts, typography } from '@/theme/typography'
export {
  illustrations,
  icons,
  stamps,
  logo,
  contentIcons,
} from '@/theme/assets'
export type { ColorName } from '@/theme/colors'
export type { TextVariant } from '@/theme/typography'
export type { IconId } from '@/theme/assets'

export const theme = {
  colors,
  spacing,
  radii,
  typography,
  fonts,
  shadows,
} as const
