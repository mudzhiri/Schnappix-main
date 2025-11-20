# SCHNAPPIX Website

A complete, production-ready Next.js website for SCHNAPPIX - a multi-business company with 4 divisions: Store (B2C), B2B Wholesale, Vending Machines, and 24/7 Locations.

## 🚀 Features

- **Next.js 14** with App Router
- **TypeScript** for type safety
- **TailwindCSS** with custom design system
- **Prisma ORM** with SQLite (PostgreSQL ready)
- **NextAuth** for authentication
- **Role-based access control** (B2C, B2B_PENDING, B2B_APPROVED, ADMIN)
- **Responsive design** with futuristic neon theme
- **Server Components** for optimal performance

## 📦 Project Structure

```
schnappix-website/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (public routes)
│   │   ├── store/              # B2C Online Shop
│   │   ├── b2b/                # B2B Wholesale
│   │   ├── machines/           # Vending Machines
│   │   ├── locations/          # 24/7 Locations
│   │   └── api/                # API routes
│   ├── components/
│   │   ├── layout/            # Header, Footer, Navigation
│   │   ├── product/           # Product components
│   │   ├── providers/         # React providers
│   │   └── ui/                # Shadcn UI components
│   ├── lib/                   # Utilities and helpers
│   ├── types/                 # TypeScript types
│   └── data/                  # Placeholder data
├── prisma/
│   ├── schema.prisma          # Database schema
│   └── seed.ts               # Seed script
└── public/                    # Static assets
```

## 🎨 Design System

- **Background**: `#0A0A0A` (black)
- **Neon Blue**: `#1B9CFF`
- **Neon Pink**: `#FF2DAA`
- **White**: `#FFFFFF`
- **Grey**: `#D9D9D9`
- **Typography**: Montserrat (headings), Inter (body)

## 🛠️ Setup

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Set up environment variables:**
   ```bash
   cp .env.example .env
   ```
   
   Edit `.env` and set:
   ```
   DATABASE_URL="file:./dev.db"
   NEXTAUTH_URL="http://localhost:3000"
   NEXTAUTH_SECRET="your-secret-key-here"
   ```

3. **Set up database:**
   ```bash
   npx prisma generate
   npx prisma db push
   npm run db:seed
   ```

4. **Run development server:**
   ```bash
   npm run dev
   ```

5. **Open browser:**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Test Accounts

After seeding, you can use these test accounts:

- **Admin**: `admin@schnappix.com` / `admin123`
- **B2B Approved**: `b2b@schnappix.com` / `b2b123`
- **B2B Pending**: `pending@schnappix.com` / `pending123`

## 📋 Business Logic

### B2C Users
- See `priceB2C` on all products
- No login required to view prices
- Can browse all store categories

### B2B Users
- **Pending**: Cannot see any prices, must wait for admin approval
- **Approved**: See `priceB2B` (NET pricing) on all products
- Must register and login to access B2B portal

### Machines & Payment Systems
- Always visible to all users
- Prices optional (show "Request Quote" button)
- Specifications displayed in JSON format

## 🗺️ Routes

### Public Routes
- `/` - Homepage
- `/store` - B2C Store
- `/store/snacks` - Snacks category
- `/store/drinks` - Drinks category
- `/store/energy` - Energy drinks
- `/store/trends` - Trending products
- `/store/product/[slug]` - Product detail page
- `/machines` - Vending machines overview
- `/machines/*` - Machine category pages
- `/locations` - All locations
- `/locations/[slug]` - Location detail
- `/about` - About page
- `/contact` - Contact form

### B2B Routes
- `/b2b` - B2B landing page
- `/b2b/register` - B2B registration
- `/b2b/login` - B2B login
- `/b2b/products` - B2B products (requires login)

## 🔧 Development

### Database Commands

```bash
# Generate Prisma Client
npx prisma generate

# Push schema changes
npx prisma db push

# Seed database
npm run db:seed

# Open Prisma Studio
npm run db:studio
```

### Build for Production

```bash
npm run build
npm start
```

## 🚧 TODO / Integration Points

The following features are marked with TODO comments and ready for integration:

1. **Cart & Checkout**: Add to cart functionality and checkout process
2. **Shopify API**: Integration with Shopify for product sync
3. **Map Integration**: Google Maps or Mapbox for locations
4. **Contact Form**: Backend API for contact form submissions
5. **Image Upload**: Product and location image management
6. **Admin Panel**: Admin interface for user approval and product management
7. **Email Notifications**: Email service for B2B approval notifications

## 📝 Database Schema

### User
- `id`, `name`, `email`, `passwordHash`
- `role`: B2C | B2B_PENDING | B2B_APPROVED | ADMIN

### Product
- `id`, `name`, `slug`, `description`
- `images`: JSON array
- `category`: SNACK | DRINK | ENERGY | TREND | MACHINE | PAYMENT_SYSTEM
- `priceB2C`, `priceB2B` (nullable)
- `specs`: JSON (for machines)

### Location
- `id`, `name`, `address`, `city`
- `image`, `description`
- `coordinates`: JSON (lat/lng)

## 🎯 Production Deployment

### Environment Variables

For production, update:
- `DATABASE_URL` to PostgreSQL connection string
- `NEXTAUTH_SECRET` to a secure random string
- `NEXTAUTH_URL` to your production domain

### Database Migration

```bash
# For PostgreSQL
npx prisma migrate dev --name init
```

## 📄 License

Private project - All rights reserved

## 👥 Support

For questions or issues, please contact the development team.

---

Built with ❤️ using Next.js, TypeScript, and TailwindCSS

