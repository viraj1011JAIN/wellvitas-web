# Client-Side Architecture Documentation

## Overview

The client-side of the Wellvitas website is built using **React 19** with **Next.js 15 App Router**, leveraging both Client Components and Server Components for optimal performance.

---

## Table of Contents

1. [Client Components vs Server Components](#client-components-vs-server-components)
2. [Component Architecture](#component-architecture)
3. [State Management](#state-management)
4. [Client-Side Routing](#client-side-routing)
5. [Hydration Process](#hydration-process)
6. [Interactive Features](#interactive-features)
7. [Browser APIs](#browser-apis)
8. [Performance Optimization](#performance-optimization)

---

## Client Components vs Server Components

### Server Components (Default)
**Location:** `src/app/page.js`, `src/app/[...slug]/page.js`

**Characteristics:**
- Render on server only
- No JavaScript sent to client
- Can directly access backend resources
- No hooks or browser APIs
- Better performance (smaller bundle)

**Example:**
```javascript
// src/app/page.js (Server Component)
import { getStoryblokApi } from "@/lib/storyblok";

export default async function HomePage({ searchParams }) {
  const params = await searchParams;
  const storyblokApi = getStoryblokApi();
  const { data } = await storyblokApi.get("cdn/stories/home");
  
  return <StoryblokStory story={data.story} />;
}
```

### Client Components
**Location:** `src/components/storyblock/*.jsx`

**Identification:** Files with `"use client"` directive

**Characteristics:**
- Render on server, then hydrate on client
- Can use hooks (useState, useEffect)
- Event handlers (onClick, onChange)
- Browser APIs (localStorage, window)
- Interactive features

**Example:**
```javascript
// src/components/storyblock/NavigationBlok.jsx
"use client";
import { useState } from "react";

export default function NavigationBlok({ blok }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  return (
    <nav>
      <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        Menu
      </button>
      {/* ... */}
    </nav>
  );
}
```

---

## Component Architecture

### Component Hierarchy

```
App (Server Component)
├─ Layout (Server Component)
│  ├─ StoryblokProvider (Client Component) ← Wraps entire app
│  │  ├─ NavigationBlok (Client Component)
│  │  │  └─ ButtonBlok (Client Component)
│  │  ├─ Page Content (Server Component)
│  │  │  ├─ HeroCarouselBlok (Client Component)
│  │  │  ├─ IntroBandBlok (Client Component)
│  │  │  ├─ TherapiesSectionBlok (Client Component)
│  │  │  ├─ SuperSaaSBookingBlok (Client Component)
│  │  │  └─ TestimonialsBlok (Client Component)
│  │  └─ FooterBlok (Client Component)
```

### Client Component Categories

#### 1. Layout Components
**Navigation** (`NavigationBlok.jsx`)
- Mobile menu toggle state
- Sticky header behavior
- Active link highlighting

**Footer** (`FooterBlok.jsx`)
- Back to top button
- Social link tracking
- Dynamic copyright year

#### 2. Interactive Components
**SuperSaaS Booking** (`SuperSaaSBookingBlok.jsx`)
- Script loading management
- Iframe communication
- Loading states

**Hero Carousel** (`HeroCarouselBlok.jsx`)
- Slide transition logic
- Auto-play functionality
- Touch/swipe gestures

**Testimonials** (`TestimonialsBlok.jsx`)
- Carousel navigation
- Slide animation
- User interaction tracking

#### 3. Form Components
**Button** (`ButtonBlok.jsx`)
- Click handlers
- Loading states
- Disabled states

**Booking Flow** (if applicable)
- Multi-step form state
- Validation logic
- Submission handling

#### 4. Utility Components
**Image** (`ImageBlok.jsx`)
- Lazy loading
- Error fallback
- Click handlers

**Rich Text** (`RichTextBlok.jsx`)
- HTML rendering
- Link handling

---

## State Management

### Local Component State (useState)

```javascript
// src/components/storyblock/NavigationBlok.jsx
"use client";
import { useState } from "react";

export default function NavigationBlok({ blok }) {
  // Local state for mobile menu
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setMobileMenuOpen(prev => !prev);
  };
  
  return (
    <header>
      <button onClick={toggleMenu} aria-expanded={mobileMenuOpen}>
        {mobileMenuOpen ? 'Close' : 'Menu'}
      </button>
      {mobileMenuOpen && <MobileMenu />}
    </header>
  );
}
```

### Effect Hooks (useEffect)

```javascript
// src/components/storyblock/SuperSaaSBookingBlok.jsx
"use client";
import { useEffect, useState } from "react";

export default function SuperSaaSBookingBlok({ blok }) {
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Load SuperSaaS script dynamically
    if (typeof window !== "undefined" && !window.supersaas) {
      const script = document.createElement("script");
      script.src = "https://www.supersaas.com/schedule/all.js";
      script.async = true;
      script.onload = () => setLoading(false);
      document.body.appendChild(script);
      
      // Cleanup function
      return () => {
        document.body.removeChild(script);
      };
    } else {
      setLoading(false);
    }
  }, []); // Empty dependency array = run once on mount
  
  if (loading) return <LoadingSpinner />;
  return <BookingWidget />;
}
```

### Context API (React Context)

```javascript
// src/providers/AuthProvider.jsx
"use client";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    // Check authentication status
    checkAuth().then(setUser).finally(() => setLoading(false));
  }, []);
  
  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);
```

**Usage:**
```javascript
"use client";
import { useAuth } from "@/providers/AuthProvider";

export default function ProfileButton() {
  const { user, loading } = useAuth();
  
  if (loading) return <Spinner />;
  if (!user) return <LoginButton />;
  return <UserMenu user={user} />;
}
```

---

## Client-Side Routing

### Link Component (Next.js)

```javascript
"use client";
import Link from "next/link";

export default function NavigationBlok({ blok }) {
  return (
    <nav>
      {blok.navigation_items.map(item => (
        <Link 
          href={item.link?.cached_url || item.url}
          key={item._uid}
          // Client-side navigation (no page reload)
          prefetch={true} // Prefetch on hover
        >
          {item.label}
        </Link>
      ))}
    </nav>
  );
}
```

### Programmatic Navigation

```javascript
"use client";
import { useRouter } from "next/navigation";

export default function BookingSuccess() {
  const router = useRouter();
  
  const handleContinue = () => {
    // Navigate programmatically
    router.push("/");
    // OR
    router.replace("/"); // Replaces history entry
    // OR
    router.back(); // Go back
  };
  
  return <button onClick={handleContinue}>Continue</button>;
}
```

### Search Params (Client-side)

```javascript
"use client";
import { useSearchParams, useRouter } from "next/navigation";

export default function FilterComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const currentFilter = searchParams.get("category");
  
  const setFilter = (category) => {
    const params = new URLSearchParams(searchParams);
    params.set("category", category);
    router.push(`?${params.toString()}`);
  };
  
  return (
    <select onChange={(e) => setFilter(e.target.value)} value={currentFilter}>
      <option value="all">All Services</option>
      <option value="massage">Massage</option>
      <option value="acupuncture">Acupuncture</option>
    </select>
  );
}
```

---

## Hydration Process

### How It Works

1. **Server Rendering**
   ```
   Server generates initial HTML with data
   → Sends to browser
   ```

2. **HTML Display**
   ```
   Browser displays static HTML immediately
   → User sees content (fast!)
   ```

3. **JavaScript Download**
   ```
   Browser downloads React bundle
   → Parses JavaScript
   ```

4. **Hydration**
   ```
   React attaches event listeners to existing DOM
   → Components become interactive
   ```

### Hydration Mismatch Prevention

```javascript
"use client";
import { useEffect, useState } from "react";

export default function ClientOnlyComponent() {
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  // Prevent hydration mismatch for browser-specific content
  if (!mounted) {
    return <div>Loading...</div>; // Same as server render
  }
  
  // Client-only rendering (after hydration)
  return (
    <div>
      Current time: {new Date().toLocaleTimeString()}
      Local storage: {localStorage.getItem("key")}
    </div>
  );
}
```

---

## Interactive Features

### Click Handlers

```javascript
"use client";

export default function ButtonBlok({ blok }) {
  const handleClick = (e) => {
    e.preventDefault();
    
    // Track analytics
    if (typeof window.gtag !== "undefined") {
      window.gtag("event", "button_click", {
        button_label: blok.label,
        button_url: blok.url,
      });
    }
    
    // Custom logic
    if (blok.url) {
      window.location.href = blok.url;
    }
  };
  
  return (
    <button onClick={handleClick}>
      {blok.label}
    </button>
  );
}
```

### Form Handling

```javascript
"use client";
import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      if (!response.ok) throw new Error("Submission failed");
      
      // Success
      alert("Message sent!");
      setFormData({ name: "", email: "", message: "" });
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="name"
        value={formData.name}
        onChange={handleChange}
        required
      />
      <input
        name="email"
        type="email"
        value={formData.email}
        onChange={handleChange}
        required
      />
      <textarea
        name="message"
        value={formData.message}
        onChange={handleChange}
        required
      />
      {error && <p className="error">{error}</p>}
      <button type="submit" disabled={submitting}>
        {submitting ? "Sending..." : "Send Message"}
      </button>
    </form>
  );
}
```

### Scroll Behavior

```javascript
"use client";

export default function FooterBlok({ blok }) {
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  
  return (
    <footer>
      {/* Footer content */}
      {blok.show_back_to_top && (
        <button onClick={scrollToTop}>
          ↑ Back to Top
        </button>
      )}
    </footer>
  );
}
```

---

## Browser APIs

### Local Storage

```javascript
"use client";
import { useEffect, useState } from "react";

export default function PreferencesManager() {
  const [theme, setTheme] = useState("light");
  
  useEffect(() => {
    // Read from localStorage on mount
    const saved = localStorage.getItem("theme");
    if (saved) setTheme(saved);
  }, []);
  
  const changeTheme = (newTheme) => {
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);
  };
  
  return (
    <div className={`theme-${theme}`}>
      <button onClick={() => changeTheme("dark")}>Dark Mode</button>
      <button onClick={() => changeTheme("light")}>Light Mode</button>
    </div>
  );
}
```

### Window Events

```javascript
"use client";
import { useEffect, useState } from "react";

export default function ScrollIndicator() {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  
  return (
    <div 
      className="scroll-progress" 
      style={{ width: `${scrollProgress}%` }}
    />
  );
}
```

### Media Queries (Responsive)

```javascript
"use client";
import { useEffect, useState } from "react";

export default function ResponsiveComponent() {
  const [isMobile, setIsMobile] = useState(false);
  
  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 768px)");
    
    setIsMobile(mediaQuery.matches);
    
    const handleChange = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleChange);
    
    return () => mediaQuery.removeEventListener("change", handleChange);
  }, []);
  
  return (
    <div>
      {isMobile ? <MobileView /> : <DesktopView />}
    </div>
  );
}
```

---

## Performance Optimization

### Code Splitting (Lazy Loading)

```javascript
"use client";
import { lazy, Suspense } from "react";

// Lazy load heavy component
const HeavyComponent = lazy(() => import("./HeavyComponent"));

export default function ParentComponent() {
  return (
    <div>
      <Suspense fallback={<LoadingSpinner />}>
        <HeavyComponent />
      </Suspense>
    </div>
  );
}
```

### Memoization (useMemo, useCallback)

```javascript
"use client";
import { useMemo, useCallback } from "react";

export default function ExpensiveComponent({ data }) {
  // Memoize expensive calculation
  const processedData = useMemo(() => {
    return data.map(item => {
      // Heavy computation
      return expensiveTransform(item);
    });
  }, [data]); // Only recalculate if data changes
  
  // Memoize callback function
  const handleClick = useCallback((id) => {
    console.log("Clicked:", id);
  }, []); // Function never changes
  
  return (
    <div>
      {processedData.map(item => (
        <Item key={item.id} data={item} onClick={handleClick} />
      ))}
    </div>
  );
}
```

### Debouncing Input

```javascript
"use client";
import { useState, useEffect } from "react";

export default function SearchInput() {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500); // Wait 500ms after user stops typing
    
    return () => clearTimeout(timer);
  }, [query]);
  
  useEffect(() => {
    if (debouncedQuery) {
      // Perform search
      performSearch(debouncedQuery);
    }
  }, [debouncedQuery]);
  
  return (
    <input
      value={query}
      onChange={(e) => setQuery(e.target.value)}
      placeholder="Search..."
    />
  );
}
```

### Image Optimization

```javascript
"use client";
import Image from "next/image";

export default function ImageBlok({ blok }) {
  return (
    <div>
      {/* Next.js optimized image */}
      <Image
        src={blok.image.filename}
        alt={blok.alt_text}
        width={800}
        height={600}
        loading="lazy" // Lazy load images
        quality={85} // Compression quality
        placeholder="blur" // Show blur while loading
        blurDataURL="data:image/..." // Placeholder image
      />
    </div>
  );
}
```

---

## Event Handling Patterns

### Synthetic Events

```javascript
"use client";

export default function FormExample() {
  const handleSubmit = (e) => {
    // e is a SyntheticEvent (React wrapper)
    e.preventDefault(); // Prevent default form submission
    e.stopPropagation(); // Stop event bubbling
    
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData);
    console.log(data);
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <input name="email" type="email" />
      <button type="submit">Submit</button>
    </form>
  );
}
```

### Event Delegation

```javascript
"use client";

export default function ListComponent({ items }) {
  const handleListClick = (e) => {
    // Event delegation: single handler for all items
    if (e.target.matches("button")) {
      const id = e.target.dataset.id;
      console.log("Clicked item:", id);
    }
  };
  
  return (
    <ul onClick={handleListClick}>
      {items.map(item => (
        <li key={item.id}>
          {item.name}
          <button data-id={item.id}>Select</button>
        </li>
      ))}
    </ul>
  );
}
```

---

## Error Boundaries (Client-side Error Handling)

```javascript
"use client";
import { Component } from "react";

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.error("Error caught:", error, errorInfo);
    // Log to error tracking service
    if (typeof window.Sentry !== "undefined") {
      window.Sentry.captureException(error);
    }
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => this.setState({ hasError: false })}>
            Try again
          </button>
        </div>
      );
    }
    
    return this.props.children;
  }
}
```

**Usage:**
```javascript
"use client";
import { ErrorBoundary } from "./ErrorBoundary";

export default function App() {
  return (
    <ErrorBoundary>
      <ComponentThatMightError />
    </ErrorBoundary>
  );
}
```

---

## Client-Side Data Fetching

```javascript
"use client";
import { useState, useEffect } from "react";

export default function DataFetchingComponent() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch("/api/data");
        if (!response.ok) throw new Error("Failed to fetch");
        const json = await response.json();
        setData(json);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
  }, []); // Fetch on mount
  
  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage error={error} />;
  return <DataDisplay data={data} />;
}
```

---

## Best Practices

### 1. Minimize Client Components
```javascript
// ❌ Bad: Entire page as client component
"use client";
export default function Page() {
  return (
    <div>
      <StaticHeader />
      <InteractiveSection />
      <StaticFooter />
    </div>
  );
}

// ✅ Good: Only interactive parts as client components
export default function Page() {
  return (
    <div>
      <StaticHeader />
      <InteractiveSection /> {/* This has "use client" */}
      <StaticFooter />
    </div>
  );
}
```

### 2. Avoid Hydration Mismatches
```javascript
"use client";

// ❌ Bad: Different content server vs client
export default function TimeDisplay() {
  return <div>{new Date().toISOString()}</div>;
  // Server renders one time, client hydrates with different time!
}

// ✅ Good: Consistent initial render
export default function TimeDisplay() {
  const [time, setTime] = useState(null);
  
  useEffect(() => {
    setTime(new Date().toISOString());
  }, []);
  
  return <div>{time || "Loading..."}</div>;
}
```

### 3. Use Proper Event Cleanup
```javascript
"use client";
import { useEffect } from "react";

export default function EventListenerComponent() {
  useEffect(() => {
    const handler = () => console.log("Resized");
    
    window.addEventListener("resize", handler);
    
    // ✅ Always cleanup
    return () => {
      window.removeEventListener("resize", handler);
    };
  }, []);
  
  return <div>Component</div>;
}
```

---

## Summary

### Client Components Are For:
- ✅ Interactive UI (buttons, forms)
- ✅ Browser APIs (localStorage, window)
- ✅ Event handlers (onClick, onChange)
- ✅ Hooks (useState, useEffect)
- ✅ Real-time updates

### Server Components Are For:
- ✅ Static content rendering
- ✅ Data fetching from backend
- ✅ Direct database access
- ✅ SEO-critical content
- ✅ Reducing JavaScript bundle size

### Key Takeaways:
1. **Default to Server Components** - Use client only when needed
2. **Hydration matters** - Ensure server/client consistency
3. **Performance first** - Code split, lazy load, memoize
4. **Clean up effects** - Remove event listeners
5. **Error boundaries** - Catch and handle errors gracefully

---

**Next:** Read [SERVER_SIDE.md](./SERVER_SIDE.md) for server architecture.
