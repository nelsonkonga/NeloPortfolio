import { Emphasis } from '@/components/ui/Emphasis'
import { useLang } from '@/contexts/LangContext'

const STEPS = [
  ['01', '/hotels/reception.jpg', 'photo.accueil', 'method.s1.title', 'method.s1.desc'],
  ['02', '/hotels/petitdej.jpg', 'photo.sejour', 'method.s2.title', 'method.s2.desc'],
  ['03', '/hotels/nuit.jpg', 'photo.nuit', 'method.s3.title', 'method.s3.desc'],
  ['04', '/hotels/terrasse.jpg', 'photo.terrasse', 'method.s4.title', 'method.s4.desc'],
] as const

export function Methodology() {
  const { t } = useLang()

  return (
    <section id="methode" className="py-20 sm:py-28">
      <div className="max-w-[1100px] mx-auto px-4 sm:px-6">
        <h2 className="text-3xl sm:text-5xl font-semibold tracking-tight text-center mb-4"><Emphasis text={t('method.title')} /></h2>
        <p className="text-center text-muted-foreground text-lg max-w-2xl mx-auto mb-14">{t('method.subtitle')}</p>
        <ol className="space-y-12">
          {STEPS.map(([number, src, alt, title, desc]) => (
            <li key={number} className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <img src={src} alt={t(alt)} className="w-full h-72 object-cover rounded-3xl bg-muted" />
              <div>
                <p className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-sm font-medium text-primary mb-4">
                  <span className="h-2 w-2 rounded-full bg-primary" />
                  {number}
                </p>
                <h3 className="text-2xl font-semibold mb-3">{t(title)}</h3>
                <p className="text-muted-foreground leading-relaxed">{t(desc)}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  )
}
