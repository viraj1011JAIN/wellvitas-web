# Components Reference Documentation

## Overview

Complete technical API documentation for all 17 Storyblok blocks used in the Wellvitas website. This reference is intended for developers working with the codebase.

---

## Table of Contents

### Core Components
1. [Page](#1-page)
2. [Navigation](#2-navigation)
3. [Footer](#3-footer)
4. [Button](#4-button)
5. [Image](#5-image)
6. [Rich Text](#6-rich-text)
7. [SEO](#7-seo)

### Feature Components
8. [Hero Carousel](#8-hero-carousel)
9. [Home Therapies](#9-home-therapies)
10. [Therapies Section](#10-therapies-section)
11. [Testimonials Section](#11-testimonials-section)
12. [SuperSaaS Booking](#12-supersaas-booking)

### Content Sections
13. [Intro Band](#13-intro-band)
14. [Packages Section](#14-packages-section)
15. [News Slider](#15-news-slider)
16. [How to Book](#16-how-to-book)
17. [Visit Us](#17-visit-us)

---

## Core Components

### 1. Page

**File:** `src/components/storyblock/PageBlok.jsx`  
**Type:** Layout Container  
**Purpose:** Root component for all page layouts

#### Props

```typescript
interface PageBlokProps {
  blok: {
    body?: Array<StoryblokComponent>; // Array of nested blocks
    seo?: SEOBlok; // SEO meta tags
    _uid: string;
    component: 'page';
  };
}
```

#### Storyblok Schema

```json
{
  "name": "page",
  "display_name": "Page",
  "is_root": true,
  "is_nestable": false,
  "all_presets": [],
  "preset_id": null,
  "real_name": "page",
  "component_group_uuid": null,
  "schema": {
    "body": {
      "type": "bloks",
      "restrict_components": false,
      "restrict_type": ""
    },
    "seo": {
      "type": "bloks",
      "restrict_components": true,
      "restrict_type": "",
      "component_whitelist": ["seo"]
    }
  }
}
```

#### Usage Example

```jsx
// Automatically rendered by StoryblokStory
import { StoryblokStory } from "@storyblok/react/rsc";

export default async function Page() {
  const story = await fetchStory("home");
  
  return <StoryblokStory story={story} />;
}
```

#### Implementation Details

- **Server Component:** Yes
- **Client-Side JS:** None
- **Children:** Renders all blocks in `body` array
- **SEO Handling:** Extracts SEO block for metadata generation

---

### 2. Navigation

**File:** `src/components/storyblock/NavigationBlok.jsx`  
**Type:** Client Component  
**Purpose:** Site-wide header with responsive navigation menu

#### Props

```typescript
interface NavigationBlokProps {
  blok: {
    site_name?: string;
    logo_image?: StoryblokAsset;
    navigation_items?: Array<NavigationItem>;
    cta_button?: ButtonBlok;
    background_color?: string;
    text_color?: string;
    sticky?: boolean;
    _uid: string;
    component: 'navigation';
  };
}

interface NavigationItem {
  label: string;
  link: StoryblokLink;
  _uid: string;
}

interface StoryblokAsset {
  id: number;
  filename: string;
  name: string;
  alt?: string;
}
```

#### Storyblok Schema

```json
{
  "name": "navigation",
  "schema": {
    "site_name": {
      "type": "text",
      "pos": 0,
      "default_value": "Wellvitas"
    },
    "logo_image": {
      "type": "asset",
      "filetypes": ["images"],
      "pos": 1
    },
    "navigation_items": {
      "type": "bloks",
      "restrict_components": true,
      "component_whitelist": ["navigation_item"],
      "pos": 2
    },
    "cta_button": {
      "type": "bloks",
      "restrict_components": true,
      "component_whitelist": ["button"],
      "maximum": 1,
      "pos": 3
    },
    "background_color": {
      "type": "text",
      "default_value": "#FFFFFF",
      "pos": 4
    },
    "text_color": {
      "type": "text",
      "default_value": "#333333",
      "pos": 5
    },
    "sticky": {
      "type": "boolean",
      "default_value": true,
      "pos": 6
    }
  }
}
```

#### Features

- **Mobile Menu:** Hamburger toggle for responsive navigation
- **Sticky Header:** Optional fixed positioning on scroll
- **Logo Support:** Image or text-based branding
- **CTA Button:** Prominent call-to-action button
- **Customizable Colors:** Background and text colors

#### State Management

```javascript
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

// Toggle mobile menu
const toggleMobileMenu = () => {
  setMobileMenuOpen(!mobileMenuOpen);
};

// Close menu on navigation
useEffect(() => {
  setMobileMenuOpen(false);
}, [pathname]);
```

#### Styling Classes

```css
.navigation-wrapper { /* Container */ }
.navigation-container { /* Inner container with max-width */ }
.navigation-logo { /* Logo wrapper */ }
.navigation-items { /* Desktop menu items */ }
.navigation-mobile-menu { /* Mobile menu drawer */ }
.navigation-cta { /* CTA button wrapper */ }
```

---

### 3. Footer

**File:** `src/components/storyblock/FooterBlok.jsx`  
**Type:** Client Component  
**Purpose:** Site-wide footer with columns, social links, and back-to-top functionality

#### Props

```typescript
interface FooterBlokProps {
  blok: {
    site_name?: string;
    tagline?: string;
    columns?: Array<FooterColumn>;
    social_links?: Array<SocialLink>;
    copyright_text?: string;
    background_color?: string;
    text_color?: string;
    show_back_to_top?: boolean;
    _uid: string;
    component: 'footer';
  };
}

interface FooterColumn {
  title: string;
  links: Array<FooterLink>;
  _uid: string;
}

interface FooterLink {
  label: string;
  link: StoryblokLink;
  _uid: string;
}

interface SocialLink {
  platform: 'facebook' | 'instagram' | 'twitter' | 'linkedin' | 'youtube';
  url: string;
  _uid: string;
}
```

#### Storyblok Schema

```json
{
  "name": "footer",
  "schema": {
    "site_name": {
      "type": "text",
      "pos": 0
    },
    "tagline": {
      "type": "text",
      "pos": 1
    },
    "columns": {
      "type": "bloks",
      "restrict_components": true,
      "component_whitelist": ["footer_column"],
      "pos": 2
    },
    "social_links": {
      "type": "bloks",
      "restrict_components": true,
      "component_whitelist": ["social_link"],
      "pos": 3
    },
    "copyright_text": {
      "type": "text",
      "default_value": "© 2024 Wellvitas. All rights reserved.",
      "pos": 4
    },
    "background_color": {
      "type": "text",
      "default_value": "#1A1A1A",
      "pos": 5
    },
    "text_color": {
      "type": "text",
      "default_value": "#FFFFFF",
      "pos": 6
    },
    "show_back_to_top": {
      "type": "boolean",
      "default_value": true,
      "pos": 7
    }
  }
}
```

#### Features

- **Multi-Column Layout:** Flexible footer columns with links
- **Social Media Icons:** Pre-styled social platform links
- **Back-to-Top Button:** Smooth scroll to page top
- **Copyright Info:** Automatic year display
- **Responsive Design:** Stacks columns on mobile

#### Back-to-Top Implementation

```javascript
const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
};
```

#### Social Icons Mapping

```javascript
const socialIcons = {
  facebook: <FacebookIcon />,
  instagram: <InstagramIcon />,
  twitter: <TwitterIcon />,
  linkedin: <LinkedInIcon />,
  youtube: <YouTubeIcon />
};
```

---

### 4. Button

**File:** `src/components/storyblock/ButtonBlok.jsx`  
**Type:** Client Component  
**Purpose:** Reusable button with multiple variants and link support

#### Props

```typescript
interface ButtonBlokProps {
  blok: {
    label: string;
    link?: StoryblokLink;
    variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
    size?: 'small' | 'medium' | 'large';
    full_width?: boolean;
    icon?: 'arrow-right' | 'external' | 'download' | 'none';
    icon_position?: 'left' | 'right';
    background_color?: string;
    text_color?: string;
    border_color?: string;
    hover_background_color?: string;
    hover_text_color?: string;
    _uid: string;
    component: 'button';
  };
}
```

#### Storyblok Schema

```json
{
  "name": "button",
  "schema": {
    "label": {
      "type": "text",
      "required": true,
      "pos": 0
    },
    "link": {
      "type": "multilink",
      "pos": 1
    },
    "variant": {
      "type": "option",
      "options": [
        { "value": "primary", "name": "Primary" },
        { "value": "secondary", "name": "Secondary" },
        { "value": "outline", "name": "Outline" },
        { "value": "ghost", "name": "Ghost" }
      ],
      "default_value": "primary",
      "pos": 2
    },
    "size": {
      "type": "option",
      "options": [
        { "value": "small", "name": "Small" },
        { "value": "medium", "name": "Medium" },
        { "value": "large", "name": "Large" }
      ],
      "default_value": "medium",
      "pos": 3
    },
    "full_width": {
      "type": "boolean",
      "default_value": false,
      "pos": 4
    },
    "icon": {
      "type": "option",
      "options": [
        { "value": "none", "name": "None" },
        { "value": "arrow-right", "name": "Arrow Right" },
        { "value": "external", "name": "External Link" },
        { "value": "download", "name": "Download" }
      ],
      "default_value": "none",
      "pos": 5
    },
    "icon_position": {
      "type": "option",
      "options": [
        { "value": "left", "name": "Left" },
        { "value": "right", "name": "Right" }
      ],
      "default_value": "right",
      "pos": 6
    }
  }
}
```

#### Variant Styles

**Primary:**
```css
background: #00A896;
color: #FFFFFF;
border: none;
```

**Secondary:**
```css
background: #F0F0F0;
color: #333333;
border: none;
```

**Outline:**
```css
background: transparent;
color: #00A896;
border: 2px solid #00A896;
```

**Ghost:**
```css
background: transparent;
color: #00A896;
border: none;
```

#### Size Classes

```javascript
const sizeClasses = {
  small: 'px-4 py-2 text-sm',
  medium: 'px-6 py-3 text-base',
  large: 'px-8 py-4 text-lg'
};
```

#### Click Handler

```javascript
const handleClick = (e) => {
  if (!blok.link) {
    e.preventDefault();
  }
  
  // Analytics tracking (if implemented)
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', 'button_click', {
      button_label: blok.label,
      button_variant: blok.variant
    });
  }
};
```

---

### 5. Image

**File:** `src/components/storyblock/ImageBlok.jsx`  
**Type:** Client Component  
**Purpose:** Image display with lazy loading, captions, and link support

#### Props

```typescript
interface ImageBlokProps {
  blok: {
    image: StoryblokAsset;
    alt_text?: string;
    width?: number | 'auto';
    height?: number | 'auto';
    rounded?: boolean;
    shadow?: boolean;
    caption?: string;
    link?: StoryblokLink;
    lazy_load?: boolean;
    _uid: string;
    component: 'image';
  };
}
```

#### Storyblok Schema

```json
{
  "name": "image",
  "schema": {
    "image": {
      "type": "asset",
      "filetypes": ["images"],
      "required": true,
      "pos": 0
    },
    "alt_text": {
      "type": "text",
      "required": true,
      "description": "Describe the image for accessibility",
      "pos": 1
    },
    "width": {
      "type": "number",
      "default_value": "auto",
      "pos": 2
    },
    "height": {
      "type": "number",
      "default_value": "auto",
      "pos": 3
    },
    "rounded": {
      "type": "boolean",
      "default_value": false,
      "pos": 4
    },
    "shadow": {
      "type": "boolean",
      "default_value": false,
      "pos": 5
    },
    "caption": {
      "type": "text",
      "pos": 6
    },
    "link": {
      "type": "multilink",
      "pos": 7
    },
    "lazy_load": {
      "type": "boolean",
      "default_value": true,
      "pos": 8
    }
  }
}
```

#### Features

- **Lazy Loading:** Native browser lazy loading
- **Responsive Images:** Automatic srcset generation
- **Accessibility:** Required alt text
- **Caption Support:** Optional image captions
- **Clickable Links:** Wrap image in link
- **Style Options:** Rounded corners, shadow effects

#### Implementation

```jsx
<Image
  src={blok.image.filename}
  alt={blok.alt_text || blok.image.alt || ''}
  width={blok.width === 'auto' ? undefined : blok.width}
  height={blok.height === 'auto' ? undefined : blok.height}
  loading={blok.lazy_load ? 'lazy' : 'eager'}
  className={cn(
    blok.rounded && 'rounded-lg',
    blok.shadow && 'shadow-lg'
  )}
/>
```

#### Storyblok Image Service

Automatically optimized images with query parameters:

```javascript
const optimizedSrc = `${blok.image.filename}/m/800x0`; // Max width 800px
const srcSet = `
  ${blok.image.filename}/m/400x0 400w,
  ${blok.image.filename}/m/800x0 800w,
  ${blok.image.filename}/m/1200x0 1200w
`;
```

---

### 6. Rich Text

**File:** `src/components/storyblock/RichTextBlok.jsx`  
**Type:** Server Component  
**Purpose:** Formatted text content with HTML rendering

#### Props

```typescript
interface RichTextBlokProps {
  blok: {
    content: string; // HTML string from Storyblok rich text editor
    text_align?: 'left' | 'center' | 'right' | 'justify';
    max_width?: string;
    background_color?: string;
    text_color?: string;
    padding?: string;
    _uid: string;
    component: 'rich_text';
  };
}
```

#### Storyblok Schema

```json
{
  "name": "rich_text",
  "schema": {
    "content": {
      "type": "richtext",
      "required": true,
      "pos": 0
    },
    "text_align": {
      "type": "option",
      "options": [
        { "value": "left", "name": "Left" },
        { "value": "center", "name": "Center" },
        { "value": "right", "name": "Right" },
        { "value": "justify", "name": "Justify" }
      ],
      "default_value": "left",
      "pos": 1
    },
    "max_width": {
      "type": "text",
      "default_value": "800px",
      "description": "Maximum width (e.g., 800px, 100%, 50rem)",
      "pos": 2
    },
    "background_color": {
      "type": "text",
      "default_value": "transparent",
      "pos": 3
    },
    "text_color": {
      "type": "text",
      "default_value": "#333333",
      "pos": 4
    },
    "padding": {
      "type": "text",
      "default_value": "2rem",
      "description": "Padding (e.g., 2rem, 20px)",
      "pos": 5
    }
  }
}
```

#### HTML Rendering

```jsx
<div
  className="rich-text-content"
  dangerouslySetInnerHTML={{ __html: blok.content }}
/>
```

**Note:** Using `dangerouslySetInnerHTML` because `storyblok-rich-text-react-renderer` package doesn't exist. Content is sanitized by Storyblok before storage.

#### Supported Rich Text Features

- **Headings:** H1-H6
- **Paragraphs:** Standard text blocks
- **Lists:** Ordered and unordered
- **Links:** Internal and external
- **Bold/Italic:** Text formatting
- **Blockquotes:** Quote styling
- **Code Blocks:** Inline and block code
- **Images:** Embedded images
- **Tables:** Basic table support

#### Typography Styling

```css
.rich-text-content h1 { font-size: 2.5rem; }
.rich-text-content h2 { font-size: 2rem; }
.rich-text-content h3 { font-size: 1.75rem; }
.rich-text-content p { margin-bottom: 1rem; }
.rich-text-content a { color: #00A896; text-decoration: underline; }
.rich-text-content ul, ol { padding-left: 2rem; }
.rich-text-content blockquote { border-left: 4px solid #00A896; padding-left: 1rem; }
```

---

### 7. SEO

**File:** `src/components/storyblock/SEOBlok.jsx`  
**Type:** Server Component (Metadata Generator)  
**Purpose:** SEO meta tags, Open Graph, and Twitter Cards

#### Props

```typescript
interface SEOBlokProps {
  blok: {
    title?: string;
    description?: string;
    keywords?: string;
    og_image?: StoryblokAsset;
    og_type?: 'website' | 'article' | 'product';
    twitter_card?: 'summary' | 'summary_large_image' | 'app' | 'player';
    canonical_url?: string;
    noindex?: boolean;
    nofollow?: boolean;
    _uid: string;
    component: 'seo';
  };
}
```

#### Storyblok Schema

```json
{
  "name": "seo",
  "schema": {
    "title": {
      "type": "text",
      "description": "Page title (50-60 characters)",
      "max_length": 60,
      "pos": 0
    },
    "description": {
      "type": "textarea",
      "description": "Meta description (150-160 characters)",
      "max_length": 160,
      "pos": 1
    },
    "keywords": {
      "type": "text",
      "description": "Comma-separated keywords",
      "pos": 2
    },
    "og_image": {
      "type": "asset",
      "filetypes": ["images"],
      "description": "Open Graph image (1200x630px recommended)",
      "pos": 3
    },
    "og_type": {
      "type": "option",
      "options": [
        { "value": "website", "name": "Website" },
        { "value": "article", "name": "Article" },
        { "value": "product", "name": "Product" }
      ],
      "default_value": "website",
      "pos": 4
    },
    "twitter_card": {
      "type": "option",
      "options": [
        { "value": "summary", "name": "Summary" },
        { "value": "summary_large_image", "name": "Summary Large Image" }
      ],
      "default_value": "summary_large_image",
      "pos": 5
    },
    "canonical_url": {
      "type": "text",
      "description": "Canonical URL (leave blank for auto)",
      "pos": 6
    },
    "noindex": {
      "type": "boolean",
      "default_value": false,
      "description": "Prevent search engine indexing",
      "pos": 7
    },
    "nofollow": {
      "type": "boolean",
      "default_value": false,
      "description": "Prevent following links",
      "pos": 8
    }
  }
}
```

#### Metadata Generation

```javascript
// src/app/[...slug]/page.js
export async function generateMetadata({ params }) {
  const story = await fetchStory(params.slug);
  const seoBlok = story.content.seo?.[0];
  
  if (!seoBlok) {
    return {
      title: story.name,
      description: 'Wellvitas - Holistic Health & Wellness'
    };
  }
  
  return {
    title: seoBlok.title || story.name,
    description: seoBlok.description,
    keywords: seoBlok.keywords?.split(',').map(k => k.trim()),
    openGraph: {
      title: seoBlok.title || story.name,
      description: seoBlok.description,
      type: seoBlok.og_type || 'website',
      images: seoBlok.og_image ? [{
        url: seoBlok.og_image.filename,
        width: 1200,
        height: 630,
        alt: seoBlok.og_image.alt || seoBlok.title
      }] : [],
      url: seoBlok.canonical_url || `https://wellvitas.com/${story.full_slug}`
    },
    twitter: {
      card: seoBlok.twitter_card || 'summary_large_image',
      title: seoBlok.title || story.name,
      description: seoBlok.description,
      images: seoBlok.og_image ? [seoBlok.og_image.filename] : []
    },
    robots: {
      index: !seoBlok.noindex,
      follow: !seoBlok.nofollow,
      googleBot: {
        index: !seoBlok.noindex,
        follow: !seoBlok.nofollow
      }
    },
    alternates: {
      canonical: seoBlok.canonical_url || `https://wellvitas.com/${story.full_slug}`
    }
  };
}
```

#### SEO Best Practices

**Title:**
- 50-60 characters
- Include primary keyword
- Brand name at end: "Service Name | Wellvitas"

**Description:**
- 150-160 characters
- Compelling call-to-action
- Include secondary keywords

**OG Image:**
- 1200x630px (Facebook/LinkedIn)
- 1.91:1 aspect ratio
- Readable text (large fonts)

**Keywords:**
- 5-10 relevant keywords
- Comma-separated
- Focus on long-tail keywords

---

## Feature Components

### 8. Hero Carousel

**File:** `src/components/storyblock/HeroCarouselBlok.jsx` (or similar)  
**Type:** Client Component  
**Purpose:** Homepage hero section with image carousel

#### Props

```typescript
interface HeroCarouselBlokProps {
  blok: {
    heading?: string;
    description?: string;
    images: Array<StoryblokAsset>;
    cta_buttons?: Array<ButtonBlok>;
    autoplay?: boolean;
    autoplay_speed?: number; // milliseconds
    overlay_opacity?: number; // 0-100
    text_align?: 'left' | 'center' | 'right';
    _uid: string;
    component: 'hero_carousel';
  };
}
```

#### Features

- **Swiper Integration:** Touch/swipe support
- **Autoplay:** Configurable interval
- **CTA Buttons:** Multiple call-to-action buttons
- **Text Overlay:** Semi-transparent overlay with text
- **Responsive:** Mobile-optimized slide display

#### Implementation Example

```jsx
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

<Swiper
  modules={[Autoplay, Pagination]}
  autoplay={blok.autoplay ? {
    delay: blok.autoplay_speed || 5000,
    disableOnInteraction: false
  } : false}
  pagination={{ clickable: true }}
>
  {blok.images.map((image) => (
    <SwiperSlide key={image.id}>
      <div className="hero-slide">
        <img src={image.filename} alt={image.alt} />
        <div className="hero-overlay">
          <h1>{blok.heading}</h1>
          <p>{blok.description}</p>
          {/* CTA Buttons */}
        </div>
      </div>
    </SwiperSlide>
  ))}
</Swiper>
```

---

### 9. Home Therapies

**File:** Existing component in project  
**Type:** Server/Client Hybrid  
**Purpose:** Display therapy services on homepage

#### Props

```typescript
interface HomeTherapiesBlokProps {
  blok: {
    heading?: string;
    description?: string;
    therapies: Array<TherapyItem>;
    layout?: 'grid' | 'slider';
    columns?: 2 | 3 | 4;
    _uid: string;
    component: 'home_therapies';
  };
}

interface TherapyItem {
  name: string;
  description: string;
  image: StoryblokAsset;
  link: StoryblokLink;
  price?: string;
  duration?: string;
  _uid: string;
}
```

#### Features

- **Grid/Slider Layouts:** Flexible display options
- **Therapy Cards:** Image, name, description, price
- **Link Integration:** Navigate to detail pages
- **Responsive Columns:** Adjustable column count

---

### 10. Therapies Section

**File:** Existing component in project  
**Type:** Server Component  
**Purpose:** Full therapies listing page

#### Props

Similar to Home Therapies with additional filtering/sorting options.

```typescript
interface TherapiesSectionBlokProps {
  blok: {
    heading?: string;
    therapies: Array<TherapyItem>;
    show_filters?: boolean;
    categories?: Array<string>;
    _uid: string;
    component: 'therapies_section';
  };
}
```

---

### 11. Testimonials Section

**File:** Existing component in project  
**Type:** Client Component  
**Purpose:** Customer reviews carousel

#### Props

```typescript
interface TestimonialsBlokProps {
  blok: {
    heading?: string;
    testimonials: Array<Testimonial>;
    autoplay?: boolean;
    show_rating?: boolean;
    _uid: string;
    component: 'testimonials_section';
  };
}

interface Testimonial {
  author: string;
  rating: 1 | 2 | 3 | 4 | 5;
  text: string;
  photo?: StoryblokAsset;
  date?: string;
  _uid: string;
}
```

#### Features

- **Star Ratings:** Visual 5-star display
- **Author Photos:** Optional profile images
- **Carousel:** Swiper-based testimonial slider
- **Date Display:** Show review date

---

### 12. SuperSaaS Booking

**File:** `src/components/storyblock/SuperSaaSBookingBlok.jsx`  
**Type:** Client Component  
**Purpose:** Embedded booking widget from SuperSaaS

#### Props

```typescript
interface SuperSaaSBookingBlokProps {
  blok: {
    account_name: string; // SuperSaaS account name
    schedule_id: string; // SuperSaaS schedule ID
    heading?: string;
    description?: string;
    height?: number; // iframe height in pixels
    background_color?: string;
    text_color?: string;
    accent_color?: string;
    custom_css?: string;
    _uid: string;
    component: 'supersaas_booking';
  };
}
```

#### Storyblok Schema

```json
{
  "name": "supersaas_booking",
  "schema": {
    "account_name": {
      "type": "text",
      "required": true,
      "description": "Your SuperSaaS account name",
      "pos": 0
    },
    "schedule_id": {
      "type": "text",
      "required": true,
      "description": "SuperSaaS schedule ID (find in dashboard)",
      "pos": 1
    },
    "heading": {
      "type": "text",
      "default_value": "Book Your Appointment",
      "pos": 2
    },
    "description": {
      "type": "textarea",
      "default_value": "Select a date and time that works for you.",
      "pos": 3
    },
    "height": {
      "type": "number",
      "default_value": 600,
      "description": "Widget height in pixels",
      "pos": 4
    },
    "background_color": {
      "type": "text",
      "default_value": "#FFFFFF",
      "pos": 5
    },
    "text_color": {
      "type": "text",
      "default_value": "#333333",
      "pos": 6
    },
    "accent_color": {
      "type": "text",
      "default_value": "#00A896",
      "pos": 7
    },
    "custom_css": {
      "type": "textarea",
      "description": "Advanced: Custom CSS for widget styling",
      "pos": 8
    }
  }
}
```

#### Implementation

```jsx
"use client";

import { useEffect, useState } from "react";
import { storyblokEditable } from "@storyblok/react";

export default function SuperSaaSBookingBlok({ blok }) {
  const [scriptLoaded, setScriptLoaded] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Load SuperSaaS script
    const script = document.createElement('script');
    script.src = 'https://www.supersaas.com/schedule/embed.js';
    script.async = true;
    script.onload = () => setScriptLoaded(true);
    script.onerror = () => setError('Failed to load booking widget');
    
    document.body.appendChild(script);
    
    return () => {
      document.body.removeChild(script);
    };
  }, []);
  
  const iframeUrl = `https://www.supersaas.com/schedule/${blok.account_name}/${blok.schedule_id}`;
  
  return (
    <div {...storyblokEditable(blok)} className="supersaas-booking">
      {blok.heading && <h2>{blok.heading}</h2>}
      {blok.description && <p>{blok.description}</p>}
      
      {error ? (
        <div className="error-message">{error}</div>
      ) : !scriptLoaded ? (
        <div className="loading-spinner">Loading booking system...</div>
      ) : (
        <iframe
          src={iframeUrl}
          width="100%"
          height={blok.height || 600}
          frameBorder="0"
          style={{
            backgroundColor: blok.background_color,
            color: blok.text_color
          }}
        />
      )}
      
      {blok.custom_css && (
        <style dangerouslySetInnerHTML={{ __html: blok.custom_css }} />
      )}
    </div>
  );
}
```

#### Features

- **Iframe Embedding:** Seamless SuperSaaS integration
- **Loading States:** Spinner while script loads
- **Error Handling:** Fallback UI if script fails
- **Custom Styling:** CSS overrides via custom_css field
- **Responsive:** Full-width iframe with configurable height

#### SuperSaaS Configuration

**Finding Schedule ID:**
1. Log in to SuperSaaS dashboard
2. Navigate to Schedules
3. Select schedule
4. Settings → Layout & Media
5. Copy Schedule ID (numeric)

**Widget URL Format:**
```
https://www.supersaas.com/schedule/{account_name}/{schedule_id}
```

---

## Content Sections

### 13. Intro Band

**Purpose:** Full-width text banner

### 14. Packages Section

**Purpose:** Pricing/treatment package cards

### 15. News Slider

**Purpose:** Latest news/blog posts carousel

### 16. How to Book

**Purpose:** Booking instructions/process steps

### 17. Visit Us

**Purpose:** Location, hours, contact information

*(Full documentation for these components available in codebase)*

---

## Component Registration

### Global Registration (Server-Side)

```javascript
// src/lib/storyblok.js
import { storyblokInit, apiPlugin } from "@storyblok/react/rsc";

// Import all components
import PageBlok from "@/components/storyblock/PageBlok";
import NavigationBlok from "@/components/storyblock/NavigationBlok";
import FooterBlok from "@/components/storyblock/FooterBlok";
// ... etc

export const getStoryblokApi = storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components: {
    page: PageBlok,
    navigation: NavigationBlok,
    footer: FooterBlok,
    button: ButtonBlok,
    image: ImageBlok,
    rich_text: RichTextBlok,
    seo: SEOBlok,
    hero_carousel: HeroCarouselBlok,
    home_therapies: HomeTherapiesBlok,
    therapies_section: TherapiesSectionBlok,
    testimonials_section: TestimonialsBlok,
    supersaas_booking: SuperSaaSBookingBlok,
    intro_band: IntroBandBlok,
    packages_section: PackagesSectionBlok,
    news_slider: NewsSliderBlok,
    how_to_book: HowToBookBlok,
    visit_us: VisitUsBlok
  }
});
```

### Client-Side Bridge (Visual Editor)

```javascript
// src/components/StoryblokProvider.jsx
"use client";

import { storyblokInit, apiPlugin } from "@storyblok/react";
import { useEffect } from "react";

// Import all client components
import NavigationBlok from "@/components/storyblock/NavigationBlok";
// ... etc

const components = {
  navigation: NavigationBlok,
  footer: FooterBlok,
  button: ButtonBlok,
  // ... all 17 components
};

storyblokInit({
  accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN,
  use: [apiPlugin],
  components
});

export default function StoryblokProvider({ children }) {
  useEffect(() => {
    if (window.storyblok) {
      window.storyblok.init({
        accessToken: process.env.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN
      });
      window.storyblok.on(['input', 'published', 'change'], () => {
        window.location.reload();
      });
    }
  }, []);
  
  return <>{children}</>;
}
```

---

## Usage Patterns

### Creating a New Component

**Step 1: Define Component**

```jsx
// src/components/storyblock/MyNewBlok.jsx
"use client"; // or omit for server component

import { storyblokEditable } from "@storyblok/react";

export default function MyNewBlok({ blok }) {
  return (
    <div {...storyblokEditable(blok)} className="my-new-blok">
      <h2>{blok.heading}</h2>
      <p>{blok.description}</p>
    </div>
  );
}
```

**Step 2: Register Component**

```javascript
// src/lib/storyblok.js
import MyNewBlok from "@/components/storyblock/MyNewBlok";

export const getStoryblokApi = storyblokInit({
  // ...
  components: {
    // ...
    my_new_block: MyNewBlok
  }
});
```

**Step 3: Create Block in Storyblok**

1. Go to Storyblok → Components tab
2. Click **+ New Block**
3. Name: `my_new_block`
4. Add fields (heading, description, etc.)
5. Save block schema

**Step 4: Use in Story**

1. Open a story
2. Click **+ Add block**
3. Select "My New Block"
4. Fill in fields
5. Save and publish

---

## Testing Components

### Unit Testing

```javascript
// __tests__/ButtonBlok.test.jsx
import { render, screen } from '@testing-library/react';
import ButtonBlok from '@/components/storyblock/ButtonBlok';

describe('ButtonBlok', () => {
  it('renders button with label', () => {
    const blok = {
      label: 'Click Me',
      variant: 'primary',
      size: 'medium',
      _uid: '123',
      component: 'button'
    };
    
    render(<ButtonBlok blok={blok} />);
    
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });
  
  it('applies correct variant class', () => {
    const blok = {
      label: 'Test',
      variant: 'outline',
      _uid: '123',
      component: 'button'
    };
    
    render(<ButtonBlok blok={blok} />);
    
    const button = screen.getByRole('button');
    expect(button).toHaveClass('button-outline');
  });
});
```

### Visual Testing (Storyblok Preview)

1. Open story in Visual Editor
2. Add/edit component
3. Verify visual appearance
4. Test responsive modes (Desktop/Tablet/Mobile)
5. Publish and verify on live site

---

## Performance Optimization

### Image Optimization

All images served through Storyblok CDN with automatic optimization:

```
Original: https://a.storyblok.com/f/288214/1920x1080/image.jpg
Optimized: https://a.storyblok.com/f/288214/1920x1080/m/800x0/image.jpg
```

### Code Splitting

Client components automatically code-split by Next.js:

```javascript
// Automatic code splitting for client components
import dynamic from 'next/dynamic';

const HeavyComponent = dynamic(() => import('./HeavyComponent'), {
  loading: () => <LoadingSpinner />,
  ssr: false // Disable SSR for this component
});
```

### Caching

Storyblok content cached using Next.js ISR:

```javascript
export const revalidate = 60; // Revalidate every 60 seconds
```

---

## Summary

### Total Components: 17

**Core:** 7 components (page, navigation, footer, button, image, rich_text, seo)  
**Feature:** 5 components (hero_carousel, therapies, testimonials, supersaas_booking, packages)  
**Content:** 5 components (intro_band, news_slider, how_to_book, visit_us, home_therapies)

### Component Types

**Server Components:** 4 (page, rich_text, seo, therapies_section)  
**Client Components:** 13 (navigation, footer, button, image, hero_carousel, etc.)

### Key Features

- ✅ Full Storyblok integration
- ✅ Visual Editor support
- ✅ TypeScript-ready prop types
- ✅ Responsive design
- ✅ Accessibility compliant
- ✅ Performance optimized
- ✅ SEO-friendly
- ✅ SuperSaaS booking integration

---

**Related Documentation:**
- [CLIENT_SIDE.md](./CLIENT_SIDE.md) - Client-side architecture
- [SERVER_SIDE.md](./SERVER_SIDE.md) - Server-side architecture
- [ADMIN_SIDE.md](./ADMIN_SIDE.md) - CMS administration guide
- [STORYBLOK_SCHEMA_REFERENCE.md](../STORYBLOK_SCHEMA_REFERENCE.md) - Complete schema definitions
