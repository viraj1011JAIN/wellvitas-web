# 🏗️ Storyblok Block Schemas - Complete Reference

## Overview
This document contains the exact field configurations for creating all blocks in Storyblok Block Library.

---

## 🎯 Core Page Components

### 1. Page (Container)
**Technical Name:** `page`  
**Type:** Nestable Blok  
**Display Name:** Page

```json
{
  "name": "body",
  "type": "bloks",
  "restrict_components": false,
  "required": false,
  "description": "Page content blocks"
}
```

---

## 🚀 Layout & Navigation

### 2. Navigation
**Technical Name:** `navigation`  
**Type:** Blok  
**Display Name:** Navigation / Header

| Field Name | Type | Options | Default | Required |
|------------|------|---------|---------|----------|
| site_name | text | - | "Wellvitas" | Yes |
| logo_image | asset | image | - | No |
| logo_width | text | - | "150" | No |
| navigation_items | bloks | nav_item | - | No |
| cta_button | bloks | button | - | No |
| background_color | text | - | "#ffffff" | No |
| text_color | text | - | "#1f2937" | No |
| sticky | boolean | - | true | No |

**Sub-block: nav_item**
| Field Name | Type | Required |
|------------|------|----------|
| label | text | Yes |
| link | link | No |
| url | text | No |

### 3. Footer
**Technical Name:** `footer`  
**Type:** Blok  
**Display Name:** Footer

| Field Name | Type | Options | Default | Required |
|------------|------|---------|---------|----------|
| site_name | text | - | "Wellvitas" | Yes |
| tagline | textarea | - | - | No |
| columns | bloks | footer_column | - | No |
| social_links | bloks | social_link | - | No |
| copyright_text | text | - | - | No |
| background_color | text | - | "#1f2937" | No |
| text_color | text | - | "#ffffff" | No |
| show_back_to_top | boolean | - | true | No |

**Sub-block: footer_column**
| Field Name | Type | Required |
|------------|------|----------|
| title | text | Yes |
| links | bloks (nav_item) | No |

**Sub-block: social_link**
| Field Name | Type | Required |
|------------|------|----------|
| platform | text | Yes |
| url | text | Yes |
| icon | asset (image) | No |

---

## 🗓️ Booking Integration

### 4. SuperSaaS Booking
**Technical Name:** `supersaas_booking`  
**Type:** Blok  
**Display Name:** SuperSaaS Booking Widget

| Field Name | Type | Default | Required | Description |
|------------|------|---------|----------|-------------|
| heading | text | "Book Your Appointment" | No | Section heading |
| description | textarea | - | No | Instructions or info text |
| account_name | text | "wellvitas" | Yes | SuperSaaS account name |
| schedule_id | text | - | Yes | Schedule ID from SuperSaaS |
| schedule_name | text | - | No | URL-friendly schedule name |
| domain | text | "supersaas.com" | No | SuperSaaS domain |
| show_title | boolean | true | No | Show schedule title |
| height | text | "600px" | No | Widget height |
| background_color | text | "#f9fafb" | No | Section background |
| text_color | text | - | No | Text color |
| custom_css | textarea | - | No | Custom CSS styling |

**SuperSaaS Setup Instructions:**
1. Create account at SuperSaaS.com
2. Create a schedule (e.g., "Appointments")
3. Go to Settings → Access Control
4. Copy Account Name and Schedule ID
5. Add to this block in Storyblok

---

## 🧩 Reusable Components

### 5. Button
**Technical Name:** `button`  
**Type:** Blok  
**Display Name:** Button

| Field Name | Type | Options | Default | Required |
|------------|------|---------|---------|----------|
| label | text | - | "Click Here" | Yes |
| link | link | - | - | No |
| url | text | - | - | No |
| variant | option | primary, secondary, outline, ghost | primary | No |
| size | option | small, medium, large | medium | No |
| full_width | boolean | - | false | No |
| open_in_new_tab | boolean | - | false | No |
| icon | asset | image | - | No |
| icon_position | option | left, right | left | No |
| custom_bg_color | text | - | - | No |
| custom_text_color | text | - | - | No |

### 6. Image
**Technical Name:** `image`  
**Type:** Blok  
**Display Name:** Image

| Field Name | Type | Default | Required |
|------------|------|---------|----------|
| image | asset | - | Yes |
| alt_text | text | - | Yes (for accessibility) |
| width | text | "100%" | No |
| height | text | "auto" | No |
| rounded | boolean | false | No |
| shadow | boolean | false | No |
| caption | text | - | No |
| link | link | - | No |
| url | text | - | No |

### 7. Rich Text
**Technical Name:** `rich_text`  
**Type:** Blok  
**Display Name:** Rich Text Content

| Field Name | Type | Options | Default | Required |
|------------|------|---------|---------|----------|
| content | richtext | - | - | Yes |
| text_align | option | left, center, right, justify | left | No |
| max_width | text | - | "100%" | No |
| text_color | text | - | - | No |
| background_color | text | - | - | No |
| padding | text | - | "1rem" | No |

### 8. SEO
**Technical Name:** `seo`  
**Type:** Blok  
**Display Name:** SEO Meta Tags

| Field Name | Type | Required | Description |
|------------|------|----------|-------------|
| title | text | Yes | Page title (60 chars) |
| description | textarea | Yes | Meta description (160 chars) |
| keywords | text | No | Comma-separated keywords |
| og_image | asset | No | Social media preview image (1200x630px) |
| og_title | text | No | Open Graph title (defaults to title) |
| og_description | textarea | No | Open Graph description |
| twitter_card | option | No | summary, summary_large_image |
| canonical_url | text | No | Canonical URL for SEO |
| noindex | boolean | No | Prevent search indexing |
| nofollow | boolean | No | Prevent link following |

---

## 🏥 Health Services Components

### 9. Hero Carousel
**Technical Name:** `hero_carousel`  
**Type:** Blok  
**Display Name:** Hero Carousel

*Keep existing fields from HeroCarouselBlok*

### 10. Intro Band
**Technical Name:** `intro_band`  
**Type:** Blok  
**Display Name:** Introduction Banner

*Keep existing fields from IntroBandBlok*

### 11. Therapies Section
**Technical Name:** `therapies_section`  
**Type:** Blok  
**Display Name:** Therapies / Services Section

*Keep existing fields from TherapiesSectionBlok*

### 12. Packages Section
**Technical Name:** `packages_section`  
**Type:** Blok  
**Display Name:** Treatment Packages

*Keep existing fields from PackagesSectionBlok*

### 13. Testimonials Section
**Technical Name:** `testimonials_section`  
**Type:** Blok  
**Display Name:** Customer Testimonials

*Keep existing fields from TestimonialsBlok*

### 14. Visit Us
**Technical Name:** `visit_us`  
**Type:** Blok  
**Display Name:** Visit Us / Contact Info

*Keep existing fields from VisitUsBlok*

### 15. How to Book
**Technical Name:** `how_to_book`  
**Type:** Blok  
**Display Name:** How to Book Section

*Keep existing fields from HowToBookBlok*

### 16. News Slider
**Technical Name:** `news_slider`  
**Type:** Blok  
**Display Name:** News / Updates Slider

*Keep existing fields from NewsSliderBlok*

### 17. Home Therapies
**Technical Name:** `home_therapies`  
**Type:** Blok  
**Display Name:** Homepage Therapies

*Keep existing fields from HomeTherapiesBlok*

---

## 📱 Content Types (Stories)

### Homepage Story
**Slug:** `home`  
**Content Type:** `page`  
**Suggested Structure:**
```
seo (SEO block)
body:
  ├─ hero_carousel
  ├─ intro_band
  ├─ therapies_section
  ├─ supersaas_booking ← Add booking here!
  ├─ testimonials_section
  ├─ packages_section
  └─ visit_us
```

### Booking Page Story
**Slug:** `booking`  
**Content Type:** `page`  
**Suggested Structure:**
```
seo (SEO block)
body:
  ├─ rich_text (instructions)
  ├─ supersaas_booking
  └─ visit_us (contact info)
```

### About Page Story
**Slug:** `about`  
**Content Type:** `page`  
**Suggested Structure:**
```
seo (SEO block)
body:
  ├─ rich_text (company story)
  ├─ image (team photo)
  ├─ therapies_section
  └─ testimonials_section
```

### Services/Therapies Page
**Slug:** `therapies`  
**Content Type:** `page`  
**Suggested Structure:**
```
seo (SEO block)
body:
  ├─ intro_band
  ├─ therapies_section
  ├─ packages_section
  └─ button (Book Now CTA)
```

---

## 🛠️ Global Stories (Singleton)

### Navigation Story
**Slug:** `navigation`  
**Content Type:** `navigation` block  
**Purpose:** Site-wide navigation  
**Usage:** Loaded in layout.js

### Footer Story
**Slug:** `footer`  
**Content Type:** `footer` block  
**Purpose:** Site-wide footer  
**Usage:** Loaded in layout.js

### Global Settings Story
**Slug:** `global-settings`  
**Content Type:** Custom content type  
**Fields:**
```
site_name: text
site_description: textarea
primary_color: text
secondary_color: text
contact_email: text
contact_phone: text
address: textarea
business_hours: textarea
google_analytics_id: text
facebook_pixel_id: text
```

---

## 📋 Implementation Checklist

### Phase 1: Create Blocks
- [ ] Create all 17 blocks in Block Library
- [ ] Set correct technical names (must match components)
- [ ] Configure all fields with proper types
- [ ] Test each block in preview mode

### Phase 2: Create Stories
- [ ] Create `navigation` story
- [ ] Create `footer` story
- [ ] Create `global-settings` story
- [ ] Create `home` page story
- [ ] Create `booking` page story
- [ ] Create `about` page story
- [ ] Create `therapies` page story

### Phase 3: SuperSaaS Integration
- [ ] Create SuperSaaS account
- [ ] Set up appointment schedule
- [ ] Get account name and schedule ID
- [ ] Add `supersaas_booking` block to pages
- [ ] Test booking flow end-to-end

### Phase 4: Content Population
- [ ] Add navigation items and logo
- [ ] Configure footer columns and social links
- [ ] Upload all images with alt text
- [ ] Write SEO meta tags for all pages
- [ ] Add therapy/service descriptions
- [ ] Set up testimonials

### Phase 5: Testing
- [ ] Test all internal links
- [ ] Test booking system
- [ ] Verify responsive design (mobile/tablet/desktop)
- [ ] Check page load speeds
- [ ] Test preview mode functionality
- [ ] Verify SEO meta tags in page source

---

## 🎨 Design Guidelines

### Colors
- **Primary Purple:** #8b5cf6
- **Secondary Pink:** #ec4899
- **Dark Gray:** #1f2937
- **Light Gray:** #f9fafb
- **White:** #ffffff

### Typography
- **Headings:** Bold, 2xl-4xl
- **Body:** Regular, base-lg
- **Buttons:** Semibold, base

### Spacing
- **Section Padding:** 3rem (48px) vertical
- **Container Max Width:** 1280px (max-w-6xl)
- **Element Gaps:** 1rem-2rem

### Images
- **Hero Images:** 1920x1080px (16:9)
- **Therapy Cards:** 600x400px
- **Icons:** 64x64px SVG or PNG
- **Social Media:** 1200x630px for OG images

---

## 🔐 Security & Performance

### Best Practices
1. **Image Optimization:** Use WebP format, compress images
2. **Lazy Loading:** Images load as user scrolls
3. **Caching:** Browser caching enabled (60s revalidation)
4. **SSL:** HTTPS only (configured)
5. **Form Validation:** Client and server-side validation
6. **Rate Limiting:** Booking system rate limits applied

### Environment Variables
```env
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN=pXYm0ntr5Tgzae6F8nb22gtt
NEXT_PUBLIC_STORYBLOK_BRAND_SPACE_ID=288214049142470
NEXT_PUBLIC_STORYBLOK_DEFAULT_SPACE_ID=288214049142470
NEXT_PUBLIC_STORYBLOK_REGION=eu
```

---

**Version:** 2.0  
**Last Updated:** December 2025  
**Maintained By:** Development Team
