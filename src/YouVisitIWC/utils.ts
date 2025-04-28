import { PUBLISHER_CONFIG } from './config'
import { JsonLdData } from './types'

export const generateJsonLdData = (
  title: string,
  description: string,
  thumb: string | undefined,
  uploadDate: string
): JsonLdData => ({
  '@context': 'https://schema.org',
  '@type': 'VideoObject',
  name: title,
  description,
  thumbnailUrl: thumb,
  uploadDate,
  publisher: {
    '@type': 'Organization',
    name: PUBLISHER_CONFIG.name,
    logo: {
      '@type': 'ImageObject',
      ...PUBLISHER_CONFIG.logo,
    },
  },
  contentUrl: 'url of actual tour',
  embedUrl: 'url where the tour has been placed',
  interactionCount: 'locations.views',
})

type AnchorProps = {
  href: string
  title: string
  'data-inst': number
  'data-link-type': string
  'data-loc': number
  'data-platform': string
  'data-type': string
  'data-stopid'?: string
  'data-hover-width': string
  'data-hover-height': string
  'data-image-width': string
  'data-image-height': string
}

export const generateAnchorProps = (props: {
  title: string
  institution: number
  linkType: string
  location: number
  type: string
  stopId?: string
  hoverWidth: string
  hoverHeight: string
  iwcWidth: string
  iwcHeight: string
}): AnchorProps => {
  const baseProps: AnchorProps = {
    href: 'https://www.youvisit.com',
    title: props.title,
    'data-inst': props.institution,
    'data-link-type': props.linkType,
    'data-loc': props.location,
    'data-platform': 'v',
    'data-type': props.type,
    'data-hover-width': props.hoverWidth,
    'data-hover-height': props.hoverHeight,
    'data-image-width': props.iwcWidth,
    'data-image-height': props.iwcHeight,
  }

  if (props.stopId) {
    baseProps['data-stopid'] = props.stopId
  }

  if (props.type !== 'hover-panel') {
    baseProps['data-type'] = props.type
  }

  return baseProps
}

export const generateDataAttributesString = (
  anchorProps: AnchorProps
): string => {
  const entries = Object.entries(anchorProps).filter(([key]) =>
    key.startsWith('data-')
  )

  return entries
    .map(
      ([key, value], index) => `    ${index === 0 ? '?' : '&'}${key}=${value}`
    )
    .join('\n')
}
