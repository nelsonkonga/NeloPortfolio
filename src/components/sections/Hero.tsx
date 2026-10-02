import { ArrowRight } from 'lucide-react'
import { BookCallButton } from '@/components/contact/BookCallButton'
import { Button } from '@/components/ui/button'
import { useLang } from '@/contexts/LangContext'

const JOURNEYS = [
  ['scenarios.s1.kicker', 'scenarios.s1.title'],
  ['scenarios.s2.kicker', 'scenarios.s2.title'],
  ['scenarios.s3.kicker', 'scenarios.s3.title'],
] as const

export function Hero() {
  const { t } = useLang()

  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="pt-[72px] bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24 pb-6">
        <div className="flex flex-wrap items-center gap-3 mb-8">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm">
            <span className="h-2 w-2 rounded-full bg-primary" />
            {t('hero.badge')}
          </span>
          <span className="inline-flex items-center rounded-full bg-primary/10 text-primary px-3 py-1.5 text-sm font-medium">
            {t('hero.prices')}
          </span>
        </div>

        <h1 className="max-w-4xl text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08] mb-6">
          {t('hero.title')}
        </h1>

        <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <BookCallButton />
          <Button
            size="lg"
            variant="secondary"
            onClick={() => scrollTo('#tarifs')}
            className="h-16 rounded-full px-8 text-lg font-medium"
          >
            {t('cta.pricing')}
          </Button>
        </div>

        <div className="flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-muted-foreground">
          {[t('hero.trust1'), t('hero.trust2'), t('hero.trust3')].map((item, index) => (
            <span key={item} className="inline-flex items-center gap-4">
              {index > 0 && <span className="hidden sm:inline h-3 w-px bg-border" />}
              {item}
            </span>
          ))}
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-10 pb-6 flex items-center justify-between">
        <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">{t('nav.examples')}</p>
        <button onClick={() => scrollTo('#exemples')} className="inline-flex items-center gap-1 text-sm font-semibold text-primary cursor-pointer">
          {t('hero.seeAll')}
          <ArrowRight className="h-4 w-4" />
        </button>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 pb-16 grid grid-cols-1 md:grid-cols-3 gap-4">
        {JOURNEYS.map(([kicker, title]) => (
          <a
            key={title}
            href="#exemples"
            className="rounded-3xl border border-border bg-card p-6 text-left min-h-[220px] hover:border-primary/40 transition-colors"
          >
            <p className="text-sm font-medium text-primary mb-3">{t(kicker)}</p>
            <p className="text-xl font-semibold tracking-tight leading-snug">{t(title)}</p>
          </a>
        ))}
      </div>
    </section>
  )
}
