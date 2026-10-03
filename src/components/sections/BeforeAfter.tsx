import { ArrowRight, Check, X } from 'lucide-react'
import { Emphasis } from '@/components/ui/Emphasis'
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
    <section className="py-20 sm:py-28">
      <div className="max-w-[980px] mx-auto px-4 sm:px-6 text-center">
        <p className="text-sm font-medium text-muted-foreground mb-3">{t('compare.eyebrow')}</p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-12"><Emphasis text={t('compare.title')} /></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 text-left">
          <div>
            <p className="text-lg font-semibold mb-4">{t('compare.before')}</p>
            <ul>
              {ROWS.map(([before]) => (
                <li key={before} className="flex items-start gap-3 py-4 border-t border-border text-muted-foreground">
                  <X className="h-4 w-4 mt-1 shrink-0" />
                  <span>{t(before)}</span>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-lg font-semibold mb-4">{t('compare.after')}</p>
            <ul>
              {ROWS.map(([, after]) => (
                <li key={after} className="flex items-start gap-3 py-4 border-t border-border">
                  <span className="mt-0.5 inline-flex h-5 w-5 items-center justify-center rounded-full bg-primary text-primary-foreground shrink-0">
                    <Check className="h-3 w-3" />
                  </span>
                  <span>{t(after)}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
        <a
          href="#tarifs"
          className="mt-12 inline-flex items-center h-16 rounded-full bg-primary text-primary-foreground pl-7 pr-2 text-lg font-semibold"
        >
          {t('cta.pricing')}
          <span className="ml-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
            <ArrowRight className="h-4 w-4" />
          </span>
        </a>
      </div>
    </section>
  )
}
