import { MessageCircle } from 'lucide-react'
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
      variant="gold"
      size={size}
      className={cn(
        'shadow-[0_0_20px_rgba(234,179,8,0.25)] hover:shadow-[0_0_30px_rgba(234,179,8,0.5)]',
        fullWidth && 'w-full',
        className,
      )}
      asChild
    >
      <a href={whatsappUrl(message ?? bookCallMessage(lang))} target="_blank" rel="noopener noreferrer">
        <MessageCircle className="h-4 w-4" />
        {t('cta.book')}
      </a>
    </Button>
  )
}
