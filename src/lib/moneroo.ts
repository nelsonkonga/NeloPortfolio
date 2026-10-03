import { momoAmountXaf } from '../data/momoAmounts'

export type MonerooCheckoutInput = {
  email: string
  phone: string
  hotel: string
  formule: string
  visit: boolean
  method: string
  successUrl: string
}

export type MonerooInitBody = {
  amount: number
  currency: 'XAF'
  description: string
  return_url: string
  customer: {
    email: string
    first_name: string
    last_name: string
    phone?: string
  }
  metadata: Record<string, string>
  methods: ['mtn_cm'] | ['orange_cm']
}

const FORMULA_LABEL: Record<string, string> = {
  decouverte: 'Découverte',
  essentiel: 'Essentiel',
  complet: 'Complet',
}

export function allowedReturnUrl(value: string) {
  let url: URL
  try {
    url = new URL(value)
  } catch {
    return null
  }
  if (url.protocol !== 'https:') return null
  if (url.pathname !== '/options/brief') return null
  const host = url.hostname.toLowerCase()
  const ownHost = host === 'neloportfolio.vercel.app'
    || (host.endsWith('.vercel.app') && (host.startsWith('neloportfolio.') || host.startsWith('neloportfolio-')))
  if (!ownHost) return null
  return url.toString()
}

function customerName(hotel: string) {
  const parts = hotel.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean)
  if (parts.length >= 2) {
    return {
      first_name: parts[0].slice(0, 40),
      last_name: parts.slice(1).join(' ').slice(0, 40),
    }
  }
  if (parts.length === 1) return { first_name: parts[0].slice(0, 40), last_name: 'Hotel' }
  return { first_name: 'Client', last_name: 'Hotel' }
}

function phoneOrUndefined(value: string) {
  const digits = value.replace(/\D/g, '')
  if (digits.length < 8) return undefined
  return value.trim().slice(0, 20)
}

export function prepareMonerooPayment(input: MonerooCheckoutInput): { ok: true; body: MonerooInitBody } | { ok: false } {
  const amount = momoAmountXaf(input.formule, input.visit)
  const label = FORMULA_LABEL[input.formule]
  const email = input.email.trim()
  const returnUrl = allowedReturnUrl(input.successUrl)
  if (!amount || !label || !returnUrl) return { ok: false }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) return { ok: false }
  if (input.method !== 'mtn' && input.method !== 'orange') return { ok: false }

  const names = customerName(input.hotel)
  const phone = phoneOrUndefined(input.phone)
  const mode = input.visit ? 'venue sur place' : 'contenus envoyés par le client'
  return {
    ok: true,
    body: {
      amount,
      currency: 'XAF',
      description: `Nelo. ${label}. ${mode}.`.slice(0, 180),
      return_url: returnUrl,
      customer: {
        email,
        first_name: names.first_name,
        last_name: names.last_name,
        ...(phone ? { phone } : {}),
      },
      metadata: {
        formule: input.formule,
        visit: input.visit ? 'true' : 'false',
        method: input.method,
        hotel: input.hotel.trim().slice(0, 80),
      },
      methods: [input.method === 'orange' ? 'orange_cm' : 'mtn_cm'],
    },
  }
}

export function checkoutUrlFromMoneroo(payload: unknown) {
  if (!payload || typeof payload !== 'object') return null
  const record = payload as { checkout_url?: unknown; data?: { checkout_url?: unknown } }
  const candidate = record.data?.checkout_url ?? record.checkout_url
  if (typeof candidate !== 'string') return null
  try {
    const url = new URL(candidate)
    if (url.protocol !== 'https:') return null
    return url.toString()
  } catch {
    return null
  }
}
