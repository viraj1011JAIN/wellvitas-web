'use client'

import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { FormErrorAlert, FormInput, FormSuccessAlert, SubmitButton } from '@/components/auth/FormComponents'
import AuthService from '@/lib/auth/authService'

export default function ProfilePage() {
  const { user, loading } = useAuth()
  const router = useRouter()
  
  const [fullName, setFullName] = useState('')
  const [updating, setUpdating] = useState(false)
  const [error, setError] = useState(null)
  const [success, setSuccess] = useState(false)

  // Redirect if not authenticated
  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Load user data
  useEffect(() => {
    if (user) {
      setFullName(user.user_metadata?.full_name || '')
    }
  }, [user])

  const handleUpdateProfile = async (e) => {
    e.preventDefault()
    setError(null)
    setSuccess(false)
    setUpdating(true)

    try {
      const result = await AuthService.updateUserMetadata({
        full_name: fullName,
      })

      if (!result.success || result.error) {
        setError(result.error || 'Failed to update profile')
        return
      }

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err) {
      setError('An unexpected error occurred')
      console.error('Profile update error:', err)
    } finally {
      setUpdating(false)
    }
  }

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <svg className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
          </svg>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b border-gray-200 bg-white shadow-sm">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Account Settings</h1>
            <p className="mt-1 text-sm text-gray-600">Manage your profile and account preferences</p>
          </div>
          <Link href="/dashboard" className="text-sm font-medium text-blue-600 hover:text-blue-700">
            ← Back to Dashboard
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid gap-6">
          {/* Profile Settings */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Profile Information</h2>
            
            <form onSubmit={handleUpdateProfile} className="space-y-6">
              {error && <FormErrorAlert error={error} onDismiss={() => setError(null)} />}
              {success && <FormSuccessAlert message="Profile updated successfully!" />}

              <FormInput
                label="Email Address"
                type="email"
                value={user.email}
                onChange={() => {}}
                disabled={true}
              />

              <FormInput
                label="Full Name"
                type="text"
                placeholder="John Doe"
                value={fullName}
                onChange={setFullName}
                disabled={updating}
              />

              <div className="rounded-lg bg-blue-50 p-4 text-sm text-blue-800 border border-blue-200">
                <p className="font-semibold mb-2">Account Information</p>
                <ul className="space-y-1 text-xs">
                  <li><strong>Account Created:</strong> {new Date(user.created_at).toLocaleDateString()}</li>
                  <li><strong>Email Verified:</strong> {user.email_confirmed_at ? 'Yes' : 'Not Yet'}</li>
                  <li><strong>User ID:</strong> {user.id}</li>
                </ul>
              </div>

              <SubmitButton loading={updating} type="submit">
                Update Profile
              </SubmitButton>
            </form>
          </div>

          {/* Security Settings */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-6">Security</h2>
            
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Password</p>
                  <p className="text-sm text-gray-600">Change your password regularly</p>
                </div>
                <Link
                  href="/forgot-password"
                  className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                >
                  Change Password
                </Link>
              </div>

              <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div>
                  <p className="font-medium text-gray-900">Email Verification</p>
                  <p className="text-sm text-gray-600">
                    {user.email_confirmed_at
                      ? '✓ Email verified'
                      : '✗ Email not verified'}
                  </p>
                </div>
                {!user.email_confirmed_at && (
                  <Link
                    href="/verify-email"
                    className="inline-flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white hover:bg-blue-700 transition-colors"
                  >
                    Verify Email
                  </Link>
                )}
              </div>
            </div>
          </div>

          {/* Additional Resources */}
          <div className="rounded-lg border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Need Help?</h2>
            <p className="text-sm text-gray-600 mb-4">
              If you have any questions or need assistance, please don't hesitate to contact us.
            </p>
            <a
              href="mailto:support@wellvitas.com"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700 font-medium"
            >
              Contact Support
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </main>
    </div>
  )
}
