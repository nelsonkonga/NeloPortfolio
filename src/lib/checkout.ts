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

function redirectToLink(link: string | undefined, input: CheckoutRequest) {
  const url = httpsUrl(link)
  if (!url) return false
  if (input.email) url.searchParams.set('prefilled_email', input.email)
  url.searchParams.set('client_reference_id', input.formule)
  window.location.href = url.toString()
  return true
}

export async function openCheckout(input: CheckoutRequest): Promise<'redirect' | 'unavailable'> {
  if (input.method === 'paypal') {
    const opened = await redirectFromEndpoint(import.meta.env.VITE_PAYPAL_ENDPOINT, input)
    if (opened) return 'redirect'
    if (redirectToLink(import.meta.env.VITE_PAYPAL_CHECKOUT_URL, input)) return 'redirect'
    return 'unavailable'
  }

  const opened = await redirectFromEndpoint(import.meta.env.VITE_CHECKOUT_ENDPOINT, input)
  if (opened) return 'redirect'
  if (redirectToLink(import.meta.env.VITE_STRIPE_CHECKOUT_URL, input)) return 'redirect'
  return 'unavailable'
}
