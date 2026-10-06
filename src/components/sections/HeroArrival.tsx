import { Check } from 'lucide-react'
import { useLang } from '@/contexts/LangContext'

export function HeroArrival() {
  const { t } = useLang()

  return (
    <div className="relative min-h-[420px] sm:min-h-[460px] lg:h-full lg:min-h-[520px]">
      <p className="sr-only">{t('hero.visual.aria')}</p>
      <div className="zephyr-stage absolute inset-0 overflow-hidden rounded-[28px] border border-border" aria-hidden="true">
        <svg className="zephyr-wind pointer-events-none absolute inset-0 h-full w-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          <path d="M-4 58 C 18 50, 32 38, 52 44 S 78 36, 106 30" />
          <path d="M-4 70 C 22 76, 40 54, 58 60 S 84 68, 108 52" />
          <path d="M-6 46 C 16 34, 36 42, 54 30 S 80 22, 108 28" />
        </svg>

        <div className="zephyr-back pointer-events-none absolute right-[14%] top-1/2 z-0 w-[min(58%,240px)] -translate-y-[62%] -rotate-6 overflow-hidden rounded-3xl border border-border shadow-md sm:right-[18%]">
          <img src="/hotels/facade.jpg" alt="" className="h-24 w-full object-cover sm:h-32" />
        </div>

        <article className="zephyr-card absolute right-3 top-1/2 z-10 w-[min(74%,300px)] -translate-y-1/2 rounded-3xl border border-border bg-card shadow-[0_18px_50px_rgba(4,8,21,0.12)] sm:right-6">
          <img src="/hotels/chambre.jpg" alt="" className="h-32 w-full rounded-t-3xl object-cover sm:h-40" />
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
            <div className="zephyr-book mt-3 flex h-11 items-center justify-center rounded-full bg-primary text-sm font-semibold text-primary-foreground">
              {t('hero.visual.book')}
            </div>
          </div>
          <div className="zephyr-confirm pointer-events-none absolute -bottom-3.5 left-3 right-3 flex justify-center">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-foreground px-3 py-1.5 text-xs font-semibold text-background shadow-lg">
              <Check className="h-3.5 w-3.5" />
              {t('hero.visual.kept')}
            </span>
          </div>
        </article>

        <div className="zephyr-slip absolute left-3 top-[54%] z-20 w-[min(52%,196px)] rounded-2xl border border-border bg-card px-3.5 py-3 shadow-lg sm:left-5">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-primary">{t('hero.visual.direct')}</p>
          <p className="mt-1 text-sm font-semibold leading-tight">{t('hero.visual.room')}</p>
          <p className="text-xs text-muted-foreground">{t('hero.visual.nights')}</p>
        </div>

        <div className="zephyr-commission absolute left-10 top-[42%] z-20 rounded-full border border-border bg-background px-3 py-1 text-xs font-semibold text-muted-foreground line-through sm:left-14">
          {t('hero.visual.commission')}
        </div>
      </div>
    </div>
  )
}
