import { Check } from 'lucide-react'
import { useLang } from '@/contexts/LangContext'

export function HeroArrival() {
  const { t } = useLang()

  return (
    <div className="relative h-[500px] w-full sm:h-[520px] lg:h-full lg:min-h-[520px]">
      <p className="sr-only">{t('hero.visual.aria')}</p>
      <div className="zephyr-stage absolute inset-0 flex items-center justify-end overflow-hidden rounded-[28px] border border-border px-3 sm:px-6" aria-hidden="true">
        <svg className="zephyr-wind pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M-4 62 C 18 54, 34 42, 52 48 S 78 40, 106 34" />
          <path d="M-4 74 C 22 80, 40 58, 58 64 S 84 72, 108 56" />
          <path d="M-6 50 C 16 38, 36 46, 54 34 S 80 26, 108 32" />
        </svg>

        <div className="zephyr-stack relative z-10 w-[min(88%,260px)]">
          <div className="mb-[-34px] flex justify-end pr-3">
            <img src="/hotels/facade.jpg" alt="" className="h-16 w-[76%] rounded-2xl object-cover shadow-md" />
          </div>
          <article className="relative rounded-3xl border border-border bg-card shadow-[0_18px_50px_rgba(4,8,21,0.12)]">
            <img src="/hotels/chambre.jpg" alt="" className="h-32 w-full rounded-t-3xl object-cover sm:h-36" />
            <div className="p-4">
              <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-primary">{t('hero.visual.site')}</p>
              <p className="mt-1 text-base font-semibold leading-tight">{t('hero.visual.room')}</p>
              <p className="text-sm text-muted-foreground">{t('hero.visual.nights')}</p>
              <div className="mt-3 grid grid-cols-2 gap-2">
                <div className="rounded-2xl bg-muted px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t('hero.visual.arrival')}</p>
                  <p className="text-sm font-semibold">{t('hero.visual.arrivalDate')}</p>
                </div>
                <div className="rounded-2xl bg-muted px-3 py-2">
                  <p className="text-[10px] font-semibold uppercase tracking-wide text-muted-foreground">{t('hero.visual.departure')}</p>
                  <p className="text-sm font-semibold">{t('hero.visual.departureDate')}</p>
                </div>
              </div>
              <div className="relative mt-3">
                <div className="zephyr-book flex h-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
                  {t('hero.visual.book')}
                </div>
                <div className="zephyr-confirm absolute inset-0 flex items-center justify-center">
                  <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background shadow-lg">
                    <Check className="h-3.5 w-3.5" />
                    {t('hero.visual.kept')}
                  </span>
                </div>
              </div>
            </div>
          </article>
        </div>

        <div className="zephyr-slip absolute left-3 top-1/2 z-20 w-[min(72%,200px)] rounded-2xl border border-border bg-card px-3.5 py-3 shadow-lg sm:left-6 sm:w-[168px]">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{t('hero.visual.direct')}</p>
          <p className="mt-1 text-sm font-semibold leading-tight">{t('hero.visual.room')}</p>
          <p className="text-xs text-muted-foreground">{t('hero.visual.nights')}</p>
        </div>

        <div className="zephyr-commission absolute left-8 top-[38%] z-20 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground line-through sm:left-12">
          {t('hero.visual.commission')}
        </div>
      </div>
    </div>
  )
}
