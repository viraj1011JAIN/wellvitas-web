export default function UnauthorizedPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg text-center space-y-6">
          <svg className="mx-auto h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4v2m0 4v2M6.343 3.665c.886-.195 1.81-.195 2.696 0l5.236 1.142c.893.195 1.74.68 2.38 1.379l3.761 3.976c.64.699 1.099 1.512 1.318 2.402l1.142 5.236c.195.886.195 1.81 0 2.696l-1.142 5.236c-.219.89-.678 1.703-1.318 2.402l-3.761 3.976c-.64.699-1.487 1.184-2.38 1.379l-5.236 1.142c-.886.195-1.81.195-2.696 0l-5.236-1.142c-.893-.195-1.74-.68-2.38-1.379L2.282 18.47c-.64-.699-1.099-1.512-1.318-2.402L0 10.832c-.195-.886-.195-1.81 0-2.696l1.142-5.236C1.36 2.01 1.819 1.197 2.459.498L6.22 3.474c.64.699 1.487 1.184 2.38 1.379l5.236 1.142z" />
          </svg>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">403</h1>
            <h2 className="text-xl font-semibold text-gray-900">Access Denied</h2>
            <p className="mt-2 text-gray-600">You don't have permission to access this resource.</p>
          </div>

          <div className="space-y-3 pt-4">
            <a
              href="/"
              className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Go to Home
            </a>
            <a
              href="/dashboard"
              className="block w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Go to Dashboard
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
