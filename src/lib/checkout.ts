import type { PaymentMethod } from '@/lib/lead'

export type CheckoutRequest = {
  email: string
  phone: string
  hotel: string
  formule: string
  visit: boolean
  method: PaymentMethod
  amountLabel: string
  successUrl: string
  cancelUrl: string
}

function httpsUrl(value: string | undefined) {
  if (!value) return null
  try {
    const url = new URL(value)
    if (url.protocol !== 'https:') return null
    return url
  } catch {
    return null
  }
}

export function momoNumber(method: PaymentMethod) {
  const raw = method === 'orange'
    ? import.meta.env.VITE_ORANGE_MONEY_NUMBER
    : import.meta.env.VITE_MTN_MOMO_NUMBER
  const value = typeof raw === 'string' ? raw.trim() : ''
  return value || null
}

async function redirectFromEndpoint(endpoint: string | undefined, input: CheckoutRequest) {
  const url = httpsUrl(endpoint)
  if (!url) return false
  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
    })
    if (!response.ok) return false
    const data = (await response.json()) as { url?: unknown }
    const next = typeof data.url === 'string' ? httpsUrl(data.url) : null
    if (!next) return false
    window.location.href = next.toString()
    return true
  } catch {
    return false
  }
}

export async function openCheckout(input: CheckoutRequest): Promise<'redirect' | 'manual' | 'unavailable'> {
  const opened = await redirectFromEndpoint(import.meta.env.VITE_MOMO_ENDPOINT, input)
  if (opened) return 'redirect'
  if (momoNumber(input.method)) return 'manual'
  return 'unavailable'
}
