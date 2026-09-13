import { Github, Linkedin, Facebook, Instagram, Twitter } from 'lucide-react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { useLang } from '@/contexts/LangContext'

const NAV_ITEMS = [
  { key: 'nav.expertise', href: '#expertise' },
  { key: 'nav.projects', href: '#projects' },
  { key: 'nav.methodology', href: '#methodology' },
  { key: 'nav.about', href: '#about' },
  { key: 'nav.contact', href: '#contact' },
]

const LEGAL_LINKS = [
  { key: 'footer.legal', path: '/mentions-legales' },
  { key: 'footer.privacy', path: '/confidentialite' },
  { key: 'footer.cgu', path: '/conditions-generales' },
]

const SOCIAL_LINKS = [
  { icon: Linkedin, href: 'https://www.linkedin.com/in/evrard-kamdem-946625236', label: 'LinkedIn' },
  { icon: Github, href: 'https://github.com/nelsonkonga', label: 'GitHub' },
  { icon: Facebook, href: 'https://web.facebook.com/the.king.nelo', label: 'Facebook' },
  { icon: Instagram, href: 'https://www.instagram.com/the.king.nelson', label: 'Instagram' },
  { icon: Twitter, href: 'https://x.com/the_king_nelo', label: 'X (Twitter)' },
]

export function Footer() {
  const { t } = useLang()
  const navigate = useNavigate()
  const location = useLocation()

  function scrollTo(href: string) {
    if (location.pathname !== '/') {
      navigate({ pathname: '/', hash: href })
    } else {
      document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <footer className="bg-muted/30 border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-12">
          {/* Brand */}
          <div>
            <Link to="/" className="flex items-center gap-2 mb-3">
              <img
                src="/NeloLogo3.png"
                alt="Logo Nelo"
                className="h-10 w-10 rounded-lg object-cover border border-border/60"
              />
              <p className="font-bold text-xl tracking-tight">
                <span className="text-foreground">Nelo</span>
                <span className="text-muted-foreground font-light mx-1">|</span>
                <span className="text-gold">Digital & IA</span>
              </p>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              {t('footer.desc')}
            </p>
            <div className="flex items-center flex-wrap gap-3 mt-5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = social.icon
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className="flex items-center justify-center w-9 h-9 rounded-lg border border-border hover:border-gold/40 hover:text-gold transition-colors text-muted-foreground"
                  >
                    <Icon className="h-4 w-4" />
                  </a>
                )
              })}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-4">Navigation</p>
            <ul className="space-y-2">
              {NAV_ITEMS.map((item) => (
                <li key={item.key}>
                  <button
                    onClick={() => scrollTo(item.href)}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                  >
                    {t(item.key)}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <p className="text-xs font-semibold tracking-widest text-gold uppercase mb-4">Légal</p>
            <ul className="space-y-2">
              {LEGAL_LINKS.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className="text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    {t(item.key)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Separator className="mb-6" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <span>{t('footer.copyright')}</span>
          <span>Yaoundé, Cameroun · International</span>
        </div>
      </div>
    </footer>
  )
}
