/* eslint-disable react/prop-types */
/* eslint no-undef: 0 */
import React from 'react'
import PrismCode from './prismcode'
import useScript from 'react-script-hook'
// import useScript from './useScript';

const JsonLd = ({ data }) => (
  <script
    type='application/ld+json'
    dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
  />
)

const YouVisitIWC = (props) => {
  const { containerHeight, containerWidth } = props
  const data = {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: props.title,
    description: props.description
      ? props.description
      : 'Interactive Image Element',
    thumbnailUrl: props.thumb ? props.thumb : '',
    uploadDate: props.uploadDate
      ? props.uploadDate
      : '2020-03-31T08:00:00+08:00',
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

  const YVSource = 'https://www.youvisit.com/tour/Embed/js3'
  // const status = useScript(YVSource);
  // const [loading, error] = useScript({ src: YVSource });

  useScript({
    src: YVSource,
    onload: () => {
      const yvObj = window.YVScript
      yvObj && yvObj.scanEmbeds()
    }
  })

  const width = containerWidth
  const height = containerHeight

  // useEffect(() => {
  //   const yvObj = window.YVScript;
  //   if (status === "ready") {
  //     yvObj && yvObj.scanEmbeds();
  //   }
  // });

  const iwcstyle = {
    // border: "5px solid pink",
    display: 'block',
    width: `${width}`,
    height: `${height}`
  }

  // sets up the correct anchor props
  const anchorProps = {
    href: 'https://www.youvisit.com',
    title: props.title,
    'data-inst': props.institution,
    'data-link-type': props.linkType,
    'data-loc': props.location,
    'data-platform': 'v',
    'data-type': props.type,
    'data-stopid': props.stopId,
    'data-hover-width': props.hoverWidth,
    'data-hover-height': props.hoverHeight,
    'data-image-width': props.iwcWidth,
    'data-image-height': props.iwcHeight
  }
  if (props.type === 'hover-panel') {
    delete anchorProps['data-type']
  }
  if (typeof props.stopId === 'undefined') {
    delete anchorProps['data-stopid']
  }
  if (typeof props.location === 'undefined' || props.location === null) {
    delete anchorProps['data-loc']
  }

  const codeString = `<div style="height: ${props.containerHeight}; width: ${props.containerWidth}">
  <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/?data-platform=v&data-link-type=immersive&data-inst=${props.institution}&data-image-width=100%&data-image-height=100%&data-loc=${props.location}">Launch Experience</a>
</div>
  `

  let formattedCode
  if (props.showCode) {
    formattedCode = (
      <>
        <h3>Place the HTML below anywhere on your page to display your IWC.</h3>
        <PrismCode code={codeString} language='html' plugins={['line-numbers']} />
      </>
    )
  }

  const codeString2 = `<script async="async" defer="defer" src="https://www.youvisit.com/tour/Embed/js3"></script>`
  let secondFormattedCode
  if (props.showCode) {
    secondFormattedCode = (
      <>
        <h3>Place the script below anywhere on the same page as HTML above:</h3>
        <PrismCode code={codeString2} language='html' plugins={['line-numbers']} />
      </>
    )
  }

  return (
    <>
      <div className='iwc' style={iwcstyle}>
        <a className='virtualtour_embed' {...anchorProps}>
          Virtual Tour
        </a>
      </div>
      {formattedCode}
      {secondFormattedCode}
      <JsonLd data={data} />
    </>
  )
}

export default YouVisitIWC

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
