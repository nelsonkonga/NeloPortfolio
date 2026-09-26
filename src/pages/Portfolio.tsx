import { ArrowLeft, ArrowRight, CheckCircle2, Search, Code2, Cpu, ExternalLink } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { useLang } from '@/contexts/LangContext'

interface PortfolioProject {
  id: string
  titleKey: string
  contextKey: string
  solutionKey: string
  resultKeys: string[]
  tags: string[]
  icon: typeof Search
  image: string
  imageAlt: string
}

const PROJECTS: PortfolioProject[] = [
  {
    id: 'audit-hotel',
    titleKey: 'portfolio.p1.title',
    contextKey: 'portfolio.p1.context',
    solutionKey: 'portfolio.p1.solution',
    resultKeys: ['portfolio.p1.result1', 'portfolio.p1.result2', 'portfolio.p1.result3'],
    tags: ['Audit SEO', 'UX Review', 'Core Web Vitals', 'Performance'],
    icon: Search,
    image: 'https://images.pexels.com/photos/60103/pexels-photo-60103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Luxury hotel architecture',
  },
  {
    id: 'backend-restaurant',
    titleKey: 'portfolio.p2.title',
    contextKey: 'portfolio.p2.context',
    solutionKey: 'portfolio.p2.solution',
    resultKeys: ['portfolio.p2.result1', 'portfolio.p2.result2', 'portfolio.p2.result3'],
    tags: ['Spring Boot', 'PostgreSQL', 'JWT', 'REST API'],
    icon: Code2,
    image: 'https://images.pexels.com/photos/24433378/pexels-photo-24433378.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Elegant restaurant dining setup',
  },
  {
    id: 'ai-automation',
    titleKey: 'portfolio.p3.title',
    contextKey: 'portfolio.p3.context',
    solutionKey: 'portfolio.p3.solution',
    resultKeys: ['portfolio.p3.result1', 'portfolio.p3.result2', 'portfolio.p3.result3'],
    tags: ['IA / LLM', 'Node.js', 'Automatisation', 'CMS'],
    icon: Cpu,
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'AI robotic hand digital network',
  },
]

export function Portfolio() {
  const { t } = useLang()
  const navigate = useNavigate()

  return (
    <div className="pt-28 pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back link */}
        <div className="mb-10">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-gold transition-colors group cursor-pointer"
          >
            <ArrowLeft className="h-4 w-4 transition-transform group-hover:-translate-x-1" />
            {t('portfolio.back')}
          </Link>
        </div>

        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-20">
          <div className="inline-flex items-center gap-1.5 mb-3">
            <Badge className="bg-gold/10 text-gold border-gold/30 gap-1.5 px-3 py-1 font-semibold">
              <ExternalLink className="h-3.5 w-3.5" />
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

        {/* Project Details */}
        <div className="space-y-20">
          {PROJECTS.map((project, index) => {
            const Icon = project.icon
            const isEven = index % 2 === 0

            return (
              <article
                key={project.id}
                className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center"
              >
                {/* Image */}
                <div className={`relative group ${isEven ? 'lg:order-1' : 'lg:order-2'}`}>
                  <div className="relative rounded-2xl overflow-hidden aspect-[16/10] shadow-xl">
                    <img
                      src={project.image}
                      alt={project.imageAlt}
                      loading="lazy"
                      className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-transparent to-transparent" />

                    {/* Floating icon */}
                    <div className="absolute bottom-4 left-4 flex items-center justify-center w-12 h-12 rounded-xl bg-gold/15 backdrop-blur border border-gold/30">
                      <Icon className="h-6 w-6 text-gold" />
                    </div>
                  </div>

                  {/* Accent frame */}
                  <div className="absolute -top-3 -left-3 w-full h-full rounded-2xl border border-gold/15 pointer-events-none" />
                </div>

                {/* Content */}
                <div className={`${isEven ? 'lg:order-2' : 'lg:order-1'}`}>
                  {/* Project number */}
                  <span className="text-5xl font-black text-gold/15 leading-none mb-2 block">
                    {String(index + 1).padStart(2, '0')}
                  </span>

                  <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mb-4">
                    {t(project.titleKey)}
                  </h2>

                  {/* Context */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">
                      {t('portfolio.context')}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(project.contextKey)}
                    </p>
                  </div>

                  {/* Solution */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-1.5">
                      {t('portfolio.solution')}
                    </p>
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {t(project.solutionKey)}
                    </p>
                  </div>

                  {/* Results */}
                  <div className="mb-5">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
                      {t('portfolio.results')}
                    </p>
                    <ul className="space-y-2">
                      {project.resultKeys.map((rKey) => (
                        <li key={rKey} className="flex items-start gap-2.5 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-gold shrink-0 mt-0.5" />
                          <span className="text-foreground/90 leading-snug font-medium">{t(rKey)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">
                      {t('portfolio.stack')}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <Badge
                          key={tag}
                          className="text-xs bg-muted text-muted-foreground border-border"
                        >
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>

        {/* Bottom CTA */}
        <div className="mt-24 text-center">
          <div className="inline-flex flex-col items-center gap-5 p-8 rounded-2xl border border-border/60 bg-card/60 backdrop-blur max-w-2xl mx-auto">
            <h3 className="text-xl sm:text-2xl font-bold tracking-tight">
              {t('portfolio.cta')}
            </h3>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <Button
                variant="gold"
                className="font-semibold gap-2 shadow-[0_0_20px_rgba(234,179,8,0.3)]"
                onClick={() => navigate({ pathname: '/', hash: '#contact' })}
              >
                {t('nav.cta')}
                <ArrowRight className="h-4 w-4" />
              </Button>
              <a
                href="https://wa.me/237659300327?text=Bonjour%20Nelo%2C%20j%27ai%20vu%20votre%20portfolio%20et%20j%27aimerais%20discuter%20d%27un%20projet."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-medium border border-border hover:border-gold/40 text-muted-foreground hover:text-gold transition-colors cursor-pointer"
              >
                WhatsApp direct
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
