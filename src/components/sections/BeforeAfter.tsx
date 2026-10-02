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
    <section className="py-20 sm:py-28 bg-muted/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium text-muted-foreground mb-3">{t('compare.eyebrow')}</p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-10 max-w-3xl">{t('compare.title')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t('compare.before')}</p>
            <ul className="space-y-4">
              {ROWS.map(([before]) => (
                <li key={before} className="text-sm leading-relaxed text-muted-foreground">{t(before)}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-primary/30 bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-4">{t('compare.after')}</p>
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
