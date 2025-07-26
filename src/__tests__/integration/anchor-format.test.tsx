import { describe, expect, it } from 'vitest'
import { render } from '@testing-library/react'
import YouVisitIWC from '../../YouVisitIWC/YouVisitIWC'

describe('YouVisitIWC Anchor Format', () => {
  it('should render anchor element with ONLY href attribute (no data attributes)', () => {
    const { container } = render(
      <YouVisitIWC
        containerWidth="100%"
        containerHeight="400px"
        title="Test Tour"
        institution={61112}
        location={144661}
        showCode={false}
      />
    )

    const anchor = container.querySelector('.virtualtour_embed')
    expect(anchor).toBeTruthy()

    // Get all attributes
    const attributes = Array.from(anchor!.attributes)

    // Should have exactly 3 attributes: class, href, title
    expect(attributes).toHaveLength(3)

    // Check each expected attribute exists
    expect(anchor!.getAttribute('class')).toBe('virtualtour_embed')
    expect(anchor!.getAttribute('href')).toContain(
      'https://www.youvisit.com/#/vte/?'
    )
    expect(anchor!.getAttribute('title')).toBe('Launch Experience')

    // Verify NO data attributes are present
    const dataAttributes = attributes.filter((attr) =>
      attr.name.startsWith('data-')
    )
    expect(dataAttributes).toHaveLength(0)

    // Specifically check that common data attributes are NOT present
    expect(anchor!.getAttribute('data-inst')).toBeNull()
    expect(anchor!.getAttribute('data-location')).toBeNull()
    expect(anchor!.getAttribute('data-loc')).toBeNull()
    expect(anchor!.getAttribute('data-link-type')).toBeNull()
    expect(anchor!.getAttribute('data-type')).toBeNull()
    expect(anchor!.getAttribute('data-platform')).toBeNull()
    expect(anchor!.getAttribute('data-hover-width')).toBeNull()
    expect(anchor!.getAttribute('data-hover-height')).toBeNull()
    expect(anchor!.getAttribute('data-iwc-width')).toBeNull()
    expect(anchor!.getAttribute('data-iwc-height')).toBeNull()
    expect(anchor!.getAttribute('data-image-width')).toBeNull()
    expect(anchor!.getAttribute('data-image-height')).toBeNull()
  })

  it('should include all parameters in href URL only', () => {
    const { container } = render(
      <YouVisitIWC
        containerWidth="100%"
        containerHeight="400px"
        title="Test Tour"
        institution={61112}
        location={144661}
        linkType="immersive"
        type="inline-embed"
        hoverWidth="90%"
        hoverHeight="70%"
        iwcWidth="100%"
        iwcHeight="100%"
        showCode={false}
      />
    )

    const anchor = container.querySelector('.virtualtour_embed')
    const href = anchor!.getAttribute('href')!

    // Verify all parameters are in the href URL
    expect(href).toContain('data-inst=61112')
    expect(href).toContain('data-link-type=immersive')
    expect(href).toContain('data-loc=144661')
    expect(href).toContain('data-platform=v')
    expect(href).toContain('data-type=inline-embed')
    expect(href).toContain('data-hover-width=90%25')
    expect(href).toContain('data-hover-height=70%25')
    expect(href).toContain('data-image-width=100%25')
    expect(href).toContain('data-image-height=100%25')
  })

  it('should render correct HTML structure', () => {
    const { container } = render(
      <YouVisitIWC
        containerWidth="100%"
        containerHeight="400px"
        title="Test Tour"
        institution={61112}
        location={144661}
        showCode={false}
      />
    )

    const anchor = container.querySelector('.virtualtour_embed')

    // Verify the exact HTML structure
    expect(anchor!.tagName).toBe('A')
    expect(anchor!.className).toBe('virtualtour_embed')
    expect(anchor!.textContent).toBe('Virtual Tour')

    // Verify the href format
    const href = anchor!.getAttribute('href')!
    expect(href).toMatch(/^https:\/\/www\.youvisit\.com\/#\/vte\/\?.*/)

    // Verify NO data attributes exist
    const allAttributes = Array.from(anchor!.attributes).map(
      (attr) => attr.name
    )
    const dataAttrs = allAttributes.filter((name) => name.startsWith('data-'))
    expect(dataAttrs).toEqual([])
  })
})
