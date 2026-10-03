import { BedDouble, CalendarClock, PenLine, Wallet } from 'lucide-react'
import { useLang } from '@/contexts/LangContext'

const BENEFITS = [
  [BedDouble, 'offer.b1.title', 'offer.b1.desc'],
  [CalendarClock, 'offer.b2.title', 'offer.b2.desc'],
  [PenLine, 'offer.b3.title', 'offer.b3.desc'],
  [Wallet, 'offer.b4.title', 'offer.b4.desc'],
] as const

export function Offer() {
  const { t } = useLang()

  return (
    <section id="offre" className="py-8 sm:py-12">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {BENEFITS.map(([Icon, title, desc]) => (
            <div key={title} className="rounded-3xl bg-muted p-5 text-center">
              <span className="mx-auto mb-4 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-background text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <h3 className="font-semibold mb-2">{t(title)}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{t(desc)}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
