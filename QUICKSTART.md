# Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Install Dependencies
```bash
npm install
```

### Step 2: Set Up Environment
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-change-this-in-production"
```

### Step 3: Initialize Database
```bash
npx prisma generate
npx prisma db push
npm run db:seed
```

### Step 4: Start Development Server
```bash
npm run dev
```

### Step 5: Open Browser
Navigate to [http://localhost:3000](http://localhost:3000)

## 🧪 Test the Application

### Test Accounts (after seeding)
- **Admin**: `admin@schnappix.com` / `admin123`
- **B2B Approved**: `b2b@schnappix.com` / `b2b123`
- **B2B Pending**: `pending@schnappix.com` / `pending123`

### Test B2B Flow
1. Go to `/b2b/register`
2. Register a new account (will be B2B_PENDING)
3. Try to login and view `/b2b/products` - you'll see "Pending Approval" message
4. Use admin account to approve users (TODO: Admin panel)

### Test Store Flow
1. Go to `/store` - see all products with B2C prices
2. Browse categories: `/store/snacks`, `/store/drinks`, etc.
3. Click on any product to see details

### Test Machines
1. Go to `/machines`
2. Browse different machine types
3. View machine specifications

### Test Locations
1. Go to `/locations`
2. See list of locations
3. Click on a location for details

## 📁 Project Structure Overview

```
src/
├── app/              # Next.js pages (App Router)
├── components/        # React components
│   ├── layout/       # Header, Footer, Navigation
│   ├── product/      # Product-related components
│   └── ui/           # Reusable UI components
├── lib/              # Utilities and helpers
└── types/            # TypeScript type definitions
```

## 🔧 Common Commands

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Database
npm run db:push      # Push schema changes
npm run db:seed      # Seed database
npm run db:studio    # Open Prisma Studio

# Linting
npm run lint
```

## 🎨 Design System

The project uses a futuristic neon theme:
- **Background**: Black (#0A0A0A)
- **Primary**: Neon Blue (#1B9CFF)
- **Secondary**: Neon Pink (#FF2DAA)
- **Fonts**: Montserrat (headings), Inter (body)

## 🚧 Next Steps

1. **Add Product Images**: Replace placeholder images in `/public`
2. **Integrate Shopify API**: Connect to Shopify for product sync
3. **Add Cart Functionality**: Implement shopping cart
4. **Map Integration**: Add Google Maps or Mapbox for locations
5. **Admin Panel**: Build admin interface for user approval
6. **Email Service**: Set up email notifications

## 📚 Documentation

See [README.md](./README.md) for full documentation.

