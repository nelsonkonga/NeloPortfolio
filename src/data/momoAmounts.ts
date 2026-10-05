const AMOUNTS_XAF = {
  // Test temporaire : remettre Découverte à 297900 / 425900 ensuite.
  decouverte: { send: 1000, visit: 1000 },
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
