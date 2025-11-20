import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Package } from 'lucide-react'

const machineTypes = [
  {
    name: 'Snack Machines',
    href: '/machines/snack',
    description: 'Perfect for snacks, chips, and small items',
  },
  {
    name: 'Drink Machines',
    href: '/machines/drink',
    description: 'Refrigerated machines for beverages',
  },
  {
    name: 'Combi Machines',
    href: '/machines/combi',
    description: 'Combined snack and drink solutions',
  },
  {
    name: 'Smart Cooler',
    href: '/machines/smart-cooler',
    description: 'Advanced smart cooling technology',
  },
  {
    name: 'Payment Systems',
    href: '/machines/payment-systems',
    description: 'PAX, Nayax, and other payment solutions',
  },
]

export default function MachinesPage() {
  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          Vending Machines
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Discover our range of premium vending machines and payment systems
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {machineTypes.map((machine) => (
          <Card key={machine.href} className="hover:border-primary/40 transition-all hover:shadow-neon-blue">
            <CardHeader>
              <Package className="h-12 w-12 text-primary mb-4" />
              <CardTitle>{machine.name}</CardTitle>
              <CardDescription>{machine.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="outline" className="w-full" asChild>
                <Link href={machine.href}>Explore</Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}

