# 🚀 Production-Ready CMS Configuration Guide

## For CMS Admin (Your Boss)

This guide will help you set up and manage the entire Wellvitas website through Storyblok CMS.

---

## 📋 Initial Setup Checklist

### Step 1: Create Global Components in Block Library

Go to **Storyblok → Block Library** and create these blocks:

#### 1. **Navigation** Block (Component name: `navigation`)
```
Fields:
├─ site_name (Text) - "Wellvitas"
├─ logo_image (Asset) - Upload logo
├─ logo_width (Number) - 150
├─ navigation_items (Blocks - repeatable)
│  ├─ label (Text) - "Home", "About", "Services", etc.
│  ├─ link (Link) - Internal or external link
│  └─ url (Text) - Backup URL field
├─ cta_button (Blocks - single)
│  ├─ label (Text) - "Book Now"
│  ├─ link (Link)
│  ├─ background_color (Text/Color) - #8b5cf6
│  └─ text_color (Text/Color) - #ffffff
├─ background_color (Text/Color) - #ffffff
├─ text_color (Text/Color) - #1f2937
└─ sticky (Boolean) - true
```

#### 2. **Footer** Block (Component name: `footer`)
```
Fields:
├─ site_name (Text) - "Wellvitas"
├─ tagline (Textarea) - "Your holistic health partner"
├─ columns (Blocks - repeatable)
│  ├─ title (Text) - "Quick Links", "Services", etc.
│  └─ links (Blocks - repeatable)
│     ├─ label (Text)
│     ├─ link (Link)
│     └─ url (Text)
├─ social_links (Blocks - repeatable)
│  ├─ platform (Text) - "Facebook", "Instagram", etc.
│  ├─ url (Text)
│  └─ icon (Asset)
├─ copyright_text (Text)
├─ background_color (Text/Color) - #1f2937
├─ text_color (Text/Color) - #ffffff
└─ show_back_to_top (Boolean) - true
```

#### 3. **SuperSaaS Booking** Block (Component name: `supersaas_booking`)
```
Fields:
├─ heading (Text) - "Book Your Appointment"
├─ description (Textarea/Rich Text)
├─ account_name (Text) - Your SuperSaaS account name
├─ schedule_id (Text) - Your SuperSaaS schedule ID
├─ schedule_name (Text) - Schedule name/slug
├─ domain (Text) - "supersaas.com" (default)
├─ show_title (Boolean) - true
├─ height (Text) - "600px"
├─ background_color (Text/Color)
├─ text_color (Text/Color)
└─ custom_css (Textarea) - Optional custom styling
```

#### 4. **Button** Block (Component name: `button`)
```
Fields:
├─ label (Text) - Button text
├─ link (Link) - Internal link
├─ url (Text) - External URL (backup)
├─ variant (Option) - primary, secondary, outline, ghost
├─ size (Option) - small, medium, large
├─ full_width (Boolean)
├─ open_in_new_tab (Boolean)
├─ icon (Asset)
├─ icon_position (Option) - left, right
├─ custom_bg_color (Text/Color)
└─ custom_text_color (Text/Color)
```

#### 5. **Image** Block (Component name: `image`)
```
Fields:
├─ image (Asset) - Required
├─ alt_text (Text) - For accessibility
├─ width (Text) - "100%" or "500px"
├─ height (Text) - "auto" or "300px"
├─ rounded (Boolean) - Rounded corners
├─ shadow (Boolean) - Drop shadow
├─ caption (Text)
├─ link (Link) - Optional clickable link
└─ url (Text) - Backup URL
```

#### 6. **Rich Text** Block (Component name: `rich_text`)
```
Fields:
├─ content (Rich Text) - Main content area
├─ text_align (Option) - left, center, right, justify
├─ max_width (Text) - "800px", "100%"
├─ text_color (Text/Color)
├─ background_color (Text/Color)
└─ padding (Text) - "1rem", "2rem"
```

#### 7. **SEO** Block (Component name: `seo`)
```
Fields:
├─ title (Text) - Page title
├─ description (Textarea) - Meta description
├─ keywords (Text) - Comma-separated keywords
├─ og_image (Asset) - Social media preview image
├─ og_title (Text) - Open Graph title
├─ og_description (Textarea) - Open Graph description
├─ twitter_card (Option) - summary, summary_large_image
├─ canonical_url (Text)
├─ noindex (Boolean)
└─ nofollow (Boolean)
```

---

## 🏗️ Create Essential Stories

### 1. Global Settings Story
**Path:** `/global-settings`
**Content Type:** Single story (not nestable)

```
Fields:
├─ site_name (Text) - "Wellvitas"
├─ site_description (Textarea)
├─ primary_color (Text) - #8b5cf6
├─ secondary_color (Text) - #ec4899
├─ contact_email (Text)
├─ contact_phone (Text)
├─ address (Textarea)
├─ business_hours (Textarea)
├─ google_analytics_id (Text)
└─ facebook_pixel_id (Text)
```

### 2. Navigation Story
**Path:** `/navigation`
**Content Type:** `navigation` block

Add navigation items:
- Home → /
- About → /about
- Services → /therapies
- Book Now → /booking (use SuperSaaS)
- Contact → /visit

### 3. Footer Story
**Path:** `/footer`
**Content Type:** `footer` block

Create 3 columns:
- **Quick Links:** Home, About, Services, Contact
- **Services:** List your therapy offerings
- **Legal:** Privacy Policy, Terms of Service

Add social media links:
- Facebook, Instagram, Twitter, etc.

### 4. Home Page
**Path:** `/home`
**Content Type:** `page` block

**Suggested Structure:**
```
body (blocks):
├─ hero_carousel
├─ intro_band
├─ therapies_section
├─ supersaas_booking  ← New!
├─ testimonials_section
├─ packages_section
└─ visit_us
```

---

## 📝 Content Management Workflow

### Daily Operations

#### Adding a New Page
1. Go to **Content** → **Stories**
2. Click **Create new entry**
3. Choose **page** as content type
4. Add blocks to the `body` field:
   - Rich Text for paragraphs
   - Image for photos
   - Button for CTAs
   - SuperSaaS Booking for appointment booking
5. Add SEO block at the top for search optimization
6. Click **Save** → **Publish**

#### Editing Navigation
1. Go to **Content** → Find **navigation** story
2. Click to edit
3. Add/remove/reorder navigation items
4. Update CTA button text/link
5. **Save** → **Publish**

#### Managing Booking System
1. Go to your **Home** page or **Booking** page
2. Find the **SuperSaaS Booking** block
3. Update fields:
   - **heading:** Change appointment heading
   - **description:** Add instructions or information
   - **schedule_id:** Your SuperSaaS schedule ID
   - **account_name:** Your SuperSaaS account
4. **Save** → **Publish**

**To get your SuperSaaS credentials:**
1. Log into SuperSaaS.com
2. Go to **Settings** → **Access Control**
3. Copy your **Account Name** and **Schedule ID**
4. Paste into Storyblok fields

---

## 🎨 Customization Options

### Changing Colors
Every block has color options:
- `background_color` - Section background
- `text_color` - Text color
- Use hex codes: #8b5cf6 (purple), #ffffff (white), etc.

### Adding Images
1. Click **Assets** in any image field
2. Upload your image
3. Add **alt text** (required for accessibility)
4. Set dimensions if needed

### Creating Buttons
Use the **Button** block for clickable elements:
- Internal links: Use **link** field (select a page)
- External links: Use **url** field (https://...)
- Variants: primary (purple), secondary (gray), outline, ghost
- Sizes: small, medium, large

---

## ✅ Testing Your Changes

### Preview Mode (Before Publishing)
1. Edit any story
2. Click **Preview** button
3. Opens your website with `?_storyblok=...` parameter
4. You'll see draft changes instantly
5. Click any component to edit it live

### Publishing
1. Make all changes
2. Click **Save** (draft)
3. Test in preview mode
4. When satisfied, click **Publish**
5. Changes go live automatically via GitHub Actions

---

## 🔧 SuperSaaS Integration Guide

### Setting Up Your First Booking Page

**Step 1: Create SuperSaaS Account**
1. Go to SuperSaaS.com
2. Sign up for account
3. Create your first schedule (e.g., "Appointments")

**Step 2: Get Your Credentials**
```
Account Name: [Found in SuperSaaS Settings]
Schedule ID: [Found in Schedule → Settings]
Schedule Name: [URL-friendly version of your schedule name]
```

**Step 3: Add to Storyblok**
1. Open your **Home** or **Booking** page story
2. Add **SuperSaaS Booking** block
3. Fill in fields:
   ```
   heading: "Book Your Appointment"
   description: "Choose a date and time that works for you"
   account_name: "wellvitas"
   schedule_id: "123456"
   schedule_name: "appointments"
   height: "600px"
   ```
4. **Save** → **Publish**

**Step 4: Test Booking**
1. Visit your website
2. Scroll to booking section
3. Try booking an appointment
4. Check SuperSaaS dashboard for the booking

---

## 📊 Common Tasks

### Task 1: Update Business Hours
```
1. Edit "Visit Us" block on homepage
2. Update "hours" field
3. Save → Publish
```

### Task 2: Add New Service
```
1. Go to homepage
2. Find "Therapies Section" block
3. Add new therapy card:
   - Image
   - Title
   - Description
   - Button link
4. Save → Publish
```

### Task 3: Change Hero Carousel Images
```
1. Edit homepage
2. Find "Hero Carousel" block
3. Click on slide you want to change
4. Upload new image
5. Update heading/text if needed
6. Save → Publish
```

### Task 4: Update Footer Social Links
```
1. Open "footer" story
2. Scroll to "social_links"
3. Add/edit/remove platforms:
   - platform: "Facebook"
   - url: "https://facebook.com/yourpage"
   - icon: [Upload icon]
4. Save → Publish
```

---

## 🚨 Troubleshooting

### Problem: Changes not showing on website
**Solution:**
- Wait 2-3 minutes for GitHub Actions to deploy
- Clear your browser cache (Ctrl + Shift + R)
- Check if you clicked **Publish** (not just Save)

### Problem: Booking widget not loading
**Solution:**
- Verify SuperSaaS credentials are correct
- Check `schedule_id` matches your SuperSaaS dashboard
- Ensure `account_name` is correct

### Problem: Navigation broken
**Solution:**
- Check all links use correct format:
  - Internal: Select from link picker
  - External: Full URL with https://

### Problem: Images not displaying
**Solution:**
- Re-upload image (may have failed)
- Check file size (max 5MB recommended)
- Use JPEG/PNG/WebP formats

---

## 📞 Support

**For technical issues:**
- Contact your web developer
- Check GitHub Actions logs for deployment errors

**For CMS questions:**
- Refer to this guide
- Storyblok documentation: https://www.storyblok.com/docs

**For SuperSaaS booking issues:**
- SuperSaaS support: https://www.supersaas.com/info/support
- Check your SuperSaaS dashboard for booking logs

---

## 🎯 Best Practices

1. **Always preview before publishing**
2. **Use meaningful names for images** (e.g., "massage-therapy-room.jpg")
3. **Fill in alt text for all images** (helps SEO and accessibility)
4. **Keep navigation under 7 items** (better UX)
5. **Test booking system regularly** (ensure appointments work)
6. **Update content monthly** (keeps site fresh)
7. **Monitor analytics** (see what pages are popular)

---

## 🎓 Training Resources

- **Storyblok Basics:** https://www.storyblok.com/docs/guide/essentials
- **Visual Editor Tutorial:** https://www.storyblok.com/docs/guide/essentials/visual-editor
- **SuperSaaS Guide:** https://www.supersaas.com/info/doc

---

**Last Updated:** December 2025  
**Version:** 2.0 (Production-Ready with SuperSaaS)
