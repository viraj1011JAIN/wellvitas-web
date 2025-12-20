# Storyblok + Next.js 15 Integration Complete

## ✅ What's Been Implemented

Your Wellvitas website now has full Storyblok CMS integration using React Server Components (Next.js 15).

### Architecture Overview
```
Next.js 15 (RSC) → Storyblok API → Visual Editor → GitHub Actions → Fasthosts
```

## 🏗️ Technical Implementation

### 1. React Server Components (RSC) Setup
Following the [official Storyblok Next.js guide](https://www.storyblok.com/docs/guides/nextjs):

- ✅ **storyblok.js**: Initialized with `@storyblok/react/rsc` and `getStoryblokApi()`
- ✅ **PageBlok**: Container component using `StoryblokServerComponent`
- ✅ **StoryblokProvider**: Client-side bridge with all components registered
- ✅ **10 Component Wrappers**: All using `storyblokEditable` from `/rsc`

### 2. Components Mapped to Storyblok Blocks

| Storyblok Block Name | React Component | Purpose |
|----------------------|-----------------|---------|
| `page` | PageBlok | Container for nested blocks |
| `hero_carousel` | HeroCarouselBlok | Homepage hero slider |
| `home_therapies` | HomeTherapiesBlok | Therapy cards section |
| `intro_band` | IntroBandBlok | Purple banner with CTAs |
| `packages_section` | PackagesSectionBlok | Treatment packages |
| `news_slider` | NewsSliderBlok | Image/video slideshow |
| `how_to_book` | HowToBookBlok | Booking section |
| `visit_us` | VisitUsBlok | Location + hours |
| `therapies_section` | TherapiesSectionBlok | Therapy listings |
| `testimonials_section` | TestimonialsBlok | Customer reviews |

### 3. Preview & Visual Editor Setup

- ✅ **Draft Mode**: `/api/draft` and `/api/disable-draft` routes
- ✅ **Middleware**: Handles `_storyblok` query param, sets X-Frame-Options
- ✅ **Bridge Script**: Added to layout.js for Visual Editor connection
- ✅ **Dynamic Routes**: `[...slug]/page.js` for all Storyblok pages

### 4. One-Click Publishing (GitHub Actions)

- ✅ **Workflow**: `.github/workflows/deploy-fasthosts.yml`
- ✅ **Triggers**: Push to main, Storyblok webhook, manual
- ✅ **Build**: Static export with `output: 'export'`
- ✅ **Deploy**: FTP upload to Fasthosts `/public_html/`

## 🚀 Getting Started

### Local Development

1. **Start Next.js**:
   ```bash
   npm run dev
   ```
   Runs on http://localhost:3000

2. **Start HTTPS Proxy** (for Storyblok Visual Editor):
   ```bash
   npm run proxy
   ```
   Runs on https://localhost:3010

3. **Access Visual Editor**:
   - Option A: Open `editor.html` in your browser (bypasses CORS)
   - Option B: Use ngrok tunnel: `ngrok http 3010`

### Storyblok Configuration

#### Create Your Blocks in Storyblok

Go to **Block Library** and create these blocks with matching technical names:

1. **page** (nestable)
   - Field: `body` (type: blocks)
   
2. **hero_carousel** (not nestable)
   - Your existing hero fields

3. **intro_band** (not nestable)
   - Field: `heading` (text)
   - Field: `subtext` (textarea)
   - Field: `ctas` (blocks)

4. **packages_section** (not nestable)
   - Your package fields

5. **news_slider** (not nestable)
   - Field: `slides` (blocks)

6. **how_to_book** (not nestable)
   - Your booking fields

7. **visit_us** (not nestable)
   - Field: `hours` (text)
   - Field: `address` (text)

8. **therapies_section** (not nestable)
   - Field: `heading` (text)
   - Field: `therapies` (blocks)

9. **testimonials_section** (not nestable)
   - Your testimonial fields

10. **home_therapies** (not nestable)
    - Your therapy fields

#### Create Your "Home" Story

1. Go to **Content** → **Stories**
2. Create a new story with slug `home`
3. Set content type to `page`
4. Add blocks to the `body` field
5. Click **Save** then **Publish**

## 🎯 One-Click Publishing Setup

### Step 1: Configure GitHub Secrets

Go to your GitHub repo → Settings → Secrets and variables → Actions

Add these secrets:
```
STORYBLOK_ACCESS_TOKEN=pXYm0ntr5Tgzae6F8nb22gtt
STORYBLOK_SPACE_ID=288214049142470
FTP_SERVER=ftp.yourfasthost.com
FTP_USERNAME=your_ftp_username
FTP_PASSWORD=your_ftp_password
```

### Step 2: Create GitHub Personal Access Token

1. GitHub → Settings → Developer settings → Personal access tokens
2. Generate new token (classic) with `repo` scope
3. Copy the token (you'll need it for Storyblok webhook)

### Step 3: Configure Storyblok Webhook

1. Storyblok → Settings → Webhooks → **Add a webhook**
2. Configure:
   - **Name**: GitHub Deploy
   - **Story published**: ✅
   - **URL**: `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches`
   - **Headers**:
     - `Authorization`: `token YOUR_GITHUB_PAT`
     - `Accept`: `application/vnd.github+json`
   - **Body**:
     ```json
     {
       "event_type": "storyblok-publish"
     }
     ```

3. Click **Save**

### Step 4: Test the Workflow

1. **Test Git Push**: Push code → Check Actions tab
2. **Test Storyblok**: Publish a story → Check Actions tab (should trigger automatically)
3. **Manual Test**: Actions tab → Run workflow

## 📝 Visual Editor Usage

### For Developers
1. Start both dev server (`npm run dev`) and proxy (`npm run proxy`)
2. Open `editor.html` in browser
3. Click any component in preview to edit in Storyblok
4. Changes appear instantly (draft mode)

### For Content Editors
1. Log into Storyblok
2. Navigate to your story (e.g., "Home")
3. Visual Editor loads your site in an iframe
4. Click components to edit
5. Click **Publish** → Triggers GitHub Action → Deploys to Fasthosts

## 🔧 Troubleshooting

### Visual Editor Not Loading
- **Problem**: "Refused to connect" error
- **Solution**: Use `editor.html` or ngrok tunnel
- **Why**: Browser blocks public sites from accessing localhost

### Components Not Editable
- **Problem**: Can't click to edit components
- **Solution**: Check Block technical names match component registry in `storyblok.js`
- **Verify**: Component has `{...storyblokEditable(blok)}`

### Build Fails on GitHub
- **Problem**: Environment variables missing
- **Solution**: Add all secrets in GitHub repo settings
- **Check**: Workflow logs in Actions tab

### FTP Deploy Fails
- **Problem**: Authentication or path errors
- **Solution**: Verify FTP credentials and `server-dir` in workflow
- **Tip**: Some Fasthosts accounts use `/htdocs/` instead of `/public_html/`

### Webhook Not Triggering
- **Problem**: Publishing in Storyblok doesn't trigger deploy
- **Solution**: Check Authorization header has `token ` prefix
- **Verify**: Webhook test in Storyblok shows 200/204 response

## 📚 Key Files Reference

| File | Purpose |
|------|---------|
| `.env` | Storyblok credentials |
| `src/lib/storyblok.js` | SDK initialization + component registry |
| `src/app/page.js` | Homepage with StoryblokStory |
| `src/app/[...slug]/page.js` | Dynamic routes for all pages |
| `src/components/StoryblokProvider.jsx` | Client-side bridge |
| `src/components/storyblock/*.jsx` | Component wrappers |
| `src/middleware.js` | Preview mode handler |
| `.github/workflows/deploy-fasthosts.yml` | CI/CD pipeline |
| `editor.html` | Local Visual Editor |
| `next.config.mjs` | Static export config |

## 🎓 Learn More

- [Storyblok Next.js Guide](https://www.storyblok.com/docs/guides/nextjs)
- [Storyblok React SDK](https://github.com/storyblok/storyblok-react)
- [Next.js 15 Documentation](https://nextjs.org/docs)
- [GitHub Actions FTP Deploy](https://github.com/SamKirkland/FTP-Deploy-Action)

## ✨ What's Next?

1. **Create blocks in Storyblok** matching the component names above
2. **Add the webhook** for one-click publishing
3. **Test the Visual Editor** using `editor.html`
4. **Push to GitHub** to trigger first deployment
5. **Train your client** on Storyblok interface

Your CMS is fully functional and ready for content management! 🎉
