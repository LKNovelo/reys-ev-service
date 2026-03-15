# Rey's EV Service — Phase 3 Build

**Stack:** Next.js 15 · Tailwind CSS · Sanity CMS · Vercel · Cloudflare DNS

---

## Project structure

```
reys-ev-service/
├── src/
│   ├── app/
│   │   ├── globals.css          # Brand CSS variables + Tailwind base
│   │   ├── layout.tsx           # Root layout + metadata
│   │   ├── page.tsx             # Home page
│   │   └── studio/[[...tool]]/  # Embedded Sanity Studio at /studio
│   ├── components/
│   │   ├── Logo.tsx             # Interstate shield SVG
│   │   ├── Nav.tsx              # Sticky nav + mobile drawer
│   │   ├── Hero.tsx             # Hero section
│   │   ├── TrustStrip.tsx       # Blue trust bar
│   │   ├── Services.tsx         # 3-card pricing section
│   │   ├── Coverage.tsx         # Zone list
│   │   ├── CTABlocks.tsx        # About strip + amber CTA bar
│   │   └── Footer.tsx           # Full site footer
│   ├── lib/
│   │   └── sanity.ts            # Sanity client + urlFor + sanityFetch
│   └── sanity/schema/
│       ├── service.ts           # Service document type
│       ├── blogPost.ts          # Blog post document type
│       └── index.ts             # Schema export
├── sanity.config.ts             # Sanity Studio config
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── vercel.json
└── .env.example
```

---

## First-time setup

### 1. Install dependencies
```bash
npm install
```

### 2. Create Sanity project
```bash
npx sanity init
# Choose "Create new project" → name it "reys-ev-service"
# Dataset: production
# Note the projectId printed at the end
```

### 3. Configure environment
```bash
cp .env.example .env.local
# Edit .env.local — paste your Sanity projectId
```

### 4. Run locally
```bash
npm run dev
# → http://localhost:3000       Home page
# → http://localhost:3000/studio  Sanity Studio
```

---

## Deploy to Vercel

### Option A — Vercel CLI (fastest)
```bash
npx vercel --prod
# Follow prompts: link to existing repo or create new project
# Add env vars when prompted: NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
```

### Option B — GitHub integration
1. Push repo to `LKNovelo/reys-ev-service`
2. Go to vercel.com → New Project → Import from GitHub
3. Add env vars in Vercel dashboard → Settings → Environment Variables
4. Deploy

---

## Cloudflare DNS

After Vercel gives you a deployment URL:
1. Cloudflare Dashboard → raysevservice.com → DNS
2. Add CNAME record:
   - Name: `@` (or `www`)
   - Target: `cname.vercel-dns.com`
   - Proxy: **ON** (orange cloud)
3. In Vercel: Project → Settings → Domains → Add `raysevservice.com`
4. SSL auto-provisions within a few minutes

---

## Sanity Studio access

- **Local:** `http://localhost:3000/studio`
- **Production:** `https://raysevservice.com/studio`

Add Rey as a team member in the Sanity dashboard so he can edit content without you.

---

## Next pages to build (Phase 3 continued)

| Page           | Route            | Status  |
|----------------|------------------|---------|
| Home           | `/`              | ✅ Done  |
| Services       | `/services`      | Next    |
| Coverage / Map | `/coverage`      | Next    |
| New Owners     | `/new-owners`    | Next    |
| Blog Index     | `/blog`          | Next    |
| Blog Post      | `/blog/[slug]`   | Next    |
| About          | `/about`         | Next    |
| Contact        | `/contact`       | Next    |
| Rey's Gear     | `/gear`          | Next    |

---

## Brand tokens (quick reference)

| Token      | Value     | Use                    |
|------------|-----------|------------------------|
| Green      | `#1A5C00` | Hero bg, prices, CTAs  |
| Blue       | `#2B5FA6` | Trust strip, links     |
| Amber      | `#F5A623` | Accent, CTA bar        |
| Dark       | `#1A1A1A` | Body text              |
| Surface    | `#F7F7F5` | Alt section bg         |
| Muted      | `#6B6B6B` | Secondary text         |

## Color Palette
- Green: #1A5C00
- Blue: #2B5FA6
- Accent: #F5A623
- Text: #1A1A1A

## Amazon Affiliate Link
- Your unique Associate ID is: raysevservice-20