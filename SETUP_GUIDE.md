# Production Authentication System - Setup Guide

## Quick Start Guide

### 1. Prerequisites
- Node.js 18+ installed
- Supabase account created
- Environment variables configured

### 2. Installation

The authentication system is already integrated. Just ensure dependencies are installed:

```bash
npm install
# or
yarn install
```

### 3. Environment Setup

Create a `.env.local` file in the root directory:

```env
# Supabase Configuration (get these from Supabase dashboard)
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key_here

# Optional: For enhanced features
NEXT_PUBLIC_APP_URL=http://localhost:3000
NODE_ENV=development
```

### 4. Supabase Configuration

1. **Create Supabase Project**
   - Go to [supabase.com](https://supabase.com)
   - Create new project
   - Copy URL and anon key

2. **Enable Email Authentication**
   - Go to Authentication > Providers
   - Ensure Email is enabled
   - Configure SMTP settings for emails

3. **Configure Email Templates** (Optional but recommended)
   - Go to Authentication > Email Templates
   - Customize confirmation and recovery emails
   - Add your company branding

4. **Set Redirect URLs**
   - Authentication > URL Configuration
   - Add your domain (http://localhost:3000 for dev)
   - Add production domain when ready

### 5. Start Development Server

```bash
npm run dev
```

Visit `http://localhost:3000/login`

## System Architecture

### Authentication Flow

```
User → Login Page → AuthService → Supabase
                  ↓
             Validation
                  ↓
             Session Created
                  ↓
          Redirect to Dashboard
```

### Component Hierarchy

```
AuthProvider (Root Context)
├── Login Page
├── Signup Page
├── Forgot Password Page
├── Reset Password Page
├── Verify Email Page
├── Dashboard (Protected)
└── Profile Page (Protected)
```

## File Locations & Purposes

| File | Purpose |
|------|---------|
| `src/lib/auth/authService.js` | Core authentication logic |
| `src/lib/auth/validation.js` | Form validation |
| `src/lib/auth/constants.js` | Configuration constants |
| `src/providers/AuthProvider.jsx` | React context provider |
| `src/components/auth/FormComponents.jsx` | Reusable UI components |
| `src/middleware.js` | Route protection |
| `src/app/*/page.js` | Page components |

## Key Features Explained

### 1. Rate Limiting
- **Login**: 5 attempts per 15 minutes
- **Signup**: 3 attempts per 1 hour
- Automatically locks user out temporarily

### 2. Password Requirements
- Minimum 8 characters
- At least 1 uppercase letter (A-Z)
- At least 1 lowercase letter (a-z)
- At least 1 number (0-9)
- At least 1 special character (!@#$%^&*)

### 3. Session Management
- Automatic session refresh
- 24-hour expiration
- Secure HTTP-only cookies

### 4. Email Verification
- Confirmation email sent after signup
- 24-hour validity
- Resend option available

### 5. Password Reset
- Secure token-based reset
- 24-hour link validity
- Email delivery required

## Testing the System

### Test Scenarios

**1. Signup Flow**
```
Visit: http://localhost:3000/signup
- Enter: test@example.com
- Enter: TestPassword123!
- Confirm password
- Check email for verification
```

**2. Login Flow**
```
Visit: http://localhost:3000/login
- Email: test@example.com
- Password: TestPassword123!
- Should redirect to /dashboard
```

**3. Password Reset**
```
Visit: http://localhost:3000/forgot-password
- Enter email
- Check email for reset link
- Follow link to reset password
- Login with new password
```

**4. Protected Routes**
```
Try accessing /dashboard without login
- Should redirect to /login
```

### Test Accounts

Create test accounts directly in Supabase:
1. Go to Supabase Dashboard
2. Authentication > Users
3. Click "Create New User"
4. Email: test@wellvitas.com
5. Password: TestPassword123!

## Security Checklist

### Before Production Deployment

- [ ] Environment variables configured
- [ ] HTTPS enabled on domain
- [ ] CORS properly configured
- [ ] Email templates customized
- [ ] Rate limiting configured
- [ ] Error logging enabled
- [ ] Monitoring/alerting setup
- [ ] Backup procedures configured
- [ ] SSL certificate valid
- [ ] Security headers verified
- [ ] Password reset emails tested
- [ ] Signup flow tested end-to-end
- [ ] Protected routes tested
- [ ] 2FA considered (optional)

### During Production

- [ ] Monitor Supabase logs
- [ ] Monitor email delivery
- [ ] Monitor failed login attempts
- [ ] Regular security audits
- [ ] Keep dependencies updated
- [ ] Test disaster recovery

## Customization

### Change Password Requirements

Edit `src/lib/auth/constants.js`:

```javascript
export const PASSWORD_REQUIREMENTS = {
  MIN_LENGTH: 8,  // Change minimum length
  REQUIRES_UPPERCASE: true,
  REQUIRES_LOWERCASE: true,
  REQUIRES_NUMBERS: true,
  REQUIRES_SPECIAL_CHARS: true,
}
```

### Change Rate Limits

Edit `src/lib/auth/constants.js`:

```javascript
RATE_LIMIT: {
  LOGIN_ATTEMPTS: 5,           // Max login attempts
  LOGIN_WINDOW: 15 * 60 * 1000, // 15 minutes
  // ... more options
}
```

### Change Session Timeout

Edit `src/lib/auth/constants.js`:

```javascript
export const AUTH_CONFIG = {
  SESSION_TIMEOUT: 24 * 60 * 60 * 1000, // 24 hours
  REFRESH_TOKEN_INTERVAL: 60 * 60 * 1000, // 1 hour
}
```

### Customize UI Theme

All components use Tailwind CSS. Edit colors in:
- `src/components/auth/FormComponents.jsx`
- Individual page files

Example: Change primary color from blue to green:
```jsx
// Change: bg-blue-600 → bg-green-600
// Change: text-blue-600 → text-green-600
```

## Troubleshooting

### Issue: "Invalid API Key"
**Solution:** 
- Verify `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` in `.env.local`
- Check values in Supabase Settings > API

### Issue: Emails not received
**Solution:**
- Check SMTP configuration in Supabase
- Verify email templates are set
- Check spam/junk folder
- Resend the email from the page

### Issue: "Too many login attempts"
**Solution:**
- Wait 15 minutes for rate limit to reset
- Or clear browser data and try from incognito window
- User can request password reset

### Issue: Session expires immediately
**Solution:**
- Check browser cookie settings
- Verify middleware.js is correctly configured
- Clear browser cache and try again

### Issue: Protected route redirects to login
**Possible Causes:**
- User not authenticated
- Session expired
- AuthProvider not wrapping the component
- User role doesn't match requirement

## Database Schema (Supabase)

The system uses Supabase's built-in `auth.users` table:

```sql
-- User fields available:
id - UUID
email - string
encrypted_password - string (hashed)
email_confirmed_at - timestamp
password_last_changed - timestamp
created_at - timestamp
last_sign_in_at - timestamp
user_metadata - JSONB (custom data)
```

## API Endpoints

### OAuth Callback
```
GET /auth/callback?code=xxx&state=xxx
```

Handles OAuth provider callbacks (if enabled).

## Production Deployment

### Heroku
1. Connect GitHub repository
2. Add environment variables in Config Vars
3. Deploy main branch

### Vercel
1. Connect GitHub repository
2. Add environment variables
3. Deploy

### Docker
See [Docker documentation](https://nextjs.org/docs/deployment/docker)

## Support & Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [React Documentation](https://react.dev)

## Additional Features to Consider

### 2FA (Two-Factor Authentication)
- Implement TOTP with Supabase
- Add QR code generation

### Social Login
- Google OAuth
- GitHub OAuth
- Email link authentication

### Admin Dashboard
- User management
- Permission system
- Audit logs

### Advanced Security
- IP whitelisting
- Device recognition
- Suspicious activity alerts

## Maintenance

### Regular Tasks
- Monitor error logs weekly
- Check email delivery rates
- Review failed authentication attempts
- Update dependencies monthly
- Security patches immediately

### Monthly Checks
- Test all authentication flows
- Verify backups working
- Review security settings
- Check rate limiting effectiveness

## Support Contact

For questions or issues:
- Email: support@wellvitas.com
- GitHub Issues: [Project Repository]
- Supabase Support: support@supabase.io

---

**Version:** 1.0.0  
**Last Updated:** December 2024  
**Status:** Production Ready
