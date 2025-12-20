'use client'

import { FormErrorAlert, FormInput, FormSuccessAlert, PasswordStrengthIndicator, SubmitButton } from '@/components/auth/FormComponents'
import { useAuth } from '@/providers/AuthProvider'
import { validatePasswordResetForm } from '@/lib/auth/validation'
import AuthService from '@/lib/auth/authService'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, Suspense } from 'react'
import Link from 'next/link'

function ResetPasswordForm() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [errors, setErrors] = useState({})
  const [generalError, setGeneralError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [tokenValid, setTokenValid] = useState(true)

  // Verify token exists
  useEffect(() => {
    if (!token) {
      setTokenValid(false)
      setGeneralError('Invalid or expired reset link. Please request a new one.')
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrors({})
    setGeneralError(null)

    if (!tokenValid) {
      setGeneralError('Invalid or expired reset link.')
      return
    }

    // Validate form
    const validation = validatePasswordResetForm({
      password,
      confirmPassword,
    })

    if (!validation.valid) {
      setErrors(validation.errors)
      return
    }

    setLoading(true)

    try {
      const result = await AuthService.updatePassword(password)

      if (!result.success || result.error) {
        setGeneralError(result.error || 'Failed to reset password. Please try again.')
        return
      }

      setSuccess(true)
      setPassword('')
      setConfirmPassword('')

      // Redirect to login after 2 seconds
      setTimeout(() => {
        router.push('/login')
      }, 2000)
    } catch (error) {
      setGeneralError('An unexpected error occurred. Please try again.')
      console.error('Password reset error:', error)
    } finally {
      setLoading(false)
    }
  }

  if (!tokenValid) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12 sm:px-6 lg:px-8">
        <div className="w-full max-w-md space-y-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg space-y-6">
            <div className="text-center">
              <svg className="mx-auto h-12 w-12 text-red-600 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-900">Invalid Link</h2>
              <p className="mt-2 text-gray-600">This password reset link is invalid or has expired.</p>
            </div>

            <div className="space-y-3">
              <Link
                href="/forgot-password"
                className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-2.5 font-medium text-white hover:bg-blue-700 transition-colors"
              >
                Request New Link
              </Link>
              <Link
                href="/login"
                className="flex w-full items-center justify-center gap-2 rounded-lg border-2 border-gray-300 px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                Back to Login
              </Link>
            </div>
          </div>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Create New Password</h2>
          <p className="text-gray-600">Enter a strong password to secure your account</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            {/* Error Alert */}
            {generalError && (
              <FormErrorAlert error={generalError} onDismiss={() => setGeneralError(null)} />
            )}

            {/* Success Alert */}
            {success && (
              <FormSuccessAlert message="Password reset successfully! Redirecting to login..." />
            )}

            {!success && (
              <>
                {/* Password Input */}
                <FormInput
                  label="New Password"
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

                {/* Submit Button */}
                <SubmitButton loading={loading} type="submit">
                  Reset Password
                </SubmitButton>
              </>
            )}
          </form>

          {/* Back to Login Link */}
          {!success && (
            <div className="mt-6 text-center">
              <Link href="/login" className="text-sm font-medium text-blue-600 hover:text-blue-700 hover:underline">
                Back to Login
              </Link>
            </div>
          )}
        </div>

        {/* Security Notice */}
        <div className="rounded-lg bg-blue-50 p-4 text-center text-sm text-blue-800 border border-blue-200">
          <p>🔒 Keep your password secure. Never share it with anyone.</p>
        </div>
      </div>
    </div>
  )
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <ResetPasswordForm />
    </Suspense>
  )
}
