import { prisma } from './prisma'
import { UserRole, ProductCategory, ProductWithPrice } from '@/types'

/**
 * Get products with appropriate pricing based on user role
 */
export async function getProductsWithPricing(
  category?: ProductCategory,
  userRole?: UserRole
): Promise<ProductWithPrice[]> {
  const products = await prisma.product.findMany({
    where: category ? { category } : undefined,
    orderBy: { createdAt: 'desc' },
  })

  return products.map((product) => {
    let displayPrice: number | null = null
    let canViewPrice = false

    // B2C users see B2C prices
    if (userRole === 'B2C' || !userRole) {
      displayPrice = product.priceB2C
      canViewPrice = product.priceB2C !== null
    }
    // B2B approved users see B2B prices
    else if (userRole === 'B2B_APPROVED') {
      displayPrice = product.priceB2B
      canViewPrice = product.priceB2B !== null
    }
    // B2B pending users see no prices
    // Machines and payment systems may not have prices
    else if (product.category === 'MACHINE' || product.category === 'PAYMENT_SYSTEM') {
      canViewPrice = false
    }

    return {
      ...product,
      displayPrice,
      canViewPrice,
    }
  })
}

export async function getProductBySlug(
  slug: string,
  userRole?: UserRole
): Promise<ProductWithPrice | null> {
  const product = await prisma.product.findUnique({
    where: { slug },
  })

  if (!product) return null

  let displayPrice: number | null = null
  let canViewPrice = false

  if (userRole === 'B2C' || !userRole) {
    displayPrice = product.priceB2C
    canViewPrice = product.priceB2C !== null
  } else if (userRole === 'B2B_APPROVED') {
    displayPrice = product.priceB2B
    canViewPrice = product.priceB2B !== null
  } else if (product.category === 'MACHINE' || product.category === 'PAYMENT_SYSTEM') {
    canViewPrice = false
  }

  return {
    ...product,
    displayPrice,
    canViewPrice,
  }
}

