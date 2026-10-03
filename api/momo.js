const AMOUNTS_XAF = {
  decouverte: { send: 297900, visit: 425900 },
  essentiel: { send: 649900, visit: 977900 },
  complet: { send: 1961900, visit: 2617900 },
}

const FORMULA_LABEL = {
  decouverte: 'Découverte',
  essentiel: 'Essentiel',
  complet: 'Complet',
}

function readBody(body) {
  if (typeof body === 'string') {
    try {
      return JSON.parse(body)
    } catch {
      return null
    }
  }
  return body
}

function allowedReturnUrl(value) {
  let url
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

function customerName(hotel) {
  const parts = hotel.trim().replace(/\s+/g, ' ').split(' ').filter(Boolean)
  if (parts.length >= 2) {
    return { first_name: parts[0].slice(0, 40), last_name: parts.slice(1).join(' ').slice(0, 40) }
  }
  if (parts.length === 1) return { first_name: parts[0].slice(0, 40), last_name: 'Hotel' }
  return { first_name: 'Client', last_name: 'Hotel' }
}

function prepare(input) {
  const row = AMOUNTS_XAF[input.formule]
  const label = FORMULA_LABEL[input.formule]
  const email = input.email.trim()
  const returnUrl = allowedReturnUrl(input.successUrl)
  if (!row || !label || !returnUrl) return null
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 120) return null
  if (input.method !== 'mtn' && input.method !== 'orange') return null
  const digits = input.phone.replace(/\D/g, '')
  const phone = digits.length >= 8 ? input.phone.trim().slice(0, 20) : ''
  const names = customerName(input.hotel)
  const mode = input.visit ? 'venue sur place' : 'contenus envoyés par le client'
  return {
    amount: input.visit ? row.visit : row.send,
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
  }
}

function checkoutUrl(payload) {
  if (!payload || typeof payload !== 'object') return null
  const candidate = payload.data?.checkout_url ?? payload.checkout_url
  if (typeof candidate !== 'string') return null
  try {
    const url = new URL(candidate)
    if (url.protocol !== 'https:') return null
    return url.toString()
  } catch {
    return null
  }
}

export default async function handler(req, res) {
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

  const body = prepare({
    email: typeof raw.email === 'string' ? raw.email : '',
    phone: typeof raw.phone === 'string' ? raw.phone : '',
    hotel: typeof raw.hotel === 'string' ? raw.hotel : '',
    formule: typeof raw.formule === 'string' ? raw.formule : '',
    visit: raw.visit === true,
    method: typeof raw.method === 'string' ? raw.method : '',
    successUrl: typeof raw.successUrl === 'string' ? raw.successUrl : '',
  })
  if (!body) {
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
      body: JSON.stringify(body),
      signal: AbortSignal.timeout(12000),
    })
    const payload = await response.json().catch(() => null)
    const url = response.ok ? checkoutUrl(payload) : null
    if (!url) {
      res.status(502).json({})
      return
    }
    res.status(200).json({ url })
  } catch {
    res.status(502).json({})
  }
}
