# GitHub Actions Deployment Setup

## Overview
This workflow automatically deploys your Wellvitas website to Fasthosts whenever:
- Code is pushed to the `main` branch
- A story is published in Storyblok (via webhook)
- Manually triggered from GitHub Actions tab

## Setup Instructions

### 1. Configure GitHub Secrets
Add these secrets in your GitHub repository settings (Settings → Secrets and variables → Actions):

- `STORYBLOK_ACCESS_TOKEN`: `pXYm0ntr5Tgzae6F8nb22gtt`
- `STORYBLOK_SPACE_ID`: `288214049142470`
- `FTP_SERVER`: Your Fasthosts FTP server (e.g., `ftp.yourdomain.com`)
- `FTP_USERNAME`: Your Fasthosts FTP username
- `FTP_PASSWORD`: Your Fasthosts FTP password

### 2. Configure Storyblok Webhook
To enable **one-click publishing** from Storyblok:

1. Go to Storyblok Dashboard → Settings → Webhooks
2. Click "Add a webhook"
3. Configure:
   - **Name**: GitHub Deploy
   - **Story Published**: ✅ Enabled
   - **URL**: `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches`
   - **Trigger**: Story published
   - **Content type**: application/json
   - **Secret**: (Leave empty or use GitHub token)
   - **Custom Headers**:
     - `Authorization`: `token YOUR_GITHUB_PERSONAL_ACCESS_TOKEN`
     - `Accept`: `application/vnd.github+json`
   - **Body**:
     ```json
     {
       "event_type": "storyblok-publish"
     }
     ```

4. Click "Save"

### 3. Get GitHub Personal Access Token
1. Go to GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token with `repo` scope
3. Copy token and add it to Storyblok webhook Authorization header

### 4. Update next.config.mjs for Static Export
Ensure your `next.config.mjs` includes:

```javascript
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
  },
  trailingSlash: true,
};
```

### 5. Add Export Script to package.json
```json
{
  "scripts": {
    "export": "next build && next export"
  }
}
```

## Fasthosts Specific Notes
- The workflow uploads to `/public_html/` by default
- Adjust `server-dir` in the workflow if your Fasthosts hosting uses a different path
- Ensure your FTP credentials have write permissions

## Testing
1. Push code to main branch → Automatic deployment
2. Publish a story in Storyblok → Automatic deployment (via webhook)
3. Go to Actions tab → Run workflow manually

## Troubleshooting
- **Build fails**: Check environment variables in GitHub Secrets
- **FTP fails**: Verify FTP credentials and server path
- **Webhook not triggering**: Check Authorization token and repository dispatch URL
