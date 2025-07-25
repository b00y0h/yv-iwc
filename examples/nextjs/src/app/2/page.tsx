'use client'

// This page tests the component with ZERO additional CSS imports
// to verify that default styles work out-of-the-box
import { YouVisitIWC } from '@ux_bob/yv-iwc'
import Navbar from '../components/Navbar'

export default function IsolatedTest() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      <Navbar />
      <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
        <h1 style={{ color: '#333', marginBottom: '20px' }}>
          Isolated Test - No Additional CSS Imports
        </h1>

        <p style={{ color: '#666', marginBottom: '30px' }}>
          This page imports ONLY the YouVisitIWC component with no additional
          CSS. All styling should come from the component&apos;s built-in CSS.
        </p>

        <div
          style={{
            border: '1px solid #ddd',
            padding: '20px',
            borderRadius: '8px',
            backgroundColor: '#fafafa',
          }}
        >
          <h2 style={{ color: '#333', marginBottom: '15px' }}>
            Test: Component with Default Styles Only
          </h2>

          <YouVisitIWC
            containerWidth="100%"
            containerHeight="400px"
            title="University of Oklahoma Online - Isolated Test"
            institution={139387}
            location={144388}
            showCode={true}
          />
        </div>

        <div
          style={{
            marginTop: '30px',
            padding: '15px',
            backgroundColor: '#e8f5e8',
            borderRadius: '6px',
            border: '1px solid #4caf50',
          }}
        >
          <h3 style={{ color: '#2e7d32', margin: '0 0 10px 0' }}>
            ✅ Requirements Verification
          </h3>
          <ul style={{ color: '#2e7d32', margin: 0, paddingLeft: '20px' }}>
            <li>
              <strong>Requirement 1.1:</strong> Component renders with complete
              default styling
            </li>
            <li>
              <strong>Requirement 1.3:</strong> No additional CSS imports
              required
            </li>
            <li>
              <strong>Requirement 3.1:</strong> Works correctly in Next.js
              environment
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}
