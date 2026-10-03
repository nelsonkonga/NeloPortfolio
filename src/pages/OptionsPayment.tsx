import { useState } from 'react'
import { Link, Navigate, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Loader2 } from 'lucide-react'
import { FunnelStepper } from '@/components/options/FunnelStepper'
import { Button } from '@/components/ui/button'
import { useLang } from '@/contexts/LangContext'
import { PACKAGES, RESTAURANT_FORMULE, formatPackagePrice } from '@/data/packages'
import { openCheckout } from '@/lib/checkout'
import { readLeadDraft, updateLeadDraft, type PaymentMethod } from '@/lib/lead'

export function OptionsPayment() {
  const { t, lang } = useLang()
  const [params] = useSearchParams()
  const draft = readLeadDraft()
  const formule = params.get('formule') || draft?.formule
  const restaurant = formule === RESTAURANT_FORMULE
  const pkg = PACKAGES.find((item) => item.id === formule)
  const [method, setMethod] = useState<PaymentMethod>(draft?.paymentMethod ?? 'card')
  const [status, setStatus] = useState<'idle' | 'loading' | 'unavailable'>('idle')

  if (!draft || draft.formule !== formule || (!restaurant && !pkg)) {
    return <Navigate to={`/options?formule=${formule || 'essentiel'}`} replace />
  }
  if (!draft.optionsReady) {
    return <Navigate to={`/options/choix?formule=${draft.formule}`} replace />
  }

  const lead = draft
  const name = restaurant ? t('options.resto.name') : t(pkg!.nameKey)
  const modeLabel = restaurant
    ? t('options.pay.quote')
    : lead.visit
      ? t('options.mode.visit')
      : t('options.mode.supplied')
  const total = restaurant
    ? t('options.pay.quote')
    : formatPackagePrice(lead.visit ? pkg!.visitPrice : pkg!.price, lang)

  function choose(next: PaymentMethod) {
    setMethod(next)
    updateLeadDraft({ paymentMethod: next })
  }

  async function pay() {
    setStatus('loading')
    updateLeadDraft({ paymentMethod: method, paymentAttempted: true })
    const result = await openCheckout({
      email: lead.email,
      phone: lead.phone,
      hotel: lead.hotel,
      formule: lead.formule,
      visit: lead.visit,
      method,
      amountLabel: total,
      successUrl: `${window.location.origin}/options/brief?formule=${lead.formule}`,
      cancelUrl: window.location.href,
    })
    if (result === 'unavailable') setStatus('unavailable')
  }

  function goToBrief() {
    updateLeadDraft({ paymentMethod: method, paymentAttempted: true })
  }

  return (
    <main className="pt-24 pb-16 bg-muted/40 min-h-screen">
      <div className="max-w-5xl mx-auto px-4">
        <FunnelStepper current={3} />
        <Link to={`/options/choix?formule=${lead.formule}`} className="inline-flex items-center gap-2 text-sm text-muted-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          {t('options.step.options')}
        </Link>
        <h1 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-8">{t('options.pay.title')}</h1>

        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-6 items-start">
          <section className="rounded-3xl border border-border bg-card p-6">
            <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-4">{t('options.pay.method')}</p>
            <div className="space-y-3" role="radiogroup" aria-label={t('options.pay.method')}>
              {([
                ['card', t('options.pay.card'), t('options.pay.card.hint')],
                ['paypal', t('options.pay.paypal'), t('options.pay.paypal.hint')],
              ] as const).map(([value, label, hint]) => {
                const active = method === value
                return (
                  <button
                    key={value}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => choose(value)}
                    className={`w-full text-left rounded-2xl border bg-card p-5 ${active ? 'border-primary shadow-[0_0_0_3px_rgba(109,66,245,0.15)]' : 'border-border'}`}
                  >
                    <span className="block font-semibold">{label}</span>
                    <span className="block text-sm text-muted-foreground mt-1">{hint}</span>
                  </button>
                )
              })}
            </div>
            <p className="text-sm text-muted-foreground mt-5">{t('options.pay.secure')}</p>
          </section>

          <aside className="rounded-3xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <p className="text-xs text-muted-foreground mb-1">{t('options.summary')}</p>
            <p className="font-semibold mb-1">{name}</p>
            <p className="text-sm text-muted-foreground mb-4">{modeLabel}</p>
            <p className="text-sm text-muted-foreground">{t('options.pay.due')}</p>
            <p className="text-3xl font-semibold tracking-tight mb-5">{total}</p>
            <Button type="button" className="w-full rounded-full h-12" onClick={pay} disabled={status === 'loading'}>
              {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
              {status === 'loading' ? t('options.pay.redirecting') : `${t('options.pay.continue')} · ${total}`}
              {status !== 'loading' && <ArrowRight className="h-4 w-4" />}
            </Button>
            {status === 'unavailable' && (
              <div className="mt-4 space-y-3">
                <p className="text-sm text-destructive">
                  {t('options.pay.error')} <strong className="font-semibold">{t('options.pay.uncharged')}</strong>
                </p>
                <Button variant="outline" className="w-full h-12 rounded-xl border-primary text-primary hover:bg-primary/5 hover:text-primary" asChild>
                  <Link to={`/options/brief?formule=${lead.formule}`} onClick={goToBrief}>
                    {t('options.pay.brief')}
                  </Link>
                </Button>
              </div>
            )}
          </aside>
        </div>
      </div>
    </main>
  )
}
