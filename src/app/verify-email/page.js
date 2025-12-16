'use client'

import { FormErrorAlert, FormSuccessAlert, SubmitButton } from '@/components/auth/FormComponents'
import AuthService from '@/lib/auth/authService'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'

export default function VerifyEmailPage() {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)
  const [isEmailVerified, setIsEmailVerified] = useState(false)
  const [userEmail, setUserEmail] = useState(null)

  // Check email verification status on mount
  useEffect(() => {
    const checkEmailVerification = async () => {
      try {
        const user = await AuthService.getCurrentUser()
        if (!user) {
          router.push('/login')
          return
        }

        setUserEmail(user.email)
        
        // Check if email is verified
        if (user.email_confirmed_at) {
          setIsEmailVerified(true)
          // Redirect to dashboard after 2 seconds
          setTimeout(() => {
            router.push('/dashboard')
          }, 2000)
        }
      } catch (err) {
        setError('Failed to check email verification status')
      }
    }

    checkEmailVerification()
  }, [router])

  const handleResendEmail = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      if (!userEmail) {
        setError('Email address not found')
        return
      }

      const result = await AuthService.resendConfirmationEmail(userEmail)

      if (!result.success || result.error) {
        setError(result.error || 'Failed to resend email')
        return
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 5000)
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Resend email error:', err)
    } finally {
      setLoading(false)
    }
  }

  if (isEmailVerified) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
        <div className="w-full max-w-md space-y-8">
          <div className="rounded-2xl bg-white p-8 shadow-lg text-center space-y-6">
            <div className="inline-block">
              <svg className="mx-auto h-16 w-16 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Email Verified!</h2>
              <p className="mt-2 text-gray-600">Your email has been successfully verified.</p>
            </div>
            <p className="text-sm text-gray-500">Redirecting to dashboard...</p>
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
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-900">Verify Your Email</h2>
          <p className="text-gray-600">We've sent a confirmation link to your email</p>
        </div>

        {/* Card */}
        <div className="rounded-2xl bg-white p-8 shadow-lg">
          <div className="space-y-6">
            {/* Error Alert */}
            {error && (
              <FormErrorAlert error={error} onDismiss={() => setError(null)} />
            )}

            {/* Success Alert */}
            {success && (
              <FormSuccessAlert message="Verification email sent! Check your inbox." />
            )}

            {/* Instructions */}
            <div className="space-y-4 rounded-lg bg-blue-50 p-4 text-sm text-blue-800 border border-blue-200">
              <p className="font-semibold">What's next?</p>
              <ol className="list-inside space-y-2 ml-2">
                <li>1. Check your email (look in spam if needed)</li>
                <li>2. Click the verification link</li>
                <li>3. You'll be redirected to your dashboard</li>
              </ol>
            </div>

            {/* Email Address Display */}
            {userEmail && (
              <div className="rounded-lg bg-gray-50 p-4 border border-gray-200">
                <p className="text-xs text-gray-600 mb-1">Verification email sent to:</p>
                <p className="font-medium text-gray-900 break-all">{userEmail}</p>
              </div>
            )}

            {/* Resend Button */}
            <div className="space-y-3">
              <p className="text-center text-sm text-gray-600">Didn't receive the email?</p>
              <SubmitButton
                loading={loading}
                onClick={handleResendEmail}
                type="button"
                variant="secondary"
              >
                Resend Verification Email
              </SubmitButton>
            </div>
          </div>

          {/* Divider */}
          <div className="my-6 border-t border-gray-200"></div>

          {/* Back to Login */}
          <div className="text-center">
            <p className="text-sm text-gray-600 mb-3">
              Already verified?{' '}
              <Link href="/dashboard" className="font-medium text-blue-600 hover:underline">
                Go to Dashboard
              </Link>
            </p>
          </div>
        </div>

        {/* Support Note */}
        <div className="rounded-lg bg-amber-50 p-4 text-center text-sm text-amber-800 border border-amber-200">
          <p>Need help? Links expire after 24 hours. Request a new one above.</p>
        </div>
      </div>
    </div>
  )
}
