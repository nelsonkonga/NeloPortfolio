import { ArrowUpRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { useLang } from '@/contexts/LangContext'

const projects = [
  {
    titleKey: 'projects.p1.title',
    descKey: 'projects.p1.desc',
    tags: ['projects.p1.tag1', 'projects.p1.tag2', 'projects.p1.tag3'],
    image: 'https://images.pexels.com/photos/60103/pexels-photo-60103.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Luxury hotel architecture',
    metricKey: 'projects.p1.metric',
    metricLabelKey: 'projects.p1.metricLabel',
    resultKey: 'projects.p1.result',
  },
  {
    titleKey: 'projects.p2.title',
    descKey: 'projects.p2.desc',
    tags: ['projects.p2.tag1', 'projects.p2.tag2', 'projects.p2.tag3'],
    image: 'https://images.pexels.com/photos/24433378/pexels-photo-24433378.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'Elegant restaurant dining setup',
    metricKey: 'projects.p2.metric',
    metricLabelKey: 'projects.p2.metricLabel',
    resultKey: 'projects.p2.result',
  },
  {
    titleKey: 'projects.p3.title',
    descKey: 'projects.p3.desc',
    tags: ['projects.p3.tag1', 'projects.p3.tag2', 'projects.p3.tag3'],
    image: 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&h=650&w=940',
    imageAlt: 'AI robotic hand digital network',
    metricKey: 'projects.p3.metric',
    metricLabelKey: 'projects.p3.metricLabel',
    resultKey: 'projects.p3.result',
  },
]

export function Projects() {
  const { t } = useLang()

  return (
    <section id="projects" className="py-24 sm:py-32 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">
            Portfolio
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t('projects.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('projects.subtitle')}
          </p>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div
              key={project.titleKey}
              className="group rounded-2xl overflow-hidden border border-border/60 bg-card hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col"
            >
              {/* Image */}
              <div className="relative h-52 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.imageAlt}
                  loading="lazy"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 to-transparent" />
                {/* Metric */}
                <div className="absolute bottom-4 left-4">
                  <p className="text-lg font-bold text-gold">{t(project.metricKey)}</p>
                  <p className="text-xs text-muted-foreground">{t(project.metricLabelKey)}</p>
                </div>
              </div>

              {/* Content */}
              <div className="p-6 flex flex-col flex-1">
                <h3 className="font-bold text-lg mb-2 leading-snug group-hover:text-gold transition-colors">
                  {t(project.titleKey)}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed mb-4 flex-1">
                  {t(project.descKey)}
                </p>
                <div className="flex flex-wrap gap-2 mt-auto">
                  {project.tags.map((tag) => (
                    <Badge
                      key={tag}
                      className="text-xs bg-muted text-muted-foreground border-border"
                    >
                      {t(tag)}
                    </Badge>
                  ))}
                </div>
              </div>

              <div className="px-6 pb-5">
                <p className="flex items-center gap-1 text-xs font-semibold text-gold group-hover:gap-2 transition-all">
                  {t(project.resultKey)} <ArrowUpRight className="h-3.5 w-3.5 shrink-0" />
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
