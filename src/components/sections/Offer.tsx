import { useLang } from '@/contexts/LangContext'

const BENEFITS = [
  ['offer.b1.title', 'offer.b1.desc'],
  ['offer.b2.title', 'offer.b2.desc'],
  ['offer.b3.title', 'offer.b3.desc'],
  ['offer.b4.title', 'offer.b4.desc'],
] as const

const FACTS = [
  ['offer.forWho', 'offer.forWho.value'],
  ['offer.result', 'offer.result.value'],
  ['offer.how', 'offer.how.value'],
] as const

export function Offer() {
  const { t } = useLang()

  return (
    <section id="offre" className="py-24 sm:py-28">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">{t('offer.eyebrow')}</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t('offer.title')}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl mb-10">{t('offer.lead')}</p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
          {FACTS.map(([label, value]) => (
            <div key={label} className="rounded-2xl border border-border bg-card p-5">
              <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">{t(label)}</p>
              <p className="font-semibold">{t(value)}</p>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {BENEFITS.map(([title, desc]) => (
            <div key={title} className="rounded-2xl border border-border/70 p-5">
              <h3 className="font-semibold mb-2">{t(title)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
