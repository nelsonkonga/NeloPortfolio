export function calendlyUrl() {
  const raw = import.meta.env.VITE_CALENDLY_URL
  if (typeof raw !== 'string' || !raw.trim()) return null
  try {
    const url = new URL(raw.trim())
    const host = url.hostname.toLowerCase()
    const allowed = host === 'calendly.com' || host.endsWith('.calendly.com')
    if (url.protocol !== 'https:' || !allowed) return null
    return url.toString()
  } catch {
    return null
  }
}
