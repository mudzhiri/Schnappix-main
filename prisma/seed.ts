import { PrismaClient } from '@prisma/client'
import bcrypt from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  console.log('🌱 Seeding database...')

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10)
  const admin = await prisma.user.upsert({
    where: { email: 'admin@schnappix.com' },
    update: {},
    create: {
      email: 'admin@schnappix.com',
      name: 'Admin User',
      passwordHash: adminPassword,
      role: 'ADMIN',
    },
  })
  console.log('✅ Created admin user')

  // Create B2B approved user
  const b2bPassword = await bcrypt.hash('b2b123', 10)
  const b2bUser = await prisma.user.upsert({
    where: { email: 'b2b@schnappix.com' },
    update: {},
    create: {
      email: 'b2b@schnappix.com',
      name: 'B2B Customer',
      passwordHash: b2bPassword,
      role: 'B2B_APPROVED',
    },
  })
  console.log('✅ Created B2B approved user')

  // Create B2B pending user
  const pendingPassword = await bcrypt.hash('pending123', 10)
  const pendingUser = await prisma.user.upsert({
    where: { email: 'pending@schnappix.com' },
    update: {},
    create: {
      email: 'pending@schnappix.com',
      name: 'Pending B2B',
      passwordHash: pendingPassword,
      role: 'B2B_PENDING',
    },
  })
  console.log('✅ Created B2B pending user')

  // Create sample products
  const products = [
    // Snacks
    {
      name: 'Premium Chips',
      slug: 'premium-chips',
      description: 'Delicious premium potato chips',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'SNACK',
      priceB2C: 2.99,
      priceB2B: 1.99,
    },
    {
      name: 'Chocolate Bar',
      slug: 'chocolate-bar',
      description: 'Rich milk chocolate bar',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'SNACK',
      priceB2C: 1.49,
      priceB2B: 0.99,
    },
    // Drinks
    {
      name: 'Cola Drink',
      slug: 'cola-drink',
      description: 'Refreshing cola beverage',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'DRINK',
      priceB2C: 2.49,
      priceB2B: 1.49,
    },
    {
      name: 'Mineral Water',
      slug: 'mineral-water',
      description: 'Pure mineral water',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'DRINK',
      priceB2C: 1.99,
      priceB2B: 1.19,
    },
    // Energy
    {
      name: 'Energy Drink',
      slug: 'energy-drink',
      description: 'High-energy drink with vitamins',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'ENERGY',
      priceB2C: 3.49,
      priceB2B: 2.49,
    },
    // Trends
    {
      name: 'Trending Snack',
      slug: 'trending-snack',
      description: 'Latest trending snack product',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'TREND',
      priceB2C: 4.99,
      priceB2B: 3.49,
    },
    // Machines
    {
      name: 'Snack Vending Machine',
      slug: 'snack-vending-machine',
      description: 'Premium snack vending machine with modern design',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'MACHINE',
      priceB2C: null,
      priceB2B: null,
      specs: JSON.stringify({
        type: 'snack',
        capacity: '200 items',
        dimensions: '180x80x200 cm',
        weight: '350 kg',
        power: '220V',
      }),
    },
    {
      name: 'Drink Vending Machine',
      slug: 'drink-vending-machine',
      description: 'Refrigerated drink vending machine',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'MACHINE',
      priceB2C: null,
      priceB2B: null,
      specs: JSON.stringify({
        type: 'drink',
        capacity: '150 cans',
        dimensions: '180x80x200 cm',
        weight: '400 kg',
        power: '220V',
        temperature: '-5°C',
      }),
    },
    {
      name: 'Combi Vending Machine',
      slug: 'combi-vending-machine',
      description: 'Combined snack and drink machine',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'MACHINE',
      priceB2C: null,
      priceB2B: null,
      specs: JSON.stringify({
        type: 'combi',
        capacity: '150 snacks + 100 drinks',
        dimensions: '200x80x220 cm',
        weight: '500 kg',
        power: '220V',
      }),
    },
    // Payment Systems
    {
      name: 'PAX Payment System',
      slug: 'pax-payment-system',
      description: 'PAX payment terminal for vending machines',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'PAYMENT_SYSTEM',
      priceB2C: null,
      priceB2B: null,
      specs: JSON.stringify({
        brand: 'PAX',
        connectivity: 'WiFi, 4G',
        paymentMethods: 'Card, Contactless, Mobile',
      }),
    },
    {
      name: 'Nayax Payment System',
      slug: 'nayax-payment-system',
      description: 'Nayax payment solution for vending',
      images: JSON.stringify(['/placeholder-product.jpg']),
      category: 'PAYMENT_SYSTEM',
      priceB2C: null,
      priceB2B: null,
      specs: JSON.stringify({
        brand: 'Nayax',
        connectivity: 'WiFi, 4G',
        paymentMethods: 'Card, Contactless, Mobile, Cashless',
      }),
    },
  ]

  for (const product of products) {
    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: product,
    })
  }
  console.log(`✅ Created ${products.length} products`)

  // Create sample locations
  const locations = [
    {
      name: 'City Center Location',
      address: 'Main Street 123',
      city: 'Berlin',
      description: '24/7 vending machine in the city center',
      image: '/placeholder-location.jpg',
      coordinates: JSON.stringify({ lat: 52.5200, lng: 13.4050 }),
    },
    {
      name: 'Airport Terminal',
      address: 'Airport Boulevard 45',
      city: 'Munich',
      description: 'Convenient location at the airport',
      image: '/placeholder-location.jpg',
      coordinates: JSON.stringify({ lat: 48.1351, lng: 11.5820 }),
    },
    {
      name: 'Shopping Mall',
      address: 'Mall Avenue 67',
      city: 'Hamburg',
      description: 'Multiple machines available',
      image: '/placeholder-location.jpg',
      coordinates: JSON.stringify({ lat: 53.5511, lng: 9.9937 }),
    },
  ]

  for (const location of locations) {
    await prisma.location.upsert({
      where: { id: location.name.toLowerCase().replace(/\s+/g, '-') },
      update: {},
      create: {
        ...location,
        id: location.name.toLowerCase().replace(/\s+/g, '-'),
      },
    })
  }
  console.log(`✅ Created ${locations.length} locations`)

  console.log('🎉 Seeding completed!')
  console.log('\n📝 Test accounts:')
  console.log('  Admin: admin@schnappix.com / admin123')
  console.log('  B2B Approved: b2b@schnappix.com / b2b123')
  console.log('  B2B Pending: pending@schnappix.com / pending123')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })

