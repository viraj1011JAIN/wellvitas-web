export default function AuthCodeErrorPage() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 px-4 py-12">
      <div className="w-full max-w-md space-y-8">
        <div className="rounded-2xl bg-white p-8 shadow-lg text-center space-y-6">
          <svg className="mx-auto h-16 w-16 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4v.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>

          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Error</h1>
            <h2 className="text-xl font-semibold text-gray-900">Invalid Authentication Code</h2>
            <p className="mt-2 text-gray-600">
              The authentication code is invalid, expired, or has already been used.
            </p>
          </div>

          <div className="rounded-lg bg-amber-50 p-4 border border-amber-200">
            <p className="text-sm text-amber-800">
              <strong>What you can do:</strong>
            </p>
            <ul className="mt-2 space-y-1 text-sm text-amber-800 list-inside">
              <li>• Request a new verification email</li>
              <li>• Check your spam/junk folder</li>
              <li>• Try signing up again if the link expired</li>
            </ul>
          </div>

          <div className="space-y-3 pt-4">
            <a
              href="/signup"
              className="block w-full rounded-lg bg-blue-600 px-4 py-2.5 text-center font-medium text-white hover:bg-blue-700 transition-colors"
            >
              Try Signing Up Again
            </a>
            <a
              href="/login"
              className="block w-full rounded-lg border-2 border-gray-300 px-4 py-2.5 text-center font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Back to Login
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
