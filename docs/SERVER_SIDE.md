# Server-Side Architecture Documentation

## Overview

The server-side of Wellvitas is powered by **Next.js 15** with **React Server Components (RSC)**, running on Node.js runtime. This architecture enables faster page loads, reduced JavaScript bundles, and direct backend resource access.

---

## Table of Contents

1. [Server Architecture](#server-architecture)
2. [React Server Components](#react-server-components)
3. [Data Fetching](#data-fetching)
4. [API Routes](#api-routes)
5. [Middleware](#middleware)
6. [Authentication](#authentication)
7. [Caching Strategies](#caching-strategies)
8. [Environment Configuration](#environment-configuration)

---

## Server Architecture

### Request Flow

```
Client Request
      ↓
[Edge Middleware] ← Authentication, Preview Mode, Headers
      ↓
[Next.js Server] ← Route matching, Server Component rendering
      ↓
[React Server Components] ← Data fetching, HTML generation
      ↓
[External APIs]
├─ Storyblok CMS ← Content fetch
├─ Supabase ← Auth & Database
└─ SuperSaaS ← Booking data (optional)
      ↓
[Response]
├─ HTML (Server-rendered)
├─ RSC Payload (Component tree)
└─ Client JS Bundle (Hydration)
```

### Server Runtime

**Environment:** Node.js 20.x+  
**Framework:** Next.js 15.5.6  
**Rendering:** Hybrid (SSR + SSG + ISR)

```javascript
// next.config.mjs
const nextConfig = {
  // Server configuration
  output: 'standalone', // For Docker/server deployment
  // OR
  output: 'export', // For static hosting (Fasthosts)
  
  images: {
    unoptimized: true, // Required for static export
  },
  
  trailingSlash: true, // SEO-friendly URLs
};
```

---

## React Server Components

### What Are Server Components?

Server Components render exclusively on the server, never sending JavaScript to the client.

**Benefits:**
- Zero JavaScript bundle (for that component)
- Direct database/API access
- Server-side secrets (environment variables)
- Faster initial page load

### Server Component Example

```javascript
// src/app/page.js (Server Component - NO "use client")
import { getStoryblokApi } from "@/lib/storyblok";
import { StoryblokStory } from "@storyblok/react/rsc";

export const revalidate = 60; // Cache for 60 seconds (ISR)

export default async function HomePage({ searchParams }) {
  // ✅ Can be async
  // ✅ Direct API calls
  // ✅ No client-side JavaScript
  
  const params = await searchParams; // Next.js 15 requirement
  const isPreview = params?._storyblok;
  
  try {
    const storyblokApi = getStoryblokApi();
    
    // Fetch from Storyblok CMS
    const { data } = await storyblokApi.get("cdn/stories/home", {
      version: isPreview ? "draft" : "published",
      cv: isPreview ? Date.now() : undefined, // Cache busting
    });
    
    // Return JSX (rendered on server)
    return <StoryblokStory story={data.story} />;
    
  } catch (error) {
    console.error("Failed to fetch story:", error);
    return <ErrorFallback />;
  }
}

// Metadata for SEO (Server-only)
export async function generateMetadata({ searchParams }) {
  const params = await searchParams;
  
  return {
    title: "Wellvitas - Holistic Health & Wellness",
    description: "Professional holistic health treatment services",
  };
}
```

### Dynamic Routes (Server Components)

```javascript
// src/app/[...slug]/page.js
import { getStoryblokApi } from "@/lib/storyblok";

export default async function DynamicPage({ params, searchParams }) {
  const resolvedParams = await params;
  const resolvedSearchParams = await searchParams;
  
  const slug = resolvedParams.slug?.join("/") || "home";
  const isPreview = resolvedSearchParams._storyblok;
  
  try {
    const storyblokApi = getStoryblokApi();
    const { data } = await storyblokApi.get(`cdn/stories/${slug}`, {
      version: isPreview ? "draft" : "published",
    });
    
    return <StoryblokStory story={data.story} />;
  } catch (error) {
    notFound(); // Next.js 404 page
  }
}

// Generate static paths at build time (SSG)
export async function generateStaticParams() {
  const storyblokApi = getStoryblokApi();
  
  const { data } = await storyblokApi.get("cdn/stories", {
    version: "published",
  });
  
  return data.stories.map(story => ({
    slug: story.full_slug.split("/"),
  }));
}
```

---

## Data Fetching

### Storyblok CMS Integration

```javascript
// src/lib/storyblok.js
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  apiOptions: {
    region: process.env.NEXT_PUBLIC_STORYBLOK_REGION || "eu",
  },
  components: {
    // Component registry
  },
});

// Reusable fetch helper
export async function fetchStory(slug, params = {}) {
  try {
    const sb = getStoryblokApi();
    const { data } = await sb.get(`cdn/stories/${slug}`, {
      version: params.version || "published",
      ...params,
    });
    return data.story;
  } catch (error) {
    console.error("Storyblok fetch error:", error);
    throw error;
  }
}
```

### Database Queries (Supabase)

```javascript
// src/lib/supabase/server.js
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();
  
  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        get(name) {
          return cookieStore.get(name)?.value;
        },
        set(name, value, options) {
          cookieStore.set({ name, value, ...options });
        },
        remove(name, options) {
          cookieStore.set({ name, value: "", ...options });
        },
      },
    }
  );
}

// Usage in Server Component
export async function getUser() {
  const supabase = await createClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error) return null;
  return data.user;
}
```

### External API Calls

```javascript
// Example: Fetch booking data from SuperSaaS
export async function getBookings(scheduleId) {
  const response = await fetch(
    `https://www.supersaas.com/api/schedules/${scheduleId}/appointments`,
    {
      headers: {
        "Authorization": `Bearer ${process.env.SUPERSAAS_API_KEY}`,
      },
      next: {
        revalidate: 300, // Cache for 5 minutes
      },
    }
  );
  
  if (!response.ok) {
    throw new Error("Failed to fetch bookings");
  }
  
  return response.json();
}
```

---

## API Routes

### REST API Endpoints

```javascript
// src/app/api/contact/route.js
import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request) {
  try {
    // Parse request body
    const body = await request.json();
    const { name, email, message } = body;
    
    // Validation
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }
    
    // Send email using Resend
    const { data, error } = await resend.emails.send({
      from: "noreply@wellvitas.com",
      to: "info@wellvitas.com",
      subject: `Contact Form: ${name}`,
      html: `
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong> ${message}</p>
      `,
    });
    
    if (error) {
      return NextResponse.json(
        { error: "Failed to send email" },
        { status: 500 }
      );
    }
    
    return NextResponse.json({ success: true, data });
    
  } catch (error) {
    console.error("Contact API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

// CORS configuration (if needed)
export async function OPTIONS(request) {
  return new NextResponse(null, {
    status: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "POST, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type",
    },
  });
}
```

### Draft Mode API Routes

```javascript
// src/app/api/draft/route.js
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  const slug = searchParams.get("slug") || "/";
  
  // Verify secret token
  if (secret !== process.env.STORYBLOK_PREVIEW_SECRET) {
    return new Response("Invalid token", { status: 401 });
  }
  
  // Enable draft mode
  const draft = await draftMode();
  draft.enable();
  
  // Redirect to the path being previewed
  redirect(slug);
}
```

```javascript
// src/app/api/disable-draft/route.js
import { draftMode } from "next/headers";
import { redirect } from "next/navigation";

export async function GET(request) {
  const draft = await draftMode();
  draft.disable();
  redirect("/");
}
```

### Booking API (SuperSaaS Proxy)

```javascript
// src/app/api/booking/route.js
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();
    const { schedule_id, name, email, date, time } = body;
    
    // Proxy to SuperSaaS API
    const response = await fetch(
      `https://www.supersaas.com/api/schedules/${schedule_id}/appointments`,
      {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.SUPERSAAS_API_KEY}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          start: `${date}T${time}`,
        }),
      }
    );
    
    const data = await response.json();
    
    if (!response.ok) {
      return NextResponse.json(
        { error: data.message || "Booking failed" },
        { status: response.status }
      );
    }
    
    return NextResponse.json({ success: true, booking: data });
    
  } catch (error) {
    console.error("Booking API error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Middleware

```javascript
// src/middleware.js
import { NextResponse } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request) {
  const { pathname, searchParams } = request.nextUrl;
  
  // 1. Storyblok Preview Mode
  if (searchParams.has("_storyblok")) {
    const response = NextResponse.next();
    
    // Allow Storyblok Visual Editor iframe embedding
    response.headers.set("X-Frame-Options", "ALLOWALL");
    response.headers.set(
      "Content-Security-Policy",
      "frame-ancestors 'self' https://app.storyblok.com"
    );
    
    return response;
  }
  
  // 2. Authentication Check
  if (pathname.startsWith("/dashboard") || pathname.startsWith("/profile")) {
    const supabase = createServerClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
      {
        cookies: {
          get(name) {
            return request.cookies.get(name)?.value;
          },
        },
      }
    );
    
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      // Redirect to login
      const loginUrl = new URL("/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }
  
  // 3. Security Headers
  const response = NextResponse.next();
  response.headers.set("X-Content-Type-Options", "nosniff");
  response.headers.set("X-Frame-Options", "SAMEORIGIN");
  response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  
  return response;
}

export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
```

---

## Authentication

### Server-Side Auth Check

```javascript
// src/app/dashboard/page.js (Server Component)
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();
  
  // Server-side auth check
  const { data: { user }, error } = await supabase.auth.getUser();
  
  if (error || !user) {
    redirect("/login");
  }
  
  // Fetch user-specific data
  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", user.id)
    .single();
  
  return (
    <div>
      <h1>Welcome, {profile.name}</h1>
      {/* Dashboard content */}
    </div>
  );
}
```

### Auth Callback Handler

```javascript
// src/app/auth/callback/route.js
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function GET(request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") || "/";
  
  if (code) {
    const supabase = await createClient();
    
    // Exchange code for session
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }
  
  // Auth failed, redirect to error page
  return NextResponse.redirect(`${origin}/auth/auth-code-error`);
}
```

---

## Caching Strategies

### 1. Static Generation (SSG)

```javascript
// Generate at build time, never changes
export default async function StaticPage() {
  const data = await fetchData();
  return <div>{data}</div>;
}

// No revalidate = static forever
```

### 2. Incremental Static Regeneration (ISR)

```javascript
// Regenerate every 60 seconds
export const revalidate = 60;

export default async function ISRPage() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### 3. Server-Side Rendering (SSR)

```javascript
// Fetch on every request
export const dynamic = "force-dynamic";

export default async function SSRPage() {
  const data = await fetchData();
  return <div>{data}</div>;
}
```

### 4. API Route Caching

```javascript
// Cache API responses
export async function GET(request) {
  const data = await fetch("https://api.example.com/data", {
    next: {
      revalidate: 300, // Cache for 5 minutes
    },
  });
  
  return NextResponse.json(data);
}
```

### 5. On-Demand Revalidation

```javascript
// src/app/api/revalidate/route.js
import { revalidatePath, revalidateTag } from "next/cache";
import { NextResponse } from "next/server";

export async function POST(request) {
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  
  // Verify webhook secret
  if (secret !== process.env.REVALIDATE_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }
  
  const body = await request.json();
  const { path, tag } = body;
  
  try {
    if (path) {
      // Revalidate specific path
      revalidatePath(path);
    }
    
    if (tag) {
      // Revalidate all pages with this tag
      revalidateTag(tag);
    }
    
    return NextResponse.json({ revalidated: true, now: Date.now() });
  } catch (error) {
    return NextResponse.json({ error: "Revalidation failed" }, { status: 500 });
  }
}
```

---

## Environment Configuration

### Environment Variables

```env
# .env.local (server-only, not exposed to client)

# Storyblok
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=pXYm0ntr5Tgzae6F8nb22gtt
NEXT_PUBLIC_STORYBLOK_BRAND_SPACE_ID=288214049142470
NEXT_PUBLIC_STORYBLOK_DEFAULT_SPACE_ID=288214049142470
NEXT_PUBLIC_STORYBLOK_REGION=eu
STORYBLOK_PREVIEW_SECRET=your-secret-key

# Supabase
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# SuperSaaS
SUPERSAAS_API_KEY=your-api-key
SUPERSAAS_ACCOUNT_NAME=wellvitas

# Email (Resend)
RESEND_API_KEY=re_your-api-key

# Deployment
REVALIDATE_SECRET=your-revalidate-secret
NODE_ENV=production
```

### Accessing Environment Variables

```javascript
// Server Components & API Routes (Server-side only)
const apiKey = process.env.SUPERSAAS_API_KEY; // ✅ Secret, not exposed

// Client Components (Exposed to browser)
const publicKey = process.env.NEXT_PUBLIC_SUPABASE_URL; // ✅ Public, safe to expose
```

---

## Server-Side Rendering Patterns

### Layout Composition

```javascript
// src/app/layout.js (Server Component)
export default async function RootLayout({ children }) {
  // Fetch global data (navigation, footer)
  const navigation = await fetchNavigation();
  const footer = await fetchFooter();
  
  return (
    <html lang="en">
      <body>
        <Navigation data={navigation} />
        {children}
        <Footer data={footer} />
      </body>
    </html>
  );
}
```

### Parallel Routes

```javascript
// src/app/dashboard/layout.js
export default function DashboardLayout({
  children,
  analytics, // @analytics/page.js
  notifications, // @notifications/page.js
}) {
  return (
    <div className="dashboard">
      <aside>{notifications}</aside>
      <main>{children}</main>
      <aside>{analytics}</aside>
    </div>
  );
}
```

### Loading States

```javascript
// src/app/loading.js (Automatic loading UI)
export default function Loading() {
  return (
    <div className="loading-spinner">
      Loading...
    </div>
  );
}
```

### Error Handling

```javascript
// src/app/error.js (Automatic error boundary)
"use client"; // Must be client component

export default function Error({ error, reset }) {
  return (
    <div className="error-page">
      <h2>Something went wrong!</h2>
      <p>{error.message}</p>
      <button onClick={() => reset()}>Try again</button>
    </div>
  );
}
```

---

## Performance Optimization

### 1. Streaming SSR

```javascript
// src/app/page.js
import { Suspense } from "react";

export default function HomePage() {
  return (
    <div>
      <Header /> {/* Renders immediately */}
      
      <Suspense fallback={<LoadingSkeleton />}>
        <SlowComponent /> {/* Streams when ready */}
      </Suspense>
      
      <Footer /> {/* Renders immediately */}
    </div>
  );
}

async function SlowComponent() {
  const data = await slowFetch(); // Takes 2 seconds
  return <div>{data}</div>;
}
```

### 2. Partial Prerendering

```javascript
// Enable experimental partial prerendering
// next.config.mjs
const nextConfig = {
  experimental: {
    ppr: true, // Partial Prerendering
  },
};
```

### 3. Database Connection Pooling

```javascript
// src/lib/db.js
import { Pool } from "pg";

let pool;

export function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.DATABASE_URL,
      max: 20, // Maximum pool size
      idleTimeoutMillis: 30000,
      connectionTimeoutMillis: 2000,
    });
  }
  return pool;
}
```

---

## Logging & Monitoring

```javascript
// src/lib/logger.js
export function logError(error, context = {}) {
  console.error("Error:", {
    message: error.message,
    stack: error.stack,
    context,
    timestamp: new Date().toISOString(),
  });
  
  // Send to monitoring service (Sentry, LogRocket, etc.)
  if (typeof window === "undefined" && process.env.SENTRY_DSN) {
    // Server-side only
    // Sentry.captureException(error, { extra: context });
  }
}

// Usage in API route
export async function POST(request) {
  try {
    // ... logic
  } catch (error) {
    logError(error, {
      route: "/api/booking",
      method: "POST",
      url: request.url,
    });
    
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
```

---

## Best Practices

### 1. Separation of Concerns
```
Server Components → Data fetching, business logic
Client Components → Interactivity, user input
API Routes → External integrations, webhooks
```

### 2. Security
- Never expose secrets in client components
- Use NEXT_PUBLIC_ prefix only for non-sensitive data
- Validate all user input on server-side
- Implement rate limiting for API routes

### 3. Error Handling
- Always use try-catch in async operations
- Provide meaningful error messages
- Log errors for debugging
- Show user-friendly fallbacks

### 4. Performance
- Use ISR for frequently changing data
- Cache API responses appropriately
- Minimize server-side logic
- Use streaming for slow operations

---

## Summary

### Server Components Advantages:
- ✅ Zero client-side JavaScript
- ✅ Direct database access
- ✅ Server-side secrets
- ✅ SEO-friendly
- ✅ Faster initial load

### When to Use:
- Static content rendering
- Data fetching from APIs/database
- Authentication checks
- SEO-critical pages
- Heavy computations

**Next:** Read [ADMIN_SIDE.md](./ADMIN_SIDE.md) for CMS administration details.
