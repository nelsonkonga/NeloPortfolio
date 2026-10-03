import { useState } from 'react'
import { CheckCircle2, Sparkles, UtensilsCrossed } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/contexts/LangContext'
import { PACKAGES, formatPackagePrice, packageWhatsappMessage } from '@/data/packages'
import { whatsappUrl } from '@/lib/links'

export function Pricing() {
  const { t, lang } = useLang()
  const [visit, setVisit] = useState(false)

  const restoMessage = lang === 'fr'
    ? 'Bonjour Nelo, je tiens un restaurant ou une gelateria et je souhaite un devis à part.'
    : 'Hello Nelo, I run a restaurant or a gelateria and I would like a separate quote.'

  return (
    <section id="tarifs" className="py-20 sm:py-28 bg-muted/40">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="max-w-3xl mb-8">
          <p className="text-sm font-medium text-muted-foreground mb-3">{t('tarifs.eyebrow')}</p>
          <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">{t('tarifs.title')}</h2>
          <p className="text-muted-foreground leading-relaxed">{t('tarifs.subtitle')}</p>
        </div>

        <div className="inline-flex flex-col sm:flex-row rounded-full border border-border bg-card p-1 mb-6 gap-1" role="group" aria-label={t('tarifs.mode.label')}>
          <button
            type="button"
            aria-pressed={!visit}
            onClick={() => setVisit(false)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              !visit ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'
            }`}
          >
            {t('tarifs.mode.supplied')}
          </button>
          <button
            type="button"
            aria-pressed={visit}
            onClick={() => setVisit(true)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
              visit ? 'bg-primary text-primary-foreground' : 'text-foreground hover:bg-secondary'
            }`}
          >
            {t('tarifs.mode.visit')}
          </button>
        </div>

        {visit && (
          <div className="max-w-3xl mb-6 space-y-1">
            <p className="text-sm leading-relaxed">{t('tarifs.visit.note')}</p>
            <p className="text-sm text-muted-foreground leading-relaxed">{t('tarifs.visit.outside')}</p>
          </div>
        )}

        <div className="rounded-3xl border border-primary/20 bg-primary/5 p-5 mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-1">{t('guarantee.title')}</p>
          <p className="text-sm leading-relaxed">{t(visit ? 'guarantee.visit' : 'guarantee.supplied')}</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-stretch mb-8">
          {PACKAGES.map((pkg) => {
            const name = t(pkg.nameKey)
            const price = formatPackagePrice(visit ? pkg.visitPrice : pkg.price, lang)
            const message = packageWhatsappMessage(lang, name, price, visit)
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
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 min-h-[60px]">{t(pkg.taglineKey)}</p>

                <p className="text-4xl font-extrabold tracking-tight mb-1">{price}</p>
                <p className="text-xs text-muted-foreground mb-4">{t('tarifs.rooms')}</p>
                <p className="text-sm font-medium mb-1">{t('tarifs.delay').replace('{n}', String(pkg.days))}</p>
                <p className="text-sm text-muted-foreground mb-6">{t('tarifs.revisions')}</p>

                <p className="text-xs font-semibold uppercase tracking-wider text-primary mb-3">{t('tarifs.includedTitle')}</p>
                {pkg.includedHeaderKey && (
                  <p className="text-xs font-medium mb-3">{t(pkg.includedHeaderKey)}</p>
                )}
                <ul className="space-y-3 mb-8 flex-1">
                  {pkg.featureKeys.map((key) => (
                    <li key={key} className="flex items-start gap-2 text-sm text-muted-foreground">
                      <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span>{t(key)}</span>
                    </li>
                  ))}
                </ul>

                <Button variant={pkg.popular ? 'default' : 'outline'} className="w-full rounded-full" asChild>
                  <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer">
                    {t('tarifs.cta')}
                  </a>
                </Button>
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
          <Button variant="outline" className="rounded-full" asChild>
            <a href={whatsappUrl(restoMessage)} target="_blank" rel="noopener noreferrer">
              {t('tarifs.resto.cta')}
            </a>
          </Button>
        </div>

      </div>
    </section>
  )
}
