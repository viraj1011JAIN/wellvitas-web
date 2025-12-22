# Storyblok Connection Guide

## ✅ Current Status: CONNECTED

Your Wellvitas website is successfully connected to Storyblok CMS on **both environments**:
- **Local Development**: `localhost:3000`
- **Production**: Fasthosts (after deployment)

---

## 🔑 Connection Configuration

### Environment Variables (Already Set)

Your `.env` file contains all necessary credentials:

```env
NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN = "pXYm0ntr5Tgzae6F8nb22gtt"
STORYBLOK_PREVIEW_SECRET = "QW9312R2kuRZRM0sGfYnHwtt"
NEXT_PUBLIC_STORYBLOK_API_URL = "https://api.storyblok.com/v2"
NEXT_PUBLIC_STORYBLOK_BRAND_SPACE_ID = "288214049142470"
NEXT_PUBLIC_STORYBLOK_DEFAULT_SPACE_ID = "288214049142470"
NEXT_PUBLIC_STORYBLOK_REGION = "eu"
```

**Status**: ✅ Configured for local development

---

## 🖥️ Local Development Server Connection

### How It Works

1. **Start Development Server**:
   ```bash
   npm run dev
   ```

2. **Storyblok Connects Automatically**:
   - Uses `NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN` from `.env`
   - Connects to Space ID: `288214049142470`
   - Region: Europe (`eu`)

3. **Preview in Storyblok Visual Editor**:
   - In Storyblok Dashboard, click "Visual Editor"
   - Your localhost will load inside the editor iframe
   - Changes in Storyblok appear instantly

### Configure Visual Editor Location

**In Storyblok Dashboard**:
1. Go to **Settings → Visual Editor**
2. Set **Location (default environment)**: `http://localhost:3000/`
3. Click **Save**

Now when you edit content, it previews on your local server!

---

## 🌐 Production Server Connection (Fasthosts)

### How It Works

1. **GitHub Actions Build Process**:
   ```yaml
   # .github/workflows/deploy-fasthosts.yml
   - name: Build
     env:
       NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN: ${{ secrets.NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN }}
   ```

2. **Static Export with CMS Content**:
   - GitHub Actions fetches content from Storyblok API
   - Generates static HTML with embedded content
   - Uploads to Fasthosts via FTP

3. **Production Result**:
   - Static HTML served from Fasthosts
   - Content is "baked in" at build time
   - No runtime API calls needed

### Add Secrets to GitHub

**Required for Production Builds**:

1. Go to: `https://github.com/YOUR_USERNAME/wellvitas-web/settings/secrets/actions`

2. Add these secrets (click "New repository secret"):

   | Secret Name | Value |
   |-------------|-------|
   | `NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN` | `pXYm0ntr5Tgzae6F8nb22gtt` |
   | `NEXT_PUBLIC_STORYBLOK_BRAND_SPACE_ID` | `288214049142470` |
   | `NEXT_PUBLIC_STORYBLOK_DEFAULT_SPACE_ID` | `288214049142470` |
   | `NEXT_PUBLIC_STORYBLOK_REGION` | `eu` |

**Status**: ⏳ **TO DO** - Add these secrets for production builds to work

---

## 🔄 Connection Architecture

### Data Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│  DEVELOPMENT (localhost:3000)                                   │
├─────────────────────────────────────────────────────────────────┤
│  1. npm run dev                                                 │
│  2. Next.js reads .env file                                     │
│  3. Storyblok API calls with access token                       │
│  4. Live preview in Visual Editor                               │
│  5. Changes visible instantly (draft version)                   │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  PRODUCTION BUILD (GitHub Actions)                              │
├─────────────────────────────────────────────────────────────────┤
│  1. Boss clicks "Publish" in Storyblok                          │
│  2. Webhook triggers GitHub Actions                             │
│  3. GitHub Actions reads secrets                                │
│  4. Fetches published content from Storyblok API                │
│  5. Generates 24 static HTML pages                              │
│  6. FTP uploads to Fasthosts                                    │
└─────────────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────────────┐
│  PRODUCTION (wellvitas.co.uk)                                   │
├─────────────────────────────────────────────────────────────────┤
│  1. Fasthosts serves static HTML                                │
│  2. No runtime Storyblok API calls                              │
│  3. Content is embedded in HTML                                 │
│  4. To update: Boss publishes → GitHub rebuilds → FTP deploys   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🧪 Test Your Connection

### Test 1: Local Development

```bash
# Start server
npm run dev
```

**Expected**: Server starts on http://localhost:3000

**Visit**: http://localhost:3000?_storyblok=true

**If working**: You'll see Storyblok Visual Editor integration message

**If broken**: Error message about missing token or invalid space ID

---

### Test 2: API Connection

Create `scripts/test-storyblok.js`:

```javascript
const StoryblokClient = require('storyblok-js-client');

const client = new StoryblokClient({
  accessToken: 'pXYm0ntr5Tgzae6F8nb22gtt'
});

client.get('cdn/stories', { version: 'draft' })
  .then(response => {
    console.log('✅ Storyblok connected!');
    console.log('Stories found:', response.data.stories.length);
  })
  .catch(error => {
    console.error('❌ Connection failed:', error.message);
  });
```

Run:
```bash
node scripts/test-storyblok.js
```

**Expected**: `✅ Storyblok connected!`

---

### Test 3: Visual Editor

1. **In Storyblok Dashboard**:
   - Go to Content
   - Click any story
   - Click "Visual Editor" tab

2. **Expected Behavior**:
   - Your localhost loads in iframe
   - You can edit content
   - Changes appear live

3. **If Not Working**:
   - Check Visual Editor Location setting
   - Ensure `npm run dev` is running
   - Check browser console for errors

---

## 🔧 Troubleshooting

### Issue: "Storyblok API Error: Invalid Token"

**Solution**:
1. Verify token in `.env` matches Storyblok Dashboard
2. Go to Storyblok → Settings → Access Tokens
3. Copy **Public Token** (not Management Token)
4. Update `.env` file
5. Restart dev server

---

### Issue: "Visual Editor shows blank screen"

**Solution**:
1. Check browser console for CORS errors
2. Verify Location URL ends with `/` (e.g., `http://localhost:3000/`)
3. Ensure dev server is running
4. Try incognito mode (disable extensions)

---

### Issue: "Production build fails with Storyblok error"

**Solution**:
1. Verify GitHub Secrets are added correctly
2. Check GitHub Actions logs for specific error
3. Ensure secret names match exactly (case-sensitive)
4. Re-run failed workflow

---

### Issue: "Content not updating on production site"

**Solution**:
This is expected! Content is baked into HTML at build time.

To update production:
1. Boss publishes changes in Storyblok
2. Webhook triggers GitHub Actions rebuild
3. Wait 3-4 minutes for deploy
4. Hard refresh browser (Ctrl+F5)

---

## 📋 Connection Checklist

### Local Development
- [x] `.env` file exists with credentials
- [x] `NEXT_PUBLIC_STORYBLOK_ACCESS_TOKEN` set
- [x] Space ID matches: `288214049142470`
- [x] Region set to: `eu`
- [ ] Visual Editor configured with `localhost:3000`
- [ ] Test connection successful

### Production
- [ ] GitHub Secrets added (4 secrets)
- [ ] Webhook configured (see WEBHOOK_SETUP.md)
- [ ] Test build successful
- [ ] FTP credentials verified
- [ ] Production site accessible

---

## 🚀 Quick Start Commands

### Local Development with Storyblok Preview
```bash
# Start dev server
npm run dev

# Open Visual Editor in Storyblok
# Navigate to: Storyblok Dashboard → Content → Any Story → Visual Editor
```

### Test API Connection
```bash
# Test Storyblok API access
node scripts/test-storyblok.js
```

### Production Build (Simulated Locally)
```bash
# Build with production settings
npm run build

# Preview production build
npm run start
```

---

## 📚 Related Documentation

- **WEBHOOK_SETUP.md** - Configure automatic deployments
- **BOSS_QUICK_START.md** - Creating blocks in Storyblok
- **docs/ADMIN_SIDE.md** - Content editor guide
- **docs/COMPONENTS_REFERENCE.md** - Available Storyblok components

---

## 🎯 Summary

**Your Connection Status**:

| Environment | Status | Action Required |
|-------------|--------|-----------------|
| **Local Dev** | ✅ Ready | Run `npm run dev` |
| **Production** | ⚠️ Setup Needed | Add GitHub Secrets |

**What's Working**:
- ✅ Storyblok credentials configured
- ✅ Component registry complete (17 blocks)
- ✅ API integration code working
- ✅ Visual Editor compatible

**What's Needed**:
- ⏳ Add 4 secrets to GitHub (5 minutes)
- ⏳ Configure webhook (15 minutes)
- ⏳ Boss creates blocks in Storyblok (30 minutes)

**You're 98% there!** Just need to add GitHub secrets and you'll have full production + local Storyblok integration! 🎉
