# 🎯 Quick Start: Adding New Blocks to Homepage

## For: CMS Admin (Boss)
## Time Required: 30-45 minutes
## Difficulty: Easy (No coding required!)

---

## ⚠️ Important: Two-Step Process

The blocks exist in the **code** but need to be created in **Storyblok CMS** first before you can use them.

**Step 1:** Create block schemas in Storyblok (one-time setup)  
**Step 2:** Add blocks to homepage and configure content

---

## Step 1: Create Block Schemas in Storyblok

### A. Navigation Block

1. **Go to Storyblok:** https://app.storyblok.com
2. **Select your space:** Wellvitas
3. **Click "Block Library"** (left sidebar)
4. **Click "+ New block"** (top right)
5. **Fill in:**
   - **Name:** `navigation`
   - **Display name:** Navigation / Header
   - **Block type:** Nestable block
6. **Click "Create"**
7. **Add fields** (click "+ Add field"):

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| `site_name` | Text | Default: "Wellvitas" |
| `logo_image` | Asset (Images) | Not required |
| `navigation_items` | Blocks | Restrict to: `nav_item` (create this sub-block first) |
| `cta_button` | Blocks | Restrict to: `button` |
| `background_color` | Text | Default: "#ffffff" |
| `text_color` | Text | Default: "#1f2937" |
| `sticky` | Boolean | Default: checked (true) |

8. **Click "Save"**

**Sub-block needed: `nav_item`**
1. Create new block: `nav_item`
2. Add fields:
   - `label` (Text) - Required
   - `link` (Link) - Not required

---

### B. Footer Block

1. **Click "+ New block"**
2. **Fill in:**
   - **Name:** `footer`
   - **Display name:** Footer
   - **Block type:** Nestable block
3. **Add fields:**

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| `site_name` | Text | Default: "Wellvitas" |
| `tagline` | Textarea | Not required |
| `columns` | Blocks | Restrict to: `footer_column` (create this sub-block) |
| `social_links` | Blocks | Restrict to: `social_link` (create this sub-block) |
| `copyright_text` | Text | Default: "© 2024 Wellvitas. All rights reserved." |
| `background_color` | Text | Default: "#1f2937" |
| `text_color` | Text | Default: "#ffffff" |
| `show_back_to_top` | Boolean | Default: checked |

4. **Click "Save"**

**Sub-block: `footer_column`**
- `title` (Text) - Required
- `links` (Blocks) - Restrict to: `nav_item`

**Sub-block: `social_link`**
- `platform` (Text) - Required (e.g., "Facebook", "Instagram")
- `url` (Text) - Required

---

### C. Button Block

1. **Click "+ New block"**
2. **Fill in:**
   - **Name:** `button`
   - **Display name:** Button / CTA
   - **Block type:** Nestable block
3. **Add fields:**

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| `label` | Text | Required |
| `link` | Link | Not required |
| `variant` | Single-option | Options: primary, secondary, outline, ghost (Default: primary) |
| `size` | Single-option | Options: small, medium, large (Default: medium) |
| `full_width` | Boolean | Default: unchecked |
| `background_color` | Text | Default: "#00A896" |
| `text_color` | Text | Default: "#ffffff" |

4. **Click "Save"**

---

### D. Image Block

1. **Click "+ New block"**
2. **Fill in:**
   - **Name:** `image`
   - **Display name:** Image
   - **Block type:** Nestable block
3. **Add fields:**

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| `image` | Asset (Images) | Required |
| `alt_text` | Text | Required (for accessibility) |
| `caption` | Text | Not required |
| `rounded` | Boolean | Default: unchecked |
| `shadow` | Boolean | Default: unchecked |
| `link` | Link | Not required |

4. **Click "Save"**

---

### E. Rich Text Block

1. **Click "+ New block"**
2. **Fill in:**
   - **Name:** `rich_text`
   - **Display name:** Rich Text / Content
   - **Block type:** Nestable block
3. **Add fields:**

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| `content` | Richtext | Required |
| `text_align` | Single-option | Options: left, center, right, justify (Default: left) |
| `max_width` | Text | Default: "800px" |
| `background_color` | Text | Default: "transparent" |
| `text_color` | Text | Default: "#333333" |
| `padding` | Text | Default: "2rem" |

4. **Click "Save"**

---

### F. SEO Block

1. **Click "+ New block"**
2. **Fill in:**
   - **Name:** `seo`
   - **Display name:** SEO Meta Tags
   - **Block type:** Nestable block
3. **Add fields:**

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| `title` | Text | Max length: 60, Not required |
| `description` | Textarea | Max length: 160, Not required |
| `keywords` | Text | Not required |
| `og_image` | Asset (Images) | Not required |
| `og_type` | Single-option | Options: website, article, product (Default: website) |
| `twitter_card` | Single-option | Options: summary, summary_large_image (Default: summary_large_image) |
| `canonical_url` | Text | Not required |
| `noindex` | Boolean | Default: unchecked |
| `nofollow` | Boolean | Default: unchecked |

4. **Click "Save"**

---

### G. SuperSaaS Booking Block

1. **Click "+ New block"**
2. **Fill in:**
   - **Name:** `supersaas_booking`
   - **Display name:** Booking Widget
   - **Block type:** Nestable block
3. **Add fields:**

| Field Name | Field Type | Configuration |
|------------|------------|---------------|
| `heading` | Text | Default: "Book Your Appointment" |
| `description` | Textarea | Not required |
| `account_name` | Text | Required, Default: "wellvitas" |
| `schedule_id` | Text | Required (get from SuperSaaS dashboard) |
| `height` | Number | Default: 600 |
| `background_color` | Text | Default: "#f9fafb" |
| `text_color` | Text | Default: "#333333" |
| `accent_color` | Text | Default: "#00A896" |

4. **Click "Save"**

---

## ✅ Step 1 Complete!

You now have all 7 new blocks created in Storyblok!

---

## Step 2: Add Blocks to Homepage

### A. Open Homepage in Visual Editor

1. **Go to:** Content → Home (in Storyblok)
2. **Click:** "Open in Visual Editor" (top right)
3. You'll see the current homepage with existing blocks

### B. Add Navigation Block (Top of Page)

1. **In the blocks panel (left side):**
   - Click "+ Add block" at the **top** of the body section
2. **Select:** "Navigation / Header"
3. **Configure fields:**
   - **Site name:** Wellvitas
   - **Logo image:** Click "Select image" → Upload your logo OR select from assets
   - **Navigation items:** Click "+ Add item" for each menu link:
     - Item 1: Label: "Home" | Link: `/` (Story: Home)
     - Item 2: Label: "About" | Link: `/about` (Story: About)
     - Item 3: Label: "Therapies" | Link: `/therapies` (Story: Therapies)
     - Item 4: Label: "Booking" | Link: `/booking` (Story: Booking)
     - Item 5: Label: "Visit" | Link: `/visit` (Story: Visit)
   - **CTA Button:** Click "+ Add block" → Select "Button"
     - Label: "Book Now"
     - Link: `/booking` (Story: Booking)
     - Variant: primary
     - Size: medium
   - **Background color:** #ffffff (white)
   - **Text color:** #1f2937 (dark gray)
   - **Sticky:** Checked ✓
4. **Click "Save"** (top left)

**You should see:** Navigation bar appear at the top of the preview!

---

### C. Add SEO Block (For Search Engines)

1. **Click "+ Add block"** (in body section)
2. **Select:** "SEO Meta Tags"
3. **Configure:**
   - **Title:** "Wellvitas - Holistic Health & Wellness Treatments"
   - **Description:** "Professional holistic health and wellness treatments in a serene environment. Book your appointment today."
   - **Keywords:** "holistic health, wellness, massage therapy, wellbeing"
   - **OG Image:** Upload a 1200x630px image (your homepage hero image)
   - **OG Type:** website
   - **Twitter Card:** summary_large_image
4. **Click "Save"**

**Note:** SEO block won't be visible on the page, but it adds important metadata for Google.

---

### D. Add Rich Text Block (Introduction Section)

1. **Drag the existing "Intro Band" block down** (or after Hero Carousel)
2. **OR: Click "+ Add block"**
3. **Select:** "Rich Text / Content"
4. **Configure:**
   - **Content:** Click to open rich text editor
     - Type: "Welcome to Wellvitas - Your sanctuary for holistic health and wellness"
     - Format: Add heading (H2), bold text, links as needed
   - **Text align:** center
   - **Max width:** 800px
   - **Background color:** #f9fafb (light gray)
   - **Text color:** #333333
   - **Padding:** 3rem
5. **Click "Save"**

**You should see:** Formatted text section with your content!

---

### E. Add SuperSaaS Booking Block

1. **Scroll down in the blocks panel**
2. **Click "+ Add block"** (where you want the booking widget)
3. **Select:** "Booking Widget"
4. **Configure:**
   - **Heading:** "Book Your Appointment"
   - **Description:** "Choose a date and time that works for you. We'll confirm your booking via email."
   - **Account name:** wellvitas (your SuperSaaS account name)
   - **Schedule ID:** [Get from SuperSaaS dashboard]
     - Log in to SuperSaaS → Schedules → Your Schedule → Settings → Copy the Schedule ID number
   - **Height:** 600
   - **Background color:** #ffffff
   - **Accent color:** #00A896 (teal - your brand color)
5. **Click "Save"**

**You should see:** Live booking calendar appear on the page!

---

### F. Add Footer Block (Bottom of Page)

1. **Scroll to the bottom** of the blocks panel
2. **Click "+ Add block"** at the **bottom** of body section
3. **Select:** "Footer"
4. **Configure:**
   - **Site name:** Wellvitas
   - **Tagline:** "Your partner in holistic wellness"
   - **Columns:** Click "+ Add item" for each footer column:
     
     **Column 1: Quick Links**
     - Title: "Quick Links"
     - Links: Add items:
       - Home → `/`
       - About → `/about`
       - Therapies → `/therapies`
       - Booking → `/booking`
     
     **Column 2: Therapies**
     - Title: "Our Therapies"
     - Links: Add items:
       - Massage Therapy → `/therapies`
       - Aromatherapy → `/therapies`
       - Reflexology → `/therapies`
     
     **Column 3: Contact**
     - Title: "Contact"
     - Links: Add items:
       - Visit Us → `/visit`
       - Email: info@wellvitas.com (use email link)
       - Phone: +44 123 456 7890 (use phone link)
   
   - **Social Links:** Click "+ Add item" for each:
     - Platform: "Facebook" | URL: https://facebook.com/wellvitas
     - Platform: "Instagram" | URL: https://instagram.com/wellvitas
     - Platform: "Twitter" | URL: https://twitter.com/wellvitas
   
   - **Copyright text:** © 2024 Wellvitas. All rights reserved.
   - **Background color:** #1f2937 (dark gray)
   - **Text color:** #ffffff (white)
   - **Show back to top:** Checked ✓
5. **Click "Save"**

**You should see:** Complete footer with columns and social links!

---

### G. Add Call-to-Action Button (Anywhere)

**Example: Add a "Book Now" button in the hero section**

1. **Click "+ Add block"** (inside Hero Carousel or after Intro Band)
2. **Select:** "Button / CTA"
3. **Configure:**
   - **Label:** "Book Your Appointment"
   - **Link:** `/booking` (Story: Booking)
   - **Variant:** primary
   - **Size:** large
   - **Full width:** Unchecked (or checked for full-width button)
   - **Background color:** #00A896 (teal)
   - **Text color:** #ffffff (white)
4. **Click "Save"**

**You should see:** Styled button that links to booking page!

---

### H. Add Images

**Example: Add an image for a therapy**

1. **Click "+ Add block"**
2. **Select:** "Image"
3. **Configure:**
   - **Image:** Click "Select image" → Upload OR select from assets
   - **Alt text:** "Professional massage therapy room" (required for accessibility)
   - **Caption:** "Our serene treatment rooms" (optional)
   - **Rounded:** Checked (for rounded corners)
   - **Shadow:** Checked (for drop shadow effect)
   - **Link:** `/therapies` (optional, makes image clickable)
4. **Click "Save"**

**You should see:** Image with rounded corners and shadow!

---

## 🎨 Reordering Blocks

**To change block order:**

1. **Hover over any block** in the blocks panel (left side)
2. **Click and hold** the drag handle (⋮⋮)
3. **Drag up or down**
4. **Release** to drop in new position
5. **Click "Save"**

**Recommended homepage structure:**

```
1. Navigation (top)
2. SEO (invisible, but important)
3. Hero Carousel
4. Intro Band / Rich Text
5. Home Therapies
6. SuperSaaS Booking
7. Testimonials
8. Call-to-action Button
9. Footer (bottom)
```

---

## 📱 Testing on Different Devices

**In Visual Editor:**

1. **Click device icons** (top bar)
   - 🖥️ Desktop (1920px)
   - 📱 Tablet (768px)
   - 📱 Mobile (375px)
2. **Check:** Content looks good on all devices
3. **Adjust:** If needed, change padding/spacing fields

---

## 🚀 Publishing Changes

**When you're happy with the homepage:**

1. **Click "Save"** (top left) - saves as draft
2. **Click "Publish"** (top right) - makes changes live
3. **Confirm:** "Are you sure?" → Click "Publish" again
4. **Wait:** 30-60 seconds for changes to appear on live site
5. **Verify:** Open website in new tab (not Visual Editor) to see live changes

---

## ⚠️ Important Tips

### Do's ✅
- **Save frequently** (Ctrl+S / Cmd+S)
- **Preview before publishing** (click preview icon)
- **Test on mobile** (use device preview)
- **Use descriptive alt text** for images (accessibility)
- **Keep navigation simple** (5-7 items max)

### Don'ts ❌
- **Don't delete blocks** unless you're sure (no undo!)
- **Don't forget to publish** (Save ≠ Publish)
- **Don't use huge images** (compress before upload)
- **Don't overuse colors** (stick to brand colors)

---

## 🆘 Troubleshooting

### "Block not showing in dropdown"
**Solution:** Block wasn't created in Block Library yet. Go back to Step 1.

### "Changes not appearing on live site"
**Solution:** 
1. Did you click "Publish" (not just "Save")?
2. Wait 30-60 seconds
3. Hard refresh browser (Ctrl+Shift+R / Cmd+Shift+R)
4. Clear browser cache

### "Booking widget not loading"
**Solution:**
1. Check SuperSaaS Account Name is correct
2. Check Schedule ID is correct (numeric only)
3. Verify schedule is published in SuperSaaS
4. Wait 30 seconds for widget script to load

### "Image not uploading"
**Solution:**
1. File too large? Max 5MB (compress with TinyPNG)
2. Wrong format? Use JPG, PNG, WebP, or SVG
3. Slow internet? Try uploading one image at a time

### "Navigation menu not working"
**Solution:**
1. Check all links are set correctly (Story or URL)
2. Verify stories exist (Home, About, etc.)
3. Save and publish
4. Clear browser cache

---

## 📞 Need Help?

### For Content Questions:
- Review: [CMS_ADMIN_GUIDE.md](./CMS_ADMIN_GUIDE.md)
- Storyblok Docs: https://www.storyblok.com/docs
- Storyblok Support: support@storyblok.com (live chat in dashboard)

### For Technical Questions:
- Contact developer
- Check: [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md)

### For Booking System:
- SuperSaaS Support: https://supersaas.com/info/support
- SuperSaaS Docs: https://supersaas.com/info/doc

---

## ✅ Checklist: Adding Blocks to Homepage

Use this checklist to track your progress:

### Block Library Setup (One-Time)
- [ ] Created `navigation` block
- [ ] Created `nav_item` sub-block
- [ ] Created `footer` block
- [ ] Created `footer_column` sub-block
- [ ] Created `social_link` sub-block
- [ ] Created `button` block
- [ ] Created `image` block
- [ ] Created `rich_text` block
- [ ] Created `seo` block
- [ ] Created `supersaas_booking` block

### Homepage Configuration
- [ ] Added Navigation block at top
- [ ] Configured navigation menu items
- [ ] Added CTA button to navigation
- [ ] Added SEO block with metadata
- [ ] Added Rich Text block for intro
- [ ] Added SuperSaaS Booking widget
- [ ] Added Footer block at bottom
- [ ] Configured footer columns and links
- [ ] Added social media links
- [ ] Added call-to-action buttons
- [ ] Added images with alt text

### Testing & Publishing
- [ ] Tested on desktop view
- [ ] Tested on tablet view
- [ ] Tested on mobile view
- [ ] Previewed all changes
- [ ] Clicked all navigation links
- [ ] Tested booking widget
- [ ] Published changes
- [ ] Verified changes on live site

---

## 🎉 You're Done!

Your homepage now has all the new blocks and your boss can edit everything from Storyblok CMS!

**No developer needed** for future content updates! 🚀

---

**Last Updated:** December 20, 2025  
**For:** Wellvitas CMS Admin  
**Support:** See [CMS_ADMIN_GUIDE.md](./CMS_ADMIN_GUIDE.md) for detailed instructions
