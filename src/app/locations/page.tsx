import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { MapPin } from 'lucide-react'
import Image from 'next/image'

export default async function LocationsPage() {
  const locations = await prisma.location.findMany({
    orderBy: { name: 'asc' },
  })

  return (
    <div className="container py-12">
      <div className="mb-12 text-center">
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          SCHNAPPIX 24/7 Locations
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Find our vending machines near you
        </p>
      </div>

      {/* Map Placeholder */}
      <div className="mb-12 relative aspect-video rounded-lg overflow-hidden border border-primary/20">
        <div className="w-full h-full bg-muted flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">Map integration placeholder</p>
            <p className="text-sm text-muted-foreground mt-2">
              TODO: Integrate with Google Maps or Mapbox
            </p>
          </div>
        </div>
      </div>

      {/* Locations List */}
      {locations.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {locations.map((location) => (
            <Card key={location.id} className="hover:border-primary/40 transition-all">
              {location.image && (
                <div className="relative aspect-video w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={location.image}
                    alt={location.name}
                    fill
                    className="object-cover"
                  />
                </div>
              )}
              <CardHeader>
                <CardTitle>{location.name}</CardTitle>
                <CardDescription>
                  <MapPin className="h-4 w-4 inline mr-1" />
                  {location.address}, {location.city}
                </CardDescription>
              </CardHeader>
              {location.description && (
                <CardContent>
                  <p className="text-sm text-muted-foreground">{location.description}</p>
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No locations available yet. Check back soon!</p>
        </div>
      )}
    </div>
  )
}

