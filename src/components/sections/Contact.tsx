import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Emphasis } from '@/components/ui/Emphasis'
import { useLang } from '@/contexts/LangContext'
import { PACKAGES, RESTAURANT_FORMULE, formatPackagePrice } from '@/data/packages'

export function Contact() {
  const { t, lang } = useLang()

  return (
    <section id="contact" className="py-20 sm:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6">
        <p className="text-sm font-medium text-muted-foreground mb-3">{t('contact.eyebrow')}</p>
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight mb-4">
          <Emphasis text={t('contact.title')} />
        </h2>
        <p className="text-muted-foreground mb-8">{t('contact.subtitle')}</p>

        <Link
          to="/options?formule=essentiel"
          className="inline-flex items-center justify-center gap-2 h-12 px-8 rounded-full bg-primary text-primary-foreground font-semibold"
        >
          {t('options.see')}
          <ArrowRight className="h-4 w-4" />
        </Link>

        <ul className="mt-8 space-y-2">
          {PACKAGES.map((pkg) => (
            <li key={pkg.id}>
              <Link to={`/options?formule=${pkg.id}`} className="text-sm font-medium text-primary">
                {t(pkg.nameKey)} · {t('options.from')} {formatPackagePrice(pkg.price, lang)}
              </Link>
            </li>
          ))}
          <li>
            <Link to={`/options?formule=${RESTAURANT_FORMULE}`} className="text-sm font-medium text-primary">
              {t('options.resto.name')}
            </Link>
          </li>
        </ul>
      </div>
    </section>
  )
}
