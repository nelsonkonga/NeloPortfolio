import { useEffect, useState } from 'react'
import { useNavigate, useLocation, Link } from 'react-router-dom'
import { Moon, Sun, Menu, X, Globe } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useTheme } from '@/contexts/ThemeContext'
import { useLang } from '@/contexts/LangContext'
import { cn } from '@/lib/utils'

const NAV_ITEMS = [
  { key: 'nav.expertise', href: '#expertise' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.methodology', href: '#methodology' },
  { key: 'nav.pricing', href: '/tarifs' },
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
    if (href.startsWith('/')) {
      navigate(href)
      window.scrollTo(0, 0)
    } else if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: href })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
        scrolled
          ? 'glass bg-background/80 border-b border-border/60 shadow-sm'
          : 'bg-transparent'
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg tracking-tight"
          >
            <img
              src="/NeloLogo3.png"
              alt="Logo Nelo"
              className="h-8 w-8 rounded-lg object-cover border border-border/60"
            />
            <span className="text-foreground">Nelo</span>
            <span className="text-muted-foreground font-light mx-0.5">|</span>
            <span className="text-gold">Digital & IA</span>
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-6">
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

          {/* Controls */}
          <div className="hidden md:flex items-center gap-2">
            {/* Lang toggle */}
            <button
              onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
              className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-2 py-1 cursor-pointer"
            >
              <Globe className="h-3.5 w-3.5" />
              {lang.toUpperCase()}
            </button>

            {/* Theme toggle */}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
              aria-label="Toggle theme"
              className="h-9 w-9"
            >
              {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
            </Button>

            {/* CTA */}
            <Button
              variant="gold"
              size="sm"
              className="shadow-[0_0_15px_rgba(234,179,8,0.2)] hover:shadow-[0_0_22px_rgba(234,179,8,0.45)] transition-all duration-300"
              onClick={() => handleNavClick('#contact')}
            >
              {t('nav.cta')}
            </Button>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden p-2 text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden glass bg-background/95 border-b border-border">
          <div className="px-4 pt-2 pb-6 space-y-1">
            {NAV_ITEMS.map((item) => (
              <button
                key={item.key}
                onClick={() => handleNavClick(item.href)}
                className="block w-full text-left px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors cursor-pointer"
              >
                {t(item.key)}
              </button>
            ))}
            <div className="flex items-center gap-2 pt-3 px-3">
              <button
                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                className="flex items-center gap-1.5 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors border border-border rounded-md px-2 py-1 cursor-pointer"
              >
                <Globe className="h-3.5 w-3.5" />
                {lang.toUpperCase()}
              </button>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                className="h-8 w-8"
              >
                {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </Button>
            </div>
            <div className="pt-2 px-3">
              <Button
                variant="gold"
                className="w-full"
                onClick={() => handleNavClick('#contact')}
              >
                {t('nav.cta')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
