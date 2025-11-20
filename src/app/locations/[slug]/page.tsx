import { notFound } from 'next/navigation'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import Image from 'next/image'
import { MapPin } from 'lucide-react'

interface LocationPageProps {
  params: {
    slug: string
  }
}

export default async function LocationPage({ params }: LocationPageProps) {
  const location = await prisma.location.findFirst({
    where: {
      OR: [
        { id: params.slug },
        { name: { contains: params.slug, mode: 'insensitive' } },
      ],
    },
  })

  if (!location) {
    notFound()
  }

  const coordinates = location.coordinates ? JSON.parse(location.coordinates) : null

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Image */}
        {location.image && (
          <div className="relative aspect-video w-full overflow-hidden rounded-lg border border-primary/20">
            <Image
              src={location.image}
              alt={location.name}
              fill
              className="object-cover"
            />
          </div>
        )}

        {/* Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-heading text-4xl font-bold mb-4">{location.name}</h1>
            <div className="flex items-center text-muted-foreground mb-4">
              <MapPin className="h-5 w-5 mr-2" />
              <span>
                {location.address}, {location.city}
              </span>
            </div>
            {location.description && (
              <p className="text-lg text-muted-foreground">{location.description}</p>
            )}
          </div>

          {/* Map Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle>Location Map</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-video w-full overflow-hidden rounded-lg bg-muted">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <MapPin className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
                    <p className="text-sm text-muted-foreground">
                      {coordinates
                        ? `Coordinates: ${coordinates.lat}, ${coordinates.lng}`
                        : 'Map integration placeholder'}
                    </p>
                    <p className="text-xs text-muted-foreground mt-2">
                      TODO: Integrate with Google Maps or Mapbox
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

