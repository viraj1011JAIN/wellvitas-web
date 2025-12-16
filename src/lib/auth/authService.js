/**
 * Authentication service
 * Handles all authentication-related operations with error handling
 */

import { createClient } from '@/lib/supabase/client'

export class AuthService {
  static supabase = null

  static getClient() {
    if (!this.supabase) {
      this.supabase = createClient()
    }
    return this.supabase
  }

  /**
   * Sign up with email and password
   * @param {object} data - { email, password, fullName, metadata }
   * @returns {Promise<object>} - { data, error }
   */
  static async signUp(data) {
    try {
      const { email, password, fullName, metadata = {} } = data
      const supabase = this.getClient()

      const { data: signUpData, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
          data: {
            full_name: fullName,
            ...metadata,
          },
        },
      })

      if (error) {
        return {
          data: null,
          error: this.formatError(error),
        }
      }

      return {
        data: signUpData,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: this.formatError(error),
      }
    }
  }

  /**
   * Sign in with email and password
   * @param {object} data - { email, password }
   * @returns {Promise<object>} - { data, error }
   */
  static async signIn(data) {
    try {
      const { email, password } = data
      const supabase = this.getClient()

      const { data: signInData, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })

      if (error) {
        return {
          data: null,
          error: this.formatError(error),
        }
      }

      return {
        data: signInData,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: this.formatError(error),
      }
    }
  }

  /**
   * Sign out the current user
   * @returns {Promise<object>} - { error }
   */
  static async signOut() {
    try {
      const supabase = this.getClient()
      const { error } = await supabase.auth.signOut()

      if (error) {
        return this.formatError(error)
      }

      return null
    } catch (error) {
      return this.formatError(error)
    }
  }

  /**
   * Get current user
   * @returns {Promise<object>} - Current user or null
   */
  static async getCurrentUser() {
    try {
      const supabase = this.getClient()
      const { data: { user }, error } = await supabase.auth.getUser()

      if (error) {
        return null
      }

      return user
    } catch (error) {
      return null
    }
  }

  /**
   * Send password reset email
   * @param {string} email - User's email
   * @returns {Promise<object>} - { data, error }
   */
  static async resetPasswordForEmail(email) {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/reset-password`,
      })

      if (error) {
        return {
          data: null,
          error: this.formatError(error),
        }
      }

      return {
        data,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: this.formatError(error),
      }
    }
  }

  /**
   * Update user password
   * @param {string} password - New password
   * @returns {Promise<object>} - { data, error }
   */
  static async updatePassword(password) {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase.auth.updateUser({
        password,
      })

      if (error) {
        return {
          data: null,
          error: this.formatError(error),
        }
      }

      return {
        data,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: this.formatError(error),
      }
    }
  }

  /**
   * Refresh session
   * @returns {Promise<object>} - { data, error }
   */
  static async refreshSession() {
    try {
      const supabase = this.getClient()
      const { data, error } = await supabase.auth.refreshSession()

      if (error) {
        return {
          data: null,
          error: this.formatError(error),
        }
      }

      return {
        data,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: this.formatError(error),
      }
    }
  }

  /**
   * Update user metadata
   * @param {object} metadata - User metadata to update
   * @returns {Promise<object>} - { data, error }
   */
  static async updateUserMetadata(metadata) {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase.auth.updateUser({
        data: metadata,
      })

      if (error) {
        return {
          data: null,
          error: this.formatError(error),
        }
      }

      return {
        data,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: this.formatError(error),
      }
    }
  }

  /**
   * Format error messages for display
   * @param {object} error - Supabase error object
   * @returns {string} - Formatted error message
   */
  static formatError(error) {
    if (!error) return 'An unknown error occurred'

    const errorMap = {
      'Invalid login credentials': 'Invalid email or password. Please try again.',
      'User already registered': 'An account with this email already exists.',
      'Email not confirmed': 'Please confirm your email before logging in.',
      'Email rate limit exceeded': 'Too many requests. Please try again later.',
      'Password should be at least 8 characters': 'Password must be at least 8 characters long.',
      'Only password reset for authenticated users is supported': 'Please log in to reset your password.',
      'New password should be different from the old password': 'New password must be different from the current password.',
    }

    return errorMap[error.message] || error.message || 'An error occurred. Please try again.'
  }

  /**
   * Check if user's email is verified
   * @returns {Promise<boolean>}
   */
  static async isEmailVerified() {
    try {
      const user = await this.getCurrentUser()
      return user?.email_confirmed_at !== null && user?.email_confirmed_at !== undefined
    } catch {
      return false
    }
  }

  /**
   * Resend confirmation email
   * @param {string} email - User's email
   * @returns {Promise<object>} - { data, error }
   */
  static async resendConfirmationEmail(email) {
    try {
      const supabase = this.getClient()

      const { data, error } = await supabase.auth.resend({
        type: 'signup',
        email,
        options: {
          emailRedirectTo: `${typeof window !== 'undefined' ? window.location.origin : ''}/auth/callback`,
        },
      })

      if (error) {
        return {
          data: null,
          error: this.formatError(error),
        }
      }

      return {
        data,
        error: null,
      }
    } catch (error) {
      return {
        data: null,
        error: this.formatError(error),
      }
    }
  }
}

export default AuthService
