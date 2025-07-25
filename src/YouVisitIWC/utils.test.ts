import { describe, expect, it } from 'vitest'
import {
  combineClasses,
  generateJsonLdData,
  generateAnchorProps,
  generateDataAttributesString,
} from './utils'

describe('Utils', () => {
  describe('combineClasses', () => {
    it('should return only default class when no custom class is provided', () => {
      const result = combineClasses('default-class')
      expect(result).toBe('default-class')
    })

    it('should return only default class when custom class is undefined', () => {
      const result = combineClasses('default-class', undefined)
      expect(result).toBe('default-class')
    })

    it('should return only default class when custom class is empty string', () => {
      const result = combineClasses('default-class', '')
      expect(result).toBe('default-class')
    })

    it('should combine default and custom classes when both are provided', () => {
      const result = combineClasses('default-class', 'custom-class')
      expect(result).toBe('default-class custom-class')
    })

    it('should handle multiple custom classes separated by spaces', () => {
      const result = combineClasses(
        'default-class',
        'custom-class another-class'
      )
      expect(result).toBe('default-class custom-class another-class')
    })

    it('should handle default class with spaces', () => {
      const result = combineClasses('default-class ready', 'custom-class')
      expect(result).toBe('default-class ready custom-class')
    })

    it('should handle both default and custom classes with multiple spaces', () => {
      const result = combineClasses(
        'default-class ready active',
        'custom-class another-class'
      )
      expect(result).toBe(
        'default-class ready active custom-class another-class'
      )
    })

    it('should handle whitespace-only custom class as empty', () => {
      const result = combineClasses('default-class', '   ')
      expect(result).toBe('default-class    ')
    })

    it('should preserve exact spacing in combined result', () => {
      const result = combineClasses('default', 'custom')
      expect(result).toBe('default custom')

      const resultWithSpaces = combineClasses('default  class', 'custom  class')
      expect(resultWithSpaces).toBe('default  class custom  class')
    })

    it('should work with CSS module-style class names', () => {
      const result = combineClasses('module_class_abc123', 'custom-override')
      expect(result).toBe('module_class_abc123 custom-override')
    })

    it('should work with BEM-style class names', () => {
      const result = combineClasses(
        'block__element--modifier',
        'custom-block__element'
      )
      expect(result).toBe('block__element--modifier custom-block__element')
    })

    it('should handle special characters in class names', () => {
      const result = combineClasses('default-class_123', 'custom:class@media')
      expect(result).toBe('default-class_123 custom:class@media')
    })
  })

  describe('generateJsonLdData', () => {
    it('should generate correct JSON-LD structure with all parameters', () => {
      const result = generateJsonLdData(
        'Test Title',
        'Test Description',
        'https://example.com/thumb.jpg',
        '2023-01-01T00:00:00Z'
      )

      expect(result).toEqual({
        '@context': 'https://schema.org',
        '@type': 'VideoObject',
        name: 'Test Title',
        description: 'Test Description',
        thumbnailUrl: 'https://example.com/thumb.jpg',
        uploadDate: '2023-01-01T00:00:00Z',
        publisher: {
          '@type': 'Organization',
          name: 'YouVisit',
          logo: {
            '@type': 'ImageObject',
            url: 'https://www.youvisit.com/logo.png',
            width: 200,
            height: 60,
          },
        },
        contentUrl: 'https://www.youvisit.com/tour/Embed/js3',
        embedUrl: 'https://www.youvisit.com/tour/Embed/js3',
        interactionCount: '0',
      })
    })

    it('should handle missing optional parameters', () => {
      const result = generateJsonLdData('Test Title', 'Test Description')

      expect(result.name).toBe('Test Title')
      expect(result.description).toBe('Test Description')
      expect(result.thumbnailUrl).toBeUndefined()
      // uploadDate should be a valid ISO string when not provided
      expect(result.uploadDate).toMatch(
        /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/
      )
    })
  })

  describe('generateAnchorProps', () => {
    it('should generate correct anchor props with all parameters', () => {
      const result = generateAnchorProps({
        title: 'Test Title',
        institution: 123,
        linkType: 'immersive',
        location: 456,
        type: 'inline-embed',
        stopId: 'stop123',
        hoverWidth: '90%',
        hoverHeight: '70%',
        iwcWidth: '100%',
        iwcHeight: '100%',
      })

      expect(result).toEqual({
        'data-inst': 123,
        'data-link-type': 'immersive',
        'data-location': 456,
        'data-type': 'inline-embed',
        'data-stop': 'stop123',
        'data-hover-width': '90%',
        'data-hover-height': '70%',
        'data-iwc-width': '100%',
        'data-iwc-height': '100%',
      })
    })

    it('should only include defined properties', () => {
      const result = generateAnchorProps({
        title: 'Test Title',
        institution: 123,
        linkType: 'immersive',
        location: undefined,
        type: 'inline-embed',
        stopId: undefined,
        hoverWidth: '90%',
        hoverHeight: '70%',
        iwcWidth: '100%',
        iwcHeight: '100%',
      })

      expect(result).toEqual({
        'data-inst': 123,
        'data-link-type': 'immersive',
        'data-type': 'inline-embed',
        'data-hover-width': '90%',
        'data-hover-height': '70%',
        'data-iwc-width': '100%',
        'data-iwc-height': '100%',
      })
      expect(result).not.toHaveProperty('data-location')
      expect(result).not.toHaveProperty('data-stop')
    })
  })

  describe('generateDataAttributesString', () => {
    const sampleProps = {
      'data-inst': 123,
      'data-link-type': 'immersive',
      'data-location': 456,
    }

    it('should generate single-line format by default', () => {
      const result = generateDataAttributesString(sampleProps)
      expect(result).toBe(
        'data-inst=123&data-link-type=immersive&data-location=456'
      )
    })

    it('should generate pretty format when requested', () => {
      const result = generateDataAttributesString(sampleProps, { pretty: true })
      expect(result).toBe(
        'data-inst=123\n     data-link-type=immersive\n     data-location=456'
      )
    })

    it('should handle empty props object', () => {
      const result = generateDataAttributesString({})
      expect(result).toBe('')
    })

    it('should handle single property', () => {
      const result = generateDataAttributesString({ 'data-inst': 123 })
      expect(result).toBe('data-inst=123')
    })
  })
})
