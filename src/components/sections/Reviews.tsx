import { Emphasis } from '@/components/ui/Emphasis'
import { useLang } from '@/contexts/LangContext'

export function Reviews() {
  const { t } = useLang()

  return (
    <section id="avis" className="py-20 sm:py-28">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium text-muted-foreground mb-3">{t('reviews.eyebrow')}</p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-8 max-w-3xl"><Emphasis text={t('reviews.title')} /></h2>
        <div className="rounded-3xl border border-dashed border-border bg-card px-6 py-16 text-center max-w-3xl">
          <p className="text-sm text-muted-foreground">{t('reviews.empty')}</p>
        </div>
      </div>
    </section>
  )
}
