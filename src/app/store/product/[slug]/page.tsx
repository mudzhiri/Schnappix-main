import { notFound } from 'next/navigation'
import Image from 'next/image'
import { getProductBySlug } from '@/lib/products'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { formatPrice } from '@/lib/utils'
import { ShoppingCart } from 'lucide-react'

interface ProductPageProps {
  params: {
    slug: string
  }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const product = await getProductBySlug(params.slug, 'B2C')

  if (!product) {
    notFound()
  }

  const images = product.images ? JSON.parse(product.images) : []
  const specs = product.specs ? JSON.parse(product.specs) : null

  return (
    <div className="container py-12">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Product Images */}
        <div className="space-y-4">
          <div className="relative aspect-square w-full overflow-hidden rounded-lg border border-primary/20">
            <Image
              src={images[0] || '/placeholder-product.jpg'}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </div>
          {images.length > 1 && (
            <div className="grid grid-cols-4 gap-4">
              {images.slice(1, 5).map((img: string, idx: number) => (
                <div
                  key={idx}
                  className="relative aspect-square overflow-hidden rounded-lg border border-primary/20"
                >
                  <Image
                    src={img}
                    alt={`${product.name} ${idx + 2}`}
                    fill
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Product Info */}
        <div className="space-y-6">
          <div>
            <h1 className="font-heading text-4xl font-bold mb-4">{product.name}</h1>
            {product.description && (
              <p className="text-muted-foreground text-lg">{product.description}</p>
            )}
          </div>

          {/* Price */}
          <div className="flex items-center space-x-4">
            {product.canViewPrice && product.displayPrice ? (
              <span className="font-heading text-3xl font-bold text-primary">
                {formatPrice(product.displayPrice)}
              </span>
            ) : (
              <span className="text-lg text-muted-foreground">Price on request</span>
            )}
          </div>

          {/* Add to Cart Button - TODO: Integrate with cart functionality */}
          <Button size="lg" className="w-full" disabled>
            <ShoppingCart className="h-5 w-5 mr-2" />
            Add to Cart (Coming Soon)
          </Button>

          {/* Specifications for machines */}
          {specs && (
            <Card>
              <CardHeader>
                <CardTitle>Specifications</CardTitle>
              </CardHeader>
              <CardContent>
                <dl className="space-y-2">
                  {Object.entries(specs).map(([key, value]) => (
                    <div key={key} className="flex justify-between">
                      <dt className="font-medium">{key}:</dt>
                      <dd className="text-muted-foreground">{String(value)}</dd>
                    </div>
                  ))}
                </dl>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

