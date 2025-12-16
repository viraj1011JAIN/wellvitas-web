# Quick Reference Guide - Authentication System

## 🚀 Quick Start (5 Minutes)

### Step 1: Configure Environment
Create `.env.local` in project root:
```env
NEXT_PUBLIC_SUPABASE_URL=your_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_key
```

### Step 2: Run Server
```bash
npm run dev
```

### Step 3: Test
- Login: http://localhost:3000/login
- Signup: http://localhost:3000/signup

---

## 📖 Usage Examples

### Using Auth in Components
```javascript
'use client'
import { useAuth } from '@/providers/AuthProvider'

export default function MyComponent() {
  const { user, login, logout, isAuthenticated } = useAuth()
  
  return (
    <div>
      {isAuthenticated && <p>Welcome {user.email}</p>}
      <button onClick={() => login(email, password)}>Login</button>
      <button onClick={() => logout()}>Logout</button>
    </div>
  )
}
```

### Creating Protected Pages
```javascript
'use client'
import { ProtectedRoute } from '@/components/auth/ProtectedRoute'

export default function ProtectedPage() {
  return (
    <ProtectedRoute>
      <div>This content is protected</div>
    </ProtectedRoute>
  )
}
```

### Validating Inputs
```javascript
import { validateEmail, validatePassword } from '@/lib/auth/validation'

const emailCheck = validateEmail(email)
const passwordCheck = validatePassword(password)

if (!emailCheck.valid) console.log(emailCheck.error)
if (!passwordCheck.valid) console.log(passwordCheck.errors)
```

---

## 🔑 Available Routes

| Route | Type | Protected |
|-------|------|-----------|
| `/login` | Auth | No |
| `/signup` | Auth | No |
| `/forgot-password` | Auth | No |
| `/auth/reset-password` | Auth | No |
| `/verify-email` | Auth | No |
| `/dashboard` | App | **Yes** |
| `/profile` | App | **Yes** |

---

## 🎛️ Configuration Locations

| Setting | File | How to Change |
|---------|------|---------------|
| Password Requirements | `src/lib/auth/constants.js` | Edit `PASSWORD_REQUIREMENTS` |
| Rate Limits | `src/lib/auth/constants.js` | Edit `AUTH_CONFIG.RATE_LIMIT` |
| Session Timeout | `src/lib/auth/constants.js` | Edit `AUTH_CONFIG.SESSION_TIMEOUT` |
| Error Messages | `src/lib/auth/constants.js` | Edit `AUTH_CONFIG.ERRORS` |
| UI Colors | `src/components/auth/FormComponents.jsx` | Edit Tailwind classes |

---

## 🐛 Common Issues & Fixes

| Issue | Solution |
|-------|----------|
| "Invalid API Key" | Check `.env.local` variables |
| No verification emails | Check Supabase SMTP settings |
| "Too many attempts" | Wait 15 min or clear cookies |
| Protected route redirects | Ensure user is logged in |
| UI looks broken | Clear browser cache |

---

## 📝 Form Components

### FormInput
```jsx
<FormInput
  label="Email"
  type="email"
  placeholder="user@example.com"
  value={email}
  onChange={setEmail}
  error={errors.email}
  disabled={loading}
/>
```

### SubmitButton
```jsx
<SubmitButton loading={loading} type="submit">
  Sign In
</SubmitButton>
```

### FormErrorAlert
```jsx
<FormErrorAlert 
  error={error} 
  onDismiss={() => setError(null)} 
/>
```

### PasswordStrengthIndicator
```jsx
<PasswordStrengthIndicator password={password} />
```

---

## 🔐 Password Requirements

✅ Min 8 characters  
✅ 1+ UPPERCASE  
✅ 1+ lowercase  
✅ 1+ number  
✅ 1+ special char (!@#$%^&*)

---

## 📊 Auth State Management

### Current User
```javascript
const { user, loading } = useAuth()
// user = { id, email, email_confirmed_at, created_at, ... }
```

### Auth Actions
```javascript
const { login, signup, logout, resetPassword } = useAuth()

// Login
await login('email@example.com', 'password')

// Signup
await signup('email@example.com', 'password', 'Full Name')

// Logout
await logout()

// Reset Password
await resetPassword('email@example.com')
```

---

## 🚨 Rate Limiting Rules

| Action | Limit | Window |
|--------|-------|--------|
| Login | 5 attempts | 15 minutes |
| Signup | 3 attempts | 1 hour |
| Password Reset | 3 attempts | 1 hour |

After exceeding limit → Account locked for duration → Automatic unlock after timeout

---

## 📧 Email Events

| Event | Template | User Action |
|-------|----------|-------------|
| Signup Confirmation | Sent automatically | Click confirmation link |
| Password Reset | Sent on request | Click reset link |
| Welcome | Can be customized | N/A |

---

## 🔄 Authentication Flow

```
1. User visits /login
2. Enters email & password
3. Validation checks (local)
4. Sent to Supabase auth
5. If valid → Session created
6. Redirect to /dashboard
7. AuthProvider updates state
8. Protected routes unlock
```

---

## 🎨 Customizing UI

### Change Primary Color
Replace `blue-600` with your color:
```jsx
// Before: bg-blue-600
// After:  bg-green-600
```

### Tailwind Colors Available
- blue, green, red, yellow, purple, pink, orange, gray, etc.

### Modify Component Styles
All components use Tailwind classes. Edit in:
- `src/components/auth/FormComponents.jsx`
- Page files: `src/app/*/page.js`

---

## 🧪 Testing Checklist

- [ ] Sign up with new email
- [ ] Verify email from confirmation
- [ ] Log in with credentials
- [ ] Access protected dashboard
- [ ] Click remember me
- [ ] Request password reset
- [ ] Reset password via email
- [ ] Try wrong password (5+ times)
- [ ] Verify rate limiting works
- [ ] Logout successfully
- [ ] Try accessing dashboard logged out

---

## 📚 Full Documentation

- **SYSTEM_SUMMARY.md** - Complete overview
- **AUTH_SYSTEM_DOCUMENTATION.md** - Detailed documentation
- **SETUP_GUIDE.md** - Installation & deployment

---

## 🆘 Getting Help

1. **Read documentation first** - Check SYSTEM_SUMMARY.md
2. **Check SETUP_GUIDE.md** - Troubleshooting section
3. **Review error messages** - They contain helpful hints
4. **Check browser console** - See detailed error logs
5. **Supabase dashboard** - Verify configuration

---

## ✨ Next Advanced Steps

After basic setup:
1. Add 2FA support
2. Implement social login
3. Add user roles/permissions
4. Create admin dashboard
5. Setup activity logging
6. Configure analytics

---

## 📋 File Locations (Quick Reference)

```
Auth Logic:       src/lib/auth/
UI Components:    src/components/auth/
Pages:            src/app/*/page.js
Configuration:    src/lib/auth/constants.js
Validation:       src/lib/auth/validation.js
Service:          src/lib/auth/authService.js
Provider:         src/providers/AuthProvider.jsx
Middleware:       src/middleware.js
```

---

## 🎯 Key Takeaways

✅ Complete auth system ready to use  
✅ Production-level security included  
✅ Beautiful responsive UI  
✅ Easy to customize  
✅ Well documented  
✅ No additional setup needed (except Supabase credentials)  

**Just add your Supabase keys and you're ready to deploy!**

---

**Version:** 1.0.0 | **Status:** Production Ready  
**Questions?** Check documentation files or Supabase support
