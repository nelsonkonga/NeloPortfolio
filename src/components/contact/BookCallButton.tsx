import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useLang } from '@/contexts/LangContext'
import { bookCallMessage, whatsappUrl } from '@/lib/links'
import { cn } from '@/lib/utils'

interface BookCallButtonProps {
  className?: string
  size?: 'default' | 'sm' | 'lg'
  fullWidth?: boolean
  message?: string
  tone?: 'primary' | 'secondary'
}

export function BookCallButton({
  className,
  size = 'lg',
  fullWidth = false,
  message,
  tone = 'primary',
}: BookCallButtonProps) {
  const { t, lang } = useLang()
  const primary = tone === 'primary'

  return (
    <Button
      variant={primary ? 'default' : 'secondary'}
      size={size}
      className={cn(
        'h-16 rounded-full pl-7 pr-2 text-lg font-semibold',
        primary && 'shadow-[0_8px_20px_rgba(109,66,245,0.18)]',
        fullWidth && 'w-full',
        className,
      )}
      asChild
    >
      <a href={whatsappUrl(message ?? bookCallMessage(lang))} target="_blank" rel="noopener noreferrer">
        {t('cta.book')}
        <span className={cn(
          'ml-3 inline-flex h-12 w-12 items-center justify-center rounded-full',
          primary ? 'bg-white/10' : 'bg-foreground/5',
        )}>
          <ArrowRight className="h-4 w-4" />
        </span>
      </a>
    </Button>
  )
}
