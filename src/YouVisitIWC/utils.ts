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
  const props: Record<string, string | number> = {}

  // Only add properties that have defined values
  if (institution !== undefined) props['data-inst'] = institution
  if (linkType !== undefined) props['data-link-type'] = linkType
  if (location !== undefined) props['data-location'] = location
  if (type !== undefined) props['data-type'] = type
  if (hoverWidth !== undefined) props['data-hover-width'] = hoverWidth
  if (hoverHeight !== undefined) props['data-hover-height'] = hoverHeight
  if (iwcWidth !== undefined) props['data-iwc-width'] = iwcWidth
  if (iwcHeight !== undefined) props['data-iwc-height'] = iwcHeight
  if (stopId !== undefined) props['data-stop'] = stopId

  return props
}

export const generateDataAttributesString = (
  anchorProps: Record<string, string | number>,
  options: { pretty?: boolean } = {}
) => {
  const { pretty = false } = options
  const separator = pretty ? '\n     ' : '&'

  return Object.entries(anchorProps)
    .map(([key, value]) => `${key}=${value}`)
    .join(separator)
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
