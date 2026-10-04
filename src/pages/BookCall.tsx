import { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import { useLang } from '@/contexts/LangContext'
import { calendlyUrl } from '@/lib/calendly'

type CalendlyWidget = {
  initInlineWidget: (options: { url: string; parentElement: HTMLElement }) => void
}

export function BookCall() {
  const { t } = useLang()
  const url = calendlyUrl()
  const frame = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!url || !frame.current) return
    const parent = frame.current
    let cancelled = false

    function mount() {
      if (cancelled) return
      const widget = (window as Window & { Calendly?: CalendlyWidget }).Calendly
      if (!widget) return
      parent.innerHTML = ''
      widget.initInlineWidget({ url: url as string, parentElement: parent })
    }

    const src = 'https://assets.calendly.com/assets/external/widget.js'
    const existing = document.querySelector<HTMLScriptElement>(`script[src="${src}"]`)
    if (existing && (window as Window & { Calendly?: CalendlyWidget }).Calendly) {
      mount()
      return () => {
        cancelled = true
      }
    }

    const script = existing ?? document.createElement('script')
    script.src = src
    script.async = true
    script.addEventListener('load', mount)
    if (!existing) document.body.appendChild(script)
    return () => {
      cancelled = true
      script.removeEventListener('load', mount)
    }
  }, [url])

  return (
    <main className="pt-24 pb-16 bg-background min-h-screen">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <h1 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{t('call.title')}</h1>
        <p className="text-base sm:text-lg text-muted-foreground mb-8 max-w-xl">{t('call.lead')}</p>
        {url ? (
          <div ref={frame} className="min-h-[700px]" />
        ) : (
          <p className="text-sm text-muted-foreground">{t('call.missing')}</p>
        )}
        <p className="mt-8">
          <Link to="/#tarifs" className="text-sm font-semibold text-primary">
            {t('cta.pricing')}
          </Link>
        </p>
      </div>
    </main>
  )
}
