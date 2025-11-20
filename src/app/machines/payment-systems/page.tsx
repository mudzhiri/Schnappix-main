import { getProductsWithPricing } from '@/lib/products'
import { ProductCard } from '@/components/product/product-card'
import { ProductCategory } from '@/types'

export default async function PaymentSystemsPage() {
  const systems = await getProductsWithPricing('PAYMENT_SYSTEM', undefined)

  return (
    <div className="container py-12">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Payment Systems</h1>
      <p className="text-muted-foreground mb-8">
        PAX, Nayax, and other payment solutions for vending machines
      </p>
      {systems.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system) => (
            <ProductCard key={system.id} product={system} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No payment systems available. Check back soon!</p>
      )}
    </div>
  )
}

