'use client'

import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

const menuItems = [
  {
    label: 'Store',
    href: '/store',
    submenu: [
      { label: 'Snacks', href: '/store/snacks' },
      { label: 'Drinks', href: '/store/drinks' },
      { label: 'Energy', href: '/store/energy' },
      { label: 'Trends', href: '/store/trends' },
    ],
  },
  {
    label: 'B2B',
    href: '/b2b',
    submenu: [
      { label: 'Products', href: '/b2b/products' },
      { label: 'Register', href: '/b2b/register' },
      { label: 'Login', href: '/b2b/login' },
    ],
  },
  {
    label: 'Machines',
    href: '/machines',
    submenu: [
      { label: 'Snack Machines', href: '/machines/snack' },
      { label: 'Drink Machines', href: '/machines/drink' },
      { label: 'Combi Machines', href: '/machines/combi' },
      { label: 'Smart Cooler', href: '/machines/smart-cooler' },
      { label: 'Payment Systems', href: '/machines/payment-systems' },
    ],
  },
  {
    label: 'Locations',
    href: '/locations',
  },
]

interface MobileMenuProps {
  onClose: () => void
}

export function MobileMenu({ onClose }: MobileMenuProps) {
  return (
    <div className="md:hidden border-t border-primary/20 bg-background">
      <div className="container py-4 space-y-2">
        {menuItems.map((item) => (
          <div key={item.label}>
            <Link
              href={item.href}
              className="flex items-center justify-between px-4 py-3 rounded-md hover:bg-primary/10 transition-colors"
              onClick={onClose}
            >
              <span className="font-medium">{item.label}</span>
              {item.submenu && <ChevronRight className="h-4 w-4" />}
            </Link>
            {item.submenu && (
              <div className="pl-4 space-y-1">
                {item.submenu.map((subItem) => (
                  <Link
                    key={subItem.href}
                    href={subItem.href}
                    className="block px-4 py-2 text-sm text-muted-foreground hover:text-primary transition-colors"
                    onClick={onClose}
                  >
                    {subItem.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

