import { useState } from 'react'
import { Emphasis } from '@/components/ui/Emphasis'
import { useLang } from '@/contexts/LangContext'

const FILTERS = [
  'work.filter.all',
  'work.filter.saas',
  'work.filter.beauty',
  'work.filter.health',
  'work.filter.property',
  'work.filter.travel',
  'work.filter.hotel',
  'work.filter.restaurant',
  'work.filter.salon',
] as const

export function Work() {
  const { t } = useLang()
  const [active, setActive] = useState<(typeof FILTERS)[number]>('work.filter.all')

  return (
    <section id="realisations" className="py-20 sm:py-28 bg-muted/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium text-muted-foreground mb-3">{t('work.eyebrow')}</p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4 max-w-3xl"><Emphasis text={t('work.title')} /></h2>
        <p className="text-muted-foreground leading-relaxed mb-8 max-w-2xl">{t('work.lead')}</p>
        <div className="flex flex-wrap gap-2 mb-8" role="tablist" aria-label={t('work.eyebrow')}>
          {FILTERS.map((key) => {
            const selected = active === key
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={selected}
                onClick={() => setActive(key)}
                className={`rounded-full border px-4 py-2 text-sm font-semibold cursor-pointer ${
                  selected ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-card'
                }`}
              >
                {t(key)}
              </button>
            )
          })}
        </div>
        <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center" role="tabpanel">
          <p className="font-semibold mb-2">{t(active)}</p>
          <p className="text-sm text-muted-foreground">{t('work.empty')}</p>
        </div>
      </div>
    </section>
  )
}
