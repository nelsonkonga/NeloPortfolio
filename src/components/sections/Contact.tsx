import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { AlertCircle, CheckCircle2, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { BookCallButton } from '@/components/contact/BookCallButton'
import { useLang } from '@/contexts/LangContext'
import { whatsappUrl } from '@/lib/links'
import { supabase } from '@/lib/supabase'

type FormData = {
  company: string
  full_name: string
  phone: string
  need_type: string
}

export function Contact() {
  const { t, lang } = useLang()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const schema = useMemo(
    () =>
      z.object({
        company: z.string().min(2, t('contact.err.place')),
        full_name: z.string().min(2, t('contact.err.name')),
        phone: z.string().min(8, t('contact.err.phone')),
        need_type: z.string().min(1, t('contact.err.need')),
      }),
    [t],
  )

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    const formula = t(`contact.need.${data.need_type}`)
    const company = data.company.trim()
    const fullName = data.full_name.trim()
    const phone = data.phone.trim()
    const message = lang === 'fr'
      ? `Bonjour Nelo, je souhaite un appel de 20 minutes. Hôtel : ${company}. Nom : ${fullName}. WhatsApp : ${phone}. Formule : ${formula}.`
      : `Hello Nelo, I would like a 20-minute call. Hotel: ${company}. Name: ${fullName}. WhatsApp: ${phone}. Package: ${formula}.`

    const popup = window.open(whatsappUrl(message), '_blank')
    if (popup) popup.opener = null

    let saved = false
    if (supabase) {
      const { error } = await supabase.from('contact_messages').insert({
        company,
        full_name: fullName,
        phone,
        email: null,
        need_type: data.need_type,
        message,
      })
      saved = !error
    }

    if (popup || saved) {
      setStatus('success')
      reset()
    } else {
      setStatus('error')
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-28">
      <div className="max-w-xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">{t('contact.eyebrow')}</p>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">{t('contact.title')}</h2>
        <p className="text-muted-foreground mb-6">{t('contact.subtitle')}</p>
        <BookCallButton fullWidth className="mb-8" />

        <form onSubmit={handleSubmit(onSubmit)} className="rounded-2xl border border-border bg-card p-6 space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="company">{t('contact.company')}</Label>
            <Input id="company" {...register('company')} placeholder={t('contact.company.placeholder')} disabled={status === 'loading'} />
            {errors.company && <p className="text-xs text-destructive">{errors.company.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="full_name">{t('contact.name')}</Label>
            <Input id="full_name" {...register('full_name')} placeholder={t('contact.name.placeholder')} disabled={status === 'loading'} />
            {errors.full_name && <p className="text-xs text-destructive">{errors.full_name.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="phone">{t('contact.phone')}</Label>
            <Input id="phone" type="tel" {...register('phone')} placeholder={t('contact.phone.placeholder')} disabled={status === 'loading'} />
            {errors.phone && <p className="text-xs text-destructive">{errors.phone.message}</p>}
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="need_type">{t('contact.need')}</Label>
            <Select disabled={status === 'loading'} onValueChange={(v) => setValue('need_type', v, { shouldValidate: true })}>
              <SelectTrigger id="need_type">
                <SelectValue placeholder={t('contact.need.placeholder')} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="decouverte">{t('contact.need.decouverte')}</SelectItem>
                <SelectItem value="essentiel">{t('contact.need.essentiel')}</SelectItem>
                <SelectItem value="complet">{t('contact.need.complet')}</SelectItem>
                <SelectItem value="unsure">{t('contact.need.unsure')}</SelectItem>
                <SelectItem value="restaurant">{t('contact.need.restaurant')}</SelectItem>
              </SelectContent>
            </Select>
            {errors.need_type && <p className="text-xs text-destructive">{errors.need_type.message}</p>}
          </div>

          {status === 'success' && (
            <div className="flex items-center gap-2 text-sm text-green-500 bg-green-500/10 rounded-lg px-4 py-3">
              <CheckCircle2 className="h-4 w-4 shrink-0" />
              {t('contact.success')}
            </div>
          )}
          {status === 'error' && (
            <div className="flex items-center gap-2 text-sm text-destructive bg-destructive/10 rounded-lg px-4 py-3">
              <AlertCircle className="h-4 w-4 shrink-0" />
              {t('contact.error')}
            </div>
          )}

          <Button type="submit" variant="outline" className="w-full" disabled={status === 'loading'}>
            {status === 'loading' ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            {status === 'loading' ? t('contact.sending') : t('contact.send')}
          </Button>
        </form>
      </div>
    </section>
  )
}
