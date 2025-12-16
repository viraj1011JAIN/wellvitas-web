'use client'

import { FormErrorAlert, FormInput, FormSuccessAlert, SubmitButton } from '@/components/auth/FormComponents'
import { useAuth } from '@/providers/AuthProvider'
import { validateEmail } from '@/lib/auth/validation'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import Link from 'next/link'

export default function ForgotPasswordPage() {
  const router = useRouter()
  const { resetPassword } = useAuth()

  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)

    // Validate email
    const validation = validateEmail(email)
    if (!validation.valid) {
      setError(validation.error)
      return
    }

    setLoading(true)

    try {
      const result = await resetPassword(email)

      if (!result.success) {
        setError(result.error || 'Failed to send reset email. Please try again.')
        return
      }

      setSuccess(true)
      setEmail('')

      // Redirect after 3 seconds
      setTimeout(() => {
        router.push('/login')
      }, 3000)
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
      console.error('Password reset error:', err)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        {/* Header */}
        <div className="space-y-2 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white">
            <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5-4a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Reset Password</h2>
          <p className="text-gray-600">Enter your email to receive reset instructions</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Error Alert */}
            {error && (
              <FormErrorAlert error={error} onDismiss={() => setError(null)} />
            )}

            {/* Success Alert */}
            {success && (
              <FormSuccessAlert message="Password reset email sent! Check your inbox for instructions. Redirecting to login..." />
            )}

            {/* Email Input */}
            {!success && (
              <>
                <FormInput
                  label="Email Address"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={setEmail}
                  error={error}
                  disabled={loading}
                  autoComplete="email"
                  name="email"
                />

                <p className="text-sm text-gray-600">
                  We'll send you an email with instructions to reset your password. Make sure to check your spam folder if you don't see it.
                </p>

                {/* Submit Button */}
                <SubmitButton loading={loading} type="submit">
                  Send Reset Email
                </SubmitButton>
              </>
            )}
          </form>

          {/* Back to Login Link */}
          <div className="mt-6 text-center">
            <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
              Back to Login
            </Link>
          </div>
        </div>

        {/* Info Box */}
        <div className="rounded-lg bg-amber-50 p-4 text-sm text-amber-800 border border-amber-200">
          <p className="font-semibold mb-2">💡 Security Tip:</p>
          <p>Password reset links expire after 24 hours. If your link expires, you can request a new one from this page.</p>
        </div>
      </div>
    </div>
  )
}
