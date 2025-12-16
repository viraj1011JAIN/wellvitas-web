'use client'

import AuthService from '@/lib/auth/authService'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Check if user is logged in on mount
    const checkUser = async () => {
      try {
        const currentUser = await AuthService.getCurrentUser()
        setUser(currentUser)
      } catch (err) {
        console.error('Failed to check user:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    checkUser()
  }, [])

  const login = async (email, password) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await AuthService.signIn({ email, password })
      if (error) {
        setError(error)
        return { success: false, error }
      }
      setUser(data.user)
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Login failed'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const signup = async (email, password, fullName, metadata = {}) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await AuthService.signUp({
        email,
        password,
        fullName,
        metadata,
      })
      if (error) {
        setError(error)
        return { success: false, error }
      }
      setUser(data.user)
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Signup failed'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const logout = async () => {
    setLoading(true)
    setError(null)
    try {
      const error = await AuthService.signOut()
      if (error) {
        setError(error)
        return { success: false, error }
      }
      setUser(null)
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Logout failed'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const resetPassword = async (email) => {
    setLoading(true)
    setError(null)
    try {
      const { data, error } = await AuthService.resetPasswordForEmail(email)
      if (error) {
        setError(error)
        return { success: false, error }
      }
      return { success: true }
    } catch (err) {
      const errorMsg = err.message || 'Password reset failed'
      setError(errorMsg)
      return { success: false, error: errorMsg }
    } finally {
      setLoading(false)
    }
  }

  const value = {
    user,
    loading,
    error,
    login,
    signup,
    logout,
    resetPassword,
    isAuthenticated: !!user,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === null) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}
