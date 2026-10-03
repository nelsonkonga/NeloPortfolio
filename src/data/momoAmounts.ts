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

export function formatMomoAmount(amount: number, lang: 'fr' | 'en') {
  const text = lang === 'fr'
    ? amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')
    : amount.toLocaleString('en-US')
  return `${text} FCFA`
}
