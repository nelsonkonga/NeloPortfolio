import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Send, Clock, FileText, Lightbulb, Loader2, CheckCircle2, AlertCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { useLang } from '@/contexts/LangContext'
import { supabase } from '@/lib/supabase'

const schema = z.object({
  company: z.string().min(1, 'Champ requis'),
  full_name: z.string().min(2, 'Nom trop court'),
  email: z.string().email('Email invalide'),
  need_type: z.string().min(1, 'Champ requis'),
  message: z.string().min(10, 'Message trop court'),
})

type FormData = z.infer<typeof schema>

const offerings = [
  { icon: Clock, titleKey: 'contact.audit.title', descKey: 'contact.audit.desc' },
  { icon: FileText, titleKey: 'contact.quote.title', descKey: 'contact.quote.desc' },
  { icon: Lightbulb, titleKey: 'contact.strategy.title', descKey: 'contact.strategy.desc' },
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
      company: data.company,
      full_name: data.full_name,
      email: data.email,
      need_type: data.need_type,
      message: data.message,
    })
    if (error) {
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
            Contact
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            {t('contact.title')}
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {t('contact.subtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          {/* Offerings */}
          <div className="space-y-4 order-2 lg:order-1">
            {offerings.map((item) => {
              const Icon = item.icon
              return (
                <div
                  key={item.titleKey}
                  className="flex gap-4 p-5 rounded-2xl border border-border/60 bg-card hover:border-gold/30 hover:shadow-md transition-all duration-200"
                >
                  <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gold/10 shrink-0">
                    <Icon className="h-5 w-5 text-gold" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm mb-1">{t(item.titleKey)}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{t(item.descKey)}</p>
                  </div>
                </div>
              )
            })}

            <div className="p-5 rounded-2xl border border-gold/20 bg-gold/5">
              <p className="text-xs text-muted-foreground">Email</p>
              <a href="mailto:nelo.engineering@hotmail.com" className="text-sm font-medium mt-1 hover:text-gold transition-colors block">
                nelo.engineering@hotmail.com
              </a>
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-2 order-1 lg:order-2">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="rounded-2xl border border-border/60 bg-card p-6 sm:p-8 space-y-5"
            >
              {/* Row 1 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="company">{t('contact.company')}</Label>
                  <Input
                    id="company"
                    {...register('company')}
                    placeholder="Acme Corp"
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
                    placeholder="Jean Dupont"
                    className={errors.full_name ? 'border-destructive' : ''}
                  />
                  {errors.full_name && (
                    <p className="text-xs text-destructive">{errors.full_name.message}</p>
                  )}
                </div>
              </div>

              {/* Row 2 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label htmlFor="email">{t('contact.email')}</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register('email')}
                    placeholder="vous@entreprise.com"
                    className={errors.email ? 'border-destructive' : ''}
                  />
                  {errors.email && (
                    <p className="text-xs text-destructive">{errors.email.message}</p>
                  )}
                </div>
                <div className="space-y-1.5">
                  <Label htmlFor="need_type">{t('contact.need')}</Label>
                  <Select onValueChange={(v) => setValue('need_type', v, { shouldValidate: true })}>
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
              </div>

              {/* Message */}
              <div className="space-y-1.5">
                <Label htmlFor="message">{t('contact.message')}</Label>
                <Textarea
                  id="message"
                  {...register('message')}
                  placeholder="Décrivez votre projet, vos besoins, vos contraintes…"
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
                className="w-full gap-2"
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
