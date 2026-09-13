import { MapPin, CheckCircle2, Code2, ShieldCheck, Radar } from 'lucide-react'
import { useLang } from '@/contexts/LangContext'

const stats = [
  { icon: Code2, titleKey: 'about.stat1.title', subtitleKey: 'about.stat1.subtitle', accent: 'text-gold' },
  { icon: ShieldCheck, titleKey: 'about.stat2.title', subtitleKey: 'about.stat2.subtitle', accent: 'text-cyan-accent' },
  { icon: Radar, titleKey: 'about.stat3.title', subtitleKey: 'about.stat3.subtitle', accent: 'text-gold' },
]

export function About() {
  const { t } = useLang()

  return (
    <section id="about" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Image col */}
          <div className="relative order-2 lg:order-1">
            <div className="relative rounded-2xl overflow-hidden aspect-[4/5] max-w-md mx-auto">
              <img
                src="https://images.pexels.com/photos/5483147/pexels-photo-5483147.jpeg?auto=compress&cs=tinysrgb&h=650&w=940"
                alt="Nelo – Software Engineer & AI Consultant"
                loading="lazy"
                className="w-full h-full object-cover"
              />
              {/* Overlay gradient */}
              <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
            </div>

            {/* Stats cards */}
            <div className="absolute -bottom-10 -right-4 lg:right-0 flex flex-col gap-3 w-48">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.titleKey} className="bg-card border border-border rounded-xl p-3 shadow-lg flex items-center gap-3">
                    <div className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted shrink-0">
                      <Icon className={`h-4 w-4 ${stat.accent}`} />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-bold leading-tight">{t(stat.titleKey)}</p>
                      <p className="text-[10px] text-muted-foreground leading-tight mt-0.5">{t(stat.subtitleKey)}</p>
                    </div>
                  </div>
                )
              })}
            </div>

            {/* Gold accent frame */}
            <div className="absolute -top-4 -left-4 w-full h-full rounded-2xl border border-gold/20 pointer-events-none max-w-md mx-auto" />
          </div>

          {/* Text col */}
          <div className="order-1 lg:order-2">
            <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">
              {t('about.title')}
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-2">
              Nelo
            </h2>
            <p className="text-lg text-muted-foreground mb-2">{t('about.role')}</p>

            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
              <MapPin className="h-4 w-4 text-gold shrink-0" />
              {t('about.location')}
            </div>

            <p className="text-muted-foreground leading-relaxed mb-8">
              {t('about.bio')}
            </p>

            {/* Highlights */}
            <ul className="space-y-3">
              {[
                'Développement full-stack (React, Node.js, Spring Boot, TypeScript)',
                'Architectures sécurisées & audit de sécurité (JWT, PostgreSQL)',
                'Intégration IA & automatisation de workflows',
                'Conseil en transformation digitale B2B',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                  <span className="text-muted-foreground">{item}</span>
                </li>
              ))}
            </ul>

            {/* Status badges */}
            <div className="flex gap-3 mt-8">
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-green-500/10 text-green-500 border border-green-500/20 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
                {t('about.available')}
              </span>
              <span className="inline-flex items-center gap-1.5 text-xs font-semibold bg-gold/10 text-gold border border-gold/20 rounded-full px-3 py-1">
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                {t('about.international')}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
