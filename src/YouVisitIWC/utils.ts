import { YV_SOURCE } from './config'
import { YouVisitIWCProps, JsonLdData } from './types'

export const generateJsonLdData = (
  title: string,
  description: string,
  thumb?: string,
  uploadDate?: string
): JsonLdData => {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl: thumb,
    uploadDate: uploadDate || new Date().toISOString(),
    publisher: {
      '@type': 'Organization' as const,
      name: 'YouVisit',
      logo: {
        '@type': 'ImageObject' as const,
        url: 'https://www.youvisit.com/logo.png',
        width: 200,
        height: 60,
      },
    },
    contentUrl: YV_SOURCE,
    embedUrl: YV_SOURCE,
    interactionCount: '0',
  }
}

export const generateAnchorProps = ({
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
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
}: Pick<
  YouVisitIWCProps,
  | 'title'
  | 'institution'
  | 'linkType'
  | 'location'
  | 'type'
  | 'stopId'
  | 'hoverWidth'
  | 'hoverHeight'
  | 'iwcWidth'
  | 'iwcHeight'
>) => {
  // Generate href URL with all parameters - NO data attributes on the element
  const urlParams = new URLSearchParams()
  if (institution !== undefined)
    urlParams.set('data-inst', institution.toString())
  if (linkType !== undefined) urlParams.set('data-link-type', linkType)
  if (location !== undefined) urlParams.set('data-loc', location.toString())
  urlParams.set('data-platform', 'v')
  if (type !== undefined) urlParams.set('data-type', type)
  if (hoverWidth !== undefined) urlParams.set('data-hover-width', hoverWidth)
  if (hoverHeight !== undefined) urlParams.set('data-hover-height', hoverHeight)
  if (iwcWidth !== undefined) urlParams.set('data-image-width', iwcWidth)
  if (iwcHeight !== undefined) urlParams.set('data-image-height', iwcHeight)
  if (stopId !== undefined) urlParams.set('data-stop', stopId)

  // Return ONLY the href - no data attributes
  return {
    href: `https://www.youvisit.com/#/vte/?${urlParams.toString()}`,
  }
}

/**
 * Utility function for combining default and custom class names
 * @param defaultClass - The default CSS class name
 * @param customClass - Optional custom class name to append
 * @returns Combined class names string
 */
export const combineClasses = (
  defaultClass: string,
  customClass?: string
): string => {
  return customClass ? `${defaultClass} ${customClass}` : defaultClass
}
