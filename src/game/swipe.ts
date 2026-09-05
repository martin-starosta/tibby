export function commitFromSwipe(
  translationX: number,
  width: number,
  velocityX: number,
): 'accept' | 'refuse' | null {
  if (Math.abs(velocityX) > 800) {
    return velocityX > 0 ? 'accept' : 'refuse'
  }
  if (Math.abs(translationX) >= width * 0.28) {
    return translationX > 0 ? 'accept' : 'refuse'
  }
  return null
}
