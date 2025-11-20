import { getProductsWithPricing } from '@/lib/products'
import { ProductCard } from '@/components/product/product-card'
import { ProductCategory } from '@/types'

export default async function DrinksPage() {
  const products = await getProductsWithPricing('DRINK', 'B2C')

  return (
    <div className="container py-12">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Drinks</h1>
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No drinks available.</p>
      )}
    </div>
  )
}

