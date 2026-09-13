import { Globe, Zap, Shield, BarChart3, ArrowRight } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useLang } from '@/contexts/LangContext'

const services = [
  {
    icon: Globe,
    titleKey: 'services.web.title',
    descKey: 'services.web.desc',
    accent: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: Zap,
    titleKey: 'services.ai.title',
    descKey: 'services.ai.desc',
    accent: 'text-cyan-accent',
    bg: 'bg-cyan-accent/10',
  },
  {
    icon: Shield,
    titleKey: 'services.security.title',
    descKey: 'services.security.desc',
    accent: 'text-gold',
    bg: 'bg-gold/10',
  },
  {
    icon: BarChart3,
    titleKey: 'services.audit.title',
    descKey: 'services.audit.desc',
    accent: 'text-cyan-accent',
    bg: 'bg-cyan-accent/10',
  },
]

export function Services() {
  const { t } = useLang()

  return (
    <section id="expertise" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">
            Services
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t('services.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('services.subtitle')}
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service) => {
            const Icon = service.icon
            return (
              <Card
                key={service.titleKey}
                className="group hover:shadow-lg hover:-translate-y-1 transition-all duration-300 border-border/60 hover:border-gold/30"
              >
                <CardHeader className="pb-3">
                  <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${service.bg} mb-4`}>
                    <Icon className={`h-6 w-6 ${service.accent}`} />
                  </div>
                  <CardTitle className="text-base leading-snug">{t(service.titleKey)}</CardTitle>
                </CardHeader>
                <CardDescription className="px-6 pb-6">
                  {t(service.descKey)}
                </CardDescription>
              </Card>
            )
          })}
        </div>

        {/* CTA */}
        <div className="mt-12 text-center">
          <p className="text-muted-foreground mb-4">{t('services.cta.title')}</p>
          <Button
            variant="gold"
            size="lg"
            className="gap-2 group"
            onClick={() => document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })}
          >
            {t('services.cta.button')}
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
        </div>
      </div>
    </section>
  )
}
