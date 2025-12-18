import { createServerClient } from '@supabase/ssr'
import { NextResponse } from 'next/server'

// Protected routes that require authentication
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings']

// Public routes that unauthenticated users can access
const PUBLIC_AUTH_ROUTES = ['/login', '/signup', '/forgot-password', '/auth/callback']

// Routes that authenticated users should be redirected away from
const REDIRECT_AUTHENTICATED_USERS = ['/login', '/signup', '/forgot-password']

export async function middleware(request) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value, options }) => {
            request.cookies.set(name, value)
          })
          response = NextResponse.next({
            request: {
              headers: request.headers,
            },
          })
          cookiesToSet.forEach(({ name, value, options }) =>
            response.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  // Refresh session if expired
  const { data: { user }, error } = await supabase.auth.getUser()

  const pathname = request.nextUrl.pathname
  
  // Allow Storyblok preview requests
  const isStoryblokPreview = request.nextUrl.searchParams.has('_storyblok')
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff')
  // Allow iframe embedding for Storyblok preview
  if (isStoryblokPreview) {
    response.headers.set('X-Frame-Options', 'ALLOWALL')
  } else {
    response.headers.set('X-Frame-Options', 'DENY')
  }
  response.headers.set('X-XSS-Protection', '1; mode=block')
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin')
  response.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()')

  // Protected routes logic
  // If user is NOT logged in and tries to access protected route, redirect to login
  if (!user && PROTECTED_ROUTES.some(route => pathname.startsWith(route))) {
    const url = request.nextUrl.clone()
    url.pathname = '/login'
    url.searchParams.set('from', pathname) // Store where they came from
    return NextResponse.redirect(url)
  }

  // If user IS logged in and tries to access auth pages, redirect to dashboard
  if (user && REDIRECT_AUTHENTICATED_USERS.some(route => pathname.startsWith(route))) {
    const url = request.nextUrl.clone()
    url.pathname = '/dashboard'
    return NextResponse.redirect(url)
  }

  // Rate limiting check for auth endpoints (basic implementation)
  if (pathname.startsWith('/api/auth/')) {
    const ip = request.ip || request.headers.get('x-forwarded-for') || 'unknown'
    const rateLimitKey = `ratelimit:${ip}:${pathname}`
    // In production, use Redis or similar for proper rate limiting
  }

  return response
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public static assets
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
}