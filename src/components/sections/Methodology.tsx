import { useLang } from '@/contexts/LangContext'

const STEPS = [
  ['01', 'method.s1.title', 'method.s1.desc'],
  ['02', 'method.s2.title', 'method.s2.desc'],
  ['03', 'method.s3.title', 'method.s3.desc'],
  ['04', 'method.s4.title', 'method.s4.desc'],
] as const

export function Methodology() {
  const { t } = useLang()

  return (
    <section id="methode" className="py-20 sm:py-28 bg-muted/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium text-muted-foreground mb-3">{t('method.eyebrow')}</p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4 max-w-3xl">{t('method.title')}</h2>
        <p className="text-muted-foreground text-lg max-w-2xl mb-12">{t('method.subtitle')}</p>
        <ol className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {STEPS.map(([number, title, desc]) => (
            <li key={number} className="rounded-3xl border border-border bg-card p-5">
              <p className="text-2xl font-semibold text-primary/50 mb-3">{number}</p>
              <h3 className="font-semibold mb-2">{t(title)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
