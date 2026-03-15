# Ray's EV Service — Website

Mobile Tesla repair and diagnostics, LA to San Diego. Built with Next.js 15, Sanity CMS, Tailwind CSS, deployed on Vercel.

## Stack

- **Framework**: Next.js 15 (App Router)
- **CMS**: Sanity v3 — studio at `/studio`
- **Styling**: Tailwind CSS v3
- **Fonts**: Oswald (display) + Source Sans 3 (body) via next/font/google
- **Deployment**: Vercel

## Pages

| Route | Description |
|---|---|
| `/` | Home |
| `/services` | Services & pricing |
| `/coverage` | Coverage map (Google Maps embed) |
| `/ev-guide` | New owners guide |
| `/blog` | Blog index |
| `/blog/[slug]` | Individual blog post |
| `/about` | About Ray |
| `/contact` | Contact & booking form |
| `/gear` | Ray's gear recommendations (affiliate) |
| `/studio` | Sanity CMS studio |

## Getting started

```bash
npm install
cp .env.example .env.local
# Fill in NEXT_PUBLIC_SANITY_PROJECT_ID and other keys
npm run dev
```

## Environment variables

| Variable | Required | Description |
|---|---|---|
| `NEXT_PUBLIC_SANITY_PROJECT_ID` | Yes | From sanity.io/manage |
| `NEXT_PUBLIC_SANITY_DATASET` | No | Defaults to `production` |
| `NEXT_PUBLIC_GOOGLE_MAPS_API_KEY` | For coverage page | Maps JavaScript API key |

## Sanity schema types

- **service** — Services & pricing (editable without code)
- **blogPost** — Blog posts with rich body (fieldNote, warningNote, faultCodeBlock, inlineProduct blocks)
- **gear** — Ray's gear recommendations with Amazon affiliate links

## Brand

- Green: `#1A5C00`
- Blue: `#2B5FA6`
- Amber: `#F5A623`
- Display font: Oswald
- Body font: Source Sans 3

## Contact

Ray Novelo · (951) 622-6222 · RaysEVService@gmail.com · raysevservice.com
