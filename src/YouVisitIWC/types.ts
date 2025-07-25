declare global {
  interface Window {
    YVScript?: {
      scanEmbeds(): void
    }
  }
}

interface Publisher {
  '@type': 'Organization'
  name: string
  logo: {
    '@type': 'ImageObject'
    url: string
    width: number
    height: number
  }
}

export interface JsonLdData {
  '@context': string
  '@type': string
  name: string
  description: string
  thumbnailUrl?: string
  uploadDate: string
  publisher: Publisher
  contentUrl: string
  embedUrl: string
  interactionCount: string
}

export interface JsonLdProps {
  data: JsonLdData
}

export interface YouVisitIWCProps {
  containerHeight?: string
  containerWidth?: string
  title?: string
  description?: string
  thumb?: string
  uploadDate?: string
  institution?: number
  linkType?: string
  location?: number
  type?: string
  stopId?: string
  hoverWidth?: string
  hoverHeight?: string
  iwcWidth?: string
  iwcHeight?: string
  showCode?: boolean

  // Styling customization props
  className?: string // Main container
  codeContainerClassName?: string // Code snippet containers
  copyButtonClassName?: string // Copy to clipboard buttons
  headingClassName?: string // Section headings
}

// This empty export makes this file a module
export {}
