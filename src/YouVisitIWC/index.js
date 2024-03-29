/* eslint-disable react/prop-types */
/* eslint no-undef: 0 */
import React from 'react'
import PrismCode from './prismcode'
import PropTypes from 'prop-types'
import useScript from 'react-script-hook'

const YVSource = 'https://www.youvisit.com/tour/Embed/js3'
const defaultDescription = 'Interactive Image Element'
const defaultUploadDate = '2020-03-31T08:00:00+08:00'

const JsonLd = ({ data }) => (
  <script
    type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

JsonLd.propTypes = {
  data: PropTypes.object.isRequired
}

const YouVisitIWC = ({
  containerHeight,
  containerWidth,
  title,
  description = defaultDescription,
  thumb,
  uploadDate = defaultUploadDate,
  institution,
  linkType,
  location,
  type,
  stopId,
  hoverWidth,
  hoverHeight,
  iwcWidth,
  iwcHeight,
  showCode,
  ...otherProps
}) => {
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
        url:
          'https://attachment.eab.com/wp-content/uploads/2019/07/EAB-Logo-RGB.png',
        width: 500,
        height: 193
      }
    },
    contentUrl: 'url of actual tour',
    embedUrl: 'url where the tour has been placed',
    interactionCount: 'locations.views'
  }

  useScript({
    src: YVSource,
    onload: () => {
      const yvObj = window.YVScript
      yvObj && yvObj.scanEmbeds()
    }
  })

  const width = containerWidth
  const height = containerHeight

  const iwcstyle = {
    display: 'block',
    width: `${width}`,
    height: `${height}`
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
      'data-image-height': iwcHeight
    }).filter(([key, value]) => value !== undefined)
  )
  if (type !== 'hover-panel') {
    anchorProps['data-type'] = type
  }

  // Generate the data attributes string from anchorProps
  const dataAttributesString = Object.entries(anchorProps)
    .filter(([key]) => key.startsWith('data-')) // Only include data-* properties
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
      <div className='iwc' style={iwcstyle}>
        <a className='virtualtour_embed' {...anchorProps}>
          Virtual Tour
        </a>
      </div>
      {showCode && (
        <>
          <h3>Place the HTML below anywhere on your page to display your IWC.</h3>
          <PrismCode code={codeString} language='html' plugins={['line-numbers']} />
          <h3>Place the script below anywhere on the same page as HTML above:</h3>
          <PrismCode code={codeString2} language='html' plugins={['line-numbers']} />
        </>
      )}
      <JsonLd data={jsonLdData} />
    </>
  )
}

export default YouVisitIWC

YouVisitIWC.propTypes = {
  containerHeight: PropTypes.string,
  containerWidth: PropTypes.string,
  title: PropTypes.string,
  description: PropTypes.string,
  thumb: PropTypes.string,
  uploadDate: PropTypes.string,
  linkType: PropTypes.string,
  institution: PropTypes.number.isRequired,
  location: PropTypes.number.isRequired,
  type: PropTypes.string,
  stopId: PropTypes.string,
  hoverWidth: PropTypes.string,
  hoverHeight: PropTypes.string,
  iwcWidth: PropTypes.string,
  iwcHeight: PropTypes.string,
  showCode: PropTypes.bool
}

YouVisitIWC.defaultProps = {
  containerHeight: '300px',
  containerWidth: '100%',
  title: 'Launch Experience',
  linkType: 'immersive',
  type: 'inline-embed',
  iwcWidth: '100%',
  iwcHeight: '100%',
  hoverWidth: '90%',
  hoverHeight: '70%',
  loadStopOnly: '0',
  experience_type: 'iwc'
}
