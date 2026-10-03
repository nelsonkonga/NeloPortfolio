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

function checkoutEndpoint() {
  const configured = import.meta.env.VITE_MOMO_ENDPOINT
  if (typeof configured === 'string' && configured.trim()) return configured.trim()
  if (typeof window === 'undefined') return undefined
  if (window.location.protocol !== 'https:') return undefined
  return `${window.location.origin}/api/momo`
}

export function momoNumber(method: PaymentMethod) {
  const raw = method === 'orange'
    ? import.meta.env.VITE_ORANGE_MONEY_NUMBER
    : import.meta.env.VITE_MTN_MOMO_NUMBER
  const value = typeof raw === 'string' ? raw.trim() : ''
  return value || null
}

export type CheckoutResult = 'redirect' | 'manual' | 'unavailable' | 'formule' | 'url' | 'email' | 'method'

async function redirectFromEndpoint(endpoint: string | undefined, input: CheckoutRequest): Promise<CheckoutResult | 'failed'> {
  const url = httpsUrl(endpoint)
  if (!url) return 'failed'
  try {
    const response = await fetch(url.toString(), {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(input),
      signal: typeof AbortSignal !== 'undefined' && typeof AbortSignal.timeout === 'function'
        ? AbortSignal.timeout(15000)
        : undefined,
    })
    const data = (await response.json().catch(() => null)) as { url?: unknown; reason?: unknown } | null
    if (!response.ok) {
      const reason = data?.reason
      if (reason === 'formule' || reason === 'url' || reason === 'email' || reason === 'method') return reason
      return 'failed'
    }
    const next = typeof data?.url === 'string' ? httpsUrl(data.url) : null
    if (!next) return 'failed'
    window.location.href = next.toString()
    return 'redirect'
  } catch {
    return 'failed'
  }
}

export async function openCheckout(input: CheckoutRequest): Promise<CheckoutResult> {
  const opened = await redirectFromEndpoint(checkoutEndpoint(), input)
  if (opened === 'redirect') return 'redirect'
  if (opened !== 'failed') return opened
  if (momoNumber(input.method)) return 'manual'
  return 'unavailable'
}
