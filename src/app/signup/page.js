'use client'

import { FormErrorAlert, FormInput, FormSuccessAlert, PasswordStrengthIndicator, SubmitButton } from '@/components/auth/FormComponents'
import { useAuth } from '@/providers/AuthProvider'
import { validateSignupForm } from '@/lib/auth/validation'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function SignupPage() {
  const router = useRouter()
  const { signup, user, loading: authLoading } = useAuth()

  const [email, setEmail] = useState('')
  const [fullName, setFullName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [agreeToTerms, setAgreeToTerms] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState(null)
  const [successMessage, setSuccessMessage] = useState(null)

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
    setSuccessMessage(null)

    // Check terms agreement
    if (!agreeToTerms) {
      setErrors({ terms: 'You must agree to the Terms of Service and Privacy Policy' })
      return
    }

    // Validate form
    const validation = validateSignupForm({
      email,
      password,
      confirmPassword,
      name: fullName,
    })

    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)

    try {
      const result = await signup(email, password, fullName, {
        signup_date: new Date().toISOString(),
        terms_agreed: true,
      })

      if (!result.success) {
        setGeneralError(result.error || 'Signup failed. Please try again.')
        return
      }

      setSuccessMessage('Account created! Please check your email to verify your account.')
      
      // Redirect after a short delay
      setTimeout(() => {
        router.push('/verify-email')
      }, 2000)
    } catch (error) {
      setGeneralError('An unexpected error occurred. Please try again.')
      console.error('Signup error:', error)
    } finally {
      setLoading(false)
    }
  }

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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
          <p className="text-gray-600">Join us and get started today</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-5" noValidate>
            {/* Error Alert */}
            {generalError && (
              <FormErrorAlert error={generalError} onDismiss={() => setGeneralError(null)} />
            )}

            {/* Success Alert */}
            {successMessage && (
              <FormSuccessAlert message={successMessage} />
            )}

            {/* Full Name Input */}
            <FormInput
              label="Full Name"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={setFullName}
              error={errors.name}
              disabled={loading}
              autoComplete="name"
              name="fullName"
            />

            {/* Email Input */}
            <FormInput
              label="Email Address"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={setEmail}
              error={errors.email}
              disabled={loading}
              autoComplete="email"
              name="email"
            />

            {/* Password Input */}
            <div className="space-y-1.5">
              <FormInput
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={setPassword}
                error={errors.password}
                disabled={loading}
                autoComplete="new-password"
                name="password"
                showPasswordStrength={true}
              />
              <div className="rounded-lg bg-blue-50 p-3 text-xs text-blue-800">
                <p className="font-semibold mb-1">Password Requirements:</p>
                <ul className="list-inside space-y-0.5">
                  <li>✓ At least 8 characters</li>
                  <li>✓ One uppercase letter</li>
                  <li>✓ One lowercase letter</li>
                  <li>✓ One number</li>
                  <li>✓ One special character (!@#$%^&*)</li>
                </ul>
              </div>
            </div>

            {/* Confirm Password Input */}
            <FormInput
              label="Confirm Password"
              type="password"
              placeholder="••••••••"
              value={confirmPassword}
              onChange={setConfirmPassword}
              error={errors.confirmPassword}
              disabled={loading}
              autoComplete="new-password"
              name="confirmPassword"
            />

            {/* Terms Agreement */}
            <div className="space-y-2">
              <label className="flex items-start gap-3">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  disabled={loading}
                  className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500 disabled:cursor-not-allowed"
                />
                <span className="text-sm text-gray-600">
                  I agree to the{' '}
                  <Link href="/terms" className="font-medium text-blue-600 hover:underline">
                    Terms of Service
                  </Link>{' '}
                  and{' '}
                  <Link href="/privacy" className="font-medium text-blue-600 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              </label>
              {errors.terms && <p className="text-xs font-medium text-red-600">{errors.terms}</p>}
            </div>

            {/* Submit Button */}
            <SubmitButton loading={loading} type="submit">
              Create Account
            </SubmitButton>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-white px-2 text-gray-500">Already have an account?</span>
            </div>
          </div>

          {/* Login Link */}
          <Link
            href="/login"
            className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
          >
            Sign In
          </Link>
        </div>

        {/* Security Notice */}
        <div className="rounded-lg bg-blue-50 p-4 text-center text-sm text-blue-800">
          <p>🔒 Your data is protected with industry-standard encryption.</p>
        </div>
      </div>
    </div>
  )
}
