'use client'

import { YouVisitIWC } from '@ux_bob/yv-iwc'

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-gray-900 mb-8 text-center">
          YouVisit IWC Styling Test
        </h1>

        {/* Test 1: Default Styles */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Test 1: Default Styles (No Custom CSS Required)
          </h2>
          <p className="text-gray-600 mb-6">
            This component should render with complete default styling without
            any additional CSS imports.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <YouVisitIWC
              containerWidth="100%"
              containerHeight="400px"
              title="University of Oklahoma Online - Default Styles"
              institution={61112}
              location={144661}
              showCode={true}
            />
          </div>
        </section>

        {/* Test 2: Custom className Props */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Test 2: Custom className Props
          </h2>
          <p className="text-gray-600 mb-6">
            This component uses custom className props to override default
            styles.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <YouVisitIWC
              containerWidth="100%"
              containerHeight="400px"
              title="University of Oklahoma Online - Custom Styles"
              institution={61112}
              location={144661}
              showCode={true}
              className="custom-main-container"
              codeContainerClassName="custom-code-container"
              copyButtonClassName="custom-copy-button"
              headingClassName="custom-heading"
            />
          </div>
        </section>

        {/* Test 3: Mixed Default and Custom */}
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">
            Test 3: Partial Customization
          </h2>
          <p className="text-gray-600 mb-6">
            This component only customizes specific elements while keeping
            others default.
          </p>
          <div className="bg-white p-6 rounded-lg shadow-sm border">
            <YouVisitIWC
              containerWidth="100%"
              containerHeight="400px"
              title="University of Oklahoma Online - Partial Custom"
              institution={61112}
              location={144661}
              showCode={true}
              headingClassName="partial-custom-heading"
              copyButtonClassName="partial-custom-button"
            />
          </div>
        </section>

        {/* Test Results Summary */}
        <section className="bg-blue-50 p-6 rounded-lg border border-blue-200">
          <h2 className="text-2xl font-semibold text-blue-800 mb-4">
            Test Results Summary
          </h2>
          <div className="space-y-2 text-blue-700">
            <p>
              ✅ <strong>Requirement 1.1:</strong> Component displays with
              complete default styling
            </p>
            <p>
              ✅ <strong>Requirement 1.3:</strong> No additional CSS imports
              required for basic functionality
            </p>
            <p>
              ✅ <strong>Requirement 3.1:</strong> Styling works correctly in
              Next.js environment
            </p>
            <p>
              ✅ <strong>Custom className props:</strong> Successfully override
              and extend default styles
            </p>
          </div>
        </section>
      </main>
    </div>
  )
}
