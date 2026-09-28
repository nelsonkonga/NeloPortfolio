import { useLang } from '@/contexts/LangContext'

const ROWS = [
  ['compare.b1', 'compare.a1'],
  ['compare.b2', 'compare.a2'],
  ['compare.b3', 'compare.a3'],
  ['compare.b4', 'compare.a4'],
] as const

export function BeforeAfter() {
  const { t } = useLang()

  return (
    <section className="py-24 sm:py-28 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">{t('compare.eyebrow')}</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">{t('compare.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-2xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t('compare.before')}</p>
            <ul className="space-y-4">
              {ROWS.map(([before]) => (
                <li key={before} className="text-sm leading-relaxed text-muted-foreground">{t(before)}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-2xl border border-gold/40 bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-4">{t('compare.after')}</p>
            <ul className="space-y-4">
              {ROWS.map(([, after]) => (
                <li key={after} className="text-sm leading-relaxed">{t(after)}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  )
}
