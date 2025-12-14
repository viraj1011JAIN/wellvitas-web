'use client'

import { createClient } from '@/lib/supabase/client'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

export default function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const router = useRouter()
  const supabase = createClient()

  const handleLogin = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)
    
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
        setError(error.message)
        setLoading(false)
    } else {
        router.refresh() // Refresh server components
        router.push('/dashboard')
    }
  }

  const handleSignUp = async (e) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        // Redirect them to the callback route we created in Step 4
        emailRedirectTo: `${location.origin}/auth/callback`,
      },
    })

    if (error) {
        setError(error.message)
        setLoading(false)
    } else {
        alert("Check your email for the confirmation link!")
        setLoading(false)
    }
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-900">Wellvitas Portal</h1>
        
        {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4 text-sm">
                {error}
            </div>
        )}

        <form className="flex flex-col gap-4">
            <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    type="email"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Password</label>
                <input
                    className="w-full border p-2 rounded focus:ring-2 focus:ring-blue-500 outline-none"
                    type="password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
            </div>
            
            <button 
                onClick={handleLogin} 
                disabled={loading}
                className="bg-blue-900 text-white py-2 rounded font-semibold hover:bg-blue-800 disabled:opacity-50"
            >
                {loading ? 'Processing...' : 'Log In'}
            </button>
            
            <button 
                onClick={handleSignUp} 
                disabled={loading}
                className="bg-white text-blue-900 border border-blue-900 py-2 rounded font-semibold hover:bg-blue-50 disabled:opacity-50"
            >
                Create Account
            </button>
        </form>
      </div>
    </div>
  )
}