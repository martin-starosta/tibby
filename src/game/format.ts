export function formatEuros(amount: number): string {
  const abs = Math.abs(Math.trunc(amount))
  const grouped = abs.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `€${grouped}`
}

export function formatRiskChip(risk: number): string {
  return `RIZIKO ${Math.trunc(risk)}%`
}
