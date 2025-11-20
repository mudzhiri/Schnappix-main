import { getProductsWithPricing } from '@/lib/products'
import { ProductCard } from '@/components/product/product-card'
import { ProductCategory } from '@/types'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export default async function StorePage() {
  const products = await getProductsWithPricing(undefined, 'B2C')

  const categories = [
    { name: 'Snacks', href: '/store/snacks', category: 'SNACK' as ProductCategory },
    { name: 'Drinks', href: '/store/drinks', category: 'DRINK' as ProductCategory },
    { name: 'Energy', href: '/store/energy', category: 'ENERGY' as ProductCategory },
    { name: 'Trends', href: '/store/trends', category: 'TREND' as ProductCategory },
  ]

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          SCHNAPPIX Store
        </h1>
        <p className="text-muted-foreground text-lg">
          Discover our wide selection of snacks, drinks, energy products, and trending items
        </p>
      </div>

      {/* Category Filters */}
      <div className="flex flex-wrap gap-4 mb-8">
        <Button variant="outline" asChild>
          <Link href="/store">All Products</Link>
        </Button>
        {categories.map((cat) => (
          <Button key={cat.href} variant="outline" asChild>
            <Link href={cat.href}>{cat.name}</Link>
          </Button>
        ))}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No products found.</p>
        </div>
      )}
    </div>
  )
}

