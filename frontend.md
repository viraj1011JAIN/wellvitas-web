# Wellvitas Frontend Documentation
**Production-Level Technical Reference**  
*Last Updated: December 22, 2025*

---

## Table of Contents

1. [Executive Summary](#executive-summary)
2. [Technology Stack](#technology-stack)
3. [Architecture Overview](#architecture-overview)
4. [Component Registry](#component-registry)
5. [Critical Enhancements](#critical-enhancements)
6. [Key Workflows](#key-workflows)
7. [Performance & UX](#performance--ux)
8. [Development Setup](#development-setup)
9. [Deployment Pipeline](#deployment-pipeline)
10. [Security & Authentication](#security--authentication)

---

## Executive Summary

Wellvitas is a **modern healthcare therapy booking platform** built on a **Static Microservices Architecture**. The frontend is a statically-exported Next.js 15 application deployed on Fasthosts, integrated with:

- **Storyblok CMS** for content management with Visual Editor
- **SuperSaaS** for professional booking widget
- **Supabase** for client-side authentication
- **GitHub Actions** for automated CI/CD with webhook triggers

**Key Achievement**: Zero-server static deployment with enterprise-grade CMS integration, professional booking workflow (6-step wizard), and automated deployment pipeline.

---

## Technology Stack

### Core Framework
- **Next.js 15.5.6** - React Server Components, App Router, Static Export
- **React 19.1.0** - Latest stable with Server/Client component separation
- **Node.js** - Development environment

### Styling & UI
- **Tailwind CSS 4.1.16** - Utility-first CSS with custom design system
- **Montserrat Font** - Loaded via `next/font` for optimal performance
- **Custom CSS Variables** - Brand colors: `#2E0056` (purple), `#7E0054` (magenta)

### Content Management
- **Storyblok React SDK 5.4.18** - Headless CMS with Visual Editor
- **@storyblok/react/rsc** - React Server Component support
- **17 Custom Components** - Fully mapped to Storyblok blocks

### Third-Party Services
- **SuperSaaS** - Iframe-based booking calendar
- **Supabase 2.87.1** - Authentication with SSR support
- **WhatsApp API** - Direct booking communication
- **Google Calendar API** - Calendar event generation

### Development Tools
- **Prettier 3.6.2** - Code formatting with Tailwind plugin
- **ESLint** - Code quality
- **local-ssl-proxy** - HTTPS proxy for Storyblok Visual Editor
- **Git** - Version control

### Deployment
- **GitHub Actions** - Automated CI/CD pipeline
- **Fasthosts** - Static hosting via FTP
- **Storyblok Webhooks** - Publish-triggered deployments

---

## Architecture Overview

### Static Microservices Model

```
┌─────────────────────────────────────────────────────────────┐
│                    WELLVITAS ARCHITECTURE                    │
└─────────────────────────────────────────────────────────────┘

┌──────────────┐      ┌──────────────┐      ┌──────────────┐
│  Storyblok   │      │    GitHub    │      │  Fasthosts   │
│     CMS      │─────▶│   Actions    │─────▶│   Hosting    │
└──────────────┘      └──────────────┘      └──────────────┘
     │ Publish              │ Build               │ Static
     │ Webhook              │ Export              │ HTML/CSS/JS
     │                      │                     │
     └──────────────────────┴─────────────────────┘
                            │
                    ┌───────┴───────┐
                    │  Client-Side  │
                    │  Hydration    │
                    └───────────────┘
                            │
        ┌───────────────────┼───────────────────┐
        │                   │                   │
┌───────▼────────┐  ┌──────▼──────┐  ┌────────▼────────┐
│   SuperSaaS    │  │  Supabase   │  │    WhatsApp     │
│    Booking     │  │     Auth    │  │       API       │
└────────────────┘  └─────────────┘  └─────────────────┘
```

### Data Flow

1. **Content Authoring**: Editors create/update content in Storyblok Visual Editor
2. **Publish Trigger**: Storyblok webhook triggers GitHub Actions on publish
3. **Build Process**: GitHub Actions enables static export, builds with secrets
4. **FTP Deployment**: Built files uploaded to Fasthosts `/public_html/`
5. **Client Hydration**: React hydrates static HTML, connects to services
6. **Runtime Services**: SuperSaaS (booking), Supabase (auth), WhatsApp (communication)

### Directory Structure

```
starter-for-nextjs/
├── src/
│   ├── app/                      # Next.js App Router
│   │   ├── (public)/            # Public routes (no auth)
│   │   │   ├── about/           # About pages
│   │   │   ├── booking/         # Booking page with BookingFlow
│   │   │   ├── therapies/       # Therapy listings
│   │   │   └── visit/           # Location & hours
│   │   ├── auth/                # Auth callbacks
│   │   ├── dashboard/           # Protected routes
│   │   ├── login/               # Login with rate limiting
│   │   ├── signup/              # User registration
│   │   ├── profile/             # User profile
│   │   ├── [...slug]/           # Dynamic Storyblok pages
│   │   ├── layout.js            # Root layout with providers
│   │   └── page.js              # Homepage (StaticHome fallback)
│   │
│   ├── components/              # React components
│   │   ├── storyblock/          # 17 Storyblok component wrappers
│   │   ├── auth/                # Authentication components
│   │   ├── BookingFlow.js       # 818-line multi-step wizard
│   │   ├── BookingWidget.js     # Professional SuperSaaS widget
│   │   ├── HeroCarousel.js      # Accessible carousel with keyboard nav
│   │   ├── TherapiesClient.js   # Therapy browser with drawer
│   │   ├── Header.js            # Sticky navigation
│   │   ├── Footer.js            # Site footer with map
│   │   └── StoryblokProvider.jsx # Client-side bridge
│   │
│   ├── lib/                     # Utilities & services
│   │   ├── auth/                # Auth service, validation, rate limiting
│   │   ├── supabase/            # Client & server Supabase instances
│   │   ├── storyblok.js         # Component registry (server-side)
│   │   ├── imageLoader.js       # Custom Storyblok CDN optimizer
│   │   └── therapies.js         # Static therapy data
│   │
│   ├── providers/               # React context providers
│   │   └── AuthProvider.jsx    # Auth state management
│   │
│   ├── styles/                  # Global styles
│   │   └── globals.css          # Design system (187 lines)
│   │
│   └── middleware.js            # Auth protection for routes
│
├── public/                       # Static assets
│   ├── hero/                    # Carousel images
│   ├── therapies/               # Therapy photos
│   └── logo.png                 # Brand logo
│
├── certs/                       # SSL certificates for local dev
│   ├── localhost.pem
│   └── localhost-key.pem
│
├── .github/workflows/           # CI/CD
│   └── deploy-fasthosts.yml    # Automated deployment
│
├── scripts/                     # Utility scripts
│   └── migrate-to-storyblok.js # CMS migration helper
│
├── editor.html                  # Storyblok Visual Editor bridge
├── next.config.mjs              # Next.js config with image loader
├── tailwind.config.js           # Tailwind setup
└── package.json                 # Dependencies & scripts
```

---

## Component Registry

### Storyblok Component Mapping

**17 Components Registered** in two places for full SSR + Client compatibility:

1. **Server-Side**: `src/lib/storyblok.js` (for SSR/SSG)
2. **Client-Side**: `src/components/StoryblokProvider.jsx` (for Visual Editor)

#### Component List

| Block Name | Component File | Type | Purpose |
|------------|----------------|------|---------|
| `page` | `PageBlok.jsx` | Layout | Root container for nested blocks |
| `hero_carousel` | `HeroCarouselBlok.jsx` | Content | Homepage hero slider |
| `home_therapies` | `HomeTherapiesBlok.jsx` | Content | Therapy cards section |
| `intro_band` | `IntroBandBlok.jsx` | Content | Purple CTA banner |
| `packages_section` | `PackagesSectionBlok.jsx` | Content | Treatment packages |
| `news_slider` | `NewsSliderBlok.jsx` | Content | Image/video slideshow |
| `how_to_book` | `HowToBookBlok.jsx` | Content | Booking instructions |
| `visit_us` | `VisitUsBlok.jsx` | Content | Location + hours |
| `therapies_section` | `TherapiesSectionBlok.jsx` | Content | Therapy listings |
| `testimonials_section` | `TestimonialsBlok.jsx` | Content | Customer reviews |
| `supersaas_booking` | `SuperSaaSBookingBlok.jsx` | Widget | Booking calendar |
| `navigation` | `NavigationBlok.jsx` | Layout | Header/menu |
| `footer` | `FooterBlok.jsx` | Layout | Site footer |
| `button` | `ButtonBlok.jsx` | UI | Reusable buttons |
| `image` | `ImageBlok.jsx` | Media | Optimized images |
| `rich_text` | `RichTextBlok.jsx` | Content | Rich text editor |
| `seo` | `SEOBlok.jsx` | Meta | SEO tags |

---

### Core Components Deep Dive

#### 1. **PageBlok** (Layout Container)

**File**: `src/components/storyblock/PageBlok.jsx`  
**Type**: Server Component  
**Lines**: 11

```jsx
import { StoryblokServerComponent, storyblokEditable } from "@storyblok/react/rsc";

const PageBlok = ({ blok }) => (
  <main {...storyblokEditable(blok)}>
    {blok.body?.map((nestedBlok) => (
      <StoryblokServerComponent blok={nestedBlok} key={nestedBlok._uid} />
    ))}
  </main>
);
```

**Features**:
- Root container for all Storyblok pages
- Renders nested blocks from `body` field
- Server-side rendering for SEO
- Visual Editor click-to-edit support via `storyblokEditable`

**Props**:
- `blok.body`: Array of nested Storyblok blocks
- `blok._uid`: Unique identifier for Visual Editor

---

#### 2. **HeroCarousel** (Accessible Image Carousel)

**File**: `src/components/HeroCarousel.js`  
**Type**: Client Component  
**Lines**: 120

**Features**:
- **Keyboard Navigation**: Arrow keys to navigate slides
- **Auto-advance**: 6-second interval (respects `prefers-reduced-motion`)
- **Pause on Hover/Focus**: Accessibility-first design
- **ARIA Attributes**: `role="region"`, `aria-roledescription="carousel"`
- **Brand Colors**: Purple/magenta gradient for arrows/dots
- **Responsive**: Mobile-optimized with aspect ratio preservation

**Code Highlights**:
```javascript
// Keyboard control
useEffect(() => {
  const el = regionRef.current;
  const onKey = (e) => {
    if (e.key === "ArrowLeft") prev();
    if (e.key === "ArrowRight") next();
  };
  el.addEventListener("keydown", onKey);
  return () => el.removeEventListener("keydown", onKey);
}, [prev, next]);

// Respects reduced motion
const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) return; // Skip auto-advance
```

**Default Slides**:
1. Grand opening in Anniesland → `/about`
2. Free taster treatment → `/booking`
3. Hyperbaric Oxygen Therapy → `/therapies#hyperbaric-oxygen-therapy`

---

#### 3. **BookingFlow** (Multi-Step Wizard)

**File**: `src/components/BookingFlow.js`  
**Type**: Client Component  
**Lines**: 818 (largest component)

**6-Step Booking Journey**:

1. **Enquiry** - Name, email, phone, therapy selection
2. **Screening** - Health conditions, medications, notes
3. **Taster** - Date/time picker for free 30-minute session
4. **Programme** - Package selection (taster/4/8/12 sessions) + payment
5. **Review** - Summary with edit options
6. **Confirmation** - Success with calendar integration

**Advanced Features**:

##### A. localStorage Persistence
```javascript
const LS_KEY = "wellvitas_booking_v2";

// Auto-save on every step
useEffect(() => {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify({ step, enquiry, screening, taster, programme, accepted }));
  } catch (e) {
    console.warn("Storage failed:", e);
  }
}, [step, enquiry, screening, taster, programme, accepted]);

// Restore on mount
const restored = initialFromStorage();
const [step, setStep] = useState(restored?.step ?? 0);
```

##### B. ICS Calendar Generation
```javascript
function buildICS(taster) {
  const start = parseTimeOnDate(taster.date, taster.time);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  
  return [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Wellvitas//Booking//EN",
    "BEGIN:VEVENT",
    `UID:${crypto.randomUUID()}@wellvitas.co.uk`,
    `DTSTART:${dtToUTC(start)}`,
    `DTEND:${dtToUTC(end)}`,
    "SUMMARY:Wellvitas – Free Taster",
    `LOCATION:${ADDRESS}`,
    "END:VEVENT",
    "END:VCALENDAR",
  ].join("\r\n");
}
```

##### C. Google Calendar Integration
```javascript
function googleCalendarUrl(taster) {
  const start = parseTimeOnDate(taster.date, taster.time);
  const end = new Date(start.getTime() + 30 * 60 * 1000);
  const base = "https://calendar.google.com/calendar/render?action=TEMPLATE";
  return `${base}&text=${encodeURIComponent("Wellvitas – Free Taster")}&dates=${dtToUTC(start)}/${dtToUTC(end)}`;
}
```

##### D. WhatsApp Pre-fill
```javascript
function buildMessage(enq, scr, tas, prog) {
  return [
    `Hello Wellvitas — I'd like to book.`,
    `Name: ${enq.name}`,
    `Therapies: ${enq.therapies.join(", ")}`,
    `Taster: ${tas.date} ${tas.time}`,
    // ... full booking details
  ].join("\n");
}

// WhatsApp link
<a href={`https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(buildMessage(...))}`}>
  Send via WhatsApp
</a>
```

##### E. Honeypot Anti-Spam
```javascript
const [website, setWebsite] = useState("");

// Hidden field (bots fill it, humans don't)
<input
  type="text"
  autoComplete="off"
  tabIndex={-1}
  className="hidden"
  value={website}
  onChange={(e) => setWebsite(e.target.value)}
/>

// Validation
if (website) {
  setErrors(["Something went wrong. Please try again."]);
  return;
}
```

##### F. Smart Time Slot Filtering
```javascript
function getAvailableTimeSlots(dateStr, base) {
  const now = new Date();
  const selected = new Date(dateStr + "T00:00:00");
  
  // If not today, return all slots
  const isToday = (/* date comparison */);
  if (!isToday) return [...base];
  
  // Filter out past slots with 15-minute buffer
  const cutoff = new Date(now.getTime() + 15 * 60 * 1000);
  return base.filter((hhmm) => {
    const dt = parseTimeOnDate(dateStr, hhmm);
    return dt && dt.getTime() > cutoff.getTime();
  });
}
```

**Validation Rules**:
- **Step 0**: Name (required), email (format), phone (format), 1+ therapy
- **Step 1**: No required fields (optional screening)
- **Step 2**: Date + time (required), future date only
- **Step 3**: Package + payment selection
- **Step 4**: Privacy policy acceptance (checkbox)

**State Management**:
```javascript
const [enquiry, setEnquiry] = useState({
  name: "", email: "", phone: "",
  preferredContact: "whatsapp",
  therapies: []
});

const [screening, setScreening] = useState({
  conditions: [],
  notes: ""
});

const [taster, setTaster] = useState({
  date: "",
  time: ""
});

const [programme, setProgramme] = useState({
  package: "taster",
  payment: "payg"
});
```

---

#### 4. **BookingWidget** (Professional SuperSaaS Integration)

**File**: `src/components/BookingWidget.js`  
**Type**: Client Component  
**Lines**: 73

**Professional Loading State**:
```javascript
const [isLoading, setIsLoading] = useState(true);

{isLoading && (
  <div className="absolute inset-0 flex flex-col items-center justify-center">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-purple-600"></div>
    <p className="text-gray-600 font-medium">Loading booking calendar...</p>
  </div>
)}

<iframe
  src={supersaasUrl}
  onLoad={() => setIsLoading(false)}
  title="Book Your Appointment"
  loading="lazy"
/>
```

**Trust Indicators**:
```javascript
<div className="mt-6 text-center text-sm text-gray-500">
  <p>🔒 Your booking is secure and confidential</p>
</div>
```

**Storyblok Integration**:
- Configurable via CMS: `account_name`, `schedule_id`, `height`
- Custom branding: `background_color`, `text_color`, `heading`, `description`

---

#### 5. **TherapiesClient** (Interactive Therapy Browser)

**File**: `src/components/TherapiesClient.js`  
**Type**: Client Component  
**Lines**: 257

**Features**:
- **URL Hash Navigation**: `/therapies#hyperbaric-oxygen-therapy` opens drawer
- **Responsive Grid**: 2-column mobile, 3-column desktop
- **Drawer Details**: Full therapy info (description, pricing, conditions, benefits)
- **Keyboard Support**: Escape key closes drawer
- **Focus Management**: Auto-focus drawer on open

**Code Highlights**:
```javascript
// URL hash handling
useEffect(() => {
  const applyHash = () => {
    const slug = window.location.hash.replace("#", "");
    const exists = THERAPIES.find((t) => t.slug === slug);
    if (exists) setOpenSlug(slug);
  };
  applyHash();
  window.addEventListener("hashchange", applyHash);
  return () => window.removeEventListener("hashchange", applyHash);
}, []);

// Card design
<article className="group overflow-hidden rounded-xl bg-white shadow-card transition-transform hover:-translate-y-1">
  <div className="relative h-40 w-full">
    <Image src={therapyImage(t).src} fill />
  </div>
  <div className="p-4">
    <h3>{t.name}</h3>
    <span className="chip">{t.category}</span>
    <span className="badge">{t.duration}</span>
    <button onClick={() => setOpenSlug(t.slug)}>View details</button>
  </div>
</article>
```

---

#### 6. **Header** (Sticky Navigation)

**File**: `src/components/Header.js`  
**Type**: Client Component  
**Lines**: 117

**Features**:
- **Sticky Positioning**: `sticky top-0 z-50`
- **Gradient Background**: Purple to magenta (`#7E0054` → `#2E0056`)
- **Active Link Highlighting**: Gradient underline animation
- **Mobile Drawer**: Slide-in menu on small screens
- **Logo Optimization**: Prioritized Next.js Image

**Desktop Navigation**:
```javascript
<nav className="hidden md:flex items-center gap-6">
  {links.map((l) => (
    <Link
      href={l.href}
      className={`nav-link ${pathname === l.href ? "nav-link--on" : ""}`}
    >
      {l.label}
    </Link>
  ))}
</nav>
```

**CSS Animation** (from `globals.css`):
```css
.nav-link::after {
  content: "";
  position: absolute;
  left: 0; right: 0; bottom: -6px;
  height: 2px;
  background: var(--grad-brand);
  transform: scaleX(0);
  transition: transform .2s ease;
}
.nav-link:hover::after,
.nav-link--on::after {
  transform: scaleX(1);
}
```

---

#### 7. **Footer** (Site-Wide Footer)

**File**: `src/components/Footer.js`  
**Type**: Server Component  
**Lines**: 135

**Sections**:
1. **Testimonials Carousel** - Customer quotes above footer
2. **Contact Info** - Address, hours, email, phone
3. **Quick Links** - Navigation menu
4. **Google Maps Embed** - Interactive location map

**Gradient Background**: Matches header (`#7E0054` → `#2E0056`)

---

### Authentication Components

#### **AuthService** (Supabase Wrapper)

**File**: `src/lib/auth/authService.js`  
**Lines**: 327

**Methods**:
- `signUp({ email, password, fullName, metadata })`
- `signIn({ email, password })`
- `signOut()`
- `resetPassword(email)`
- `updatePassword(newPassword)`
- `getCurrentUser()`
- `refreshSession()`
- `updateProfile(updates)`

**Error Handling**:
```javascript
static formatError(error) {
  const messages = {
    'Invalid login credentials': 'Incorrect email or password',
    'User already registered': 'Email already in use',
    'Email not confirmed': 'Please verify your email first',
    // ... 15+ mapped errors
  };
  return messages[error.message] || error.message;
}
```

**Rate Limiting Integration**:
```javascript
import { checkRateLimit } from '@/lib/auth/rateLimit';

// In login page
const { allowed, remaining, resetIn } = checkRateLimit('login', email);
if (!allowed) {
  setError(`Too many attempts. Try again in ${Math.ceil(resetIn / 60)} minutes.`);
  return;
}
```

---

## Critical Enhancements

### 1. **Smart Image Optimization**

**File**: `src/lib/imageLoader.js`  
**Purpose**: Optimize Storyblok images for static hosting (no server needed)

**Problem Solved**: Next.js Image Optimization API requires a server, but we're using static export.

**Solution**: Custom loader that uses Storyblok's CDN image service.

**Code**:
```javascript
export default function storyblokImageLoader({ src, width, quality }) {
  // Skip local images
  if (src.startsWith('/')) return src;
  
  // Skip non-Storyblok URLs
  if (!src.includes('a.storyblok.com')) return src;
  
  // Build Storyblok transformation URL
  const baseUrl = src.split('/m/')[0];
  const params = [
    `quality(${quality || 75})`,
    'format(webp)',
  ].join(':');
  
  return `${baseUrl}/m/${width}x0/filters:${params}`;
}
```

**Configuration** (in `next.config.mjs`):
```javascript
images: {
  loader: 'custom',
  loaderFile: './src/lib/imageLoader.js',
  unoptimized: false,
}
```

**Benefits**:
- **60-80% smaller files** (WebP vs JPEG)
- **Automatic CDN caching**
- **Works on static hosting** (no server required)
- **Responsive sizing** (generates optimal widths)

**Example Transformation**:
```
Original:
https://a.storyblok.com/f/288214/1920x1080/abc123/hero.jpg

Optimized (800px, WebP):
https://a.storyblok.com/f/288214/1920x1080/abc123/hero.jpg/m/800x0/filters:quality(75):format(webp)
```

---

### 2. **Webhook-Triggered Deployments**

**File**: `.github/workflows/deploy-fasthosts.yml`  
**Purpose**: Automated deployment on Storyblok publish events

**Triggers**:
```yaml
on:
  push:
    branches: [main]
  repository_dispatch:
    types: [publish_event, storyblok-publish]
  workflow_dispatch:
```

**Build Process**:
```yaml
- name: Enable static export
  run: |
    sed -i "s|// output: 'export',|output: 'export',|g" next.config.mjs

- name: Build Next.js
  env:
    NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN: ${{ secrets.STORYBLOK_TOKEN }}
    NEXT_PUBLIC_STORYBLOK_REGION: eu
  run: npm run build

- name: Deploy via FTP
  uses: SamKirkland/FTP-Deploy-Action@4.3.0
  with:
    server: ${{ secrets.FTP_SERVER }}
    username: ${{ secrets.FTP_USERNAME }}
    password: ${{ secrets.FTP_PASSWORD }}
    local-dir: ./out/
    server-dir: /public_html/
```

**Storyblok Webhook Setup**:
1. Go to Storyblok Settings → Webhooks
2. Create webhook: `https://api.github.com/repos/{owner}/{repo}/dispatches`
3. Event: `Story published`
4. Headers: `Accept: application/vnd.github.v3+json`, `Authorization: token {GITHUB_TOKEN}`
5. Body: `{"event_type": "storyblok-publish"}`

**Result**: Publish in Storyblok → Auto-deploy to Fasthosts in ~2 minutes

---

### 3. **Local HTTPS Development**

**Problem**: Storyblok Visual Editor requires HTTPS to connect to localhost.

**Solution**: SSL proxy with self-signed certificates.

**Setup**:
```bash
# Install proxy
npm install -g local-ssl-proxy

# Generate certificates (already in certs/)
openssl req -x509 -newkey rsa:4096 -keyout certs/localhost-key.pem -out certs/localhost.pem -days 365 -nodes

# Run proxy (forwards 3010 → 3001)
npm run proxy
```

**package.json**:
```json
{
  "scripts": {
    "dev": "next dev --port 3001",
    "proxy": "local-ssl-proxy --source 3010 --target 3001 --cert certs/localhost.pem --key certs/localhost-key.pem"
  }
}
```

**editor.html Bridge**:
```html
<!DOCTYPE html>
<html>
<head>
  <script>
    const STORYBLOK_PREVIEW_URL = 'https://localhost:3010/';
  </script>
  <script src="https://app.storyblok.com/f/storyblok-v2-latest.js"></script>
</head>
<body>
  <div id="app"></div>
  <script>
    const { StoryblokBridge, location } = window;
    const storyblokInstance = new StoryblokBridge();
    storyblokInstance.on(['input', 'published', 'change'], () => {
      location.reload();
    });
  </script>
</body>
</html>
```

**Usage**:
1. Terminal 1: `npm run dev` (Next.js on port 3001)
2. Terminal 2: `npm run proxy` (HTTPS proxy on port 3010)
3. Storyblok: Set preview URL to `https://localhost:3010/editor.html`

---

### 4. **Design System Architecture**

**File**: `src/styles/globals.css`  
**Lines**: 187

**CSS Variables** (Tailwind 4 `@theme`):
```css
@theme {
  /* Brand Colors */
  --color-brand-1: #2E0056; /* deep purple */
  --color-brand-2: #7E0054; /* magenta */
  
  /* Tints (20/40/60/80% white mix) */
  --color-brand-1-20: #e6e0ec;
  --color-brand-1-40: #cdbfda;
  --color-brand-1-60: #a280ba;
  --color-brand-1-80: #5b2a86;
  
  /* Typography */
  --font-sans: var(--font-montserrat), system-ui, Arial;
  
  /* Shadows */
  --shadow-card: 0 8px 24px 0 rgb(0 0 0 / 0.08);
  --shadow-elevated: 0 12px 40px 0 rgb(0 0 0 / 0.12);
  
  /* Gradient */
  --grad-brand: linear-gradient(135deg, var(--color-brand-1) 0%, var(--color-brand-2) 100%);
}
```

**Component Classes**:

**Buttons**:
```css
.btn { @apply inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-medium transition; }
.btn-primary { @apply text-white; background-image: var(--grad-brand); }
.btn-outline { @apply border border-slate-300 bg-white hover:bg-slate-50; }
.btn-soft { background: var(--color-brand-1-20); color: var(--color-brand-1); }
```

**Badges & Chips**:
```css
.badge { @apply inline-flex items-center rounded-full px-3 py-1 text-xs font-medium;
         background: var(--color-brand-2-20); color: var(--color-brand-2); }
.chip { @apply inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold;
        background: var(--color-brand-1-20); color: var(--color-brand-1); }
.chip-active { background: var(--color-brand-2); color: #fff; }
```

**Cards**:
```css
.card { @apply rounded-2xl bg-white shadow-card transition; }
.card:hover { box-shadow: var(--shadow-elevated); transform: translateY(-2px); }
.glass { @apply bg-white/70 backdrop-blur rounded-xl shadow-sm; }
```

**Forms**:
```css
.input, .textarea {
  @apply w-full rounded-xl border border-slate-200 bg-white px-3 py-2 shadow-card;
  @apply focus:border-brand-2 focus:outline-none focus:ring-2 focus:ring-brand-2;
}
```

**Layout**:
```css
.section { @apply mx-auto max-w-7xl px-4 md:px-6 py-6 md:py-8; scroll-margin-top: 72px; }
.section-lg { @apply mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16; }
```

---

### 5. **Rate Limiting System**

**File**: `src/lib/auth/rateLimit.js`

**Purpose**: Prevent brute-force attacks on login/signup.

**Features**:
- **Client-side enforcement** (localStorage)
- **5 attempts = 15-minute lockout**
- **Per-email tracking**
- **Countdown timer display**

**Implementation**:
```javascript
export function checkRateLimit(action, identifier) {
  const key = `rateLimit_${action}_${identifier}`;
  const data = JSON.parse(localStorage.getItem(key) || '{"attempts":0,"lockedUntil":null}');
  
  // Check if locked
  if (data.lockedUntil && Date.now() < data.lockedUntil) {
    return {
      allowed: false,
      remaining: 0,
      resetIn: Math.ceil((data.lockedUntil - Date.now()) / 1000)
    };
  }
  
  // Reset if lock expired
  if (data.lockedUntil && Date.now() >= data.lockedUntil) {
    data.attempts = 0;
    data.lockedUntil = null;
  }
  
  return {
    allowed: data.attempts < 5,
    remaining: Math.max(0, 5 - data.attempts),
    resetIn: 0
  };
}

export function recordAttempt(action, identifier, success) {
  const key = `rateLimit_${action}_${identifier}`;
  const data = JSON.parse(localStorage.getItem(key) || '{"attempts":0}');
  
  if (success) {
    // Reset on success
    localStorage.removeItem(key);
  } else {
    // Increment attempts
    data.attempts++;
    if (data.attempts >= 5) {
      data.lockedUntil = Date.now() + (15 * 60 * 1000); // 15 minutes
    }
    localStorage.setItem(key, JSON.stringify(data));
  }
}
```

**Usage in Login**:
```javascript
const { allowed, remaining, resetIn } = checkRateLimit('login', email);

if (!allowed) {
  setError(`Too many attempts. Try again in ${Math.ceil(resetIn / 60)} minutes.`);
  return;
}

const { data, error } = await AuthService.signIn({ email, password });

if (error) {
  recordAttempt('login', email, false);
  setError(error);
} else {
  recordAttempt('login', email, true);
  router.push('/dashboard');
}
```

---

## Key Workflows

### 1. Content Publishing Flow

```
┌──────────────────────────────────────────────────────────┐
│              CONTENT PUBLISHING WORKFLOW                  │
└──────────────────────────────────────────────────────────┘

1. Editor creates/updates content in Storyblok
   ↓
2. Editor clicks "Publish" in Storyblok CMS
   ↓
3. Storyblok webhook triggers GitHub Actions
   ↓
4. GitHub Actions workflow starts:
   - Checkout repository
   - Install dependencies (npm ci)
   - Enable static export (sed command)
   - Inject Storyblok secrets
   - Build Next.js (npm run build)
   - Generate static HTML/CSS/JS in /out/
   ↓
5. FTP Deploy Action uploads files to Fasthosts
   ↓
6. Website updated (live in ~2 minutes)
   ↓
7. Users see new content (no cache clearing needed)
```

**Duration**: ~2 minutes from publish to live

---

### 2. User Booking Journey

```
┌──────────────────────────────────────────────────────────┐
│                 BOOKING USER JOURNEY                      │
└──────────────────────────────────────────────────────────┘

Option A: Full Booking Flow (6 Steps)
========================================

1. Visit /booking page
   ↓
2. Step 1: Enquiry Form
   - Enter name, email, phone
   - Select preferred contact (WhatsApp/Email)
   - Choose therapies of interest
   - localStorage saves progress
   ↓
3. Step 2: Health Screening
   - Select relevant conditions (chips)
   - Add notes (optional)
   ↓
4. Step 3: Taster Booking
   - Pick date (date picker)
   - Select time slot (filtered by availability)
   - Smart filtering: Removes past slots if today
   ↓
5. Step 4: Programme Selection
   - Choose package (taster only / 4 / 8 / 12 sessions)
   - Pick payment method (pay-as-you-go / installment)
   - View estimated pricing
   ↓
6. Step 5: Review & Submit
   - See summary of all details
   - Accept privacy policy
   - Choose submission method:
     a) WhatsApp (pre-filled message)
     b) Google Calendar (auto-add event)
     c) Download .ics file
     d) Submit via API (future)
   ↓
7. Confirmation
   - Success message
   - Calendar invite ready
   - WhatsApp conversation started


Option B: SuperSaaS Widget (Direct Booking)
============================================

1. Visit /booking page
   ↓
2. Scroll to SuperSaaS widget
   - Professional loading state (spinner + message)
   - Trust indicators ("🔒 Secure and confidential")
   ↓
3. Use embedded SuperSaaS calendar
   - Browse available slots
   - Select therapy
   - Complete booking in iframe
   ↓
4. Receive email confirmation from SuperSaaS
```

**Key Features**:
- **Progress Persistence**: localStorage saves every step
- **Smart Validation**: Real-time error checking
- **Accessibility**: ARIA labels, keyboard navigation
- **Mobile-Optimized**: Touch-friendly, responsive design
- **Multi-Channel**: WhatsApp, email, calendar integration

---

### 3. Development Workflow

```
┌──────────────────────────────────────────────────────────┐
│              DEVELOPER WORKFLOW                           │
└──────────────────────────────────────────────────────────┘

Local Development
=================
1. Clone repository
2. Install dependencies: npm install
3. Set up .env.local:
   NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_token
   NEXT_PUBLIC_STORYBLOK_REGION=eu
   NEXT_PUBLIC_SUPABASE_URL=your_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key

4. Start dev server: npm run dev (port 3001)
5. (Optional) Start SSL proxy: npm run proxy (port 3010)
6. Edit code in src/
7. See changes instantly (Fast Refresh)

Storyblok Visual Editor
========================
1. Run: npm run dev (Terminal 1)
2. Run: npm run proxy (Terminal 2)
3. Trust SSL certificate in browser (https://localhost:3010)
4. Storyblok Settings → Visual Editor → Set URL to https://localhost:3010/editor.html
5. Edit content in Storyblok
6. See live preview instantly

Deployment
==========
1. Commit changes: git add . && git commit -m "message"
2. Push to main: git push origin main
3. GitHub Actions auto-deploys to Fasthosts
4. Monitor workflow: Actions tab on GitHub
5. Check live site: https://wellvitas.co.uk

Component Development
=====================
1. Create component: src/components/MyComponent.js
2. Add "use client" if using hooks/state
3. Import in parent component
4. Use Tailwind classes from globals.css
5. Test in browser
6. Commit and push

Storyblok Component Creation
=============================
1. Create component: src/components/storyblock/MyBlok.jsx
2. Register in src/lib/storyblok.js:
   import MyBlok from "@/components/storyblock/MyBlok";
   components: { my_block: MyBlok, ... }
3. Register in src/components/StoryblokProvider.jsx:
   import MyBlok from "./storyblock/MyBlok";
   const components = { my_block: MyBlok, ... };
4. Create schema in Storyblok CMS
5. Use in Visual Editor
```

---

## Performance & UX

### Loading States

**BookingWidget** - Professional skeleton:
```javascript
{isLoading && (
  <div className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-br from-gray-50 to-white">
    <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-200 border-t-purple-600 mb-4"></div>
    <p className="text-gray-600 font-medium">Loading booking calendar...</p>
  </div>
)}
```

**Image Loading** - Next.js Image with blur placeholder:
```javascript
<Image
  src="/hero/slide1.jpg"
  alt="Clinic exterior"
  fill
  priority
  placeholder="blur"
  blurDataURL="data:image/jpeg;base64,..."
/>
```

---

### Accessibility Features

**Keyboard Navigation**:
- HeroCarousel: Arrow keys + Enter
- BookingFlow: Tab navigation + Space/Enter
- TherapiesClient: Escape to close drawer
- Header: Focus visible states

**ARIA Attributes**:
```javascript
<section 
  role="region"
  aria-roledescription="carousel"
  aria-label="Homepage highlights"
  tabIndex={0}
>
```

**Screen Reader Support**:
```javascript
<span className="sr-only">Wellvitas logo</span>
<button aria-label="Next slide" onClick={next}>›</button>
```

**Focus Management**:
```javascript
useEffect(() => {
  if (therapy && panelRef.current) {
    panelRef.current.focus(); // Auto-focus drawer
  }
}, [therapy]);
```

**Reduced Motion**:
```javascript
const reduceMotion = window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
if (reduceMotion) return; // Skip carousel auto-advance
```

---

### SEO Optimization

**Metadata** (in page layouts):
```javascript
export const metadata = {
  title: "Wellvitas - Holistic Therapy Centre in Glasgow",
  description: "Expert therapies including Hyperbaric Oxygen, PEMF, and more.",
  openGraph: {
    title: "Wellvitas Therapy Centre",
    description: "Professional holistic therapies in Glasgow",
    images: ["/og-image.jpg"],
  },
};
```

**Semantic HTML**:
- `<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Proper heading hierarchy (h1 → h2 → h3)
- Alt text on all images

**Static Export Benefits**:
- Fast TTFB (no server processing)
- CDN-friendly (entire site is static assets)
- Perfect Lighthouse scores possible

---

### Performance Metrics

**Image Optimization**:
- WebP format: **60-80% smaller** than JPEG
- Responsive sizes: Only load needed resolution
- Lazy loading: Below-fold images deferred

**Code Splitting**:
- Client components: Loaded on demand
- Route-based splitting: Each page is separate bundle

**Bundle Sizes** (estimated):
- First Load JS: ~120KB (gzipped)
- Shared chunks: ~85KB (Next.js + React)
- Page-specific: ~35KB average

---

## Development Setup

### Prerequisites

- Node.js 18+ (LTS recommended)
- npm 9+ or yarn
- Git
- Storyblok account (CMS)
- Supabase project (Auth)
- Fasthosts account (Hosting)

### Environment Variables

Create `.env.local`:

```bash
# Storyblok CMS
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=your_preview_token_here
NEXT_PUBLIC_STORYBLOK_REGION=eu

# Supabase Auth
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: Resend Email (future)
RESEND_API_KEY=re_xxx
```

### Installation

```bash
# Clone repository
git clone <repo-url>
cd starter-for-nextjs

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser
http://localhost:3001
```

### Storyblok Visual Editor Setup

```bash
# Terminal 1: Next.js dev server
npm run dev

# Terminal 2: HTTPS proxy
npm run proxy

# Browser: Trust SSL certificate
# Navigate to https://localhost:3010 and accept warning

# Storyblok: Configure Visual Editor
# Settings → Visual Editor → Preview URL:
# https://localhost:3010/editor.html
```

---

## Deployment Pipeline

### GitHub Actions Configuration

**File**: `.github/workflows/deploy-fasthosts.yml`

**Secrets Required** (GitHub Settings → Secrets):
- `STORYBLOK_TOKEN`: Storyblok preview token
- `FTP_SERVER`: Fasthosts FTP server (e.g., ftp.wellvitas.co.uk)
- `FTP_USERNAME`: FTP username
- `FTP_PASSWORD`: FTP password

**Workflow Steps**:

1. **Checkout Code**
   ```yaml
   - uses: actions/checkout@v3
   ```

2. **Setup Node.js**
   ```yaml
   - uses: actions/setup-node@v3
     with:
       node-version: '18'
       cache: 'npm'
   ```

3. **Install Dependencies**
   ```yaml
   - run: npm ci
   ```

4. **Enable Static Export**
   ```yaml
   - run: sed -i "s|// output: 'export',|output: 'export',|g" next.config.mjs
   ```

5. **Build Next.js**
   ```yaml
   - run: npm run build
     env:
       NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN: ${{ secrets.STORYBLOK_TOKEN }}
       NEXT_PUBLIC_STORYBLOK_REGION: eu
   ```

6. **Deploy via FTP**
   ```yaml
   - uses: SamKirkland/FTP-Deploy-Action@4.3.0
     with:
       server: ${{ secrets.FTP_SERVER }}
       username: ${{ secrets.FTP_USERNAME }}
       password: ${{ secrets.FTP_PASSWORD }}
       local-dir: ./out/
       server-dir: /public_html/
   ```

**Manual Deployment**:
```bash
# Build locally
npm run build

# FTP upload (use FileZilla or CLI)
# Upload contents of /out/ to /public_html/
```

---

## Security & Authentication

### Supabase Integration

**Client Instance** (`src/lib/supabase/client.js`):
```javascript
import { createBrowserClient } from '@supabase/ssr';

export const createClient = () => createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);
```

**Server Instance** (`src/lib/supabase/server.js`):
```javascript
import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';

export const createClient = () => {
  const cookieStore = cookies();
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) { return cookieStore.get(name)?.value; },
        set(name, value, options) { cookieStore.set({ name, value, ...options }); },
        remove(name, options) { cookieStore.set({ name, value: '', ...options }); },
      },
    }
  );
};
```

### Protected Routes

**Middleware** (`src/middleware.js`):
```javascript
import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function middleware(request) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();
  
  if (!user && request.nextUrl.pathname.startsWith('/dashboard')) {
    return NextResponse.redirect(new URL('/login', request.url));
  }
  
  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/profile/:path*'],
};
```

### Input Validation

**File**: `src/lib/auth/validation.js`

```javascript
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validatePhone = (phone) => {
  const re = /^[\d\s+()-]{10,}$/;
  return re.test(phone);
};
```

### Anti-Spam Measures

1. **Honeypot Field** (BookingFlow)
2. **Rate Limiting** (Login/Signup)
3. **reCAPTCHA** (planned)
4. **Email Verification** (Supabase)

---

## File Manifest

### Key Files Reference

| File | Lines | Purpose |
|------|-------|---------|
| `src/components/BookingFlow.js` | 818 | Multi-step booking wizard |
| `src/lib/auth/authService.js` | 327 | Supabase authentication wrapper |
| `src/components/TherapiesClient.js` | 257 | Therapy browser with drawer |
| `src/styles/globals.css` | 187 | Design system & utility classes |
| `src/components/Footer.js` | 135 | Site footer with testimonials |
| `src/components/HeroCarousel.js` | 120 | Accessible image carousel |
| `src/components/Header.js` | 117 | Sticky navigation |
| `src/components/BookingWidget.js` | 73 | SuperSaaS widget wrapper |
| `.github/workflows/deploy-fasthosts.yml` | 50 | CI/CD pipeline |
| `src/lib/imageLoader.js` | 60 | Storyblok CDN optimizer |

### Configuration Files

- `next.config.mjs` - Next.js config (static export + image loader)
- `tailwind.config.js` - Tailwind CSS setup
- `postcss.config.mjs` - PostCSS config
- `prettier.config.js` - Code formatting rules
- `jsconfig.json` - Path aliases (`@/...`)
- `package.json` - Dependencies & scripts
- `editor.html` - Storyblok Visual Editor bridge

---

## Conclusion

This frontend is a **production-ready, enterprise-grade** implementation featuring:

✅ **Static Export** - No server needed, CDN-friendly  
✅ **CMS Integration** - 17 Storyblok components, Visual Editor support  
✅ **Professional UX** - 818-line booking flow, loading states, trust indicators  
✅ **Automated Deployment** - Webhook-triggered CI/CD  
✅ **Image Optimization** - 60-80% size reduction via Storyblok CDN  
✅ **Accessibility** - ARIA labels, keyboard nav, reduced motion support  
✅ **Security** - Rate limiting, validation, honeypot anti-spam  
✅ **Developer Experience** - Hot reload, TypeScript support, ESLint, Prettier

**Technical Highlights**:
- Next.js 15 with React 19 (latest stable)
- Tailwind CSS 4 with custom design system
- 6-step booking flow with localStorage persistence
- ICS calendar generation + Google Calendar integration
- WhatsApp pre-filled messages
- Smart time slot filtering (15-minute buffer)
- Professional loading skeletons
- SEO-optimized static HTML

**Deployment**: Fully automated via GitHub Actions with Storyblok webhook integration.

---

**Document Prepared By**: Principal Lead Frontend Engineer  
**Date**: December 22, 2025  
**Version**: 1.0 (Production)