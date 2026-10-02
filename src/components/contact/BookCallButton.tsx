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
}

export function BookCallButton({
  className,
  size = 'lg',
  fullWidth = false,
  message,
}: BookCallButtonProps) {
  const { t, lang } = useLang()

  return (
    <Button
      variant="default"
      size={size}
      className={cn(
        'h-16 rounded-full pl-7 pr-2 text-lg font-semibold shadow-[0_8px_20px_rgba(109,66,245,0.18)]',
        fullWidth && 'w-full',
        className,
      )}
      asChild
    >
      <a href={whatsappUrl(message ?? bookCallMessage(lang))} target="_blank" rel="noopener noreferrer">
        {t('cta.book')}
        <span className="ml-3 inline-flex h-12 w-12 items-center justify-center rounded-full bg-white/10">
          <ArrowRight className="h-4 w-4" />
        </span>
      </a>
    </Button>
  )
}
