import { YV_SOURCE } from './config'
import { YouVisitIWCProps } from './types'

export const generateJsonLdData = (
  title: string,
  description: string,
  thumb?: string,
  uploadDate?: string
) => {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: title,
    description,
    thumbnailUrl: thumb,
    uploadDate,
    embedUrl: YV_SOURCE,
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
  const props: Record<string, string | number> = {
    'data-inst': institution,
    'data-link-type': linkType,
    'data-location': location,
    'data-type': type,
    'data-hover-width': hoverWidth,
    'data-hover-height': hoverHeight,
    'data-iwc-width': iwcWidth,
    'data-iwc-height': iwcHeight,
  }

  if (stopId) {
    props['data-stop'] = stopId
  }

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
