import { supabase } from '@/lib/supabase'

export type LeadDraft = {
  formule: string
  hotel: string
  email: string
  phone: string
}

const KEY = 'nelo-lead'

export function saveLeadDraft(draft: LeadDraft) {
  sessionStorage.setItem(KEY, JSON.stringify(draft))
}

export function readLeadDraft(): LeadDraft | null {
  const raw = sessionStorage.getItem(KEY)
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as LeadDraft
    if (!data.email || !data.formule) return null
    return data
  } catch {
    return null
  }
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
