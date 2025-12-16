'use client'

import { FormErrorAlert, FormInput, SubmitButton } from '@/components/auth/FormComponents'
import { useAuth } from '@/providers/AuthProvider'
import { validateLoginForm } from '@/lib/auth/validation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function LoginPage() {
  const router = useRouter()
  const { login, user, loading: authLoading } = useAuth()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState(null)
  const [loginAttempts, setLoginAttempts] = useState(0)
  const [isLocked, setIsLocked] = useState(false)

  // Redirect if already logged in
  useEffect(() => {
    if (user && !authLoading) {
      router.push('/dashboard')
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setGeneralError(null)

    // Rate limiting check
    if (isLocked) {
      setGeneralError('Too many login attempts. Please try again in 15 minutes.')
      return
    }

    // Validate form
    const validation = validateLoginForm({ email, password })
    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)

    try {
      const result = await login(email, password)

      if (!result.success) {
        setLoginAttempts((prev) => prev + 1)
        
        // Lock account after 5 failed attempts
        if (loginAttempts >= 4) {
          setIsLocked(true)
          setGeneralError('Too many failed login attempts. Please try again in 15 minutes or reset your password.')
          // In production, you'd set a timer to unlock
          setTimeout(() => {
            setIsLocked(false)
            setLoginAttempts(0)
          }, 15 * 60 * 1000)
        } else {
          setGeneralError(result.error || 'Login failed. Please try again.')
        }
        return
      }

      // Save remember me preference
      if (rememberMe) {
        localStorage.setItem('rememberEmail', email)
      } else {
        localStorage.removeItem('rememberEmail')
      }

      // Reset and redirect
      setLoginAttempts(0)
      router.push('/dashboard')
    } catch (error) {
      setGeneralError('An unexpected error occurred. Please try again.')
      console.error('Login error:', error)
    } finally {
      setLoading(false)
    }
  }

  // Load remembered email on mount
  useEffect(() => {
    const rememberedEmail = localStorage.getItem('rememberEmail')
    if (rememberedEmail) {
      setEmail(rememberedEmail)
      setRememberMe(true)
    }
  }, [])

  if (authLoading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <svg className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Welcome Back</h2>
          <p className="text-gray-600">Sign in to your account to continue</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Error Alert */}
            {generalError && (
              <FormErrorAlert error={generalError} onDismiss={() => setGeneralError(null)} />
            )}

            {/* Email Input */}
            <FormInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              error={errors.email}
              disabled={loading || isLocked}
              autoComplete="email"
              name="email"
            />

            {/* Password Input */}
            <FormInput
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={setPassword}
              error={errors.password}
              disabled={loading || isLocked}
              autoComplete="current-password"
              name="password"
            />

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  disabled={loading || isLocked}
                  className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                />
                <span className="text-sm text-gray-600">Remember me</span>
              </label>
              <Link
                href="/forgot-password"
                className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline disabled:cursor-not-allowed"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <SubmitButton
              loading={loading}
              disabled={isLocked}
              type="submit"
            >
              Sign In
            </SubmitButton>

            {/* Security Info */}
            {loginAttempts > 0 && !isLocked && (
              <p className="text-center text-xs text-amber-600">
                {5 - loginAttempts} attempt{5 - loginAttempts !== 1 ? 's' : ''} remaining before account lockout
              </p>
            )}
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Don't have an account?</span>
            </div>
          </div>

          {/* Sign Up Link */}
          <Link
            href="/signup"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Create Account
          </Link>
        </div>

        {/* Security Notice */}
        <div className="rounded-lg bg-blue-50 p-4 text-center text-sm text-blue-800">
          <p>🔒 Your login is protected by industry-standard encryption.</p>
        </div>
      </div>
    </div>
  )
}