import { checkoutUrlFromMoneroo, prepareMonerooPayment } from '../src/lib/moneroo'

type ApiRequest = {
  method?: string
  body?: unknown
}

type ApiResponse = {
  setHeader: (name: string, value: string) => void
  status: (code: number) => { json: (body: unknown) => void }
}

function readBody(body: unknown) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body) as unknown
    } catch {
      return null
    }
  }
  return body
}

export default async function handler(req: ApiRequest, res: ApiResponse) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST')
    res.status(405).json({})
    return
  }

  const secret = process.env.MONEROO_SECRET_KEY?.trim()
  if (!secret) {
    res.status(503).json({})
    return
  }

  const raw = readBody(req.body)
  if (!raw || typeof raw !== 'object') {
    res.status(400).json({})
    return
  }
  const input = raw as Record<string, unknown>
  const prepared = prepareMonerooPayment({
    email: typeof input.email === 'string' ? input.email : '',
    phone: typeof input.phone === 'string' ? input.phone : '',
    hotel: typeof input.hotel === 'string' ? input.hotel : '',
    formule: typeof input.formule === 'string' ? input.formule : '',
    visit: input.visit === true,
    method: typeof input.method === 'string' ? input.method : '',
    successUrl: typeof input.successUrl === 'string' ? input.successUrl : '',
  })
  if (!prepared.ok) {
    res.status(422).json({})
    return
  }

  try {
    const response = await fetch('https://api.moneroo.io/v1/payments/initialize', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${secret}`,
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(prepared.body),
      signal: AbortSignal.timeout(12000),
    })
    const payload = await response.json().catch(() => null)
    const url = response.ok ? checkoutUrlFromMoneroo(payload) : null
    if (!url) {
      res.status(502).json({})
      return
    }
    res.status(200).json({ url })
  } catch {
    res.status(502).json({})
  }
}
