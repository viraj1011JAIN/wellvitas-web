/**
 * Authentication validation utilities
 * Provides comprehensive validation for login, signup, and password reset forms
 */

const VALIDATION_RULES = {
  email: {
    pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    message: 'Please enter a valid email address',
    minLength: 5,
    maxLength: 254,
  },
  password: {
    minLength: 8,
    maxLength: 128,
    requiresUppercase: true,
    requiresLowercase: true,
    requiresNumber: true,
    requiresSpecialChar: true,
    specialChars: '!@#$%^&*()_+-=[]{}|;:,.<>?',
  },
  name: {
    minLength: 2,
    maxLength: 100,
    pattern: /^[a-zA-Z\s'-]+$/,
    message: 'Name can only contain letters, spaces, hyphens, and apostrophes',
  },
}

/**
 * Validates email format
 * @param {string} email - Email to validate
 * @returns {object} - { valid: boolean, error?: string }
 */
export const validateEmail = (email) => {
  if (!email || typeof email !== 'string') {
    return { valid: false, error: 'Email is required' }
  }

  email = email.trim()

  if (email.length < VALIDATION_RULES.email.minLength || email.length > VALIDATION_RULES.email.maxLength) {
    return {
      valid: false,
      error: `Email must be between ${VALIDATION_RULES.email.minLength} and ${VALIDATION_RULES.email.maxLength} characters`,
    }
  }

  if (!VALIDATION_RULES.email.pattern.test(email)) {
    return { valid: false, error: VALIDATION_RULES.email.message }
  }

  return { valid: true }
}

/**
 * Validates password strength
 * @param {string} password - Password to validate
 * @returns {object} - { valid: boolean, strength: string, errors: string[] }
 */
export const validatePassword = (password) => {
  const errors = []

  if (!password || typeof password !== 'string') {
    return { valid: false, strength: 'invalid', errors: ['Password is required'] }
  }

  if (password.length < VALIDATION_RULES.password.minLength) {
    errors.push(`Password must be at least ${VALIDATION_RULES.password.minLength} characters long`)
  }

  if (password.length > VALIDATION_RULES.password.maxLength) {
    errors.push(`Password must not exceed ${VALIDATION_RULES.password.maxLength} characters`)
  }

  if (VALIDATION_RULES.password.requiresUppercase && !/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter')
  }

  if (VALIDATION_RULES.password.requiresLowercase && !/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter')
  }

  if (VALIDATION_RULES.password.requiresNumber && !/\d/.test(password)) {
    errors.push('Password must contain at least one number')
  }

  if (VALIDATION_RULES.password.requiresSpecialChar) {
    const hasSpecialChar = new RegExp(`[${VALIDATION_RULES.password.specialChars.replace(/[-\\^$*+?.()|[\]{}]/g, '\\$&')}]`).test(
      password
    )
    if (!hasSpecialChar) {
      errors.push(`Password must contain at least one special character (${VALIDATION_RULES.password.specialChars})`)
    }
  }

  if (errors.length > 0) {
    return { valid: false, strength: 'weak', errors }
  }

  return { valid: true, strength: 'strong', errors: [] }
}

/**
 * Validates full name
 * @param {string} name - Name to validate
 * @returns {object} - { valid: boolean, error?: string }
 */
export const validateName = (name) => {
  if (!name || typeof name !== 'string') {
    return { valid: false, error: 'Name is required' }
  }

  name = name.trim()

  if (name.length < VALIDATION_RULES.name.minLength || name.length > VALIDATION_RULES.name.maxLength) {
    return {
      valid: false,
      error: `Name must be between ${VALIDATION_RULES.name.minLength} and ${VALIDATION_RULES.name.maxLength} characters`,
    }
  }

  if (!VALIDATION_RULES.name.pattern.test(name)) {
    return { valid: false, error: VALIDATION_RULES.name.message }
  }

  return { valid: true }
}

/**
 * Validates login form
 * @param {object} data - { email, password }
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validateLoginForm = ({ email, password }) => {
  const errors = {}

  const emailValidation = validateEmail(email)
  if (!emailValidation.valid) {
    errors.email = emailValidation.error
  }

  if (!password || password.length === 0) {
    errors.password = 'Password is required'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validates signup form
 * @param {object} data - { email, password, confirmPassword, name }
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validateSignupForm = ({ email, password, confirmPassword, name }) => {
  const errors = {}

  const emailValidation = validateEmail(email)
  if (!emailValidation.valid) {
    errors.email = emailValidation.error
  }

  const nameValidation = validateName(name)
  if (!nameValidation.valid) {
    errors.name = nameValidation.error
  }

  const passwordValidation = validatePassword(password)
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.errors[0]
  }

  if (!confirmPassword || confirmPassword === '') {
    errors.confirmPassword = 'Please confirm your password'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Validates password reset form
 * @param {object} data - { password, confirmPassword }
 * @returns {object} - { valid: boolean, errors: object }
 */
export const validatePasswordResetForm = ({ password, confirmPassword }) => {
  const errors = {}

  const passwordValidation = validatePassword(password)
  if (!passwordValidation.valid) {
    errors.password = passwordValidation.errors[0]
  }

  if (!confirmPassword || confirmPassword === '') {
    errors.confirmPassword = 'Please confirm your password'
  } else if (password !== confirmPassword) {
    errors.confirmPassword = 'Passwords do not match'
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  }
}

/**
 * Sanitizes input to prevent XSS attacks
 * @param {string} input - Input to sanitize
 * @returns {string} - Sanitized input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return ''
  return input.trim().replace(/[<>]/g, '')
}

/**
 * Checks if password meets strength requirements for display
 * @param {string} password - Password to check
 * @returns {object} - { score: number, percentage: number, color: string }
 */
export const getPasswordStrength = (password) => {
  if (!password) return { score: 0, percentage: 0, color: 'bg-red-500' }

  let score = 0

  if (password.length >= 8) score++
  if (password.length >= 12) score++
  if (/[a-z]/.test(password)) score++
  if (/[A-Z]/.test(password)) score++
  if (/\d/.test(password)) score++
  if (/[!@#$%^&*()_+\-=\[\]{}|;:,.<>?]/.test(password)) score++

  const percentage = (score / 6) * 100

  let color = 'bg-red-500'
  if (percentage >= 80) color = 'bg-green-500'
  else if (percentage >= 60) color = 'bg-yellow-500'
  else if (percentage >= 40) color = 'bg-orange-500'

  return { score, percentage, color }
}
