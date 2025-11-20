import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Users, ShoppingBag, CheckCircle } from 'lucide-react'

export default function B2BPage() {
  return (
    <div className="container py-12">
      {/* Hero */}
      <div className="text-center mb-16">
        <h1 className="font-heading text-5xl md:text-6xl font-bold mb-4">
          SCHNAPPIX B2B
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
          Wholesale solutions for businesses. Get access to NET pricing and exclusive B2B products.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button size="lg" asChild>
            <Link href="/b2b/register">Register Now</Link>
          </Button>
          <Button size="lg" variant="outline" asChild>
            <Link href="/b2b/login">Login</Link>
          </Button>
        </div>
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
        <Card>
          <CardHeader>
            <Users className="h-12 w-12 text-primary mb-4" />
            <CardTitle>B2B Registration</CardTitle>
            <CardDescription>
              Register your business to access wholesale pricing
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/b2b/register">Get Started</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <ShoppingBag className="h-12 w-12 text-secondary mb-4" />
            <CardTitle>NET Pricing</CardTitle>
            <CardDescription>
              View exclusive B2B prices after admin approval
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button variant="outline" className="w-full" asChild>
              <Link href="/b2b/products">View Products</Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CheckCircle className="h-12 w-12 text-primary mb-4" />
            <CardTitle>Approval Process</CardTitle>
            <CardDescription>
              Manual approval ensures secure B2B access
            </CardDescription>
          </CardHeader>
        </Card>
      </div>

      {/* Info Section */}
      <div className="bg-muted/10 rounded-lg p-8 border border-primary/20">
        <h2 className="font-heading text-3xl font-bold mb-4">How It Works</h2>
        <ol className="space-y-4 list-decimal list-inside text-muted-foreground">
          <li>Register your business account</li>
          <li>Wait for admin approval (you&apos;ll receive an email)</li>
          <li>Once approved, access NET pricing on all products</li>
          <li>Place wholesale orders with exclusive B2B pricing</li>
        </ol>
      </div>
    </div>
  )
}

