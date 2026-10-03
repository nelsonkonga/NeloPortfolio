export type PackageId = 'decouverte' | 'essentiel' | 'complet'

export interface PackageDef {
  id: PackageId
  price: string
  visitPrice: string
  days: number
  popular?: boolean
  nameKey: string
  taglineKey: string
  popularBadgeKey?: string
  includedHeaderKey?: string
  featureKeys: string[]
}

export const PACKAGES: PackageDef[] = [
  {
    id: 'decouverte',
    price: '449 €',
    visitPrice: '649 €',
    days: 14,
    nameKey: 'tarifs.pkg.decouverte.name',
    taglineKey: 'tarifs.pkg.decouverte.tagline',
    featureKeys: [
      'tarifs.pkg.decouverte.f1',
      'tarifs.pkg.decouverte.f2',
      'tarifs.pkg.decouverte.f3',
      'tarifs.pkg.decouverte.f4',
    ],
  },
  {
    id: 'essentiel',
    price: '990 €',
    visitPrice: '1 490 €',
    days: 21,
    popular: true,
    nameKey: 'tarifs.pkg.essentiel.name',
    taglineKey: 'tarifs.pkg.essentiel.tagline',
    popularBadgeKey: 'tarifs.pkg.essentiel.popularBadge',
    includedHeaderKey: 'tarifs.pkg.essentiel.includedHeader',
    featureKeys: [
      'tarifs.pkg.essentiel.f1',
      'tarifs.pkg.essentiel.f2',
      'tarifs.pkg.essentiel.f3',
    ],
  },
  {
    id: 'complet',
    price: '2 990 €',
    visitPrice: '3 990 €',
    days: 30,
    nameKey: 'tarifs.pkg.complet.name',
    taglineKey: 'tarifs.pkg.complet.tagline',
    includedHeaderKey: 'tarifs.pkg.complet.includedHeader',
    featureKeys: [
      'tarifs.pkg.complet.f1',
      'tarifs.pkg.complet.f2',
      'tarifs.pkg.complet.f3',
    ],
  },
]

export function formatPackagePrice(price: string, lang: 'fr' | 'en') {
  if (lang === 'fr') return price
  const digits = price.replace(' €', '').replace(/\s/g, '')
  const grouped = digits.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return `€${grouped}`
}

export function packageWhatsappMessage(lang: 'fr' | 'en', name: string, price: string, visit: boolean) {
  if (lang === 'fr') {
    const mode = visit
      ? 'avec venue sur place à Yaoundé pour les photos et les textes'
      : 'avec textes et photos envoyés par l’hôtel'
    return `Bonjour Nelo, je souhaite réserver un appel de 20 minutes au sujet de la formule ${name} (${price}, ${mode}) pour mon hôtel.`
  }
  const mode = visit
    ? 'with an on-site visit in Yaoundé for the photos and the texts'
    : 'with texts and photos sent by the hotel'
  return `Hello Nelo, I would like to book a 20-minute call about the ${name} package (${price}, ${mode}) for my hotel.`
}
