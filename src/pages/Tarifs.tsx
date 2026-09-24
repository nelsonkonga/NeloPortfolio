import { ArrowLeft, CheckCircle2, Sparkles, UtensilsCrossed, Hotel, MessageSquare, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLang } from '@/contexts/LangContext'

interface PackageConfig {
  id: string
  nameKey: string
  price: string
  taglineKey: string
  popular?: boolean
  popularBadgeKey?: string
  includedHeaderKey?: string
  featureKeys: string[]
  whatsappMessage: {
    fr: string
    en: string
  }
}

const PACKAGES: PackageConfig[] = [
  {
    id: 'decouverte',
    nameKey: 'tarifs.pkg.decouverte.name',
    price: '330 €',
    taglineKey: 'tarifs.pkg.decouverte.tagline',
    featureKeys: [
      'tarifs.pkg.decouverte.f1',
      'tarifs.pkg.decouverte.f2',
      'tarifs.pkg.decouverte.f3',
      'tarifs.pkg.decouverte.f4',
    ],
    whatsappMessage: {
      fr: 'Bonjour Nelo, je suis intéressé par le Package Découverte (330 €) pour mon hôtel.',
      en: 'Hello Nelo, I am interested in the Discovery Package (330 €) for my hotel.',
    },
  },
  {
    id: 'essentiel',
    nameKey: 'tarifs.pkg.essentiel.name',
    price: '930 €',
    taglineKey: 'tarifs.pkg.essentiel.tagline',
    popular: true,
    popularBadgeKey: 'tarifs.pkg.essentiel.popularBadge',
    includedHeaderKey: 'tarifs.pkg.essentiel.includedHeader',
    featureKeys: [
      'tarifs.pkg.essentiel.f1',
      'tarifs.pkg.essentiel.f2',
      'tarifs.pkg.essentiel.f3',
    ],
    whatsappMessage: {
      fr: 'Bonjour Nelo, je suis intéressé par le Package Essentiel (930 €) pour mon hôtel.',
      en: 'Hello Nelo, I am interested in the Essential Package (930 €) for my hotel.',
    },
  },
  {
    id: 'complet',
    nameKey: 'tarifs.pkg.complet.name',
    price: '2 230 €',
    taglineKey: 'tarifs.pkg.complet.tagline',
    includedHeaderKey: 'tarifs.pkg.complet.includedHeader',
    featureKeys: [
      'tarifs.pkg.complet.f1',
      'tarifs.pkg.complet.f2',
      'tarifs.pkg.complet.f3',
    ],
    whatsappMessage: {
      fr: 'Bonjour Nelo, je suis intéressé par le Package Complet (2 230 €) pour mon hôtel.',
      en: 'Hello Nelo, I am interested in the Complete Package (2 230 €) for my hotel.',
    },
  },
]

export function Tarifs() {
  const navigate = useNavigate()
  const { t, lang } = useLang()

  function handlePackageClick() {
    navigate({ pathname: '/', hash: '#contact' })
  }

  const restoWhatsappText = lang === 'fr'
    ? "Bonjour Nelo, je gère un restaurant/une gelateria et je souhaite discuter d'une offre."
    : "Hello Nelo, I run a restaurant/gelateria and would like to discuss a custom offer."

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation retour */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('tarifs.back')}
          </Link>
        </div>

        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Badge className="bg-gold/10 text-gold border-gold/30 gap-1.5 px-3 py-1 font-semibold">
              <Hotel className="h-3.5 w-3.5" />
              {t('tarifs.badge')}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            {t('tarifs.title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('tarifs.subtitle')}
          </p>
        </div>

        {/* Grille des 3 packages */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
          {PACKAGES.map((pkg) => {
            const isPopular = pkg.popular
            return (
              <div
                key={pkg.id}
                className={`relative rounded-2xl flex flex-col transition-all duration-300 ${
                  isPopular
                    ? 'border-2 border-gold/70 bg-card shadow-2xl lg:-translate-y-2'
                    : 'border border-border/70 bg-card hover:border-gold/40 hover:shadow-xl hover:-translate-y-1'
                }`}
              >
                {/* Badge le plus populaire */}
                {isPopular && pkg.popularBadgeKey && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      <Sparkles className="h-3 w-3" />
                      {t(pkg.popularBadgeKey)}
                    </span>
                  </div>
                )}

                {/* Contenu principal de la carte */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Titre & Description */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">
                      {t(pkg.nameKey)}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[40px]">
                      {t(pkg.taglineKey)}
                    </p>
                  </div>

                  {/* Prix */}
                  <div className="mb-6 pb-6 border-b border-border/60">
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-muted-foreground">
                        {t('tarifs.from')}
                      </span>
                      <span className="text-4xl font-extrabold text-foreground tracking-tight">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* Liste des services inclus (toujours visible) */}
                  <div className="space-y-3 mb-8 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      {t('tarifs.includedTitle')}
                    </p>

                    {pkg.includedHeaderKey && (
                      <p className="text-xs font-semibold text-foreground/90 italic flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                        {t(pkg.includedHeaderKey)}
                      </p>
                    )}

                    <ul className="space-y-3">
                      {pkg.featureKeys.map((fKey, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span className="text-muted-foreground leading-snug">{t(fKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Bouton d'action */}
                  <div className="pt-4 border-t border-border/40 space-y-2 mt-auto">
                    <Button
                      variant={isPopular ? 'gold' : 'outline'}
                      className={`w-full font-semibold transition-all ${
                        isPopular
                          ? 'shadow-[0_0_20px_rgba(234,179,8,0.35)] hover:shadow-[0_0_25px_rgba(234,179,8,0.5)]'
                          : 'hover:border-gold/50 hover:text-gold'
                      }`}
                      onClick={handlePackageClick}
                    >
                      {t('tarifs.cta')}
                    </Button>
                    <a
                      href={`https://wa.me/237659300327?text=${encodeURIComponent(pkg.whatsappMessage[lang] ?? pkg.whatsappMessage.fr)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full text-center text-[11px] text-muted-foreground hover:text-gold transition-colors py-1 cursor-pointer"
                    >
                      <MessageSquare className="h-3 w-3" />
                      {t('tarifs.ctaWhatsapp')}
                    </a>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Règle de dimensionnement des établissements */}
        <div className="mb-10 rounded-2xl border border-border/70 bg-card p-5 sm:p-6 shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 shrink-0">
              <ShieldCheck className="h-5 w-5 text-gold" />
            </div>
            <div className="flex-1">
              <p className="text-xs font-semibold tracking-wider uppercase text-gold mb-1">
                {t('tarifs.rule.title')}
              </p>
              <p className="text-sm font-medium text-foreground">
                {t('tarifs.rule.text')}
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                {t('tarifs.rule.desc')}
              </p>
              <p className="text-xs text-gold/90 mt-2.5 pt-2.5 border-t border-border/50 leading-relaxed font-medium">
                {t('tarifs.domain.note')}
              </p>
            </div>
          </div>
        </div>

        {/* Note pour Restaurants et Gelaterias */}
        <div className="rounded-2xl border border-gold/30 bg-gold/5 p-6 sm:p-8">
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
            <div className="flex items-start gap-4">
              <div className="flex items-center justify-center w-12 h-12 rounded-xl bg-gold/15 shrink-0 mt-1 sm:mt-0">
                <UtensilsCrossed className="h-6 w-6 text-gold" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-foreground mb-1.5">
                  {t('tarifs.resto.title')}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  {t('tarifs.resto.desc')}
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Button
                variant="gold"
                className="w-full sm:w-auto font-semibold gap-2 shadow-[0_0_15px_rgba(234,179,8,0.25)]"
                onClick={() => navigate({ pathname: '/', hash: '#contact' })}
              >
                {t('tarifs.resto.cta')}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href={`https://wa.me/237659300327?text=${encodeURIComponent(restoWhatsappText)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border border-border hover:border-gold/40 text-muted-foreground hover:text-gold transition-colors w-full sm:w-auto cursor-pointer"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                {t('tarifs.resto.whatsapp')}
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
