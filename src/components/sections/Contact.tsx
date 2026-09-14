import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import {
  Send,
  Clock,
  FileText,
  Lightbulb,
  Loader2,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  Mail,
  PhoneCall,
  ArrowRight,
  ShieldCheck,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLang } from '@/contexts/LangContext'
import { supabase } from '@/lib/supabase'

const schema = z.object({
  company: z.string().min(2, "Le nom de l'entreprise est requis"),
  full_name: z.string().min(2, 'Votre nom est requis'),
  phone: z.string().min(8, 'Un numéro de téléphone valide est requis'),
  email: z.string().email("Format d'email invalide").optional().or(z.literal('')),
  need_type: z.string().min(1, 'Veuillez sélectionner un besoin'),
  message: z.string().min(10, 'Votre message est trop court (min. 10 caractères)'),
})

type FormData = z.infer<typeof schema>

const offerings = [
  {
    icon: Clock,
    titleKey: 'contact.audit.title',
    descKey: 'contact.audit.desc',
    highlight: true,
  },
  {
    icon: FileText,
    titleKey: 'contact.quote.title',
    descKey: 'contact.quote.desc',
    highlight: false,
  },
  {
    icon: Lightbulb,
    titleKey: 'contact.strategy.title',
    descKey: 'contact.strategy.desc',
    highlight: false,
  },
]

export function Contact() {
  const { t } = useLang()
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) })

  async function onSubmit(data: FormData) {
    setStatus('loading')
    const { error } = await supabase.from('contact_messages').insert({
      company: data.company.trim(),
      full_name: data.full_name.trim(),
      phone: data.phone.trim(),
      email: data.email?.trim() || null,
      need_type: data.need_type,
      message: data.message.trim(),
    })
    if (error) {
      console.error('Supabase submission error:', error)
      setStatus('error')
    } else {
      setStatus('success')
      reset()
    }
  }

  return (
    <section id="contact" className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-sm font-semibold tracking-widest text-gold uppercase mb-3">
            Contact & Consultation
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Offerings & Quick Access */}
          <div className="space-y-4 order-2 lg:order-1">
            {offerings.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.titleKey}
                  className={`p-5 rounded-2xl border transition-all duration-200 ${
                    item.highlight
                      ? 'border-gold/30 bg-gold/5 shadow-sm'
                      : 'border-border/60 bg-card hover:border-gold/30 hover:shadow-md'
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 shrink-0">
                      <Icon className="h-5 w-5 text-gold" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm mb-1">{t(item.titleKey)}</h3>
                      <p className="text-xs text-muted-foreground leading-relaxed">{t(item.descKey)}</p>

                      {/* Direct action on free audit */}
                      {item.highlight && (
                        <div className="mt-3.5 pt-3 border-t border-gold/15 flex items-center gap-2">
                          <a
                            href="https://wa.me/237694662523?text=Bonjour%20Nelo,%20je%20souhaite%20r%C3%A9server%20un%20audit%20technique%20gratuit."
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 text-xs font-semibold text-gold hover:underline cursor-pointer"
                          >
                            <MessageSquare className="h-3.5 w-3.5" />
                            {t('contact.audit.direct')}
                            <ArrowRight className="h-3 w-3" />
                          </a>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )
            })}

            {/* Direct Contact Cards */}
            <div className="p-5 rounded-2xl border border-border/60 bg-card space-y-3">
              <p className="text-xs font-semibold tracking-wide text-gold uppercase">
                Canaux Directs
              </p>
              <div className="flex items-center gap-3 text-sm">
                <PhoneCall className="h-4 w-4 text-gold shrink-0" />
                <a
                  href="https://wa.me/237694662523"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground hover:text-gold transition-colors text-xs font-medium"
                >
                  +237 694 66 25 23 (WhatsApp)
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-gold shrink-0" />
                <a
                  href="mailto:nelo.engineering@hotmail.com"
                  className="text-muted-foreground hover:text-gold transition-colors text-xs font-medium"
                >
                  nelo.engineering@hotmail.com
                </a>
              </div>
            </div>

            {/* Lead Magnet Box */}
            <div className="p-5 rounded-2xl border border-cyan-accent/20 bg-cyan-accent/5">
              <div className="flex items-start gap-3">
                <ShieldCheck className="h-5 w-5 text-cyan-accent shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold text-foreground">
                    Checklist Sécurité & Performance B2B
                  </h4>
                  <p className="text-[11px] text-muted-foreground leading-relaxed mt-1">
                    Les 10 points critiques pour sécuriser et accélérer les plateformes hôtelières et PME.
                  </p>
                  <a
                    href="https://wa.me/237694662523?text=Bonjour%20Nelo,%20je%20souhaite%20recevoir%20la%20Checklist%20S%C3%A9curit%C3%A9%20%26%20Performance."
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-[11px] font-semibold text-cyan-accent hover:underline mt-2"
                  >
                    Demander la checklist via WhatsApp
                    <ArrowRight className="h-3 w-3" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 space-y-5"
            >
              {/* Row 1: Company & Name */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="company">{t('contact.company')}</Label>
                  <Input
                    id="company"
                    {...register('company')}
                    placeholder={t('contact.company.placeholder')}
                    disabled={status === 'loading'}
                    className={errors.company ? 'border-destructive' : ''}
                  />
                  {errors.company && (
                    <p className="text-xs text-destructive">{errors.company.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="full_name">{t('contact.name')}</Label>
                  <Input
                    id="full_name"
                    {...register('full_name')}
                    placeholder={t('contact.name.placeholder')}
                    disabled={status === 'loading'}
                    className={errors.full_name ? 'border-destructive' : ''}
                  />
                  {errors.full_name && (
                    <p className="text-xs text-destructive">{errors.full_name.message}</p>
                  )}
                </div>
              </div>

              {/* Row 2: Phone & Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="phone">{t('contact.phone')}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    {...register('phone')}
                    placeholder={t('contact.phone.placeholder')}
                    disabled={status === 'loading'}
                    className={errors.phone ? 'border-destructive' : ''}
                  />
                  {errors.phone && (
                    <p className="text-xs text-destructive">{errors.phone.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="email">{t('contact.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder={t('contact.email.placeholder')}
                    disabled={status === 'loading'}
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
              </div>

              {/* Row 3: Need Type */}
              <div className="space-y-1.5">
                <Label htmlFor="need_type">{t('contact.need')}</Label>
                <Select
                  disabled={status === 'loading'}
                  onValueChange={(v) => setValue('need_type', v, { shouldValidate: true })}
                >
                  <SelectTrigger
                    id="need_type"
                    className={errors.need_type ? 'border-destructive' : ''}
                  >
                    <SelectValue placeholder="Sélectionner…" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="web">{t('contact.need.web')}</SelectItem>
                    <SelectItem value="ai">{t('contact.need.ai')}</SelectItem>
                    <SelectItem value="security">{t('contact.need.security')}</SelectItem>
                    <SelectItem value="audit">{t('contact.need.audit')}</SelectItem>
                    <SelectItem value="other">{t('contact.need.other')}</SelectItem>
                  </SelectContent>
                </Select>
                {errors.need_type && (
                  <p className="text-xs text-destructive">{errors.need_type.message}</p>
                )}
              </div>

              {/* Row 4: Message */}
              <div className="space-y-1.5">
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  placeholder={t('contact.message.placeholder')}
                  disabled={status === 'loading'}
                  className={errors.message ? 'border-destructive' : ''}
                  rows={5}
                />
                {errors.message && (
                  <p className="text-xs text-destructive">{errors.message.message}</p>
                )}
              </div>

              {/* Status messages */}
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

              <Button
                type="submit"
                variant="gold"
                className="w-full gap-2 transition-all hover:shadow-[0_0_20px_rgba(234,179,8,0.35)]"
                disabled={status === 'loading'}
              >
                {status === 'loading' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    {t('contact.sending')}
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" />
                    {t('contact.send')}
                  </>
                )}
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

