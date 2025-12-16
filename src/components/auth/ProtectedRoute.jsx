'use client'

import { useAuth } from '@/providers/AuthProvider'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

/**
 * Wrapper component for protected routes
 * Redirects to login if user is not authenticated
 */
export function ProtectedRoute({ children, requiredRole = null }) {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }

    // Check role-based access if required
    if (!loading && user && requiredRole) {
      const userRole = user.user_metadata?.role || 'user'
      if (userRole !== requiredRole) {
        router.push('/unauthorized')
      }
    }
  }, [user, loading, requiredRole, router])

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <div className="mb-4 inline-block">
            <svg className="h-12 w-12 animate-spin text-blue-600" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    )
  }

  if (!user) {
    return null
  }

  return children
}
