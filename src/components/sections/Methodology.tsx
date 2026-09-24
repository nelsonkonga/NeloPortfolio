import { Search, Lock, Code2, Rocket, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useLang } from '@/contexts/LangContext'

const steps = [
  {
    number: '01',
    icon: Search,
    titleKey: 'methodology.step1.title',
    descKey: 'methodology.step1.desc',
    image: 'https://images.pexels.com/photos/7693692/pexels-photo-7693692.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Business strategy meeting',
  },
  {
    number: '02',
    icon: Lock,
    titleKey: 'methodology.step2.title',
    descKey: 'methodology.step2.desc',
    image: 'https://images.pexels.com/photos/5473960/pexels-photo-5473960.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Cybersecurity digital protection',
  },
  {
    number: '03',
    icon: Code2,
    titleKey: 'methodology.step3.title',
    descKey: 'methodology.step3.desc',
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'AI technology development',
  },
  {
    number: '04',
    icon: Rocket,
    titleKey: 'methodology.step4.title',
    descKey: 'methodology.step4.desc',
    image: 'https://images.pexels.com/photos/10375908/pexels-photo-10375908.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Team deployment and monitoring',
  },
]

export function Methodology() {
  const { t } = useLang()

  return (
    <section id="methodology" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">
            Process
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t('methodology.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('methodology.subtitle')}
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div key={step.number} className="relative group">
                {/* Connector line */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-6 left-[calc(100%_-_16px)] w-8 h-px bg-border z-10" />
                )}

                <div className="rounded-2xl overflow-hidden border border-border/60 bg-card hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  {/* Image */}
                  <div className="h-40 overflow-hidden">
                    <img
                      src={step.image}
                      alt={step.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 shrink-0">
                        <Icon className="h-5 w-5 text-gold" />
                      </div>
                      <span className="text-2xl font-black text-gold/30">{step.number}</span>
                    </div>
                    <h3 className="font-bold text-sm mb-2 leading-snug">
                      {t(step.titleKey)}
                    </h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">
                      {t(step.descKey)}
                    </p>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Contextual Link to Pricing */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-col sm:flex-row items-center justify-between gap-4 p-6 rounded-2xl border border-border/60 bg-card/60 backdrop-blur max-w-3xl mx-auto text-left">
            <div>
              <p className="font-semibold text-sm text-foreground">
                Vous avez un projet digital pour votre établissement hôtelier ?
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Consultez nos forfaits transparents (Découverte, Essentiel, Complet) et leurs prestations détaillées.
              </p>
            </div>
            <Link
              to="/tarifs"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-xs font-semibold bg-gold/10 text-gold hover:bg-gold/20 border border-gold/30 transition-all shrink-0 group cursor-pointer"
            >
              Consulter nos forfaits hôteliers
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
