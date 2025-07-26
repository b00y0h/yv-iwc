'use client'

import { YouVisitIWC } from '@ux_bob/yv-iwc'
import { useEffect } from 'react'

export default function DebugPage() {
  useEffect(() => {
    // Debug: Check if the anchor element is being rendered correctly
    const checkAnchor = () => {
      const anchor = document.querySelector('.virtualtour_embed')
      console.log('Anchor element found:', anchor)
      if (anchor) {
        console.log('Anchor attributes:', {
          'data-inst': anchor.getAttribute('data-inst'),
          'data-location': anchor.getAttribute('data-location'),
          'data-link-type': anchor.getAttribute('data-link-type'),
          'data-type': anchor.getAttribute('data-type'),
          'data-hover-width': anchor.getAttribute('data-hover-width'),
          'data-hover-height': anchor.getAttribute('data-hover-height'),
          'data-iwc-width': anchor.getAttribute('data-iwc-width'),
          'data-iwc-height': anchor.getAttribute('data-iwc-height'),
        })
      }
    }

    // Check immediately and after a delay
    checkAnchor()
    setTimeout(checkAnchor, 1000)
    setTimeout(checkAnchor, 3000)

    // Check if YouVisit script is loaded
    const checkScript = () => {
      console.log('YVScript available:', typeof window.YVScript !== 'undefined')
      if (window.YVScript) {
        console.log('YVScript methods:', Object.keys(window.YVScript))
      }
    }

    // Check for transformation
    const checkTransformation = () => {
      const anchors = document.querySelectorAll('.virtualtour_embed')
      const iframes = document.querySelectorAll(
        'iframe[id^="virtualtour_iframe"]'
      )
      const containers = document.querySelectorAll(
        '.youvisitInlineframeContainer'
      )

      console.log('Transformation status:', {
        anchorsFound: anchors.length,
        iframesFound: iframes.length,
        containersFound: containers.length,
        anchorsStillVisible: Array.from(anchors).map((a) => ({
          visible: (a as HTMLElement).offsetParent !== null,
          innerHTML: a.innerHTML,
          attributes: Array.from(a.attributes).reduce(
            (acc: Record<string, string>, attr) => {
              acc[attr.name] = attr.value
              return acc
            },
            {}
          ),
        })),
      })

      if (iframes.length > 0) {
        console.log('SUCCESS: Virtual tour iframe found!')
        console.log('Iframe src:', (iframes[0] as HTMLIFrameElement).src)
      } else {
        console.log('ISSUE: No virtual tour iframe found')
      }
    }

    setTimeout(checkScript, 2000)
    setTimeout(checkScript, 5000)
    setTimeout(checkTransformation, 3000)
    setTimeout(checkTransformation, 6000)
    setTimeout(checkTransformation, 10000)
  }, [])

  return (
    <div style={{ padding: '20px' }}>
      <h1>Debug Page - YouVisit IWC</h1>
      <p>Check the browser console for debug information.</p>

      <div
        style={{ border: '2px solid red', padding: '20px', margin: '20px 0' }}
      >
        <h2>Component with Debug Border</h2>
        <YouVisitIWC
          containerWidth="100%"
          containerHeight="400px"
          title="University of Oklahoma Online - Debug"
          institution={61112}
          location={144661}
          showCode={false}
        />
      </div>

      <div
        style={{ border: '2px solid blue', padding: '20px', margin: '20px 0' }}
      >
        <h2>Manual HTML Test (Should Work)</h2>
        <div style={{ width: '100%', height: '400px' }}>
          <a
            className="virtualtour_embed"
            href="https://www.youvisit.com/#/vte/?data-inst=61112&data-link-type=immersive&data-loc=144661&data-platform=v&data-type=inline-embed&data-hover-width=90%25&data-hover-height=70%25&data-image-width=100%25&data-image-height=100%25"
          >
            Virtual Tour Manual
          </a>
        </div>
      </div>

      <div
        style={{
          marginTop: '20px',
          padding: '15px',
          backgroundColor: '#f0f0f0',
        }}
      >
        <h3>Expected Anchor Element Structure:</h3>
        <pre style={{ fontSize: '12px', overflow: 'auto' }}>
          {`<a class="virtualtour_embed"
   href="https://www.youvisit.com/#/vte/?data-inst=61112&data-link-type=immersive&data-loc=144661&data-platform=v&data-type=inline-embed&data-hover-width=90%&data-hover-height=70%&data-image-width=100%&data-image-height=100%">
  Virtual Tour
</a>`}
        </pre>
      </div>
    </div>
  )
}
