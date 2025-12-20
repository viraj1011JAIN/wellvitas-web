# Admin-Side Documentation: CMS Management Guide

## Overview

This guide is for **non-technical administrators** managing the Wellvitas website through Storyblok CMS. You can edit all website content without touching code.

**Target Audience:** Marketing managers, content editors, business owners  
**Technical Level:** No coding required  
**Time to Learn:** 30-45 minutes

---

## Table of Contents

1. [Getting Started](#getting-started)
2. [Storyblok Dashboard Overview](#storyblok-dashboard-overview)
3. [Content Management](#content-management)
4. [Visual Editor](#visual-editor)
5. [SuperSaaS Booking Configuration](#supersaas-booking-configuration)
6. [Publishing Workflow](#publishing-workflow)
7. [Common Tasks](#common-tasks)
8. [Troubleshooting](#troubleshooting)

---

## Getting Started

### 1. Access Storyblok Dashboard

**URL:** https://app.storyblok.com  
**Login:** Use your email and password

**Your Space:** Wellvitas (ID: 288214049142470)  
**Region:** Europe (EU)

### 2. First Login Checklist

- [ ] Verify email address
- [ ] Set up two-factor authentication (recommended)
- [ ] Review space permissions
- [ ] Bookmark Visual Editor URL
- [ ] Test preview mode

### 3. Dashboard Layout

```
┌──────────────────────────────────────────┐
│  [Storyblok Logo]  Wellvitas Space   [🔔] │
├──────────────────────────────────────────┤
│                                          │
│  Content     Assets     Components       │
│  ▼           ▼          ▼                │
│                                          │
│  ┌─────────────────────────────────┐    │
│  │  Stories (Pages)                │    │
│  │  • Home                         │    │
│  │  • About                        │    │
│  │  • Therapies                    │    │
│  │  • Booking                      │    │
│  │  • Visit                        │    │
│  └─────────────────────────────────┘    │
│                                          │
│  [+ New Story]  [Preview]  [Publish]    │
└──────────────────────────────────────────┘
```

---

## Storyblok Dashboard Overview

### Navigation Menu (Left Sidebar)

1. **Content** 📄
   - All pages (stories)
   - Folder structure
   - Draft/published status

2. **Assets** 🖼️
   - Images library
   - Videos
   - Documents
   - Organize in folders

3. **Components** 🧩
   - Block definitions (17 total)
   - Reusable components
   - Schema editor (advanced)

4. **Settings** ⚙️
   - Space settings
   - Webhooks
   - User management
   - Preview URLs

---

## Content Management

### Understanding Stories

**Story = Web Page**

Each story represents a page on your website:
- **Home** → Homepage (wellvitas.com)
- **About** → About page (wellvitas.com/about)
- **Therapies** → Therapies page (wellvitas.com/therapies)
- **Booking** → Booking page (wellvitas.com/booking)

### Story Structure

```
Story (Page)
├─ Content (Body)
│  ├─ Navigation Block
│  ├─ Hero Carousel Block
│  ├─ Intro Band Block
│  ├─ Therapies Section Block
│  ├─ Testimonials Block
│  └─ Footer Block
└─ Settings
   ├─ SEO (Title, Description)
   ├─ Slug (URL path)
   └─ Published Status
```

### Creating a New Page

**Step-by-Step:**

1. Click **+ Create New** button
2. Select **Story**
3. Choose template: `page` (default layout)
4. Enter story name: "Services"
5. Set slug: `services` (URL path)
6. Click **Create**

**Result:** New page at `wellvitas.com/services`

### Adding Content Blocks

**What are Blocks?**  
Blocks are building blocks for your pages (like LEGO pieces).

**Available Blocks (17 total):**

| Block Name | Purpose | Example Use |
|------------|---------|-------------|
| **Navigation** | Header menu | Site-wide navigation bar |
| **Hero Carousel** | Image slideshow | Homepage banner |
| **Intro Band** | Text band | Welcome message |
| **Therapies Section** | Services grid | Treatment types |
| **Testimonials** | Customer reviews | Social proof |
| **SuperSaaS Booking** | Booking widget | Appointment scheduling |
| **Footer** | Footer columns | Site-wide footer |
| **Button** | Call-to-action | "Book Now" button |
| **Image** | Single image | Photo display |
| **Rich Text** | Formatted text | Articles, descriptions |
| **SEO** | Meta tags | Search engine optimization |
| **Packages Section** | Treatment packages | Pricing cards |
| **News Slider** | News carousel | Latest updates |
| **How to Book** | Booking instructions | Step-by-step guide |
| **Visit Us** | Location info | Address, map, hours |
| **Home Therapies** | Homepage services | Featured treatments |

**Adding a Block:**

1. Open a story (page)
2. Click **+ Add block** in the body
3. Select block type (e.g., "Hero Carousel")
4. Fill in fields:
   - **Heading:** "Welcome to Wellvitas"
   - **Description:** "Holistic health treatments"
   - **Images:** Upload or select from assets
5. Click **Save**

### Reordering Blocks

**Drag & Drop:**
1. Hover over block
2. Click and hold the **⋮⋮** (drag handle)
3. Drag up or down
4. Release to drop

**Result:** Blocks reorder on the live website

### Editing Block Content

**Text Fields:**
- Click in field
- Type new content
- Changes save automatically

**Image Fields:**
- Click **Select Image**
- Upload new image OR select from asset library
- Adjust alt text for accessibility

**Link Fields:**
- Click **Add Link**
- Choose link type:
  - **Story:** Link to another page
  - **URL:** External link
  - **Email:** mailto: link
  - **Asset:** Link to PDF/document

**Color Fields:**
- Click color picker
- Select color OR enter hex code (#FF5733)
- Preview changes in Visual Editor

---

## Visual Editor

### What is Visual Editor?

**Live preview while editing**

See your changes in real-time as you type/adjust blocks.

### Opening Visual Editor

**Method 1:**  
Click **Open in Visual Editor** button (top right)

**Method 2:**  
Click story → **Visual Editor** tab

### Visual Editor Layout

```
┌─────────────────────────────────────────────┐
│ [Save] [Publish] Preview: Desktop ▼  [Exit] │
├─────────┬───────────────────────────────────┤
│ Blocks  │  LIVE WEBSITE PREVIEW             │
│ Panel   │                                   │
│         │  ┌─────────────────────────────┐  │
│ ┌─────┐ │  │ Navigation Bar              │  │
│ │Hero │ │  ├─────────────────────────────┤  │
│ ├─────┤ │  │ Hero Carousel              │  │
│ │Intro│ │  │ [Welcome Message]           │  │
│ ├─────┤ │  ├─────────────────────────────┤  │
│ │Text │ │  │ Intro Band                  │  │
│ └─────┘ │  │ "Your wellness journey..."  │  │
│         │  └─────────────────────────────┘  │
│         │                                   │
│ [+Add]  │  Click any element to edit →     │
└─────────┴───────────────────────────────────┘
```

### Editing in Visual Mode

1. Click any element on preview (right side)
2. Block panel opens (left side)
3. Edit fields
4. See changes immediately
5. Click **Save** (top left)

### Preview Modes

**Desktop:** Full-width view (1920px)  
**Tablet:** iPad view (768px)  
**Mobile:** Phone view (375px)

**Switch:** Click device icons (top bar)

---

## SuperSaaS Booking Configuration

### Setting Up Booking Widget

**Block:** SuperSaaS Booking

**Required Fields:**

| Field | Value | Where to Find |
|-------|-------|---------------|
| **Account Name** | wellvitas | Your SuperSaaS account name |
| **Schedule ID** | 123456 | SuperSaaS dashboard → Schedule → Settings |
| **Heading** | Book Your Appointment | Displayed above widget |
| **Description** | Choose a time that works for you | Instructions for users |
| **Height (px)** | 600 | Height of booking widget |

**Optional Fields:**

| Field | Purpose | Example |
|-------|---------|---------|
| **Background Color** | Widget background | #FFFFFF (white) |
| **Text Color** | Widget text | #333333 (dark gray) |
| **Accent Color** | Buttons/highlights | #00A896 (teal) |
| **Custom CSS** | Advanced styling | `.supersaas { padding: 20px; }` |

### Finding Your Schedule ID

**Step-by-Step:**

1. Log in to **SuperSaaS** (https://www.supersaas.com)
2. Go to **Schedules** tab
3. Click your schedule name
4. Go to **Settings** → **Layout & Media**
5. Find **Schedule ID** (e.g., 123456)
6. Copy ID number
7. Paste into Storyblok → SuperSaaS Booking block → **Schedule ID** field

### Testing Booking Widget

1. Save story with SuperSaaS block
2. Click **Preview** → **Open in new tab**
3. Test booking flow:
   - Select date
   - Choose time slot
   - Enter details
   - Submit booking
4. Verify booking appears in SuperSaaS dashboard

---

## Publishing Workflow

### Draft vs. Published

**Draft:**
- Work-in-progress content
- Only visible in preview mode
- Not live on website

**Published:**
- Live content
- Visible to all website visitors
- Indexed by search engines

### Publishing a Story

**Step-by-Step:**

1. Open story
2. Make edits
3. Click **Save** (saves draft)
4. Review in Visual Editor
5. Click **Publish** button (top right)
6. Confirm: "Are you sure?"
7. Click **Publish** again

**Result:** Changes go live in ~30 seconds

### Unpublishing a Story

**Use Case:** Temporarily hide a page

1. Open story
2. Click **•••** (three dots menu)
3. Select **Unpublish**
4. Confirm

**Result:** Page returns 404 (not found)

### Scheduling Publications

**Coming Soon:**  
Schedule content to go live at specific date/time.

---

## Common Tasks

### 1. Updating Homepage Hero Images

**Steps:**

1. Go to **Content** → **Home**
2. Find **Hero Carousel** block
3. Click **Images** field
4. Click **+ Add Item**
5. Upload new image (recommended size: 1920x1080px)
6. Enter **Alt Text:** "Professional massage therapy room"
7. Save and publish

**Tips:**
- Use high-quality images (min 1920px width)
- Optimize images before upload (use TinyPNG)
- Max file size: 2MB per image

### 2. Adding a New Therapy Service

**Steps:**

1. Go to **Home Therapies** or **Therapies Section** block
2. Click **Therapies** field → **+ Add Item**
3. Fill in:
   - **Name:** "Deep Tissue Massage"
   - **Description:** "Relieves chronic muscle tension"
   - **Image:** Upload therapy photo
   - **Link:** Link to `/therapies` page
   - **Price:** "£75 per session"
4. Save and publish

### 3. Changing Navigation Menu

**Steps:**

1. Open any story with **Navigation** block
2. Find **Navigation Items** field
3. Click **+ Add Item** to add new menu item
4. Fill in:
   - **Label:** "Services"
   - **Link:** `/services` (internal link)
5. Reorder items by dragging
6. Save and publish

**Note:** Navigation is global (appears on all pages)

### 4. Updating Footer Information

**Steps:**

1. Open any story with **Footer** block
2. Edit fields:
   - **Site Name:** Company name
   - **Tagline:** "Your wellness partner"
   - **Columns:** Add/edit footer columns
   - **Social Links:** Add Facebook, Instagram, etc.
3. Save and publish

### 5. Editing Testimonials

**Steps:**

1. Find **Testimonials Section** block
2. Click **Testimonials** field → **+ Add Item**
3. Fill in:
   - **Author:** "Sarah M."
   - **Rating:** 5 (stars)
   - **Text:** "Amazing experience! Highly recommend."
   - **Photo:** Upload customer photo (with permission)
   - **Date:** "2024-01-15"
4. Save and publish

### 6. Adding Blog Post / News Article

**Steps:**

1. Click **+ Create New** → **Story**
2. Name: "Spring Wellness Tips"
3. Slug: `spring-wellness-tips`
4. Add blocks:
   - **Rich Text** → Article content
   - **Image** → Featured image
   - **Button** → "Book Now" CTA
5. Fill in **SEO** block:
   - **Title:** "Spring Wellness Tips | Wellvitas"
   - **Description:** "Discover holistic health tips for spring"
   - **Keywords:** wellness, spring, health tips
6. Save and publish

**Result:** New page at `wellvitas.com/spring-wellness-tips`

### 7. Managing Images in Asset Library

**Uploading:**
1. Go to **Assets** tab
2. Click **Upload** button
3. Select images (multiple allowed)
4. Wait for upload to complete
5. Images now available in all blocks

**Organizing:**
1. Click **+ New Folder**
2. Name folder: "Therapies"
3. Drag images into folder
4. Use folders to organize by category

**Best Practices:**
- Name files descriptively: `deep-tissue-massage.jpg`
- Use lowercase with hyphens
- Optimize images before upload
- Delete unused images periodically

---

## Troubleshooting

### Issue: Changes Not Appearing on Live Site

**Possible Causes:**

1. **Content not published**
   - **Solution:** Click **Publish** button
   - Check for "Published" badge

2. **Browser cache**
   - **Solution:** Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
   - Clear browser cache

3. **CDN cache delay**
   - **Solution:** Wait 30-60 seconds
   - Check again

4. **Preview mode active**
   - **Solution:** Exit Visual Editor
   - Open site in incognito/private window

### Issue: Visual Editor Not Loading

**Solution:**

1. Check internet connection
2. Disable browser extensions (ad blockers)
3. Try different browser (Chrome recommended)
4. Clear cookies and cache
5. Contact support if issue persists

### Issue: Image Upload Failed

**Possible Causes:**

1. **File too large**
   - **Solution:** Compress image (max 5MB)
   - Use TinyPNG or similar tool

2. **Unsupported format**
   - **Solution:** Use JPEG, PNG, WebP, or SVG
   - Convert other formats

3. **Network timeout**
   - **Solution:** Check internet speed
   - Try uploading one image at a time

### Issue: Booking Widget Not Displaying

**Checklist:**

- [ ] SuperSaaS Account Name correct?
- [ ] Schedule ID correct?
- [ ] Schedule published in SuperSaaS?
- [ ] Height field set (recommended: 600px)?
- [ ] Story published in Storyblok?

**Debug Steps:**

1. Log in to SuperSaaS
2. Verify schedule is active
3. Check schedule ID matches
4. Test in Visual Editor preview
5. Hard refresh browser

### Issue: Broken Links

**Solution:**

1. Find broken link in story
2. Click link field
3. Re-select correct story or URL
4. Save and publish

**Prevention:**
- Use internal story links instead of URLs when linking to other pages
- Test all links before publishing

### Issue: Can't Delete Block

**Solution:**

1. Click block to select
2. Press **Delete** key OR
3. Click **•••** (block menu) → **Delete**
4. Confirm deletion
5. Save

### Issue: Lost Unsaved Changes

**Unfortunately:**
- Storyblok does not have version history for drafts
- **Prevention:** Save frequently (Ctrl+S / Cmd+S)

**Recovery:**
- Check if auto-saved version exists
- Recreate lost content

---

## Advanced Features

### 1. Using Components (Reusable Blocks)

**Use Case:** Reuse same content block across multiple pages

**Example:** Global announcement banner

**Steps:**

1. Go to **Components** tab
2. Click **+ New Component**
3. Name: "Announcement Banner"
4. Add fields: heading, text, link
5. Save component
6. Use in any story: Add block → Select "Announcement Banner"
7. Edit component once → changes apply everywhere

### 2. Multi-Language Support

**Note:** Not currently configured, but can be enabled.

**To Enable:**
1. Go to **Settings** → **Languages**
2. Add languages: French, Spanish, etc.
3. Create translated versions of stories
4. Users see language based on browser settings

### 3. Webhooks for Auto-Deployment

**Already Configured:**

When you publish content, Storyblok sends webhook to trigger website rebuild/revalidation.

**Webhook URL:**  
`https://wellvitas.com/api/revalidate?secret=YOUR_SECRET`

**How it Works:**
1. You click **Publish** in Storyblok
2. Webhook fires
3. Website updates in ~30 seconds
4. No manual deployment needed

**Testing Webhook:**
1. Go to **Settings** → **Webhooks**
2. Click webhook entry
3. Scroll to **Recent Deliveries**
4. Check for 200 OK status

### 4. Content Roles & Permissions

**User Roles:**

| Role | Permissions |
|------|-------------|
| **Admin** | Full access (you) |
| **Editor** | Create, edit, publish stories |
| **Contributor** | Create, edit (cannot publish) |
| **Viewer** | Read-only access |

**Adding Team Members:**

1. Go to **Settings** → **Users**
2. Click **+ Invite User**
3. Enter email
4. Select role
5. Send invitation

---

## Best Practices

### Content Strategy

1. **Consistency:**
   - Use same block structure across similar pages
   - Maintain consistent tone and style

2. **SEO Optimization:**
   - Fill in SEO block for every page
   - Use descriptive titles and meta descriptions
   - Include target keywords naturally

3. **Image Optimization:**
   - Compress images before upload
   - Use descriptive alt text
   - Maintain aspect ratio

4. **Mobile-First:**
   - Preview on mobile after every change
   - Ensure text is readable on small screens
   - Test touch targets (buttons) on mobile

5. **Regular Backups:**
   - Storyblok has automatic backups
   - Export important content periodically

### Publishing Workflow

**Recommended Process:**

```
1. Draft Content
   ↓
2. Review in Visual Editor
   ↓
3. Test on Mobile
   ↓
4. Get Approval (if needed)
   ↓
5. Publish
   ↓
6. Verify Live Site
   ↓
7. Monitor Analytics
```

---

## Training Resources

### Official Documentation

- **Storyblok Docs:** https://www.storyblok.com/docs
- **Video Tutorials:** https://www.storyblok.com/video-tutorials
- **Help Center:** https://www.storyblok.com/help-center

### Internal Resources

- [CMS_ADMIN_GUIDE.md](../CMS_ADMIN_GUIDE.md) - Original admin guide
- [STORYBLOK_SCHEMA_REFERENCE.md](../STORYBLOK_SCHEMA_REFERENCE.md) - Block field definitions
- [CLIENT_SIDE.md](./CLIENT_SIDE.md) - Technical architecture (for developers)

### Support Contacts

**Storyblok Support:**  
Email: support@storyblok.com  
Chat: Available in dashboard (bottom right icon)

**Developer Support:**  
Contact your development team for:
- Custom block creation
- Technical issues
- Integration problems

---

## Quick Reference Card

### Common Shortcuts

| Action | Shortcut |
|--------|----------|
| Save | Ctrl+S / Cmd+S |
| Publish | Ctrl+Shift+P |
| Add Block | Alt+N |
| Delete Block | Delete key |
| Duplicate Block | Ctrl+D / Cmd+D |
| Undo | Ctrl+Z / Cmd+Z |
| Redo | Ctrl+Y / Cmd+Y |

### Block Usage Guide

| Need To... | Use This Block |
|------------|----------------|
| Add header menu | Navigation |
| Add footer | Footer |
| Add slideshow | Hero Carousel |
| Add booking form | SuperSaaS Booking |
| Add services grid | Therapies Section |
| Add customer reviews | Testimonials Section |
| Add button/CTA | Button |
| Add image | Image |
| Add text content | Rich Text |
| Add pricing packages | Packages Section |
| Improve SEO | SEO |

### Emergency Contacts

**If something breaks:**

1. **Don't panic** - content is backed up
2. **Check troubleshooting section** (above)
3. **Contact developer** if technical issue
4. **Contact Storyblok support** if platform issue

---

## Summary

### What You Can Do (No Coding):

- ✅ Create new pages
- ✅ Edit all content (text, images, links)
- ✅ Add/remove blocks
- ✅ Reorder content
- ✅ Manage bookings (SuperSaaS)
- ✅ Update navigation menu
- ✅ Change footer information
- ✅ Upload images/assets
- ✅ Publish/unpublish content
- ✅ Preview changes before publishing
- ✅ Optimize SEO

### What You Cannot Do (Requires Developer):

- ❌ Create new block types
- ❌ Change website design/layout
- ❌ Modify technical integrations
- ❌ Access server/hosting
- ❌ Install plugins/extensions

### Key Takeaways

1. **Stories = Pages:** Each story is a web page
2. **Blocks = Building Blocks:** Use blocks to construct pages
3. **Draft → Publish:** Always review before publishing
4. **Visual Editor:** See changes in real-time
5. **Save Often:** Prevent data loss

**Next Steps:**
1. Log in to Storyblok
2. Explore existing stories
3. Make a test edit (in draft)
4. Preview in Visual Editor
5. Publish when confident

**Questions?** Contact your development team or Storyblok support.

---

**Related Documentation:**
- [CLIENT_SIDE.md](./CLIENT_SIDE.md) - How client-side components work
- [SERVER_SIDE.md](./SERVER_SIDE.md) - How server-side rendering works
- [COMPONENTS_REFERENCE.md](./COMPONENTS_REFERENCE.md) - Technical component API documentation
