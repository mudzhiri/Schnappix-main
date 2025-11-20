import Link from 'next/link'
import Image from 'next/image'
import { Card, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { formatPrice } from '@/lib/utils'
import { ProductWithPrice } from '@/types'

interface ProductCardProps {
  product: ProductWithPrice
  showPrice?: boolean
}

export function ProductCard({ product, showPrice = true }: ProductCardProps) {
  const images = product.images ? JSON.parse(product.images) : []
  const mainImage = images[0] || '/placeholder-product.jpg'

  return (
    <Card className="group overflow-hidden border-primary/20 hover:border-primary/40 transition-all hover:shadow-neon-blue">
      <Link href={`/store/product/${product.slug}`}>
        <div className="relative aspect-square w-full overflow-hidden bg-muted">
          <Image
            src={mainImage}
            alt={product.name}
            fill
            className="object-cover transition-transform group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
      </Link>
      <CardContent className="p-4">
        <Link href={`/store/product/${product.slug}`}>
          <h3 className="font-heading font-semibold mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
        </Link>
        {product.description && (
          <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
            {product.description}
          </p>
        )}
      </CardContent>
      <CardFooter className="p-4 pt-0 flex items-center justify-between">
        {showPrice && product.canViewPrice && product.displayPrice ? (
          <span className="font-heading text-lg font-bold text-primary">
            {formatPrice(product.displayPrice)}
          </span>
        ) : product.category === 'MACHINE' || product.category === 'PAYMENT_SYSTEM' ? (
          <span className="text-sm text-muted-foreground">Request Quote</span>
        ) : (
          <span className="text-sm text-muted-foreground">Price on request</span>
        )}
        <Button size="sm" variant="outline" asChild>
          <Link href={`/store/product/${product.slug}`}>View</Link>
        </Button>
      </CardFooter>
    </Card>
  )
}

