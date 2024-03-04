'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { cn } from '@/lib/utils'
import { navigations } from '@/constants'

const Navigations = () => {
  const pathname = usePathname()

  return (
    <div className="flex items-center gap-x-2 md:gap-x-4 lg:gap-x-8">
      {navigations.map(item => (
        <Link
          key={item.label}
          href={item.href}
          className={cn(
            'hover:text-foreground/50',
            item.href === pathname && 'text-foreground/50'
          )}
        >
          {item.label}
        </Link>
      ))}
    </div>
  )
}

export default Navigations
