import { Check } from 'lucide-react'
import { useLang } from '@/contexts/LangContext'

const STEPS = [
  { n: 1, key: 'options.step.info' },
  { n: 2, key: 'options.step.options' },
  { n: 3, key: 'options.step.pay' },
  { n: 4, key: 'options.step.brief' },
] as const

export function FunnelStepper({ current }: { current: 1 | 2 | 3 | 4 }) {
  const { t } = useLang()

  return (
    <nav aria-label={t('options.progress')} className="flex items-center justify-center gap-2 sm:gap-3 mb-8">
      {STEPS.map((step, index) => {
        const done = step.n < current
        const active = step.n === current
        return (
          <div key={step.n} className="flex items-center gap-2 sm:gap-3">
            <span className={`inline-flex items-center gap-2 shrink-0 whitespace-nowrap text-xs sm:text-sm ${active ? 'font-semibold text-foreground' : done ? 'text-primary' : 'text-muted-foreground'}`}>
              <span
                className={`inline-flex h-7 w-7 items-center justify-center rounded-full text-xs ${
                  active
                    ? 'bg-primary text-primary-foreground'
                    : done
                      ? 'bg-primary/15 text-primary'
                      : 'bg-muted text-muted-foreground'
                }`}
              >
                {done ? <Check className="h-3.5 w-3.5" /> : step.n}
              </span>
              <span className="hidden sm:inline">{t(step.key)}</span>
            </span>
            {index < STEPS.length - 1 && <span className="h-px w-4 sm:w-8 bg-border" />}
          </div>
        )
      })}
    </nav>
  )
}
