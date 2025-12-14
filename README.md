# 🌿 Wellvitas – Holistic Wellness & Therapy Platform

> A modern, high-performance web platform for Wellvitas, a holistic wellness and therapy studio in Glasgow, delivering cutting-edge therapies and lifestyle support.

**Live Site:** [wellvitas.co.uk](https://wellvitas.co.uk)  
**Repository:** [github.com/viraj1011JAIN/wellvitas-web](https://github.com/viraj1011JAIN/wellvitas-web)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Quick Start](#quick-start)
- [Project Structure](#project-structure)
- [Environment Setup](#environment-setup)
- [Development](#development)
- [Deployment](#deployment)
- [API & Integrations](#api--integrations)
- [Content Management](#content-management)
- [Contributing](#contributing)
- [License](#license)

---

## 🎯 Overview

Wellvitas is a comprehensive digital presence for a holistic wellness clinic specializing in advanced therapies including:

- **Hyperbaric Oxygen Therapy (HBOT)** – Pressurised oxygen sessions for recovery and healing
- **Light-based Therapies** – Photobiomodulation for tissue repair and skin health
- **Laser Acupuncture** – Needle-free relaxation and autonomic balancing
- **PEMF Therapy** – Electromagnetic field therapy for circulation support
- **Compression Therapy** – Enhanced circulation and recovery support
- **Physiotherapy** – Professional movement and rehabilitation
- **Combined Treatments** – Integrated therapy packages

The platform includes:
- 📱 **Responsive Design** – Mobile-first, works on all devices
- ⚡ **Static Export** – Zero server-side infrastructure needed
- 🎨 **Modern UI** – Tailwind CSS with custom branding
- 📅 **Booking System** – Integrated appointment scheduling
- 🔍 **SEO Optimized** – Built-in metadata and structured data
- 🚀 **High Performance** – Optimized for Core Web Vitals
- 🔌 **CMS Ready** – Prepared for Storyblok integration

---

## ✨ Features

### User-Facing Features

| Feature | Description |
|---------|-------------|
| **Hero Carousel** | Dynamic image slideshow showcasing therapies and wellness content |
| **Therapy Explorer** | Interactive grid with filtering, modal details, and deep-linking |
| **Treatment Packages** | Pre-designed wellness packages with scrollable showcase |
| **Booking Flow** | Step-by-step appointment scheduling and enquiry system |
| **About Pages** | Multi-part about section (Our Story, Who We Are, Our Causes) |
| **Testimonials** | Client carousel highlighting success stories |
| **Visitor Info** | Hours, location, map integration, contact details |
| **WhatsApp Integration** | Floating CTA for direct WhatsApp contact |
| **Responsive Navigation** | Mobile hamburger menu with smooth transitions |

### Technical Features

| Feature | Details |
|---------|---------|
| **Static Export** | Builds to static HTML/CSS/JS for zero-cost hosting |
| **CMS Integration** | Optional Storyblok integration for dynamic content |
| **Email Automation** | Resend API ready for booking confirmations |
| **Backend Flexibility** | Prepared connectors for Appwrite, Supabase |
| **Image Optimization** | Next.js Image component for automatic optimization |
| **Type Safety** | JSDoc for runtime type hints and IDE support |
| **Code Formatting** | Prettier + Tailwind plugin for consistency |

---

## 🛠️ Tech Stack

### Core Framework
- **[Next.js 15](https://nextjs.org/)** – React framework with App Router, static export, image optimization
- **[React 19](https://react.dev/)** – UI library
- **[JavaScript (ES Modules)](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules)** – Modern JS with no compilation step

### Styling & Components
- **[Tailwind CSS 4](https://tailwindcss.com/)** – Utility-first CSS framework
- **[Montserrat Font](https://fonts.google.com/specimen/Montserrat)** – Custom typography via Google Fonts
- **Custom CSS Variables** – Brand color system and theme management

### Content & Integrations
- **[Storyblok](https://www.storyblok.com/)** – Headless CMS (optional, scaffolded)
- **[Resend](https://resend.com/)** – Email service for booking confirmations
- **[Supabase](https://supabase.com/)** – Backend database option
- **[Appwrite](https://appwrite.io/)** – Backend services (prepared)

### Development Tools
- **[Node.js](https://nodejs.org/)** – JavaScript runtime
- **[npm](https://www.npmjs.com/)** – Package manager
- **[Prettier](https://prettier.io/)** – Code formatter
- **[PostCSS](https://postcss.org/)** – CSS processing pipeline
- **[Git](https://git-scm.com/)** – Version control

### Hosting & Deployment
- **[Fasthost](https://www.fasthost.co.uk/)** – Current production hosting (static Apache)
- **Supported:** Vercel, Netlify, GitHub Pages, or any static host

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** 18+ ([download](https://nodejs.org/))
- **npm** 9+ (comes with Node.js)
- **Git** ([download](https://git-scm.com/))

### Installation

1. **Clone the Repository**
   ```bash
   git clone https://github.com/viraj1011JAIN/wellvitas-web.git
   cd wellvitas-web
   ```

2. **Install Dependencies**
   ```bash
   npm install
   ```

3. **Set Up Environment Variables**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local` with your configuration (see [Environment Setup](#environment-setup)).

4. **Run Development Server**
   ```bash
   npm run dev
   ```
   Open [http://localhost:3000](http://localhost:3000) in your browser.

5. **Build for Production**
   ```bash
   npm run build
   npm start
   ```

---

## 📁 Project Structure

```
wellvitas-web/
├── 📄 Root Config Files
│   ├── package.json                 # Dependencies & scripts
│   ├── next.config.mjs              # Next.js configuration
│   ├── tailwind.config.js           # Tailwind theme & content paths
│   ├── postcss.config.mjs           # PostCSS + Tailwind pipeline
│   ├── jsconfig.json                # Import aliases & module resolution
│   ├── prettier.config.js           # Code formatting rules
│   └── .env.local                   # Environment variables (local)
│
├── 📂 public/                       # Static assets (served at root)
│   ├── Logo.png                     # Wellvitas logo
│   ├── W_favicon.ico                # Favicon
│   ├── hero/                        # Hero carousel images
│   │   ├── slide1.jpg
│   │   ├── slide2.jpg
│   │   └── slide3.jpg
│   └── therapies/                   # Therapy card images
│       ├── hbot.jpg
│       ├── light.jpg
│       ├── laser-acu.jpg
│       ├── pemf.jpg
│       ├── compression.jpg
│       ├── physio.jpg
│       └── combined.jpg
│
├── 📂 src/                          # Application source code
│   ├── 📂 app/                      # Next.js App Router
│   │   ├── layout.js                # Root layout (Header, Footer, children)
│   │   ├── page.js                  # Home page (/ route)
│   │   ├── app.css                  # Global styles
│   │   │
│   │   ├── 📂 (public)/             # Route group (doesn't affect URLs)
│   │   │   ├── layout.js            # Public section layout
│   │   │   ├── about/               # /about section
│   │   │   │   ├── page.js
│   │   │   │   ├── our-story/page.js
│   │   │   │   ├── our-causes/page.js
│   │   │   │   └── who-we-are/page.js
│   │   │   ├── therapies/page.js    # /therapies route with modal explorer
│   │   │   ├── booking/page.js      # /booking appointment flow
│   │   │   ├── visit/page.js        # /visit location & hours
│   │   │   └── api/
│   │   │       └── booking/route.js # Booking API endpoint
│   │   │
│   │   ├── 📂 auth/                 # Authentication routes
│   │   │   └── callback/route.js
│   │   └── 📂 login/                # Login page
│   │       └── page.js
│   │
│   ├── 📂 components/               # Reusable React components
│   │   ├── Header.js                # Navigation header with mobile menu
│   │   ├── Footer.js                # Footer with links & contact
│   │   ├── HeroCarousel.js          # Image slideshow
│   │   ├── HomeTherapies.js         # Featured therapies section
│   │   ├── TherapiesClient.js       # Therapy grid with modal explorer
│   │   ├── BookingFlow.js           # Multi-step booking form
│   │   ├── TreatmentPackagesScroller.js # Horizontal package carousel
│   │   ├── TestimonialsCarousel.js  # Client testimonials
│   │   ├── WhatsAppFab.js           # Floating WhatsApp button
│   │   ├── OpenHoursBadge.js        # Hours display component
│   │   ├── StaticHome.js            # Fallback homepage (no CMS)
│   │   ├── StoryblokProvider.jsx    # Storyblok integration wrapper
│   │   ├── TherapiesPreview.js      # CMS therapy preview
│   │   └── storyblock/              # Storyblok component mappings
│   │       └── [component files]
│   │
│   ├── 📂 lib/                      # Utility functions & services
│   │   ├── storyblok.js             # Storyblok API bridge
│   │   ├── storyblokClient.js       # Storyblok client initialization
│   │   ├── therapies.js             # Therapy data & categorization
│   │   ├── appwrite.js              # Appwrite SDK setup (optional)
│   │   └── 📂 supabase/             # Supabase integration
│   │       ├── client.js            # Browser-side Supabase client
│   │       └── server.js            # Server-side Supabase utilities
│   │
│   ├── 📂 styles/                   # Global stylesheets
│   │   └── globals.css              # CSS variables, theme, utility classes
│   │
│   ├── 📂 static/                   # Static content (SVGs, icons, etc.)
│   │
│   └── middleware.js                # Next.js middleware (auth, redirects, etc.)
│
├── 📂 scripts/                      # Utility scripts
│   └── migrate-to-storyblok.js      # Content migration helper
│
├── 📂 certs/                        # Self-signed HTTPS certs (local dev only)
│   ├── localhost.pem
│   └── localhost-key.pem
│
├── .env.example                     # Environment variable template
├── .gitignore                       # Git ignore rules
├── LICENSE                          # Project license
└── README.md                        # This file
```

---

## ⚙️ Environment Setup

### Environment Variables

Create a `.env.local` file in the project root with the following variables:

```env
# Storyblok CMS (optional for static operation)
NEXT_PUBLIC_STORYBLOK_TOKEN=your_storyblok_token_here
NEXT_PUBLIC_STORYBLOK_VERSION=draft

# Resend Email Service (for booking confirmations)
RESEND_API_KEY=your_resend_api_key_here

# Supabase (optional backend)
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Appwrite (optional backend)
NEXT_PUBLIC_APPWRITE_ENDPOINT=your_appwrite_endpoint
NEXT_PUBLIC_APPWRITE_PROJECT_ID=your_project_id
```

**Notes:**
- Environment variables prefixed with `NEXT_PUBLIC_` are exposed to the browser
- Secret keys (like API keys) should NOT be prefixed with `NEXT_PUBLIC_`
- Never commit `.env.local` to version control (it's in `.gitignore`)
- Use `.env.production` for production-specific variables

---

## 💻 Development

### Available Scripts

```bash
# Start development server (with hot reload)
npm run dev

# Build for production
npm run build

# Run production build locally (requires build first)
npm start

# Format code with Prettier
npm run format

# Lint code (if ESLint configured)
npm run lint
```

### Key Development Patterns

#### Adding a New Page

1. Create a folder under `src/app` or `src/app/(public)`
2. Add a `page.js` file
3. Export a default React component

Example:
```javascript
// src/app/(public)/contact/page.js
export default function ContactPage() {
  return <div>Contact Us</div>;
}
```

#### Creating a Reusable Component

1. Create a `.js` or `.jsx` file under `src/components`
2. Use `"use client"` if it requires interactivity
3. Export a default React component

Example:
```javascript
// src/components/Card.js
export default function Card({ title, children }) {
  return <div className="rounded-lg border p-4">{children}</div>;
}
```

#### Adding Tailwind Styles

- Use inline `className` with Tailwind utilities
- Extend colors/spacing in `tailwind.config.js`
- CSS variables in `src/styles/globals.css` for brand colors

Example:
```javascript
<div className="bg-purple-900 text-white p-6 rounded-2xl">
  <h2 className="text-2xl font-bold">Title</h2>
</div>
```

#### Fetching External Data

Use async/await in Server Components (default in Next.js App Router):

```javascript
// src/app/data/page.js
export default async function DataPage() {
  const response = await fetch('https://api.example.com/data');
  const data = await response.json();
  return <div>{data.title}</div>;
}
```

### Hot Tips

- **Therapy Data**: Edit `src/lib/therapies.js` to update descriptions, images, and metadata
- **Colors & Brand**: Adjust `tailwind.config.js` and CSS variables in `src/styles/globals.css`
- **Header/Footer**: Global wrappers in `src/app/layout.js` apply to all pages
- **SEO Metadata**: Use `metadata` export in page/layout files (Next.js 13+)

---

## 🚢 Deployment

### Build for Production

```bash
npm run build
```

This generates a static site in the `.next` folder (or configured output directory).

### Deployment Options

#### 1. **Fasthost (Current Production)**

```bash
# Build locally
npm run build

# Upload ./out or ./.next/static to your Fasthost Apache root
# or use FTP/SFTP client
```

**Steps:**
1. Build the project locally
2. Connect via FTP (FileZilla, Transmit, etc.) or SSH/SFTP
3. Upload build output to `/public_html` or configured web root
4. Test on live domain

#### 2. **Vercel** (Recommended - Fastest Setup)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel
```

**Benefits:**
- Automatic deployments from Git
- Free HTTPS & CDN
- Preview URLs for PRs
- Analytics & monitoring included

#### 3. **Netlify**

```bash
# Connect via git or drag-and-drop build folder
npm run build
# Upload ./out folder
```

#### 4. **GitHub Pages**

```bash
# Configure next.config.mjs for static export
# Build and push to gh-pages branch
npm run build
```

### Static Export

For maximum compatibility with static hosts (like Fasthost), ensure `next.config.mjs` includes:

```javascript
export default {
  output: 'export',  // Enable static export
  // other config...
};
```

### Post-Deployment Checklist

- [ ] Test all pages load correctly
- [ ] Check responsive design on mobile
- [ ] Verify images load and optimize
- [ ] Test booking form submission
- [ ] Check Core Web Vitals with Lighthouse
- [ ] Verify SEO metadata (Open Graph, schema)
- [ ] Test WhatsApp link opens correctly
- [ ] Check error pages (404, 500)

---

## 🔌 API & Integrations

### Booking API

**Endpoint:** `POST /api/booking`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+44 123 456 7890",
  "therapy": "hbot",
  "date": "2025-12-20",
  "time": "14:00",
  "message": "Optional notes"
}
```

**Response:**
```json
{
  "success": true,
  "bookingId": "bk_12345",
  "message": "Booking submitted successfully"
}
```

### Storyblok CMS Integration

**How It Works:**
1. Storyblok acts as optional dynamic content layer
2. If CMS story exists, it renders via `StoryblokComponent`
3. If not available or fails, fallback to static content
4. No server required – content is pre-rendered at build time

**Setup:**
1. Create account at [storyblok.com](https://www.storyblok.com/)
2. Create a "home" story with layout blocks
3. Add `NEXT_PUBLIC_STORYBLOK_TOKEN` to `.env.local`
4. Edit `src/lib/storyblok.js` if needed

**Files Involved:**
- `src/lib/storyblok.js` – Fetch & bridge logic
- `src/components/StoryblokProvider.jsx` – Provider wrapper
- `src/app/page.js` – Dynamic fallback pattern

### Email Service (Resend)

Booking confirmations can be sent via Resend:

1. Get API key from [resend.com](https://resend.com/)
2. Add `RESEND_API_KEY` to `.env.local`
3. Update `src/app/(public)/api/booking/route.js` to send emails

Example:
```javascript
import { Resend } from 'resend';
const resend = new Resend(process.env.RESEND_API_KEY);

await resend.emails.send({
  from: 'noreply@wellvitas.co.uk',
  to: userEmail,
  subject: 'Booking Confirmation',
  html: '<h1>Your booking is confirmed</h1>',
});
```

### Supabase Backend (Optional)

For user authentication or database:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

// Use supabase.auth, supabase.from(), etc.
```

---

## 📝 Content Management

### Therapy Data

All therapy information lives in `src/lib/therapies.js`:

```javascript
export const THERAPIES = [
  {
    id: "hbot",
    slug: "hyperbaric-oxygen-therapy",
    name: "Hyperbaric Oxygen Therapy",
    type: "Device",
    category: "Oxygen",
    short: "Short description...",
    long: "Long description...",
    duration: "45–60 min",
    price: "£££",
    image: "/therapies/hbot.jpg",
    benefits: [...],
    forWho: [...],
    contraindications: [...],
  },
  // ... more therapies
];
```

**To Add a Therapy:**
1. Add object to `THERAPIES` array
2. Add image to `public/therapies/`
3. Update references in components if needed

### Pages

All page content in `src/app/(public)/` can be edited directly in `.js` files. For more complex content, use Storyblok.

---

## 📸 Visual Mockups & Placeholders

Below are example layouts showing how key sections appear:

### 1. Hero Section
```
┌─────────────────────────────────────┐
│                                     │
│   [SLIDE IMAGE PLACEHOLDER]         │
│   "Feel Better with Wellvitas"      │
│   [Book] [Learn More]               │
│                                     │
└─────────────────────────────────────┘
```

**Placeholder Location:** `public/hero/slide*.jpg`

### 2. Therapy Grid
```
┌──────────────────────────────────────────────┐
│  Therapies                                   │
│                                              │
│  [Category Filter Buttons]                   │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ [Image]  │ │ [Image]  │ │ [Image]  │    │
│  │ Therapy  │ │ Therapy  │ │ Therapy  │    │
│  │ Details  │ │ Details  │ │ Details  │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│                                              │
│  ┌──────────┐ ┌──────────┐ ┌──────────┐    │
│  │ [Image]  │ │ [Image]  │ │ [Image]  │    │
│  │ Therapy  │ │ Therapy  │ │ Therapy  │    │
│  │ Details  │ │ Details  │ │ Details  │    │
│  └──────────┘ └──────────┘ └──────────┘    │
│                                              │
└──────────────────────────────────────────────┘
```

**Placeholder Locations:** `public/therapies/*.jpg`

### 3. Booking Flow
```
┌─────────────────────────────────────┐
│ Step 1: Select Therapy              │
│ ┌─────────────────────────────────┐ │
│ │ [Therapy Selection Dropdown]    │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Step 2: Choose Date & Time          │
│ ┌─────────────────────────────────┐ │
│ │ [Date Picker]  [Time Slots]     │ │
│ └─────────────────────────────────┘ │
│                                     │
│ Step 3: Enter Details               │
│ ┌─────────────────────────────────┐ │
│ │ Name: [_________________]       │ │
│ │ Email: [________________]       │ │
│ │ Phone: [________________]       │ │
│ └─────────────────────────────────┘ │
│                                     │
│                      [Book Now]     │
└─────────────────────────────────────┘
```

### 4. Testimonials Carousel
```
┌──────────────────────────────────────────┐
│  What Our Clients Say                    │
│                                          │
│  < ┌────────────────────────────┐ >    │
│    │ ★★★★★                     │      │
│    │ "Great experience..."      │      │
│    │ – Sarah M.                 │      │
│    └────────────────────────────┘      │
│                                          │
└──────────────────────────────────────────┘
```

### 5. Header Navigation
```
┌─────────────────────────────────────────┐
│ [Logo]  Home About Therapies Booking    │
└─────────────────────────────────────────┘

Mobile:
┌──────────────────────────────┐
│ [Logo]               [Menu]  │
│                              │
│ (When menu open)             │
│ Home                         │
│ About                        │
│ Therapies                    │
│ Booking                      │
│ Visit Us                     │
└──────────────────────────────┘
```

---

## 🤝 Contributing

### Guidelines

1. **Fork & Clone**
   ```bash
   git clone https://github.com/viraj1011JAIN/wellvitas-web.git
   cd wellvitas-web
   ```

2. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. **Make Changes**
   - Write clear commit messages
   - Test thoroughly
   - Follow existing code style

4. **Format & Lint**
   ```bash
   npm run format
   ```

5. **Commit & Push**
   ```bash
   git commit -m "Add: description of changes"
   git push origin feature/your-feature-name
   ```

6. **Open Pull Request**
   - Describe changes clearly
   - Link related issues
   - Wait for review

### Code Style

- **JavaScript:** Modern ES6+, arrow functions preferred
- **React:** Functional components with hooks
- **CSS:** Tailwind utilities, inline className
- **Components:** PascalCase, single responsibility principle
- **Files:** camelCase for utilities, PascalCase for components

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

---

## 📞 Support & Contact

**Website:** [wellvitas.co.uk](https://wellvitas.co.uk)  
**Email:** [contact@wellvitas.co.uk](mailto:contact@wellvitas.co.uk)  
**WhatsApp:** Available via site  
**GitHub Issues:** [Report bugs](https://github.com/viraj1011JAIN/wellvitas-web/issues)

---

## 📚 Resources & Documentation

### Official Docs
- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Storyblok Docs](https://www.storyblok.com/docs)

### Related Services
- [Vercel Deployment](https://vercel.com/docs)
- [Resend Email](https://resend.com/docs)
- [Supabase](https://supabase.com/docs)
- [Appwrite](https://appwrite.io/docs)

### Performance & SEO
- [Web Vitals Guide](https://web.dev/vitals/)
- [Next.js Image Optimization](https://nextjs.org/docs/app/building-your-application/optimizing/images)
- [Structured Data](https://schema.org/)

---

## 🎉 Acknowledgments

Built with care for the Wellvitas community. Special thanks to:
- Next.js & React teams for excellent frameworks
- Tailwind CSS for utility-first styling
- All contributors and supporters

---

**Last Updated:** December 2025  
**Maintained By:** [Viraj Jain](https://github.com/viraj1011JAIN)  
**Repository:** [wellvitas-web](https://github.com/viraj1011JAIN/wellvitas-web)