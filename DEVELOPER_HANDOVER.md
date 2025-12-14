# Wellvitas Website – Developer Handover

Last updated: November 2025  
Owner: Wellvitas  
Technical Contact: [Viraj Jain / virajjain1011@gmail.com]

---

## 1. Project Overview

This codebase powers the **Wellvitas** public website: a modern, fast, static marketing and booking experience for a holistic wellness and therapy studio.

**Tech stack**

- Framework: **Next.js (App Router)**
- Language: **JavaScript (ES Modules)**
- UI: **React + Tailwind CSS + custom utility classes**
- Hosting: **Fasthost (static export uploaded to Apache web root)**
- Content model:
  - Primary: Static configuration and React components
  - Ready for: Storyblok CMS integration (scaffolded but optional)
- Integrations (design-level / optional):
  - Resend (for emails, when used with a suitable backend)
  - Appwrite (prepared, not required)
  - Storyblok (prepared, not required)

The implementation is intentionally simple to maintain:
- All core content and structure live in the repo.
- Static export is used for deployment (no Node server required on Fasthost).

All paths below assume the project root:

```bash
WEB/WEB/wellvitas_web/wellvitas/starter-for-nextjs


2. Repository Structure
starter-for-nextjs/
  .env
  .gitignore
  .gitpod.yml
  LICENSE
  README.md
  jsconfig.json
  next.config.mjs
  package-lock.json
  package.json
  postcss.config.mjs
  prettier.config.js
  tailwind.config.js

  certs/
  public/
  scripts/
  src/

  .next/          # Build output (local)
  node_modules/   # Dependencies (local)
  .git/           # Git metadata


Key points:

src/, public/, scripts/ and root config files define site behaviour.

.next and node_modules are build/runtime artifacts and not deployed as-is via Git, but may be part of the upload to Fasthost depending on the deployment strategy (see section 13).

3. Core Configuration
3.1 .env (not committed)

Holds sensitive configuration. Common keys:

RESEND_API_KEY for booking emails

NEXT_PUBLIC_STORYBLOK_TOKEN if Storyblok is used

Each environment (local, staging, production) must manage its own .env. On Fasthost, these are not read automatically by Apache static hosting, so server side features must be aligned with the actual deployment model (see section 13).

3.2 Standard configs

.gitignore
Ignores node_modules, .next, .env*, logs and other generated files.

.gitpod.yml
Dev environment template for Gitpod. Optional.

LICENSE
License terms. No runtime impact.

README.md
Short usage and setup instructions. Safe to extend.

jsconfig.json
Controls import resolution. Keep this in sync if you change folder structure or introduce aliases.

next.config.mjs
Next.js configuration. Controls:

Images

Experimental flags

Output mode if configured for static export

Any rewrites or redirects

package.json
Defines dependencies and scripts.

Important scripts:

npm run dev - local dev server

npm run build - production build

npm run start - start production build (for Node server environments)

This site is designed so it can be built locally and pushed as static assets to Fasthost.

postcss.config.mjs
Tailwind and PostCSS wiring.

prettier.config.js
Code style rules.

tailwind.config.js
Tailwind configuration:

Content paths

Brand color palette

Theme extensions used in globals.css


4. Certificates

Directory: certs/

localhost.pem

localhost-key.pem

These are self-signed certificates for local HTTPS development.
Used only if running a local HTTPS proxy for Storyblok visual editor. Not required on Fasthost.


5. Public Assets

Directory: public/

Served directly at https://wellvitas.co.uk

Key files:

Logo.png

W_favicon.ico

Hero images:

hero/slide1.jpg

hero/slide2.jpg

hero/slide3.jpg

Therapy images:

therapies/hbot.jpg

therapies/light.jpg

therapies/laser-acu.jpg

therapies/pemf.jpg

therapies/compression.jpg

therapies/physio.jpg

therapies/combined.jpg

If you add or rename assets, update the references in:

src/components/Header.js

src/components/TherapiesClient.js

src/lib/therapies.js

Pay attention to case sensitivity in production.

6. App Router Structure (src/app)

The site uses the Next.js App Router. All main routes live under src/app.

6.1 Global Layout

src/app/layout.js

Defines the root <html> and <body>.

Imports src/styles/globals.css.

Loads Montserrat font.

Wraps every page with:

<Header />

<Footer />

<WhatsAppFab />

Sets global metadata (title, description).

This is the main shell. Edit here for site-wide changes.

6.2 Home Page /

src/app/page.js

Behaviour:

Attempts to load a Storyblok story with slug "home" via fetchStory from src/lib/storyblok.js.

If a valid story is returned, renders it using StoryblokComponent.

If Storyblok is not configured or fails, falls back to <StaticHome />.

This design allows:

Fully static operation (no CMS required).

Smooth move to Storyblok later without breaking the site.

6.3 Public Routes Group (public)

Folder: src/app/(public)/

This is a route group. It does not change the URL, but helps organise public routes.

src/app/(public)/layout.js

Simple wrapper around {children}.

Reserved for group-specific layout if needed.

6.3.1 About

src/app/(public)/about/page.js → /about
Main about page, includes:

Business info (name, address, contact, hours)

JSON-LD LocalBusiness schema

Links to subpages

src/app/(public)/about/our-story/page.js → /about/our-story
Story and philosophy.

src/app/(public)/about/our-causes/page.js → /about/our-causes
Causes and community positioning.

src/app/(public)/about/who-we-are/page.js → /about/who-we-are
Team, expertise, credibility.

All reuse the same design language and section patterns.

6.3.2 Therapies

src/app/(public)/therapies/page.js → /therapies
Renders <TherapiesClient /> which:

Loads data from src/lib/therapies.js.

Displays a grid of therapy cards.

Opens a slide-over / drawer with:

Description

Benefits

Target audience

Considerations

Supports deep links via URL hash (for example /therapies#hyperbaric-oxygen-therapy).

All therapy content is defined in one place: src/lib/therapies.js.

6.3.3 Booking

src/app/(public)/booking/page.js → /booking
Renders <BookingFlow /> which:

Guides the user through:

Personal details

Therapy interests

Taster or programme selection

Performs client-side validation.

Prepares structured booking data.

Submits to /api/booking for email delivery.

Supports building calendar or WhatsApp context.

This page is the core lead generation and conversion entry.

6.3.4 Visit

src/app/(public)/visit/page.js → /visit
Shows location, hours, directions, and map link or embed.

6.4 Booking API

src/app/(public)/api/booking/route.js → /api/booking (POST)

Responsibilities:

Receives booking payload from <BookingFlow />.

Applies a honeypot field for basic spam protection.

Validates key fields.

Composes:

Internal email for Wellvitas inbox

Confirmation email for the client

Sends emails via Resend using RESEND_API_KEY.

Returns JSON response.

If you change the booking form, keep this endpoint in sync.

Note: On pure static Fasthost hosting this route does not execute server side. See section 13 for guidance.

7. Components (src/components)

Key shared components:

Header.js
Top navigation:

Logo

Links to Home, About, Therapies, Booking, Visit

Responsive: desktop menu and mobile drawer

Highlights active route

Footer.js
Global footer:

Address and contact

Quick links

Copyright

Brand gradient styling

WhatsAppFab.js
Floating button opening WhatsApp with a prefilled message.

HeroCarousel.js
Home hero slider using public/hero images, with headings and CTAs.

HomeTherapies.js
Homepage therapies section:

Uses THERAPIES from src/lib/therapies.js

Category chips for filtering

Links to detailed therapies via hash

TreatmentPackagesScroller.js
Horizontal packages carousel, linking to booking.

StaticHome.js
Complete static homepage used when Storyblok is not available.

OpenHoursBadge.js
Small badge to display opening hours consistently.

TestimonialsCarousel.js
Slider for testimonials.

TherapiesClient.js
Main logic for /therapies:

Uses THERAPIES data

Manages selected therapy

Renders drawer with full details

Handles deep linking

TherapiesPreview.js
Helper for Storyblok preview integration.

StoryblokProvider.jsx
Sets up Storyblok React bridge on the client if CMS is used.

components/storyblock/* (if present)
Placeholder or mappings for Storyblok components.

Each component is isolated and focused. Styling is mostly via Tailwind utility classes plus some globals.

8. Libraries (src/lib)
8.1 src/lib/therapies.js

This is the single source of truth for all therapies.

Each therapy entry includes:

id, slug, name

type, category

short, long descriptions

duration text

price tier (symbolic, for example ££)

image path

benefits

forWho

considerations or contraindications

tags

Exports:

THERAPIES

CATEGORIES

therapyImage(therapyOrSlug)

Any change in therapies for the site should be made here.

8.2 src/lib/storyblokClient.js

Thin wrapper around storyblok-js-client.

Uses NEXT_PUBLIC_STORYBLOK_TOKEN.

Provides low level story fetching.

8.3 src/lib/storyblok.js

Intended main Storyblok integration using @storyblok/react.

The target design:

Initialize Storyblok with:

Access token

apiPlugin

Map of Storyblok components to React components

Export:

StoryblokComponent

getStoryblokApi

fetchStory(slug, options)

Note for the next developer:

This file may need finalisation and cleanup.

Home page currently calls fetchStory. Ensure it either:

Works correctly with Storyblok, or

Fails gracefully and lets <StaticHome /> handle the page.

8.4 src/lib/appwrite.js

Prepared but optional.

Sets up an Appwrite client if credentials are provided.

Not required for current live operation.

Available if you want to add database or auth backed features.

9. Styles (src/styles)

src/styles/globals.css

Defines the visual system:

Imports Tailwind layers.

Sets Montserrat as the base font.

Declares CSS variables for brand colors.

Utility classes for:

Layout containers

Sections (.section)

Cards

Glass / blur effects

Hover transitions

Soft shadows and rounded corners

All pages rely on these shared patterns for a consistent and modern feel.

10. Static Content (src/static)

Currently a placeholder.

Use for JSON or markdown if you add more structured content later.

11. Scripts (scripts)

scripts/migrate-to-storyblok.js

Helper / reference script:

Shows how static sections and therapies could be structured in Storyblok.

Not part of production runtime.

Use it as inspiration if you fully adopt Storyblok.

12. Mental Model For New Developers

If you are picking this up fresh:

Global layout, header, footer, and WhatsApp button live in src/app/layout.js and src/components.

Pages are under src/app:

/ home with CMS fallback

/about/* static informational pages

/therapies powered by src/lib/therapies.js

/booking uses BookingFlow and posts to /api/booking

/visit for location and practical details

Shared UI is in src/components.

Core business data (therapies) is in src/lib/therapies.js.

Booking emails are handled in src/app/(public)/api/booking/route.js when a Node runtime is used.

Storyblok and Appwrite are optional, scaffolded and can be completed or ignored.

13. Deployment on Fasthost (Important)

The site is hosted on Fasthost using standard Apache web hosting.

There are two realistic deployment models. Confirm which one is in use, then keep it consistent.

13.1 Recommended: Static Export and Upload (Simple, Stable)

This is the most robust approach for Apache shared hosting, where you do not run a Node server.

In next.config.mjs, ensure:

const nextConfig = {
  output: "export",
};

export default nextConfig;


This tells Next.js to generate a purely static site.

In package.json, add:

"scripts": {
  "dev": "next dev",
  "build": "next build",
  "export": "next export",
  "prod": "next build && next export"
}


Build locally:

npm install
npm run prod


This creates an out/ directory with static HTML, /_next assets, and all pages pre-rendered.

Upload contents of out/ to your Fasthost web root (for example public_html):

Keep folder structure exactly:

index.html

/about/index.html

/about/our-story/index.html

/therapies/index.html

/booking/index.html

/visit/index.html

/_next/*

/therapies/* images

/hero/* images

Booking endpoint note:

With static export there is no Node API route on Fasthost.

To keep the booking form working you have two options:

Use a third party form backend or email service that accepts POST from the frontend.

Or host the /api/booking function separately (for example on a serverless platform) and point the form there.

If you already have booking working via static deployment and .htaccess, document that endpoint URL clearly here.

This model is ideal if you want minimal backend maintenance.

13.2 Alternative: Node Runtime on Fasthost

If Fasthost is configured to run a Node app (for example via a Node hosting add-on):

Keep next.config.mjs without output: "export".

On the server:

Install Node and dependencies.

Run:

npm install
npm run build
npm run start


Configure Fasthost to:

Proxy HTTP traffic to the Node process.

Or use a Plesk/Node integration panel.

In this model:

/api/booking runs on the server.

.env can be loaded server side for RESEND_API_KEY etc.

Use this only if you are comfortable managing a Node process on Fasthost.

14. Hand-off Notes

For the next maintainer:

Start by running it locally:

npm install
npm run dev


Check that:

Home, About, Therapies, Booking, Visit all load.

Therapy data is correct via src/lib/therapies.js.

Booking flow behaves correctly for the current deployment model.

13. Access Details (to be provided securely)


Current deployment method: static out/ upload

13.2 GitHub Repository Access

Access:

Github [https://github.com/virajwellvitas/wellvitas]

Owner: [Viraj Jain]

User Name:- [virajwellvitas]

Password:- [Viraj2003@github]

13.3 Storyblok Credentials (If/When Used)

If Storyblok is enabled in the future:

API Tokens:

Public token: [TsqJuL3ctfFcwVhP3o5megtt]

Preview/Management token: [X6nvy6zz3xsdtUvSuB5CLQtt]

Email-id: [wellvitas@outlook.com]

Password:[Wv1ts@blok]

Mapping between Storyblok components and React components:

Defined (or to be defined) in:

src/lib/storyblok.js

src/components/storyblock/*
.
