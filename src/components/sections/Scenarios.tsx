import { useLang } from '@/contexts/LangContext'

const SCENARIOS = [
  ['scenarios.s1.kicker', 'scenarios.s1.title', 'scenarios.s1.body'],
  ['scenarios.s2.kicker', 'scenarios.s2.title', 'scenarios.s2.body'],
  ['scenarios.s3.kicker', 'scenarios.s3.title', 'scenarios.s3.body'],
] as const

export function Scenarios() {
  const { t } = useLang()

  return (
    <section id="exemples" className="py-24 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">{t('scenarios.eyebrow')}</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-10">{t('scenarios.title')}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {SCENARIOS.map(([kicker, title, body]) => (
            <article key={title} className="rounded-2xl border border-border bg-card p-5 flex flex-col">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">{t(kicker)}</p>
              <h3 className="font-semibold mb-3">{t(title)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(body)}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
