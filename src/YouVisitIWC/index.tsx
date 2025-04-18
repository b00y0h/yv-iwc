import React, { useEffect } from 'react'
import useScript from 'react-script-hook'
import PrismCode from './prismcode'
import JsonLd from './components/JsonLd'
import { YouVisitIWCProps } from './types'
import { YV_SOURCE, DEFAULT_DESCRIPTION, DEFAULT_UPLOAD_DATE } from './config'
import {
  generateJsonLdData,
  generateAnchorProps,
  generateDataAttributesString,
} from './utils'

declare global {
  interface Window {
    YVScript?: {
      scanEmbeds(): void
    }
  }
}

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
}) => {
  const [loading, error] = useScript({
    src: YV_SOURCE,
    checkForExisting: true,
  })

  useEffect(() => {
    if (window.YVScript && !loading && !error) {
      window.YVScript.scanEmbeds()
    }

    return () => {
      if (window.YVScript) {
        window.YVScript = undefined
      }
      const selector = 'script[src*="youvisit.com/tour/Embed"]'
      const scripts = document.querySelectorAll(selector)
      scripts.forEach((tag) => tag.remove())
    }
  }, [loading, error])

  const jsonLdData = generateJsonLdData(title, description, thumb, uploadDate)

  const iwcstyle: React.CSSProperties = {
    display: 'block',
    width: containerWidth,
    height: containerHeight,
  }

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

  const dataAttributesString = generateDataAttributesString(anchorProps)

  const codeString = `
    <div style="height: ${containerHeight}; width: ${containerWidth}">
      <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?${dataAttributesString}">Virtual Tour</a>
    </div>
  `

  const codeString2 = `<script async="async" defer="defer" src="${YV_SOURCE}"></script>`

  return (
    <>
      <div className="iwc" style={iwcstyle}>
        <a className="virtualtour_embed" {...anchorProps}>
          Virtual Tour
        </a>
      </div>
      {showCode && (
        <>
          <h3>
            Place the HTML below anywhere on your page to display your IWC:
          </h3>
          <PrismCode
            code={codeString}
            language="html"
            plugins={['line-numbers']}
          />
          <h3>
            Place the script below anywhere on the same page as HTML above:
          </h3>
          <PrismCode
            code={codeString2}
            language="html"
            plugins={['line-numbers']}
          />
        </>
      )}
      <JsonLd data={jsonLdData} />
    </>
  )
}

export default YouVisitIWC
