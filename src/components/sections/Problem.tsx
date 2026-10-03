import { useLang } from '@/contexts/LangContext'

export function Problem() {
  const { t } = useLang()
  const points = ['problem.p1', 'problem.p2', 'problem.p3']

  return (
    <section id="probleme" className="py-20 sm:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium text-muted-foreground mb-3">{t('problem.eyebrow')}</p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4 max-w-3xl">{t('problem.title')}</h2>
        <p className="text-lg text-muted-foreground leading-relaxed mb-8">{t('problem.lead')}</p>
        <ul className="space-y-4">
          {points.map((key) => (
            <li key={key} className="flex gap-3 text-base">
              <span className="mt-2 h-1.5 w-1.5 rounded-full bg-primary shrink-0" />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
