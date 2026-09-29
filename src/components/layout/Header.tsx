import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Instagram, Linkedin, Menu, Moon, Sun, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { useLang } from '@/contexts/LangContext'
import { bookCallMessage, SOCIAL, whatsappUrl } from '@/lib/links'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { key: 'nav.offer', href: '#offre' },
  { key: 'nav.examples', href: '#exemples' },
  { key: 'nav.method', href: '#methode' },
  { key: 'nav.pricing', href: '#tarifs' },
  { key: 'nav.faq', href: '#faq' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
]

export function Header() {
  const { theme, setTheme } = useTheme()
  const { lang, setLang, t } = useLang()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

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
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled ? 'glass bg-background/80 border-b border-border/60 shadow-sm' : 'bg-transparent',
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-3">
          <Link to="/" className="flex items-center gap-2 font-bold text-lg tracking-tight shrink-0">
            <img src="/NeloLogo3.png" alt="Nelo" className="h-8 w-8 rounded-lg object-cover border border-border/60" />
            <span>Nelo</span>
          </Link>

          <nav className="hidden lg:flex items-center gap-4">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer"
              >
                {t(item.key)}
              </button>
            ))}
          </nav>

          <div className="hidden lg:flex items-center gap-2">
            <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label={t('cta.instagram')} className="text-muted-foreground hover:text-gold p-2">
              <Instagram className="h-4 w-4" />
            </a>
            <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t('cta.linkedin')} className="text-muted-foreground hover:text-gold p-2">
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="text-xs font-semibold text-muted-foreground hover:text-foreground border border-border rounded-md px-2 py-1 cursor-pointer"
            >
              {lang === 'fr' ? 'EN' : 'FR'}
            </button>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>
            <Button variant="gold" size="sm" asChild>
              <a href={whatsappUrl(bookCallMessage(lang))} target="_blank" rel="noopener noreferrer">
                {t('nav.cta')}
              </a>
            </Button>
          </div>

          <button className="lg:hidden p-2" onClick={() => setMobileOpen(!mobileOpen)} aria-label="Menu">
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div className="lg:hidden glass bg-background/95 border-b border-border">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg cursor-pointer"
              >
                {t(item.key)}
              </button>
            ))}
            <div className="flex items-center gap-3 px-3 pt-3">
              <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer" aria-label={t('cta.instagram')} className="text-muted-foreground">
                <Instagram className="h-4 w-4" />
              </a>
              <a href={SOCIAL.linkedin} target="_blank" rel="noopener noreferrer" aria-label={t('cta.linkedin')} className="text-muted-foreground">
                <Linkedin className="h-4 w-4" />
              </a>
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="text-xs font-semibold border border-border rounded-md px-2 py-1 cursor-pointer"
              >
                {lang === 'fr' ? 'EN' : 'FR'}
              </button>
              <Button variant="ghost" size="icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="h-8 w-8">
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            <div className="pt-2 px-3">
              <Button variant="gold" className="w-full" asChild>
                <a href={whatsappUrl(bookCallMessage(lang))} target="_blank" rel="noopener noreferrer">
                  {t('nav.cta')}
                </a>
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
