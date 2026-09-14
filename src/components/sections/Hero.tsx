import { ArrowRight, Shield } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLang } from '@/contexts/LangContext'

export function Hero() {
  const { t } = useLang()

  function scrollTo(id: string) {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
    >
      {/* Background grid */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--border) 1px, transparent 1px),
            linear-gradient(to bottom, var(--border) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          opacity: 0.3,
        }}
      />

      {/* Glow halos */}
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.78 0.14 76 / 0.08) 0%, transparent 70%)',
        }}
      />
      <div
        className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, oklch(0.75 0.12 200 / 0.06) 0%, transparent 70%)',
        }}
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Badge */}
        <div className="opacity-0 animate-fade-in-up animation-delay-100 mb-6">
          <Badge className="bg-gold/10 text-gold border-gold/30 gap-1.5">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
            </span>
            {t('hero.badge')}
          </Badge>
        </div>

        {/* H1 */}
        <h1 className="opacity-0 animate-fade-in-up animation-delay-200 text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance mb-6 leading-tight">
          {t('hero.title')}
        </h1>

        {/* Subtitle */}
        <p className="opacity-0 animate-fade-in-up animation-delay-300 text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        {/* CTAs */}
        <div className="opacity-0 animate-fade-in-up animation-delay-400 flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            variant="gold"
            onClick={() => scrollTo('#expertise')}
            className="gap-2 group shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)] transition-all duration-300"
          >
            {t('hero.cta.primary')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            onClick={() => scrollTo('#contact')}
            className="gap-2 hover:border-gold/40 hover:text-gold transition-colors"
          >
            <Shield className="h-4 w-4" />
            {t('hero.cta.secondary')}
          </Button>
        </div>

        {/* Trust strip */}
        <div className="opacity-0 animate-fade-in-up animation-delay-600 mt-16 flex flex-wrap items-center justify-center gap-8 text-xs text-muted-foreground">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            PME & Startups
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Hôtellerie & Restauration
          </span>
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-gold" />
            Secteur du Luxe
          </span>
        </div>

        {/* Tech Stack Trust Badges */}
        <div className="opacity-0 animate-fade-in-up animation-delay-600 mt-8 pt-8 border-t border-border/40 flex flex-wrap items-center justify-center gap-2.5 max-w-2xl mx-auto">
          {['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Supabase', 'Node.js', 'Workflows IA'].map((tech) => (
            <span
              key={tech}
              className="px-2.5 py-1 rounded-md text-[11px] font-medium bg-muted/60 text-muted-foreground border border-border/50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
