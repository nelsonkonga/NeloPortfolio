import * as React from 'react'
import { cn } from '@/lib/utils'

function Badge({ className, ...props }: React.HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full border border-border px-3 py-1 text-xs font-medium transition-colors',
        className
      )}
      {...props}
    />
  )
}

export { Badge }
