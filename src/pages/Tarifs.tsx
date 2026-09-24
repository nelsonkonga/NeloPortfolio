import { ArrowLeft, CheckCircle2, Sparkles, UtensilsCrossed, Hotel, MessageSquare, PhoneCall, ArrowRight, ShieldCheck } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

interface PackageItem {
  id: string
  name: string
  price: string
  tagline: string
  popular?: boolean
  popularBadge?: string
  includedHeader?: string
  features: string[]
  ctaText: string
  whatsappMessage: string
}

const PACKAGES: PackageItem[] = [
  {
    id: 'decouverte',
    name: 'Découverte',
    price: '330 €',
    tagline: 'Une présence digitale élégante pour valoriser votre établissement et capter vos premiers clients en direct.',
    features: [
      "Page d'accueil (hero, présentation générale, responsive)",
      'Galerie photo (grille responsive avec affichage en grand au clic)',
      'Formulaire de contact fonctionnel',
    ],
    ctaText: 'Demander ce package',
    whatsappMessage: 'Bonjour Nelo, je suis intéressé par le Package Découverte (330 €) pour mon hôtel.',
  },
  {
    id: 'essentiel',
    name: 'Essentiel',
    price: '930 €',
    tagline: 'La formule idéale pour s\'affranchir des commissions des plateformes et booster vos réservations directes.',
    popular: true,
    popularBadge: 'Le plus populaire',
    includedHeader: 'Tout le Package Découverte, plus :',
    features: [
      'Réservation directe (calendrier de disponibilité + formulaire)',
      'Version bilingue (français / anglais)',
      'Section « Notre histoire » avec mise en page narrative',
    ],
    ctaText: 'Demander ce package',
    whatsappMessage: 'Bonjour Nelo, je suis intéressé par le Package Essentiel (930 €) pour mon hôtel.',
  },
  {
    id: 'complet',
    name: 'Complet',
    price: '2 230 €',
    tagline: 'Une infrastructure hôtelière complète et autonome avec paiement sécurisé et espace de gestion des clients.',
    includedHeader: 'Tout le Package Essentiel, plus :',
    features: [
      'Paiement en ligne intégré (carte bancaire / Mobile Money)',
      'Espace client (création de compte, connexion, historique)',
      "Tableau de bord d'administration basique",
    ],
    ctaText: 'Demander ce package',
    whatsappMessage: 'Bonjour Nelo, je suis intéressé par le Package Complet (2 230 €) pour mon hôtel.',
  },
]

export function Tarifs() {
  const navigate = useNavigate()

  function handlePackageClick() {
    navigate({ pathname: '/', hash: '#contact' })
  }

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
            Retour à l'accueil
          </Link>
        </div>

        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Badge className="bg-gold/10 text-gold border-gold/30 gap-1.5 px-3 py-1 font-semibold">
              <Hotel className="h-3.5 w-3.5" />
              Tarifs Hôtellerie
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            Nos offres pour sites d'hôtels
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            Ces formules clés en main sont spécialement conçues et dimensionnées pour les établissements
            hôteliers. Elles constituent un socle technique robuste, moderne et évolutif auquel des
            services ou fonctionnalités sur-mesure peuvent être ajoutés selon vos besoins spécifiques.
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
                {isPopular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 z-10">
                    <span className="inline-flex items-center gap-1.5 bg-gold text-gold-foreground text-xs font-bold px-3 py-1 rounded-full shadow-md">
                      <Sparkles className="h-3 w-3" />
                      {pkg.popularBadge}
                    </span>
                  </div>
                )}

                {/* Contenu principal de la carte */}
                <div className="p-6 sm:p-8 flex flex-col flex-1">
                  {/* Titre & Description */}
                  <div className="mb-6">
                    <h2 className="text-2xl font-bold tracking-tight mb-2">
                      {pkg.name}
                    </h2>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed min-h-[40px]">
                      {pkg.tagline}
                    </p>
                  </div>

                  {/* Prix */}
                  <div className="mb-6 pb-6 border-b border-border/60">
                    <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground block mb-1">
                      Prix affiché
                    </span>
                    <div className="flex items-baseline gap-2">
                      <span className="text-sm font-medium text-muted-foreground">à partir de</span>
                      <span className="text-4xl font-extrabold text-foreground tracking-tight">
                        {pkg.price}
                      </span>
                    </div>
                  </div>

                  {/* Liste des services inclus (toujours visible) */}
                  <div className="space-y-3 mb-8 flex-1">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold">
                      Services inclus :
                    </p>

                    {pkg.includedHeader && (
                      <p className="text-xs font-semibold text-foreground/90 italic flex items-center gap-1.5">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold inline-block" />
                        {pkg.includedHeader}
                      </p>
                    )}

                    <ul className="space-y-3">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span className="text-muted-foreground leading-snug">{feature}</span>
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
                      {pkg.ctaText}
                    </Button>
                    <a
                      href={`https://wa.me/237659300327?text=${encodeURIComponent(pkg.whatsappMessage)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-1.5 w-full text-center text-[11px] text-muted-foreground hover:text-gold transition-colors py-1 cursor-pointer"
                    >
                      <MessageSquare className="h-3 w-3" />
                      Ou réserver via WhatsApp
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
                Règle de dimensionnement
              </p>
              <p className="text-sm font-medium text-foreground">
                Prix de base valable jusqu'à 15 chambres. Au-delà, un supplément de 15 € par chambre supplémentaire s'applique.
              </p>
              <p className="text-xs text-muted-foreground mt-1 leading-relaxed">
                Ce supplément forfaitaire couvre la configuration individualisée des catégories, des galeries photos dédiées, des inventaires et des plannings de disponibilité.
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
                  Vous gérez un restaurant ou une gelateria ?
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed max-w-2xl">
                  Contactez-moi directement pour discuter d'une offre adaptée à votre activité.
                  Les besoins d'un restaurant ou d'un salon glacier (carte en ligne, menu QR code dynamique,
                  réservation de tables, click & collect) font l'objet d'un dimensionnement sur-mesure.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 w-full md:w-auto shrink-0">
              <Button
                variant="gold"
                className="w-full sm:w-auto font-semibold gap-2 shadow-[0_0_15px_rgba(234,179,8,0.25)]"
                onClick={() => navigate({ pathname: '/', hash: '#contact' })}
              >
                Discuter d'une offre adaptée
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="https://wa.me/237659300327?text=Bonjour%20Nelo,%20je%20g%C3%A8re%20un%20restaurant/une%20gelateria%20et%20je%20souhaite%20discuter%20d'une%20offre."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border border-border hover:border-gold/40 text-muted-foreground hover:text-gold transition-colors w-full sm:w-auto cursor-pointer"
              >
                <PhoneCall className="h-3.5 w-3.5" />
                WhatsApp direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
