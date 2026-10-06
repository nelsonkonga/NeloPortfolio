import { ArrowRight, CalendarClock, PenLine, ShieldCheck } from 'lucide-react'
import { BookCallButton } from '@/components/contact/BookCallButton'
import { Emphasis } from '@/components/ui/Emphasis'
import { useLang } from '@/contexts/LangContext'

const PHOTOS = [
  ['/hotels/facade.jpg', 'photo.facade'],
  ['/hotels/chambre.jpg', 'photo.chambre'],
  ['/hotels/suite.jpg', 'photo.suite'],
  ['/hotels/lobby.jpg', 'photo.piscine'],
  ['/hotels/terrasse.jpg', 'photo.terrasse'],
  ['/hotels/petitdej.jpg', 'photo.sejour'],
] as const

export function Hero() {
  const { t } = useLang()

  function scrollToPricing() {
    document.querySelector('#tarifs')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="pt-[72px] bg-background">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-16 sm:pt-24">
        <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm mb-8">
          <span className="h-2 w-2 rounded-full bg-primary" />
          {t('hero.badge')}
        </span>

        <h1 className="max-w-4xl text-4xl sm:text-6xl font-semibold tracking-tight leading-[1.08] mb-6">
          <Emphasis text={t('hero.title')} />
        </h1>

        <p className="max-w-xl text-base sm:text-lg text-muted-foreground leading-relaxed mb-8">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 mb-8">
          <button
            onClick={scrollToPricing}
            className="inline-flex items-center h-16 rounded-full bg-primary text-primary-foreground pl-7 pr-2 text-lg font-semibold shadow-[0_8px_20px_rgba(59,108,246,0.18)] cursor-pointer"
          >
            {t('cta.pricing')}
            <span className="ml-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
              <ArrowRight className="h-4 w-4" />
            </span>
          </button>
          <BookCallButton tone="secondary" />
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-3 text-sm text-muted-foreground">
          <span className="inline-flex items-center gap-2"><ShieldCheck className="h-4 w-4 text-foreground" />{t('hero.trust1')}</span>
          <span className="hidden sm:inline h-3 w-px bg-border" />
          <span className="inline-flex items-center gap-2"><CalendarClock className="h-4 w-4 text-foreground" />{t('hero.trust2')}</span>
          <span className="hidden sm:inline h-3 w-px bg-border" />
          <span className="inline-flex items-center gap-2"><PenLine className="h-4 w-4 text-foreground" />{t('hero.trust3')}</span>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 pt-14 pb-4 flex items-center justify-between">
        <p className="text-sm font-semibold tracking-wide text-muted-foreground uppercase">{t('hero.gallery')}</p>
        <a href="#exemples" className="inline-flex items-center gap-1 text-sm font-semibold text-primary">
          {t('hero.seeAll')}
          <ArrowRight className="h-4 w-4" />
        </a>
      </div>

      <div className="flex gap-4 overflow-x-auto px-4 sm:px-6 pb-16 snap-x">
        {PHOTOS.map(([src, alt]) => (
          <img
            key={src}
            src={src}
            alt={t(alt)}
            className="h-[420px] w-[280px] sm:w-[320px] shrink-0 rounded-3xl object-cover snap-start"
          />
        ))}
      </div>
    </section>
  )
}
