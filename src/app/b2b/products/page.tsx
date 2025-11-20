import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import { authOptions } from '@/lib/auth'
import { getProductsWithPricing } from '@/lib/products'
import { ProductCard } from '@/components/product/product-card'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { AlertCircle } from 'lucide-react'

export default async function B2BProductsPage() {
  const session = await getServerSession(authOptions)

  if (!session) {
    redirect('/b2b/login')
  }

  const userRole = session.user.role
  const products = await getProductsWithPricing(undefined, userRole)

  // Show message if user is pending approval
  if (userRole === 'B2B_PENDING') {
    return (
      <div className="container py-12">
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <AlertCircle className="h-12 w-12 text-muted-foreground mb-4" />
            <CardTitle>Account Pending Approval</CardTitle>
            <CardDescription>
              Your B2B account is pending admin approval. You&apos;ll receive an email once your account is approved.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-muted-foreground">
              Once approved, you&apos;ll be able to view NET pricing on all products.
            </p>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container py-12">
      <div className="mb-8">
        <h1 className="font-heading text-4xl md:text-5xl font-bold mb-4">
          B2B Products
        </h1>
        <p className="text-muted-foreground text-lg">
          {userRole === 'B2B_APPROVED' 
            ? 'View all products with NET pricing'
            : 'View all products'}
        </p>
      </div>

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

