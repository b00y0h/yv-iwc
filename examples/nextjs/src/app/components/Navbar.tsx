import Link from 'next/link'

export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 mb-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <h1 className="text-xl font-semibold text-gray-900">
              YouVisit IWC Test
            </h1>
            <div className="flex space-x-4">
              <Link
                href="/"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Full Test Suite
              </Link>
              <Link
                href="/2"
                className="text-blue-600 hover:text-blue-800 font-medium"
              >
                Isolated Test
              </Link>
            </div>
          </div>
          <div className="text-sm text-gray-500">
            Testing new styling architecture
          </div>
        </div>
      </div>
    </nav>
  )
}
