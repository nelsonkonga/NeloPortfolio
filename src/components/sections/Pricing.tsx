import { Link } from 'react-router-dom'
import { ArrowRight, CheckCircle2, Sparkles, UtensilsCrossed } from 'lucide-react'
import { Emphasis } from '@/components/ui/Emphasis'
import { Button } from '@/components/ui/button'
import { useLang } from '@/contexts/LangContext'
import { PACKAGES, RESTAURANT_FORMULE, formatPackagePrice } from '@/data/packages'

export function Pricing() {
  const { t, lang } = useLang()

  return (
    <section id="tarifs" className="py-20 sm:py-28 bg-muted/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-3">{t('tarifs.eyebrow')}</p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4"><Emphasis text={t('tarifs.title')} /></h2>
          <p className="text-muted-foreground leading-relaxed">{t('tarifs.subtitle')}</p>
        </div>

        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{t('guarantee.title')}</p>
          <p className="text-sm leading-relaxed">{t('guarantee.supplied')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-8">
          {PACKAGES.map((pkg) => {
            const name = t(pkg.nameKey)
            const price = formatPackagePrice(pkg.price, lang)
            const optionsUrl = `/options?formule=${pkg.id}`
            return (
              <article
                key={pkg.id}
                className={`relative rounded-3xl flex flex-col bg-card p-6 sm:p-8 ${
                  pkg.popular
                    ? 'border-2 border-primary shadow-xl lg:-translate-y-2'
                    : 'border border-border'
                }`}
              >
                {pkg.popular && pkg.popularBadgeKey && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-full">
                      <Sparkles className="h-3 w-3" />
                      {t(pkg.popularBadgeKey)}
                    </span>
                  </div>
                )}

                <h3 className="text-2xl font-bold mb-2">{name}</h3>
                <p className="text-4xl font-extrabold tracking-tight mb-1">{price}</p>
                <p className="text-xs text-muted-foreground mb-4">{t('tarifs.rooms')}</p>
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 min-h-[60px]">{t(pkg.taglineKey)}</p>

                <Button
                  variant={pkg.popular ? 'default' : 'outline'}
                  className={`w-full h-12 rounded-xl mb-6 ${pkg.popular ? '' : 'border-primary text-primary hover:bg-primary/5 hover:text-primary'}`}
                  asChild
                >
                  <Link to={optionsUrl}>
                    {t('tarifs.cta')}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>

                <p className="text-sm font-semibold text-primary mb-4">{t('guarantee.title')}</p>
                <p className="text-sm font-medium mb-1">{t('tarifs.delay').replace('{n}', String(pkg.days))}</p>
                <p className="text-sm text-muted-foreground mb-6">{t('tarifs.revisions')}</p>

                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">{t('tarifs.includedTitle')}</p>
                {pkg.includedHeaderKey && (
                  <p className="text-xs font-medium mb-3">{t(pkg.includedHeaderKey)}</p>
                )}
                <ul className="space-y-3 flex-1">
                  {pkg.featureKeys.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 mb-4">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{t('tarifs.rule.title')}</p>
          <p className="text-sm">{t('tarifs.rule.text')}</p>
          <p className="text-xs text-muted-foreground mt-2">{t('tarifs.domain.note')}</p>
        </div>

        <div className="rounded-3xl border border-border bg-card p-5 flex flex-col sm:flex-row sm:items-center gap-4">
          <UtensilsCrossed className="h-5 w-5 text-primary shrink-0" />
          <div className="flex-1">
            <p className="font-semibold mb-1">{t('tarifs.resto.title')}</p>
            <p className="text-sm text-muted-foreground">{t('tarifs.resto.desc')}</p>
          </div>
          <Button variant="outline" className="rounded-xl border-primary text-primary hover:bg-primary/5 hover:text-primary" asChild>
            <Link to={`/options?formule=${RESTAURANT_FORMULE}`}>
              {t('tarifs.resto.cta')}
            </Link>
          </Button>
        </div>

      </div>
    </section>
  )
}
