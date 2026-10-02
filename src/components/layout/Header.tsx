import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { ArrowRight, Instagram, Linkedin, Menu, Moon, Sun, X } from 'lucide-react'
import { useTheme } from '@/contexts/ThemeContext'
import { useLang } from '@/contexts/LangContext'
import { bookCallMessage, SOCIAL, whatsappUrl } from '@/lib/links'

const NAV_ITEMS = [
  { key: 'nav.examples', href: '#exemples' },
  { key: 'nav.method', href: '#methode' },
  { key: 'nav.faq', href: '#faq' },
  { key: 'nav.offer', href: '#offre' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang, t } = useLang()
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/' && location.hash) {
      window.setTimeout(() => {
        document.querySelector(location.hash)?.scrollIntoView({ behavior: 'smooth' })
      }, 0)
    } else {
      window.scrollTo(0, 0)
    }
  }, [location.pathname, location.hash])

  function handleNavClick(href: string) {
    setMobileOpen(false)
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: href })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background border-b border-border">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-[auto_1fr_auto] items-center h-[72px] gap-4">
          <Link to="/" className="flex items-center gap-2 font-semibold text-[17px] tracking-tight shrink-0">
            <img src="/NeloLogo3.png" alt="Nelo" className="h-8 w-8 rounded-lg object-cover" />
            <span>Nelo</span>
          </Link>

          <nav className="hidden xl:flex items-center justify-center">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="px-3 py-2 text-[16px] font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          <div className="hidden xl:flex items-center justify-end gap-1">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label={t('cta.instagram')} className="text-foreground/70 hover:text-foreground p-2">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t('cta.linkedin')} className="text-foreground/70 hover:text-foreground p-2">
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-sm font-semibold px-2 py-1 cursor-pointer"
              aria-label={lang === 'fr' ? 'English' : 'Français'}
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <button
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label={theme === 'dark' ? 'Thème clair' : 'Thème sombre'}
              className="p-2 cursor-pointer"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </button>
            <button
              onClick={() => handleNavClick('#tarifs')}
              className="ml-2 inline-flex items-center gap-2 appearance-none rounded-full bg-secondary px-4 py-2 text-[16px] font-medium cursor-pointer"
            >
              {t('nav.pricing')}
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>

          <button className="xl:hidden justify-self-end p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="xl:hidden bg-background border-b border-border">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-3 py-2.5 text-base font-semibold cursor-pointer"
              >
                {t(item.key)}
              </button>
            ))}
            <div className="flex items-center gap-3 px-3 pt-3">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label={t('cta.instagram')}>
                <Instagram className="h-4 w-4" />
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t('cta.linkedin')}>
                <Linkedin className="h-4 w-4" />
              </a>
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="text-xs font-semibold border border-border rounded-full px-2 py-1 cursor-pointer"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 cursor-pointer" aria-label="Thème">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            </div>
            <div className="pt-2 px-3 flex flex-col gap-2">
              <button onClick={() => handleNavClick('#tarifs')} className="rounded-full bg-secondary py-3 font-semibold cursor-pointer">
                {t('nav.pricing')}
              </button>
              <a
                href={whatsappUrl(bookCallMessage(lang))}
                target="_blank"
                rel="noopener noreferrer"
                className="rounded-full bg-primary text-primary-foreground py-3 text-center font-semibold"
              >
                {t('nav.cta')}
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
