/**
 * Reusable authentication form component with validation
 */

'use client'

import { useState } from 'react'

export function PasswordStrengthIndicator({ password }) {
  const getStrength = () => {
    if (!password) return { score: 0, text: '', color: 'bg-gray-200' }

    let score = 0
    if (password.length >= 8) score++
    if (password.length >= 12) score++
    if (/[a-z]/.test(password)) score++
    if (/[A-Z]/.test(password)) score++
    if (/\d/.test(password)) score++
    if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score++

    const percentage = (score / 6) * 100

    if (percentage === 0) return { score: 0, text: '', color: 'bg-gray-200' }
    if (percentage < 40) return { score, text: 'Weak', color: 'bg-red-500' }
    if (percentage < 70) return { score, text: 'Fair', color: 'bg-yellow-500' }
    return { score, text: 'Strong', color: 'bg-green-500' }
  }

  const strength = getStrength()

  if (!password) return null

  return (
    <div className="mt-2 space-y-1">
      <div className="flex h-2 gap-1 overflow-hidden rounded-full bg-gray-200">
        {[...Array(6)].map((_, i) => (
          <div key={i} className={`flex-1 transition-colors ${i < strength.score ? strength.color : 'bg-gray-200'}`} />
        ))}
      </div>
      {strength.text && <p className={`text-xs font-medium ${strength.color.replace('bg-', 'text-')}`}>{strength.text}</p>}
    </div>
  )
}

export function FormInput({
  label,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  disabled = false,
  required = true,
  autoComplete,
  name,
  showPasswordStrength = false,
}) {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <div className="space-y-1.5">
      {label && (
        <label className="block text-sm font-medium text-gray-700">
          {label}
          {required && <span className="ml-1 text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        <input
          type={type === 'password' && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          disabled={disabled}
          autoComplete={autoComplete}
          name={name}
          className={`w-full rounded-lg border px-4 py-2.5 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-offset-0 ${
            error
              ? 'border-red-300 bg-red-50 text-red-900 focus:border-red-500 focus:ring-red-200'
              : 'border-gray-300 bg-white text-gray-900 focus:border-blue-500 focus:ring-blue-200'
          } ${disabled ? 'cursor-not-allowed bg-gray-50' : ''}`}
        />
        {type === 'password' && (
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
          >
            {showPassword ? (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-4.803m5.596-3.856a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            )}
          </button>
        )}
      </div>
      {showPasswordStrength && type === 'password' && <PasswordStrengthIndicator password={value} />}
      {error && <p className="mt-1 text-xs font-medium text-red-600">{error}</p>}
    </div>
  )
}

export function SubmitButton({ loading, disabled = false, children, type = 'submit', fullWidth = true, variant = 'primary' }) {
  const baseStyles = 'font-medium rounded-lg py-2.5 px-4 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

  const variantStyles = {
    primary: 'bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500',
    secondary: 'bg-gray-200 text-gray-900 hover:bg-gray-300 focus:ring-gray-500',
    danger: 'bg-red-600 text-white hover:bg-red-700 focus:ring-red-500',
  }

  return (
    <button
      type={type}
      disabled={loading || disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${fullWidth ? 'w-full' : ''}`}
    >
      {loading ? (
        <span className="flex items-center justify-center gap-2">
          <svg className="h-5 w-5 animate-spin" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            />
          </svg>
          Loading...
        </span>
      ) : (
        children
      )}
    </button>
  )
}

export function FormErrorAlert({ error, onDismiss }) {
  if (!error) return null

  return (
    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
      <div className="flex items-start gap-3">
        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-medium text-red-800">{error}</p>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-red-400 hover:text-red-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}

export function FormSuccessAlert({ message, onDismiss }) {
  if (!message) return null

  return (
    <div className="rounded-lg border border-green-200 bg-green-50 p-4">
      <div className="flex items-start gap-3">
        <svg className="mt-0.5 h-5 w-5 flex-shrink-0 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <div className="flex-1">
          <p className="text-sm font-medium text-green-800">{message}</p>
        </div>
        {onDismiss && (
          <button onClick={onDismiss} className="text-green-400 hover:text-green-600">
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </div>
  )
}
