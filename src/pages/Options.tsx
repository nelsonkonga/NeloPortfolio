import { useMemo, useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useLang } from '@/contexts/LangContext'
import { PACKAGES, formatPackagePrice } from '@/data/packages'
import { whatsappUrl } from '@/lib/links'
import { supabase } from '@/lib/supabase'

type FormData = {
  hotel: string
  email: string
  terms: boolean
}

export function Options() {
  const { t, lang } = useLang()
  const [params] = useSearchParams()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const formule = params.get('formule')
  const mode = params.get('mode') === 'visite' ? 'visite' : 'envoi'
  const pkg = PACKAGES.find((item) => item.id === formule) ?? PACKAGES[1]
  const visit = mode === 'visite'
  const price = formatPackagePrice(visit ? pkg.visitPrice : pkg.price, lang)
  const name = t(pkg.nameKey)

  const schema = useMemo(
    () =>
      z.object({
        hotel: z.string(),
        email: z.string().trim().email(t('options.err.email')),
        terms: z.boolean().refine((value) => value, { message: t('options.err.terms') }),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
    defaultValues: { hotel: '', email: '', terms: false },
  })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    const hotel = data.hotel.trim()
    const email = data.email.trim()
    const modeLabel = visit ? t('options.mode.visit') : t('options.mode.supplied')
    const message = lang === 'fr'
      ? `Options de la formule ${name} (${price}, ${modeLabel}). Email : ${email}. Hôtel : ${hotel || 'non précisé'}. Conditions générales acceptées.`
      : `Options for the ${name} package (${price}, ${modeLabel}). Email: ${email}. Hotel: ${hotel || 'not given'}. Terms accepted.`

    if (!supabase) {
      setStatus('error')
      return
    }

    const { error } = await supabase.from('contact_messages').insert({
      company: hotel || 'Non précisé',
      full_name: hotel || email,
      email,
      phone: null,
      need_type: pkg.id,
      message,
    })

    if (error) {
      setStatus('error')
      return
    }

    setStatus('success')
    reset({ hotel: '', email: '', terms: false })
  }

  const fallback = lang === 'fr'
    ? `Bonjour Nelo, je veux les options de la formule ${name} (${price}) pour mon hôtel.`
    : `Hello Nelo, I want the options for the ${name} package (${price}) for my hotel.`

  return (
    <main className="pt-28 pb-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6">
        <Link to="/#tarifs" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
          <ArrowLeft className="h-4 w-4" />
          {t('options.back')}
        </Link>

        <p className="text-sm font-medium text-muted-foreground mb-3">{t('options.eyebrow')}</p>
        <h1 className="text-4xl sm:text-5xl font-semibold tracking-tight mb-4">
          {name}
          <span className="text-primary"> {price}</span>
        </h1>
        <p className="text-muted-foreground leading-relaxed mb-2">{t(pkg.taglineKey)}</p>
        <p className="text-sm font-medium mb-8">
          {t('tarifs.delay').replace('{n}', String(pkg.days))}
          {' · '}
          {visit ? t('options.mode.visit') : t('options.mode.supplied')}
        </p>

        <ul className="space-y-3 mb-10">
          {pkg.featureKeys.map((key) => (
            <li key={key} className="flex items-start gap-2 text-sm">
              <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
              <span>{t(key)}</span>
            </li>
          ))}
        </ul>

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-3xl border border-border bg-card p-6 sm:p-8 space-y-5">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight mb-2">{t('options.form.title')}</h2>
            <p className="text-sm text-muted-foreground">{t('options.form.lead')}</p>
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="hotel">
              {t('options.hotel')}
              <span className="text-muted-foreground font-normal"> {t('options.optional')}</span>
            </Label>
            <Input id="hotel" {...register('hotel')} placeholder={t('options.hotel.placeholder')} disabled={status === 'loading'} />
          </div>

          <div className="space-y-1.5">
            <Label htmlFor="email">{t('options.email')}</Label>
            <Input id="email" type="email" autoComplete="email" {...register('email')} placeholder={t('options.email.placeholder')} disabled={status === 'loading'} />
            {status !== 'success' && errors.email && <p className="text-xs text-destructive">{errors.email.message}</p>}
          </div>

          <div className="space-y-1.5">
            <label className="flex items-start gap-3 text-sm leading-relaxed">
              <input
                type="checkbox"
                className="mt-1 h-4 w-4 accent-primary"
                disabled={status === 'loading'}
                {...register('terms')}
              />
              <span>
                {t('options.terms.before')}{' '}
                <Link to="/conditions-generales" className="text-primary underline underline-offset-2">
                  {t('options.terms.link')}
                </Link>
                .
              </span>
            </label>
            {status !== 'success' && errors.terms && <p className="text-xs text-destructive">{errors.terms.message}</p>}
          </div>

          <Button type="submit" className="w-full rounded-full h-12" disabled={status === 'loading'}>
            {status === 'loading' && <Loader2 className="h-4 w-4 animate-spin" />}
            {t('options.submit')}
          </Button>

          {status === 'success' && <p className="text-sm text-primary">{t('options.success')}</p>}
          {status === 'error' && (
            <p className="text-sm text-destructive">
              {t('options.error')}{' '}
              <a href={whatsappUrl(fallback)} className="underline" target="_blank" rel="noopener noreferrer">
                WhatsApp
              </a>
            </p>
          )}
        </form>
      </div>
    </main>
  )
}
