import { supabase } from '@/lib/supabase'

export type PaymentMethod = 'card' | 'paypal'

export type BriefDraft = {
  name: string
  rooms: string
  city: string
  notes: string
}

export type LeadDraft = {
  formule: string
  hotel: string
  email: string
  phone: string
  visit: boolean
  optionsReady: boolean
  paymentMethod: PaymentMethod
  paymentAttempted: boolean
  brief?: BriefDraft
}

const KEY = 'nelo-lead'

export function saveLeadDraft(draft: LeadDraft) {
  sessionStorage.setItem(KEY, JSON.stringify(draft))
}

export function readLeadDraft(): LeadDraft | null {
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Partial<LeadDraft>
    if (!data.email || !data.formule) return null
    return {
      formule: data.formule,
      hotel: data.hotel || '',
      email: data.email,
      phone: data.phone || '',
      visit: Boolean(data.visit),
      optionsReady: Boolean(data.optionsReady),
      paymentMethod: data.paymentMethod === 'paypal' ? 'paypal' : 'card',
      paymentAttempted: Boolean(data.paymentAttempted),
      brief: data.brief,
    }
  } catch {
    return null
  }
}

export function updateLeadDraft(patch: Partial<LeadDraft>) {
  const current = readLeadDraft()
  if (!current) return null
  const next = { ...current, ...patch }
  saveLeadDraft(next)
  return next
}

export async function storeLead(input: {
  hotel: string
  email: string
  phone: string
  formule: string
  message: string
}) {
  if (!supabase) return false
  const hotel = input.hotel.trim()
  const { error } = await supabase.from('contact_messages').insert({
    company: hotel || 'Non précisé',
    full_name: hotel || input.email.trim(),
    email: input.email.trim(),
    phone: input.phone.trim() || null,
    need_type: input.formule,
    message: input.message,
  })
  return !error
}
