'use client'

import { useEffect } from 'react'

export default function SimpleTest() {
  useEffect(() => {
    // Load the YouVisit script manually
    const script = document.createElement('script')
    script.src = 'https://www.youvisit.com/tour/Embed/js3'
    script.async = true
    script.onload = () => {
      console.log(
        'Script loaded, YVScript available:',
        typeof window.YVScript !== 'undefined'
      )
      if (window.YVScript) {
        console.log('YVScript methods:', Object.keys(window.YVScript))
        // Try scanning after a delay
        setTimeout(() => {
          console.log('Calling scanEmbeds...')
          if (window.YVScript) {
            window.YVScript.scanEmbeds()
          }

          // Check results after another delay
          setTimeout(() => {
            const iframes = document.querySelectorAll(
              'iframe[id^="virtualtour_iframe"]'
            )
            const containers = document.querySelectorAll(
              '.youvisitInlineframeContainer'
            )
            console.log('Found iframes:', iframes.length)
            console.log('Found containers:', containers.length)
          }, 2000)
        }, 1000)
      }
    }
    script.onerror = (error) => {
      console.error('Script failed to load:', error)
    }
    document.head.appendChild(script)

    return () => {
      script.remove()
    }
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Simple YouVisit Test</h1>
      <p>Check the browser console for debug information.</p>

      <div
        style={{
          border: '2px solid blue',
          padding: '20px',
          margin: '20px 0',
          width: '100%',
          height: '400px',
        }}
      >
        <h2>Manual Anchor Element</h2>
        <a
          className="virtualtour_embed"
          href="https://www.youvisit.com/#/vte/?data-inst=61112&data-link-type=immersive&data-loc=144661&data-platform=v&data-type=inline-embed&data-hover-width=90%25&data-hover-height=70%25&data-image-width=100%25&data-image-height=100%25"
        >
          Virtual Tour
        </a>
      </div>

      <div style={{ marginTop: '20px', fontSize: '14px', color: '#666' }}>
        <p>
          Expected behavior: The anchor element above should be replaced with an
          iframe after the script loads.
        </p>
        <p>
          Current domain:{' '}
          {typeof window !== 'undefined' ? window.location.hostname : 'unknown'}
        </p>
      </div>
    </div>
  )
}
