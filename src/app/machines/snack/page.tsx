import { getProductsWithPricing } from '@/lib/products'
import { ProductCard } from '@/components/product/product-card'
import { ProductCategory } from '@/types'

export default async function SnackMachinesPage() {
  const machines = await getProductsWithPricing('MACHINE', undefined).then(
    (products) => products.filter((p) => {
      const specs = p.specs ? JSON.parse(p.specs) : {}
      return specs.type === 'snack' || p.name.toLowerCase().includes('snack')
    })
  )

  return (
    <div className="container py-12">
      <h1 className="font-heading text-4xl md:text-5xl font-bold mb-8">Snack Machines</h1>
      {machines.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {machines.map((machine) => (
            <ProductCard key={machine.id} product={machine} />
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No snack machines available. Check back soon!</p>
      )}
    </div>
  )
}

