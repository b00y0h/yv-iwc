import React, { useEffect } from 'react'
import PrismCode from './prismcode'
import useScript from 'react-script-hook'

const YVSource = 'https://www.youvisit.com/tour/Embed/js3'
const defaultDescription = 'Interactive Image Element'
const defaultUploadDate = '2020-03-31T08:00:00+08:00'

interface JsonLdProps {
  data: Record<string, any>
}

const JsonLd: React.FC<JsonLdProps> = ({ data }) => (
  <script
    type="application/ld+json"
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

interface YouVisitIWCProps {
  containerHeight?: string
  containerWidth?: string
  title?: string
  description?: string
  thumb?: string
  uploadDate?: string
  institution: number
  linkType?: string
  location: number
  type?: string
  stopId?: string
  hoverWidth?: string
  hoverHeight?: string
  iwcWidth?: string
  iwcHeight?: string
  showCode?: boolean
}

const YouVisitIWC: React.FC<YouVisitIWCProps> = ({
  containerHeight = '300px',
  containerWidth = '100%',
  title = 'Launch Experience',
  description = defaultDescription,
  thumb,
  uploadDate = defaultUploadDate,
  institution,
  linkType = 'immersive',
  location,
  type = 'inline-embed',
  stopId,
  hoverWidth = '90%',
  hoverHeight = '70%',
  iwcWidth = '100%',
  iwcHeight = '100%',
  showCode,
  ...otherProps
}) => {
  const [loading, error] = useScript({
    src: YVSource,
    checkForExisting: true,
  })

  useEffect(() => {
    if (!loading && !error) {
      const yvObj = (window as any).YVScript
      yvObj && yvObj.scanEmbeds()
    }

    return () => {
      // Cleanup function to remove YouVisit script and global objects
      if ((window as any).YVScript) {
        delete (window as any).YVScript
      }
      // Find and remove the script tag
      const scriptTags = document.getElementsByTagName('script')
      for (let i = 0; i < scriptTags.length; i++) {
        if (scriptTags[i].src.includes('youvisit.com/tour/Embed')) {
          scriptTags[i].remove()
          break
        }
      }
    }
  }, [loading, error])

  const jsonLdData = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description: description,
    thumbnailUrl: thumb,
    uploadDate: uploadDate,
    publisher: {
      '@type': 'Organization',
      name: 'EAB',
      logo: {
        '@type': 'ImageObject',
        url: 'https://attachment.eab.com/wp-content/uploads/2019/07/EAB-Logo-RGB.png',
        width: 500,
        height: 193,
      },
    },
    contentUrl: 'url of actual tour',
    embedUrl: 'url where the tour has been placed',
    interactionCount: 'locations.views',
  }

  const width = containerWidth
  const height = containerHeight

  const iwcstyle: React.CSSProperties = {
    display: 'block',
    width: width,
    height: height,
  }

  // sets up the correct anchor props
  const anchorProps = Object.fromEntries(
    Object.entries({
      href: 'https://www.youvisit.com',
      title: title,
      'data-inst': institution,
      'data-link-type': linkType,
      'data-loc': location,
      'data-platform': 'v',
      'data-type': type,
      'data-stopid': stopId,
      'data-hover-width': hoverWidth,
      'data-hover-height': hoverHeight,
      'data-image-width': iwcWidth,
      'data-image-height': iwcHeight,
    }).filter(([_, value]) => value !== undefined),
  )

  if (type !== 'hover-panel') {
    anchorProps['data-type'] = type
  }

  // Generate the data attributes string from anchorProps
  const dataAttributesString = Object.entries(anchorProps)
    .filter(([key]) => key.startsWith('data-'))
    .map(([key, value]) => `${key}=${value}`)
    .join('&')

  const codeString = `
    <div style="height: ${containerHeight}; width: ${containerWidth}">
      <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?${dataAttributesString}">Virtual Tour</a>
    </div>
  `

  const codeString2 = `<script async="async" defer="defer" src="https://www.youvisit.com/tour/Embed/js3"></script>`

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
