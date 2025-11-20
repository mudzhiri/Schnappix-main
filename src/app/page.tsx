import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { getProductsWithPricing } from '@/lib/products'
import { ProductCard } from '@/components/product/product-card'
import { ShoppingBag, Users, Package, MapPin } from 'lucide-react'

export default async function HomePage() {
  // Get bestsellers (first 8 products)
  const bestsellers = await getProductsWithPricing(undefined, 'B2C').then(
    (products) => products.slice(0, 8)
  )

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center bg-gradient-to-b from-background via-background to-primary/10">
        <div className="container text-center space-y-8">
          <h1 className="font-heading text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-glow">
            SCHNAPPIX
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
            Your trusted partner for snacks, drinks, energy products, and vending solutions
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" asChild>
              <Link href="/store">Shop Now</Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/b2b">B2B Wholesale</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Business Tiles */}
      <section className="py-16 bg-background">
        <div className="container">
          <h2 className="font-heading text-4xl font-bold text-center mb-12">
            Our Business Divisions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Store */}
            <Card className="group hover:border-primary/40 transition-all hover:shadow-neon-blue">
              <CardHeader>
                <ShoppingBag className="h-12 w-12 text-primary mb-4" />
                <CardTitle>SCHNAPPIX Store</CardTitle>
                <CardDescription>
                  B2C Online Shop for snacks, drinks, and trending products
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/store">Explore Store</Link>
                </Button>
              </CardContent>
            </Card>

            {/* B2B */}
            <Card className="group hover:border-secondary/40 transition-all hover:shadow-neon-pink">
              <CardHeader>
                <Users className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>SCHNAPPIX B2B</CardTitle>
                <CardDescription>
                  Wholesale solutions for businesses with NET pricing
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/b2b">B2B Portal</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Machines */}
            <Card className="group hover:border-primary/40 transition-all hover:shadow-neon-blue">
              <CardHeader>
                <Package className="h-12 w-12 text-primary mb-4" />
                <CardTitle>Vending Machines</CardTitle>
                <CardDescription>
                  Snack, drink, combi machines and payment systems
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/machines">View Machines</Link>
                </Button>
              </CardContent>
            </Card>

            {/* Locations */}
            <Card className="group hover:border-secondary/40 transition-all hover:shadow-neon-pink">
              <CardHeader>
                <MapPin className="h-12 w-12 text-secondary mb-4" />
                <CardTitle>SCHNAPPIX 24/7</CardTitle>
                <CardDescription>
                  Find our vending machine locations near you
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full" asChild>
                  <Link href="/locations">Find Locations</Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Bestsellers */}
      {bestsellers.length > 0 && (
        <section className="py-16 bg-background/50">
          <div className="container">
            <h2 className="font-heading text-4xl font-bold text-center mb-12">
              Bestsellers
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {bestsellers.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
            <div className="text-center mt-8">
              <Button size="lg" variant="outline" asChild>
                <Link href="/store">View All Products</Link>
              </Button>
            </div>
          </div>
        </section>
      )}

      {/* Machines Highlight */}
      <section className="py-16 bg-background">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-heading text-4xl font-bold mb-4">
                Premium Vending Solutions
              </h2>
              <p className="text-muted-foreground mb-6">
                Discover our range of state-of-the-art vending machines and payment systems. 
                From snack machines to smart coolers, we have the perfect solution for your business.
              </p>
              <Button size="lg" asChild>
                <Link href="/machines">Explore Machines</Link>
              </Button>
            </div>
            <div className="relative aspect-video rounded-lg overflow-hidden border border-primary/20">
              {/* TODO: Add machine showcase image */}
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <Package className="h-24 w-24 text-muted-foreground" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Teaser */}
      <section className="py-16 bg-background/50">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="relative aspect-video rounded-lg overflow-hidden border border-primary/20 order-2 lg:order-1">
              {/* TODO: Add map placeholder */}
              <div className="w-full h-full bg-muted flex items-center justify-center">
                <MapPin className="h-24 w-24 text-muted-foreground" />
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="font-heading text-4xl font-bold mb-4">
                Find Us Near You
              </h2>
              <p className="text-muted-foreground mb-6">
                SCHNAPPIX 24/7 locations are available around the clock. 
                Find the nearest vending machine location to you.
              </p>
              <Button size="lg" variant="outline" asChild>
                <Link href="/locations">View Locations</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

