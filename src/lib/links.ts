export const WHATSAPP_NUMBER = '237659300327'

export const SOCIAL = {
  instagram: 'https://www.instagram.com/the.king.nelson',
  linkedin: 'https://www.linkedin.com/in/evrard-kamdem-946625236',
  facebook: 'https://web.facebook.com/the.king.nelo',
  github: 'https://github.com/nelsonkonga',
  x: 'https://x.com/the_king_nelo',
} as const

export function whatsappUrl(text: string) {
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`
}

export function bookCallMessage(lang: 'fr' | 'en') {
  return lang === 'fr'
    ? 'Bonjour Nextzephyr, je souhaite réserver un appel de 20 minutes pour le site de réservation de mon hôtel.'
    : 'Hello Nextzephyr, I would like to book a 20-minute call about a direct-booking website for my hotel.'
}
