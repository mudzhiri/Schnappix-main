# 🚀 Deployment Guide - SCHNAPPIX Website

Anleitung zum Live-Schalten der SCHNAPPIX Website.

## 📋 Vorbereitung für Production

### 1. Datenbank auf PostgreSQL umstellen

SQLite ist nur für Entwicklung. Für Production benötigst du PostgreSQL:

#### Option A: Vercel Postgres (empfohlen für Vercel)
- Automatisch mit Vercel verbunden
- Kostenloser Plan verfügbar

#### Option B: Externe PostgreSQL-Datenbank
- **Supabase** (kostenloser Plan): https://supabase.com
- **Neon** (kostenloser Plan): https://neon.tech
- **Railway** (kostenloser Plan): https://railway.app
- **Render** (kostenloser Plan): https://render.com

### 2. Prisma Schema für PostgreSQL anpassen

```prisma
// prisma/schema.prisma
datasource db {
  provider = "postgresql"  // Statt "sqlite"
  url      = env("DATABASE_URL")
}
```

Dann ausführen:
```bash
npx prisma migrate dev --name init
npx prisma generate
```

### 3. Environment Variables für Production

Erstelle eine `.env.production` oder setze diese in deinem Hosting-Service:

```env
# Database (PostgreSQL Connection String)
DATABASE_URL="postgresql://user:password@host:5432/database?schema=public"

# NextAuth
NEXTAUTH_URL="https://yourdomain.com"
NEXTAUTH_SECRET="generiere-ein-sicheres-secret-mit-openssl-rand-hex-32"

# Optional: Analytics, etc.
NEXT_PUBLIC_SITE_URL="https://yourdomain.com"
```

**Wichtig**: Generiere ein sicheres Secret:
```bash
openssl rand -hex 32
```

---

## 🌐 Deployment-Optionen

### Option 1: Vercel (Empfohlen - Einfachste Lösung)

Vercel ist perfekt für Next.js und bietet:
- ✅ Automatisches Deployment
- ✅ Kostenloser Plan
- ✅ SSL-Zertifikate
- ✅ CDN
- ✅ Vercel Postgres Integration

#### Schritt-für-Schritt:

1. **Code auf GitHub pushen**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin https://github.com/yourusername/schnappix-website.git
   git push -u origin main
   ```

2. **Vercel Account erstellen**
   - Gehe zu https://vercel.com
   - Melde dich mit GitHub an

3. **Neues Projekt erstellen**
   - Klicke auf "Add New Project"
   - Wähle dein GitHub Repository
   - Vercel erkennt automatisch Next.js

4. **Environment Variables setzen**
   - Gehe zu Project Settings → Environment Variables
   - Füge hinzu:
     - `DATABASE_URL`
     - `NEXTAUTH_URL` (deine Domain)
     - `NEXTAUTH_SECRET`

5. **Vercel Postgres hinzufügen** (optional)
   - Im Dashboard: Storage → Create Database → Postgres
   - Automatisch als `DATABASE_URL` verfügbar

6. **Deploy**
   - Klicke auf "Deploy"
   - Warte 2-3 Minuten
   - Fertig! 🎉

#### Custom Domain hinzufügen:
- Settings → Domains
- Füge deine Domain hinzu
- Folge den DNS-Anweisungen

---

### Option 2: Railway

Railway bietet einfaches Deployment mit PostgreSQL:

1. **Account erstellen**: https://railway.app
2. **Neues Projekt**: "Deploy from GitHub repo"
3. **PostgreSQL hinzufügen**: "New" → "Database" → "PostgreSQL"
4. **Environment Variables setzen**:
   - `DATABASE_URL` (automatisch von Railway)
   - `NEXTAUTH_URL`
   - `NEXTAUTH_SECRET`
5. **Deploy**: Automatisch nach Git Push

---

### Option 3: Render

1. **Account erstellen**: https://render.com
2. **Neue Web Service**: "New" → "Web Service"
3. **GitHub Repository verbinden**
4. **Build Settings**:
   - Build Command: `npm run build`
   - Start Command: `npm start`
5. **PostgreSQL Database**: "New" → "PostgreSQL"
6. **Environment Variables setzen**
7. **Deploy**

---

### Option 4: Self-Hosting (VPS)

Für eigene Server (DigitalOcean, Hetzner, etc.):

#### Voraussetzungen:
- Node.js 18+
- PostgreSQL
- PM2 oder systemd
- Nginx (als Reverse Proxy)

#### Setup:

1. **Server vorbereiten**
   ```bash
   # Node.js installieren
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   
   # PostgreSQL installieren
   sudo apt-get install postgresql postgresql-contrib
   ```

2. **Code deployen**
   ```bash
   git clone https://github.com/yourusername/schnappix-website.git
   cd schnappix-website
   npm install
   npm run build
   ```

3. **Environment Variables setzen**
   ```bash
   nano .env.production
   ```

4. **PM2 für Process Management**
   ```bash
   npm install -g pm2
   pm2 start npm --name "schnappix" -- start
   pm2 save
   pm2 startup
   ```

5. **Nginx konfigurieren**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;
       
       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **SSL mit Let's Encrypt**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔧 Post-Deployment Checkliste

### 1. Datenbank Migration
```bash
# In Production ausführen
npx prisma migrate deploy
npx prisma generate
```

### 2. Seed-Daten (optional)
```bash
npm run db:seed
```

### 3. Testen
- [ ] Homepage lädt
- [ ] Store-Seiten funktionieren
- [ ] B2B Login funktioniert
- [ ] Produkte werden angezeigt
- [ ] Bilder laden (falls vorhanden)

### 4. Performance
- [ ] Next.js Images optimiert
- [ ] Static Assets gecacht
- [ ] Database Queries optimiert

### 5. Sicherheit
- [ ] `NEXTAUTH_SECRET` ist sicher
- [ ] `DATABASE_URL` ist nicht öffentlich
- [ ] HTTPS aktiviert
- [ ] CORS richtig konfiguriert

---

## 📊 Monitoring & Analytics

### Vercel Analytics (kostenlos)
- Automatisch in Vercel Dashboard
- Performance Metrics
- Error Tracking

### Sentry (Error Tracking)
```bash
npm install @sentry/nextjs
```

### Google Analytics
Füge in `src/app/layout.tsx` hinzu:
```tsx
<Script src="https://www.googletagmanager.com/gtag/js?id=GA_MEASUREMENT_ID" />
```

---

## 🔄 Continuous Deployment

### GitHub Actions (automatisches Deployment)

Erstelle `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      # Deployment zu deinem Service
```

---

## 🐛 Troubleshooting

### Problem: "Database connection failed"
- Prüfe `DATABASE_URL` Format
- Prüfe Firewall-Regeln
- Prüfe Datenbank-Credentials

### Problem: "NextAuth secret missing"
- Setze `NEXTAUTH_SECRET` in Environment Variables
- Generiere neues Secret: `openssl rand -hex 32`

### Problem: "Build failed"
- Prüfe Node.js Version (18+)
- Prüfe alle Dependencies
- Prüfe TypeScript Errors: `npm run lint`

### Problem: "Images not loading"
- Prüfe `next.config.js` für Image Domains
- Stelle sicher, dass Bilder in `/public` sind
- Prüfe Image URLs in Datenbank

---

## 💰 Kostenübersicht

### Vercel (Free Tier)
- ✅ 100GB Bandwidth/Monat
- ✅ Unlimited Requests
- ✅ Vercel Postgres (kostenlos bis 256MB)

### Railway (Free Tier)
- ✅ $5 Credit/Monat
- ✅ PostgreSQL inklusive

### Render (Free Tier)
- ✅ 750 Stunden/Monat
- ✅ PostgreSQL inklusive

---

## 📞 Support

Bei Problemen:
1. Prüfe Logs in deinem Hosting-Dashboard
2. Prüfe Vercel/Railway/Render Logs
3. Prüfe Browser Console für Frontend-Fehler
4. Prüfe Database Connection

---

## ✅ Quick Start (Vercel)

```bash
# 1. Code zu GitHub pushen
git add .
git commit -m "Ready for production"
git push

# 2. Auf Vercel.com gehen
# 3. "Add New Project" → GitHub Repo wählen
# 4. Environment Variables setzen
# 5. Deploy klicken
# 6. Fertig! 🎉
```

**Deine Website ist live unter**: `https://your-project.vercel.app`

---

Viel Erfolg beim Deployment! 🚀

