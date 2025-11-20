'use client'

import Link from 'next/link'
import { ChevronDown } from 'lucide-react'
import { useState } from 'react'
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

export function MegaMenu() {
  const [openMenu, setOpenMenu] = useState<string | null>(null)

  return (
    <div className="flex items-center space-x-1">
      {menuItems.map((item) => (
        <div
          key={item.label}
          className="relative"
          onMouseEnter={() => item.submenu && setOpenMenu(item.label)}
          onMouseLeave={() => setOpenMenu(null)}
        >
          {item.submenu ? (
            <>
              <Button
                variant="ghost"
                className="flex items-center space-x-1"
                asChild
              >
                <Link href={item.href}>
                  <span>{item.label}</span>
                  <ChevronDown className="h-4 w-4" />
                </Link>
              </Button>
              {openMenu === item.label && (
                <div className="absolute left-0 top-full mt-2 w-48 rounded-md border border-primary/20 bg-background p-2 shadow-lg">
                  {item.submenu.map((subItem) => (
                    <Link
                      key={subItem.href}
                      href={subItem.href}
                      className="block rounded-md px-3 py-2 text-sm hover:bg-primary/10 hover:text-primary transition-colors"
                    >
                      {subItem.label}
                    </Link>
                  ))}
                </div>
              )}
            </>
          ) : (
            <Button variant="ghost" asChild>
              <Link href={item.href}>{item.label}</Link>
            </Button>
          )}
        </div>
      ))}
    </div>
  )
}

