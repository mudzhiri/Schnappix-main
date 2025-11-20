// Type definitions for SQLite (which doesn't support enums)
export type UserRole = 'B2C' | 'B2B_PENDING' | 'B2B_APPROVED' | 'ADMIN'
export type ProductCategory = 'SNACK' | 'DRINK' | 'ENERGY' | 'TREND' | 'MACHINE' | 'PAYMENT_SYSTEM'

export interface UserSession {
  id: string
  email: string
  name: string
  role: UserRole
}

export interface ProductWithPrice {
  id: string
  name: string
  slug: string
  description: string | null
  images: string
  category: ProductCategory
  priceB2C: number | null
  priceB2B: number | null
  specs: string | null
  displayPrice?: number | null
  canViewPrice: boolean
}

