# 🚀 Production Setup: Webhook Automation

## Goal
Enable **automatic deployments** when your boss publishes content in Storyblok.

**Without this:** Developer must manually `git push` to deploy changes  
**With this:** Boss clicks "Publish" → Site rebuilds automatically in 2-3 minutes

---

## Prerequisites

✅ GitHub repository with code  
✅ GitHub Actions workflow configured  
✅ Fasthosts FTP credentials in GitHub Secrets  
✅ Storyblok access (admin)

---

## Step 1: Create GitHub Personal Access Token (PAT)

### A. Generate Token

1. **Go to GitHub:** https://github.com/settings/tokens
2. **Click:** "Generate new token" → "Generate new token (classic)"
3. **Fill in:**
   - **Note:** Storyblok Webhook Token
   - **Expiration:** No expiration (or 1 year)
   - **Scopes:** Check these:
     - ✅ `repo` (Full control of private repositories)
     - ✅ `workflow` (Update GitHub Action workflows)
4. **Click:** "Generate token"
5. **Copy token immediately** - You won't see it again!
   - Format: `ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`

### B. Test Token (Optional)

```bash
curl -H "Authorization: token ghp_YOUR_TOKEN_HERE" \
  https://api.github.com/user
```

Should return your GitHub user info.

---

## Step 2: Configure Storyblok Webhook

### A. Access Webhook Settings

1. **Log in to Storyblok:** https://app.storyblok.com
2. **Select space:** Wellvitas
3. **Go to:** Settings (left sidebar) → Webhooks
4. **Click:** "Add a webhook" button

### B. Configure Webhook

| Field | Value |
|-------|-------|
| **Name** | `GitHub Auto Deploy` |
| **Webhook URL** | `https://api.github.com/repos/YOUR_USERNAME/YOUR_REPO/dispatches` |
| | ⚠️ Replace `YOUR_USERNAME` and `YOUR_REPO` with actual values |
| | Example: `https://api.github.com/repos/wellvitas/wellvitas-web/dispatches` |

### C. Set Headers

Click "Headers" section and add TWO headers:

**Header 1:**
- **Key:** `Authorization`
- **Value:** `token ghp_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx`
  - ⚠️ Use the token from Step 1
  - ⚠️ Must include the word `token` before the actual token

**Header 2:**
- **Key:** `Accept`
- **Value:** `application/vnd.github.v3+json`

### D. Set Custom Payload

Click "Custom Payload" section and enter:

```json
{
  "event_type": "publish_event"
}
```

⚠️ This exact value must match the GitHub Actions workflow trigger.

### E. Select Events

Check these events to trigger the webhook:

- ✅ **Story published**
- ✅ **Story unpublished**
- ⬜ Story created (optional)
- ⬜ Story deleted (optional)

### F. Save Webhook

1. **Click:** "Save" button
2. **Verify:** Webhook appears in the list with green status

---

## Step 3: Test the Webhook

### A. Manual Test from Storyblok

1. **Go to webhooks list** in Storyblok
2. **Find your webhook:** "GitHub Auto Deploy"
3. **Click:** "Test" button (lightning bolt icon)
4. **Check response:**
   - ✅ Status: `204 No Content` = Success!
   - ❌ Status: `401 Unauthorized` = Check your token
   - ❌ Status: `404 Not Found` = Check repository URL

### B. Real-World Test

1. **Edit a story** in Storyblok (e.g., change homepage title)
2. **Click:** "Publish"
3. **Go to GitHub:** Your repository → Actions tab
4. **Verify:** New workflow run appears
   - Name: "Deploy to Fasthosts"
   - Triggered by: `repository_dispatch`
   - Status: Running → Success (green checkmark)
5. **Wait:** 2-3 minutes
6. **Check live site:** Changes should appear

---

## Step 4: Verify GitHub Actions

### Check Workflow File

Ensure `.github/workflows/deploy-fasthosts.yml` contains:

```yaml
on:
  repository_dispatch:
    types: [publish_event, storyblok-publish]
```

✅ This is already configured in your project.

### Check Secrets

**Go to:** GitHub repo → Settings → Secrets and variables → Actions

**Verify these secrets exist:**
- `STORYBLOK_ACCESS_TOKEN`
- `STORYBLOK_SPACE_ID`
- `FTP_SERVER`
- `FTP_USERNAME`
- `FTP_PASSWORD`

---

## Troubleshooting

### Webhook Test Fails: 401 Unauthorized

**Cause:** Invalid or missing GitHub token

**Fix:**
1. Regenerate GitHub PAT (Step 1)
2. Update webhook header: `Authorization: token NEW_TOKEN_HERE`
3. Test again

### Webhook Test Fails: 404 Not Found

**Cause:** Wrong repository URL

**Fix:**
1. Check repository name and owner
2. URL format: `https://api.github.com/repos/OWNER/REPO/dispatches`
3. Ensure no typos

### Webhook Succeeds but No Deployment

**Cause:** `event_type` mismatch

**Fix:**
1. Check custom payload: `{"event_type": "publish_event"}`
2. Check workflow: `types: [publish_event]`
3. Both must match exactly

### Deployment Fails in GitHub Actions

**Check logs:**
1. Go to GitHub → Actions tab
2. Click failed workflow run
3. Expand steps to see error messages

**Common issues:**
- Missing secrets
- FTP credentials wrong
- Build errors (check npm run build locally)

---

## Expected Behavior

### What Boss Sees

1. **Edits content** in Storyblok Visual Editor
2. **Clicks "Save"** → Draft saved (not live)
3. **Clicks "Publish"** → Content published to Storyblok
4. **Waits 2-3 minutes** → Site automatically updates
5. **Refreshes website** → Sees new content live!

### What Happens Behind the Scenes

```
1. Boss clicks "Publish"
   ↓
2. Storyblok sends webhook to GitHub
   ↓
3. GitHub Actions triggered
   ↓
4. Actions run: npm ci → npm run build
   ↓
5. Static files generated in ./out/
   ↓
6. FTP Deploy uploads to Fasthosts
   ↓
7. Live site updated!
```

---

## Monitoring

### View Webhook Activity

**In Storyblok:**
1. Settings → Webhooks
2. Click webhook name
3. Scroll to "Recent Deliveries"
4. See all recent triggers with status codes

### View Deployment History

**In GitHub:**
1. Repository → Actions tab
2. See all workflow runs
3. Filter by: "Deploy to Fasthosts"
4. Check success/failure status

---

## Security Best Practices

### GitHub PAT Security

✅ **Do:**
- Store token securely (password manager)
- Use token only for Storyblok webhook
- Regenerate if leaked
- Set expiration (1 year recommended)

❌ **Don't:**
- Share token with anyone
- Commit token to code
- Use personal account token for company projects (use organization token)

### Storyblok Security

✅ **Do:**
- Use strong passwords
- Enable 2FA (two-factor authentication)
- Limit user permissions (give boss only Editor role)

❌ **Don't:**
- Share Storyblok credentials
- Allow public access to space

---

## Cost & Limits

### GitHub Actions

**Free tier:**
- 2,000 minutes/month (private repos)
- Unlimited minutes (public repos)

**Your usage:**
- ~3 minutes per deployment
- ~20 deployments/month = 60 minutes
- Well within free tier! ✅

### SuperSaaS

**Free tier:**
- 50 appointments/month
- 1 schedule

**Your usage:**
- Appointment bookings don't count toward GitHub limits
- Handled entirely by SuperSaaS servers

### Fasthosts

**Static hosting:**
- No per-request charges
- Unlimited page views (within hosting plan)
- No serverless function costs

---

## Quick Reference

### Webhook Configuration Summary

```yaml
URL: https://api.github.com/repos/YOUR_USER/YOUR_REPO/dispatches

Headers:
  Authorization: token ghp_YOUR_GITHUB_PAT
  Accept: application/vnd.github.v3+json

Payload:
  {"event_type": "publish_event"}

Events:
  - Story published
  - Story unpublished
```

### Testing Checklist

- [ ] GitHub PAT created and copied
- [ ] Webhook configured in Storyblok
- [ ] Headers set correctly
- [ ] Custom payload added
- [ ] Events selected
- [ ] Webhook test successful (204 status)
- [ ] Real-world test: Edit → Publish → Wait → Verify
- [ ] GitHub Actions workflow runs successfully
- [ ] Changes appear on live site

---

## Next Steps

After webhook is configured:

1. **Train your boss** on the publish workflow
2. **Share:** [BOSS_QUICK_START.md](./BOSS_QUICK_START.md)
3. **Monitor:** First few deployments to ensure stability
4. **Celebrate:** No more manual deployments! 🎉

---

## Support

**Webhook issues:**
- Storyblok Support: support@storyblok.com
- Storyblok Docs: https://www.storyblok.com/docs/guide/in-depth/webhooks

**GitHub Actions issues:**
- GitHub Docs: https://docs.github.com/en/actions
- Check workflow logs in Actions tab

**Deployment issues:**
- Review: [DEPLOYMENT_READY.md](./DEPLOYMENT_READY.md)
- Contact developer

---

**Last Updated:** December 20, 2025  
**Status:** Production-ready architecture  
**Automation:** ✅ Enabled with webhook
