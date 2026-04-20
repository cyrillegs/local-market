# Local Market Prototype

Local Market is a map-first business directory prototype for Slovakia. It is designed to show how a user can land on a homepage, immediately orient themselves on a country map, jump into a city or nearby villages, and explore useful local businesses and producers around that area.

This project is intentionally a polished prototype, not a production-ready marketplace. The goal is to demonstrate product thinking, route structure, map UX, listing presentation, and the built-in sales funnel for upselling websites to business owners.

## Product Idea

The app is built around one core idea:

- people should discover businesses in and around the city that matters to them

Instead of dropping users into a generic list of listings, the prototype starts with Slovakia, then quickly narrows into a chosen city and surrounding villages. From there, users can visually explore categories such as electricians, construction trades, mechanics, massage therapists, honey producers, pumpkin seed oil makers, and local gift makers.

The business side of the product is just as important as the consumer side:

- listings help users find local services and producers
- profile pages also act as a sales tool for selling websites to businesses
- the owner-facing completion flow encourages upgrading from a free listing to a richer presence

## Current Scope

This version demonstrates:

- a premium, map-first homepage experience
- local discovery centered on Slovak cities and nearby villages
- category-aware markers, cards, and listing routes
- detailed business profile pages
- a mocked business-owner profile completion flow
- a visual upsell path for businesses that do not yet have a website

This version does not yet include:

- a real database
- real authentication
- real business logins
- real payments
- booking or ordering
- admin or CMS tooling
- live geocoding or data ingestion

## Main Features

### 1. Homepage discovery

The homepage is built around a Slovakia map and a fast local discovery flow:

- default map view starts at the country level
- users can use browser geolocation or manually type a city
- once a city is selected, the experience shifts toward nearby results
- category chips let the user change the visible local story quickly
- a featured set of listings gives the page immediate life even before drilling down

### 2. City and category explorer

Each category and city combination has its own route:

- filtered map view
- keyword search
- business type filtering (`services` / `producers`)
- radius filtering
- multi-category selection
- breadcrumb-friendly SEO-style URL structure

This is intended to feel like a local market explorer, not a standard directory table.

### 3. Business detail pages

Each listing has a dedicated profile page that combines discovery and sales:

- general business info
- contact details
- opening hours
- services and gallery blocks
- location context with nearby related businesses
- website preview when a listing has a site
- upsell panel when a listing does not have a site

The layout follows the “four quadrant” concept from the brief so it can act as both a useful listing and a visual sales asset.

### 4. Owner profile completion demo

The `/profile-demo` route simulates how a business owner might fill in their listing.

It includes:

- editable profile fields
- a completion percentage
- a public-preview style panel
- logic that prevents the profile from reaching `100%` unless a website is provided

This is meant to show the commercial strategy behind the product, not just the frontend polish.

## Routes

### Homepage

- `/`

Main landing page with the hero map, city search, geolocation flow, and featured local listings.

### Profile demo

- `/profile-demo`

Mock owner-facing profile completion experience.

### City/category route

- `/{category}/{region}/{city}`

Example:

- `/elektrikari/kosicky-kraj/trebisov`

This route displays a local explorer page for a category in a specific city and region.

### Business detail route

- `/{category}/{region}/{city}/{businessSlug}`

Example:

- `/elektrikari/kosicky-kraj/trebisov/joseph-the-king-electric-trebisov`

This route displays a single business profile page.

## Data Model

The app currently uses seeded local TypeScript data rather than a backend or database.

The seeded dataset includes:

- 7 category configurations
- 6 Slovak cities
- nearby villages and regional context for each city
- 60 generated demo businesses spread across categories and locations

Important:

- the data is demo data, not real business data
- names, addresses, phone numbers, descriptions, and websites are seeded placeholders
- the app structure is real, but the listing content is meant for prototype/demo use

The seeded data lives primarily in:

- [src/lib/data.ts](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\lib\data.ts)
- [src/lib/types.ts](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\lib\types.ts)
- [src/lib/profile.ts](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\lib\profile.ts)

## Tech Stack

- `Next.js 16` with App Router
- `React 19`
- `TypeScript`
- `Tailwind CSS v4`
- `Leaflet` for map rendering
- `OpenStreetMap` raster tiles

The app currently does not need a Google Maps or Mapbox API key.

However:

- the map still requires internet access because it loads public OSM tiles
- if a browser extension, corporate network, or firewall blocks the tile requests, the map may not render fully

## Design Direction

The current UI is intentionally not a generic SaaS dashboard.

The visual direction is:

- modern editorial
- local-premium marketplace
- warm luxury styling
- high-contrast hero sections
- serif display typography with sharper supporting UI

The goal is to make the product feel memorable and premium enough for an interview/demo setting while still supporting practical directory interactions.

## Project Structure

Some of the most important files are:

- [src/app/page.tsx](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\app\page.tsx)  
  Homepage entry point

- [src/app/profile-demo/page.tsx](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\app\profile-demo\page.tsx)  
  Owner profile demo route

- [src/app/[category]/[region]/[city]/page.tsx](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\app\[category]\[region]\[city]\page.tsx)  
  Local category/city explorer

- [src/app/[category]/[region]/[city]/[businessSlug]/page.tsx](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\app\[category]\[region]\[city]\[businessSlug]\page.tsx)  
  Business detail page

- [src/components/homepage-explorer.tsx](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\components\homepage-explorer.tsx)  
  Homepage interaction layer

- [src/components/directory-explorer.tsx](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\components\directory-explorer.tsx)  
  Filtered city/category explorer UI

- [src/components/directory-map.tsx](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\components\directory-map.tsx)  
  Leaflet-based interactive map component

- [src/components/profile-demo-form.tsx](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\components\profile-demo-form.tsx)  
  Owner-facing completion demo

- [src/app/globals.css](C:\Users\Cyril Dave\.codex\worktrees\6086\Business Directory Site\src\app\globals.css)  
  Global visual system and shared styling

## Local Development

Install dependencies:

```bash
npm install
```

Start the development server:

```bash
npm run dev
```

Open:

- [http://localhost:3000](http://localhost:3000)

Other useful commands:

```bash
npm run lint
npm run build
npm run start
```

## Notes About Hydration Warnings

If you see a hydration warning mentioning extra `<body>` attributes such as:

- `bis_register`
- `__processed_...`

that is usually caused by a browser extension modifying the DOM before React hydrates. This is not typically an application logic problem.

The root layout already uses `suppressHydrationWarning` on the `<body>` to reduce noise, but browser extensions can still surface warnings in dev mode.

## Notes About the Map

The map currently uses `Leaflet` with public OpenStreetMap tiles.

This means:

- no API key is required
- tile loading still depends on internet access
- tile requests can be blocked by browser extensions, VPNs, ad blockers, or security software

If the map area loads but the tiles do not, that usually points to blocked tile requests rather than broken React code.

## Prototype Limitations

Because this is still a prototype:

- listing content is seeded, not live
- filtering is in-memory, not database-driven
- geolocation snaps the user to the nearest seeded Slovak city
- there is no admin panel or content publishing workflow
- there is no persistent business account system yet

## Good Next Steps

If this prototype were to move toward MVP or production, the next likely steps would be:

- replace seeded data with real business records
- import listings from CSV, Excel, or a database
- add PostgreSQL and Prisma
- build a business owner auth flow
- add a proper claim/edit listing workflow
- support payments for extended profiles
- add direct order or booking flows
- build an admin dashboard/CMS for category, city, and listing management

## Summary

This repository currently represents a polished product prototype for a Slovakia-focused local business directory. It is meant to communicate UX direction, route architecture, visual quality, and monetization thinking rather than backend completeness.

If someone asks “what does this app do?”, the shortest answer is:

- it helps users discover nearby Slovak businesses and producers on a map
- it gives each business a profile page
- it doubles as a sales funnel for upselling websites to local businesses
