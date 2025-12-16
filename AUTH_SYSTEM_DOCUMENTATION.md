# Production-Level Authentication System Documentation

## Overview

This is a complete, production-ready authentication system for the Wellvitas Next.js application using Supabase for backend authentication.

## Features

### Security Features
- ✅ Password validation with strength requirements
- ✅ Email validation and confirmation
- ✅ Rate limiting (login attempts protection)
- ✅ CSRF protection via middleware
- ✅ Secure password reset flow
- ✅ Session management
- ✅ Input sanitization
- ✅ Security headers in middleware
- ✅ HTTP-only cookies
- ✅ Protected routes

### User Experience Features
- ✅ Beautiful, modern UI with Tailwind CSS
- ✅ Real-time password strength indicator
- ✅ "Remember me" functionality
- ✅ Email verification flow
- ✅ Password reset via email
- ✅ Error handling and user feedback
- ✅ Loading states
- ✅ Responsive design

### Authentication Pages
1. **Login** (`/login`)
   - Email and password authentication
   - Remember me option
   - Rate limiting (5 attempts per 15 minutes)
   - Forgot password link

2. **Signup** (`/signup`)
   - Full name, email, password fields
   - Password strength validation
   - Terms of service agreement
   - Email verification required

3. **Forgot Password** (`/forgot-password`)
   - Email input
   - Sends password reset link
   - 24-hour expiration

4. **Reset Password** (`/auth/reset-password`)
   - Secured with token verification
   - New password validation
   - Password confirmation

5. **Verify Email** (`/verify-email`)
   - Guides user through email verification
   - Resend email option
   - Auto-redirect on verification

6. **Dashboard** (`/dashboard`)
   - Protected route (requires authentication)
   - User information display
   - Quick action links

## File Structure

```
src/
├── lib/auth/
│   ├── authService.js          # Main authentication service
│   ├── validation.js           # Form validation utilities
│   ├── constants.js            # Auth configuration constants
│   └── rateLimit.js            # Rate limiting utility
├── providers/
│   └── AuthProvider.jsx        # Authentication context provider
├── components/auth/
│   ├── FormComponents.jsx      # Reusable form components
│   └── ProtectedRoute.jsx      # Route protection wrapper
├── app/
│   ├── login/page.js           # Login page
│   ├── signup/page.js          # Signup page
│   ├── forgot-password/page.js # Password reset request
│   ├── verify-email/page.js    # Email verification
│   ├── dashboard/page.js       # Protected dashboard
│   └── auth/
│       ├── callback/route.js   # OAuth callback
│       └── reset-password/page.js # Password reset
└── middleware.js               # Route protection middleware
```

## Key Components

### AuthService (`src/lib/auth/authService.js`)
Handles all authentication operations with Supabase:
- `signUp()` - User registration
- `signIn()` - User login
- `signOut()` - User logout
- `resetPasswordForEmail()` - Send reset email
- `updatePassword()` - Update password
- `getCurrentUser()` - Get current user
- `refreshSession()` - Refresh session

### useAuth Hook
Context hook for accessing authentication state and methods:
```javascript
const { user, loading, error, login, signup, logout, resetPassword, isAuthenticated } = useAuth()
```

### Validation Utilities
Comprehensive validation for:
- Email format
- Password strength (8+ chars, uppercase, lowercase, number, special char)
- Name format
- Form validation

## Usage Examples

### Login
```javascript
const { login } = useAuth()
const result = await login('user@example.com', 'Password123!')
```

### Signup
```javascript
const { signup } = useAuth()
const result = await signup('user@example.com', 'Password123!', 'John Doe')
```

### Protected Routes
Wrap components with `ProtectedRoute`:
```javascript
<ProtectedRoute>
  <YourComponent />
</ProtectedRoute>
```

### Using AuthProvider
In your root layout:
```javascript
import { AuthProvider } from '@/providers/AuthProvider'

export default function Layout({ children }) {
  return (
    <AuthProvider>
      {children}
    </AuthProvider>
  )
}
```

## Configuration

### Environment Variables Required
```
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
```

### Rate Limiting Config
Located in `src/lib/auth/constants.js`:
```javascript
RATE_LIMIT: {
  LOGIN_ATTEMPTS: 5,
  LOGIN_WINDOW: 15 * 60 * 1000, // 15 minutes
  SIGNUP_ATTEMPTS: 3,
  SIGNUP_WINDOW: 60 * 60 * 1000, // 1 hour
}
```

### Password Requirements
Located in `src/lib/auth/constants.js`:
- Minimum 8 characters
- At least one uppercase letter
- At least one lowercase letter
- At least one number
- At least one special character

## Security Best Practices Implemented

1. **Password Security**
   - Hashed with bcrypt by Supabase
   - Strong password requirements
   - Secure password reset flow

2. **Session Management**
   - Secure HTTP-only cookies
   - Automatic session refresh
   - 24-hour expiration

3. **CSRF Protection**
   - CSRF tokens from Supabase
   - SameSite cookie policy

4. **Rate Limiting**
   - 5 login attempts per 15 minutes
   - 3 signup attempts per hour
   - Prevents brute force attacks

5. **Input Validation**
   - Email format validation
   - Password strength validation
   - Name format validation
   - Input sanitization (XSS prevention)

6. **Security Headers**
   - X-Content-Type-Options: nosniff
   - X-Frame-Options: DENY
   - X-XSS-Protection: 1; mode=block
   - Referrer-Policy: strict-origin-when-cross-origin
   - Permissions-Policy: Restricts APIs

7. **Protected Routes**
   - Middleware checks authentication
   - Automatic redirects for unauthorized users
   - Protected dashboard pages

## Email Configuration

The system uses Supabase's built-in email service for:
- Signup confirmation emails
- Password reset emails
- Email verification links

Configure in Supabase dashboard:
1. Go to Authentication > Email Templates
2. Customize confirmation and recovery email templates

## Testing

### Test Account
Create test accounts in Supabase dashboard or use:
```
Email: test@example.com
Password: TestPassword123!
```

### Test Flows
1. **Signup Flow**: Register new account → Verify email
2. **Login Flow**: Login with valid credentials
3. **Password Reset**: Request reset → Check email → Reset password
4. **Protected Routes**: Try accessing `/dashboard` without login

## Production Deployment Checklist

- [ ] Set `NEXT_PUBLIC_SUPABASE_URL` environment variable
- [ ] Set `NEXT_PUBLIC_SUPABASE_ANON_KEY` environment variable
- [ ] Configure Supabase email templates
- [ ] Set up custom domain (optional)
- [ ] Enable HTTPS
- [ ] Configure CORS settings
- [ ] Set up error logging/monitoring
- [ ] Test all authentication flows
- [ ] Set up backup/recovery procedures
- [ ] Configure rate limiting in production (Redis recommended)
- [ ] Enable email verification requirement
- [ ] Test password reset emails
- [ ] Configure redirect URLs in Supabase

## Troubleshooting

### Users can't receive emails
- Check Supabase email configuration
- Verify email templates are configured
- Check spam/junk folder
- Verify sender email settings

### Session expiration issues
- Clear browser cookies
- Check `SESSION_TIMEOUT` in constants.js
- Verify Supabase session settings

### Rate limiting too strict
- Adjust `RATE_LIMIT` values in constants.js
- Clear rate limit store (restarts application)

### Password validation failing
- Review requirements in `src/lib/auth/validation.js`
- Ensure password meets all 5 requirements
- Check special character set

## Performance Optimization

1. **Code Splitting**
   - Auth components lazy-loaded
   - Separate bundle for auth pages

2. **Caching**
   - User data cached in context
   - Session state cached

3. **Database Optimization**
   - Supabase handles indexing
   - Connection pooling via Supabase

## Support and Maintenance

- Monitor Supabase logs for authentication errors
- Review security incidents regularly
- Keep dependencies updated
- Test authentication flows regularly
- Monitor email delivery rates

## Additional Resources

- [Supabase Authentication Docs](https://supabase.com/docs/guides/auth)
- [Next.js Security Best Practices](https://nextjs.org/docs/advanced-features/security)
- [OWASP Authentication Cheat Sheet](https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html)
