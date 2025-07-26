/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState, useEffect } from 'react'
import { YV_SOURCE, DEFAULT_DESCRIPTION, DEFAULT_UPLOAD_DATE } from './config'
import { YouVisitIWCProps } from './types'
import JsonLd from './components/JsonLd'
import {
  generateJsonLdData,
  generateAnchorProps,
  combineClasses,
} from './utils'
import { useScript } from '../hooks/useScript'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { prism as coldarkCold } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CopyToClipboard from './components/copy-to-clipboard'
import './YouVisitIWC.css'

// Move language registration inside the component
const YouVisitIWC: React.FC<YouVisitIWCProps> = ({
  containerHeight = '300px',
  containerWidth = '100%',
  title = 'Launch Experience',
  description = DEFAULT_DESCRIPTION,
  thumb,
  uploadDate = DEFAULT_UPLOAD_DATE,
  institution = 0,
  linkType = 'immersive',
  location = 0,
  type = 'inline-embed',
  stopId,
  hoverWidth = '90%',
  hoverHeight = '70%',
  iwcWidth = '100%',
  iwcHeight = '100%',
  showCode,
  className,
  codeContainerClassName,
  copyButtonClassName,
  headingClassName,
}) => {
  const [isReady, setIsReady] = useState(false)
  const jsonLdData = generateJsonLdData(title, description, thumb, uploadDate)

  const status = useScript(YV_SOURCE, {
    removeOnUnmount: false,
  })

  useEffect(() => {
    if (
      status === 'ready' &&
      typeof window !== 'undefined' &&
      window.YVScript
    ) {
      // console.log('YVScript ready, calling scanEmbeds')
      // console.log(
      //   'Anchor elements found:',
      //   document.querySelectorAll('.virtualtour_embed')
      // )
      window.YVScript.scanEmbeds()
      setIsReady(true)
    }
  }, [status])

  // Additional effect to try scanning embeds after a delay
  useEffect(() => {
    if (status === 'ready') {
      const timer = setTimeout(() => {
        if (typeof window !== 'undefined' && window.YVScript) {
          // console.log('Delayed scanEmbeds call')
          // console.log(
          //   'Anchor elements found (delayed):',
          //   document.querySelectorAll('.virtualtour_embed')
          // )
          window.YVScript.scanEmbeds()

          // Check if transformation happened
          setTimeout(() => {
            const iframes = document.querySelectorAll(
              'iframe[id^="virtualtour_iframe"]'
            )
            const containers = document.querySelectorAll(
              '.youvisitInlineframeContainer'
            )
            // console.log('Transformation check:', {
            //   iframes: iframes.length,
            //   containers: containers.length,
            //   anchorsRemaining:
            //     document.querySelectorAll('.virtualtour_embed').length,
            // })
          }, 2000)
        }
      }, 1000)
      return () => clearTimeout(timer)
    }
  }, [status])

  const anchorProps = generateAnchorProps({
    title,
    institution,
    linkType,
    location,
    type,
    stopId,
    hoverWidth,
    hoverHeight,
    iwcWidth,
    iwcHeight,
  })

  // Generate code strings for display
  const { href } = anchorProps

  // Generate single-line version for copying
  const codeStringCopy = `<div style="height: ${containerHeight}; width: ${containerWidth}"><a href="${href}">Virtual Tour</a></div>`

  // Generate pretty version for display
  const codeStringDisplay = `<div style="height: ${containerHeight}; width: ${containerWidth}">
  <a href="${href}">
    Virtual Tour
  </a>
</div>`

  const codeString2 = `<script async="async" defer="defer" src="${YV_SOURCE}"></script>`

  return (
    <>
      <div
        className={combineClasses(
          `yv-iwc-container${isReady ? ' ready' : ''}`,
          className
        )}
        style={{ width: containerWidth, height: containerHeight }}
      >
        <a
          className="virtualtour_embed"
          {...anchorProps}
          title="Launch Experience"
          ref={(el) => {
            if (el) {
              // console.log('Anchor element mounted:', el)
              // console.log('Element class:', el.className)
              // console.log('Element in DOM:', document.contains(el))
              // console.log('Anchor attributes:', {
              //   'data-inst': el.getAttribute('data-inst'),
              //   'data-link-type': el.getAttribute('data-link-type'),
              //   'data-loc': el.getAttribute('data-loc'),
              //   'data-platform': el.getAttribute('data-platform'),
              //   'data-type': el.getAttribute('data-type'),
              //   'data-hover-width': el.getAttribute('data-hover-width'),
              //   'data-hover-height': el.getAttribute('data-hover-height'),
              //   'data-image-width': el.getAttribute('data-image-width'),
              //   'data-image-height': el.getAttribute('data-image-height'),
              //   href: el.getAttribute('href'),
              // })
              // console.log(
              //   'All element attributes:',
              //   Array.from(el.attributes)
              //     .map((attr) => `${attr.name}="${attr.value}"`)
              //     .join(' ')
              // )

              if (
                status === 'ready' &&
                typeof window !== 'undefined' &&
                window.YVScript
              ) {
                // Try scanning immediately when element is mounted
                setTimeout(() => {
                  // console.log('Scanning embeds after anchor mount')
                  // console.log(
                  //   'Elements with virtualtour_embed class:',
                  //   document.querySelectorAll('.virtualtour_embed').length
                  // )
                  if (typeof window !== 'undefined' && window.YVScript) {
                    window.YVScript.scanEmbeds()

                    // Check if transformation happened
                    setTimeout(() => {
                      const stillAnchors =
                        document.querySelectorAll('.virtualtour_embed')
                      const iframes = document.querySelectorAll(
                        'iframe[id^="virtualtour_iframe"]'
                      )
                      const containers = document.querySelectorAll(
                        '.youvisitInlineframeContainer'
                      )
                      // console.log('After scanEmbeds:', {
                      //   anchorsRemaining: stillAnchors.length,
                      //   iframesCreated: iframes.length,
                      //   containersCreated: containers.length,
                      // })
                    }, 1000)
                  }
                }, 100)
              }
            }
          }}
        >
          Virtual Tour
        </a>
      </div>
      {showCode && (
        <>
          <h3 className={combineClasses('yv-iwc-heading', headingClassName)}>
            Place the HTML below anywhere on your page to display your IWC:
          </h3>
          <div
            className={combineClasses(
              'yv-iwc-code-container',
              codeContainerClassName
            )}
          >
            <SyntaxHighlighter
              language="html"
              style={coldarkCold}
              customStyle={{
                margin: '1rem 0',
                borderRadius: '4px',
                userSelect: 'none',
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {codeStringDisplay}
            </SyntaxHighlighter>
            <div
              className={combineClasses(
                'yv-iwc-copy-button-container',
                copyButtonClassName
              )}
            >
              <CopyToClipboard
                textData={codeStringCopy}
                // buttonTextPreCopy="Copy too clipboard"
                buttonClassName={copyButtonClassName}
              />
            </div>
          </div>

          <h3 className={combineClasses('yv-iwc-heading', headingClassName)}>
            Place the script below anywhere on the same page as HTML above:
          </h3>
          <div
            className={combineClasses(
              'yv-iwc-code-container',
              codeContainerClassName
            )}
          >
            <SyntaxHighlighter
              language="html"
              style={coldarkCold}
              customStyle={{
                margin: '1rem 0',
                borderRadius: '4px',
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {codeString2.trim()}
            </SyntaxHighlighter>
            <div
              className={combineClasses(
                'yv-iwc-copy-button-container',
                copyButtonClassName
              )}
            >
              <CopyToClipboard
                textData={codeString2}
                buttonTextPreCopy="Copy to clipboard"
                buttonClassName={copyButtonClassName}
              />
            </div>
          </div>
        </>
      )}
      <JsonLd data={jsonLdData} />
    </>
  )
}

export default YouVisitIWC
