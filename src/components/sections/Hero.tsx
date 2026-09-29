import { Instagram, Linkedin } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { BookCallButton } from '@/components/contact/BookCallButton'
import { useLang } from '@/contexts/LangContext'
import { bookCallMessage, SOCIAL, whatsappUrl } from '@/lib/links'

export function Hero() {
  const { t, lang } = useLang()

  function scrollToPricing() {
    document.querySelector('#tarifs')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
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
      <div
        className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, oklch(0.78 0.14 76 / 0.08) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="mb-6">
          <Badge className="bg-gold/10 text-gold border-gold/30">{t('hero.badge')}</Badge>
        </div>

        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-balance mb-6 leading-tight">
          {t('hero.title')}
        </h1>

        <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
          {t('hero.subtitle')}
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <BookCallButton />
          <Button size="lg" variant="outline" onClick={scrollToPricing}>
            {t('cta.pricing')}
          </Button>
        </div>

        <div className="mt-8 flex flex-wrap items-center justify-center gap-4 text-sm">
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-gold">
            <Instagram className="h-4 w-4" />
            {t('cta.instagram')}
          </a>
          <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-gold">
            <Linkedin className="h-4 w-4" />
            {t('cta.linkedin')}
          </a>
          <a href={whatsappUrl(bookCallMessage(lang))} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-gold">
            {t('cta.whatsapp')}
          </a>
        </div>

        <div className="mt-12 flex flex-wrap items-center justify-center gap-6 text-xs text-muted-foreground">
          {[t('hero.trust1'), t('hero.trust2'), t('hero.trust3')].map((item) => (
            <span key={item} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gold" />
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
