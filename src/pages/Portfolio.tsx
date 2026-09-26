import { useState } from 'react'
import { ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, Wrench, BrainCircuit, TrendingUp, Layers, ExternalLink, MessageSquare } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLang } from '@/contexts/LangContext'

interface CaseStudy {
  id: string
  badgeKey: string
  categoryKey: string
  titleKey: string
  summaryKey: string
  skills: string[]
  approach: string[]
  impact: string[]
  tags: string[]
  externalUrl?: string
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 'sellam-monetization',
    badgeKey: 'portfolio.p1.badge',
    categoryKey: 'portfolio.p1.category',
    titleKey: 'portfolio.p1.title',
    summaryKey: 'portfolio.p1.summary',
    skills: [
      'portfolio.p1.skill.backend',
      'portfolio.p1.skill.frontend',
      'portfolio.p1.skill.api',
      'portfolio.p1.skill.arch',
      'portfolio.p1.skill.devops',
    ],
    approach: [
      'portfolio.p1.approach.1',
      'portfolio.p1.approach.2',
      'portfolio.p1.approach.3',
      'portfolio.p1.approach.4',
    ],
    impact: [
      'portfolio.p1.impact.1',
      'portfolio.p1.impact.2',
      'portfolio.p1.impact.3',
      'portfolio.p1.impact.4',
    ],
    tags: ['Java 21', 'Spring Boot 4', 'Spring Security 6', 'CinetPay Mobile Money', 'PostgreSQL', 'React', 'Railway', 'Vercel'],
    externalUrl: 'https://sellam.store',
  },
  {
    id: 'sellam-troubleshooting',
    badgeKey: 'portfolio.p2.badge',
    categoryKey: 'portfolio.p2.category',
    titleKey: 'portfolio.p2.title',
    summaryKey: 'portfolio.p2.summary',
    skills: [
      'portfolio.p2.skill.backend',
      'portfolio.p2.skill.frontend',
      'portfolio.p2.skill.infra',
      'portfolio.p2.skill.debug',
      'portfolio.p2.skill.offline',
    ],
    approach: [
      'portfolio.p2.approach.1',
      'portfolio.p2.approach.2',
      'portfolio.p2.approach.3',
    ],
    impact: [
      'portfolio.p2.impact.1',
      'portfolio.p2.impact.2',
      'portfolio.p2.impact.3',
    ],
    tags: ['Spring Security 7', 'CORS / Debugging HAR', 'PostgreSQL SQL Hotfix', 'IndexedDB / Dexie.js', 'Railway Runtime', 'Axios'],
    externalUrl: 'https://sellam.store',
  },
  {
    id: 'hotel-audit',
    badgeKey: 'portfolio.p3.badge',
    categoryKey: 'portfolio.p3.category',
    titleKey: 'portfolio.p3.title',
    summaryKey: 'portfolio.p3.summary',
    skills: [
      'portfolio.p3.skill.audit',
      'portfolio.p3.skill.frontend',
      'portfolio.p3.skill.seo',
    ],
    approach: [
      'portfolio.p3.approach.1',
      'portfolio.p3.approach.2',
    ],
    impact: [
      'portfolio.p3.impact.1',
      'portfolio.p3.impact.2',
      'portfolio.p3.impact.3',
    ],
    tags: ['Core Web Vitals', 'Audit SEO', 'UX Booking', 'Schema.org', 'Mobile-First', 'Performance Web'],
  },
]

export function Portfolio() {
  const { t } = useLang()
  const navigate = useNavigate()
  const [activeTabs, setActiveTabs] = useState<Record<string, 'skills' | 'approach' | 'impact'>>({
    'sellam-monetization': 'skills',
    'sellam-troubleshooting': 'skills',
    'hotel-audit': 'skills',
  })

  function setTab(projectId: string, tab: 'skills' | 'approach' | 'impact') {
    setActiveTabs((prev) => ({ ...prev, [projectId]: tab }))
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
            {t('portfolio.back')}
          </Link>
        </div>

        {/* En-tête de section */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Badge className="bg-gold/10 text-gold border-gold/30 gap-1.5 px-3.5 py-1.5 font-semibold text-xs">
              <Layers className="h-4 w-4 text-gold" />
              {t('portfolio.badge')}
            </Badge>
          </div>
          <h1 className="text-3xl sm:text-5xl font-extrabold tracking-tight mb-5 leading-tight">
            {t('portfolio.title')}
          </h1>
          <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
            {t('portfolio.subtitle')}
          </p>
        </div>

        {/* Carte de cadrage et transparence */}
        <div className="mb-16 rounded-2xl border border-gold/25 bg-gold/5 p-6 sm:p-7 max-w-4xl mx-auto shadow-sm">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center justify-center w-11 h-11 rounded-xl bg-gold/15 shrink-0">
              <ShieldCheck className="h-6 w-6 text-gold" />
            </div>
            <div>
              <h2 className="text-sm font-bold uppercase tracking-wider text-gold mb-1">
                {t('portfolio.framing.title')}
              </h2>
              <p className="text-xs sm:text-sm text-foreground/90 leading-relaxed">
                {t('portfolio.framing.text')}
              </p>
            </div>
          </div>
        </div>

        {/* Liste des études de cas concrètes */}
        <div className="space-y-16">
          {CASE_STUDIES.map((study, idx) => {
            const currentTab = activeTabs[study.id] ?? 'skills'

            return (
              <article
                key={study.id}
                className="rounded-2xl border border-border/70 bg-card overflow-hidden shadow-lg hover:border-gold/35 transition-all duration-300"
              >
                {/* En-tête de la carte */}
                <div className="p-6 sm:p-8 border-b border-border/60 bg-muted/20">
                  <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                    <div className="flex flex-wrap items-center gap-2.5">
                      <span className="text-2xl sm:text-3xl font-black text-gold/30">
                        {String(idx + 1).padStart(2, '0')}
                      </span>
                      <Badge className="bg-gold/15 text-gold border-gold/30 font-semibold px-2.5 py-1 text-xs">
                        {t(study.badgeKey)}
                      </Badge>
                      <span className="text-xs text-muted-foreground font-medium hidden sm:inline">
                        • {t(study.categoryKey)}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-500 bg-emerald-500/10 border border-emerald-500/20 px-2.5 py-0.5 rounded-full">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        {t('portfolio.status.prod')}
                      </span>
                      {study.externalUrl && (
                        <a
                          href={study.externalUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-gold transition-colors font-medium ml-2 cursor-pointer"
                        >
                          sellam.store
                          <ExternalLink className="h-3 w-3" />
                        </a>
                      )}
                    </div>
                  </div>

                  {/* Titre de l'intervention */}
                  <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-3 leading-snug">
                    {t(study.titleKey)}
                  </h3>

                  {/* Résumé exécutif */}
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {t(study.summaryKey)}
                  </p>
                </div>

                {/* Barre de navigation d'onglets pour chaque étude de cas */}
                <div className="px-6 sm:px-8 pt-5 border-b border-border/40 flex flex-wrap gap-2 sm:gap-4 bg-muted/10">
                  <button
                    onClick={() => setTab(study.id, 'skills')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-all border-b-2 cursor-pointer ${
                      currentTab === 'skills'
                        ? 'border-gold text-gold bg-card'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <Wrench className="h-4 w-4" />
                    {t('portfolio.tab.skills')}
                  </button>

                  <button
                    onClick={() => setTab(study.id, 'approach')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-all border-b-2 cursor-pointer ${
                      currentTab === 'approach'
                        ? 'border-gold text-gold bg-card'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <BrainCircuit className="h-4 w-4" />
                    {t('portfolio.tab.approach')}
                  </button>

                  <button
                    onClick={() => setTab(study.id, 'impact')}
                    className={`inline-flex items-center gap-2 px-4 py-2.5 text-xs sm:text-sm font-semibold rounded-t-lg transition-all border-b-2 cursor-pointer ${
                      currentTab === 'impact'
                        ? 'border-gold text-gold bg-card'
                        : 'border-transparent text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    <TrendingUp className="h-4 w-4" />
                    {t('portfolio.tab.impact')}
                  </button>
                </div>

                {/* Contenu de l'onglet actif */}
                <div className="p-6 sm:p-8">
                  {currentTab === 'skills' && (
                    <div className="space-y-4 animate-fade-in">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                        Hard skills & Architecture mise en œuvre :
                      </p>
                      <div className="grid grid-cols-1 gap-3.5">
                        {study.skills.map((skillKey) => (
                          <div
                            key={skillKey}
                            className="flex items-start gap-3 p-3.5 rounded-xl border border-border/50 bg-muted/20 text-xs sm:text-sm text-foreground/90 leading-relaxed font-mono"
                          >
                            <span className="w-2 h-2 rounded-full bg-gold shrink-0 mt-1.5" />
                            <span>{t(skillKey)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentTab === 'approach' && (
                    <div className="space-y-4 animate-fade-in">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                        Démarche de l'ingénieur, diagnostic & arbitrage produit :
                      </p>
                      <div className="grid grid-cols-1 gap-3.5">
                        {study.approach.map((approachKey) => (
                          <div
                            key={approachKey}
                            className="flex items-start gap-3 p-3.5 rounded-xl border border-border/50 bg-card text-xs sm:text-sm text-muted-foreground leading-relaxed"
                          >
                            <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                            <span className="text-foreground/90">{t(approachKey)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {currentTab === 'impact' && (
                    <div className="space-y-4 animate-fade-in">
                      <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-3">
                        Résultats vérifiés & Valeur apportée au projet :
                      </p>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        {study.impact.map((impactKey) => (
                          <div
                            key={impactKey}
                            className="flex items-start gap-3 p-4 rounded-xl border border-emerald-500/20 bg-emerald-500/5 text-xs sm:text-sm leading-relaxed"
                          >
                            <span className="text-emerald-500 font-bold shrink-0 mt-0.5">✓</span>
                            <span className="text-foreground/90 font-medium">{t(impactKey)}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Tags techniques */}
                  <div className="mt-7 pt-5 border-t border-border/40 flex flex-wrap items-center justify-between gap-4">
                    <div className="flex flex-wrap gap-2">
                      {study.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted text-muted-foreground border border-border/60"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      className="text-xs font-semibold hover:border-gold/50 hover:text-gold gap-1.5"
                      onClick={() => navigate({ pathname: '/', hash: '#contact' })}
                    >
                      {t('portfolio.cta')}
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Button>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bannière d'appel à l'action finale */}
        <div className="mt-20 text-center">
          <div className="p-8 sm:p-10 rounded-2xl border border-gold/30 bg-gradient-to-b from-card to-card/60 backdrop-blur max-w-3xl mx-auto shadow-xl">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-3">
              {t('portfolio.cta')}
            </h2>
            <p className="text-sm text-muted-foreground max-w-xl mx-auto mb-6 leading-relaxed">
              Que vous ayez besoin d'une architecture backend robuste (Spring Boot/Java), d'une monétisation résiliente (Mobile Money / CinetPay), ou de résoudre des bugs critiques en production, discutons-en directement.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3.5">
              <Button
                variant="gold"
                className="w-full sm:w-auto font-semibold gap-2 shadow-[0_0_20px_rgba(234,179,8,0.35)]"
                onClick={() => navigate({ pathname: '/', hash: '#contact' })}
              >
                Prendre rendez-vous / Discuter du projet
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="https://wa.me/237659300327?text=Bonjour%20Nelo,%20j'ai%20vu%20vos%20interventions%20sur%20sellam.store%20et%20je%20souhaite%20discuter%20d'une%20mission."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-lg text-xs font-semibold border border-border hover:border-gold/40 text-muted-foreground hover:text-gold transition-colors w-full sm:w-auto cursor-pointer"
              >
                <MessageSquare className="h-3.5 w-3.5" />
                WhatsApp direct (+237 659 30 03 27)
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
