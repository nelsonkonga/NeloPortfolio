const AMOUNTS_XAF = {
  decouverte: { send: 297900, visit: 425900 },
  essentiel: { send: 649900, visit: 977900 },
  complet: { send: 1961900, visit: 2617900 },
} as const

export function momoAmountXaf(formule: string, visit: boolean) {
  const row = AMOUNTS_XAF[formule as keyof typeof AMOUNTS_XAF]
  if (!row) return null
  return visit ? row.visit : row.send
}

export const MOMO_CAP_XAF = 500_000
const MOMO_MIN_XAF = 100

export function momoParts(total: number) {
  if (total <= MOMO_CAP_XAF) return [total]
  const parts: number[] = []
  let left = total
  while (left > MOMO_CAP_XAF) {
    parts.push(MOMO_CAP_XAF)
    left -= MOMO_CAP_XAF
  }
  if (left < MOMO_MIN_XAF) {
    parts[parts.length - 1] -= MOMO_MIN_XAF - left
    left = MOMO_MIN_XAF
  }
  parts.push(left)
  return parts
}

export function formatMomoAmount(amount: number, lang: 'fr' | 'en') {
  const text = lang === 'fr'
    ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : amount.toLocaleString('en-US')
  return `${text} FCFA`
}
