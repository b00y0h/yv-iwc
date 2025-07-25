import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import CopyToClipboard from './copy-to-clipboard'

// Mock clipboard and execCommand
Object.defineProperty(navigator, 'clipboard', {
  value: {
    writeText: vi.fn().mockResolvedValue(undefined),
  },
  writable: true,
})

Object.defineProperty(document, 'execCommand', {
  value: vi.fn().mockReturnValue(true),
  writable: true,
})

describe('CopyToClipboard Styling Tests', () => {
  describe('Default Styles', () => {
    it('should apply default container class', () => {
      render(<CopyToClipboard textData="test" />)
      const container = document.querySelector(
        '.yv-iwc-copy-to-clipboard-container'
      )
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('yv-iwc-copy-to-clipboard-container')
    })

    it('should apply default button class', () => {
      render(<CopyToClipboard textData="test" />)
      const button = document.querySelector('.yv-iwc-copy-to-clipboard-button')
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('yv-iwc-copy-to-clipboard-button')
    })

    it('should apply default icon class', () => {
      render(<CopyToClipboard textData="test" />)
      const icon = document.querySelector('.yv-iwc-copy-to-clipboard-icon')
      expect(icon).toBeInTheDocument()
      expect(icon).toHaveClass('yv-iwc-copy-to-clipboard-icon')
    })

    it('should display default button text', () => {
      render(<CopyToClipboard textData="test" />)
      expect(screen.getByText('Copy to clipboard')).toBeInTheDocument()
    })
  })

  describe('Custom className Props', () => {
    it('should accept and apply custom className to container', () => {
      render(<CopyToClipboard textData="test" className="custom-container" />)
      const container = document.querySelector(
        '.yv-iwc-copy-to-clipboard-container'
      )
      expect(container).toHaveClass(
        'yv-iwc-copy-to-clipboard-container',
        'custom-container'
      )
    })

    it('should accept and apply custom buttonClassName to button', () => {
      render(
        <CopyToClipboard textData="test" buttonClassName="custom-button" />
      )
      const button = document.querySelector('.yv-iwc-copy-to-clipboard-button')
      expect(button).toHaveClass(
        'yv-iwc-copy-to-clipboard-button',
        'custom-button'
      )
    })

    it('should combine multiple custom classes correctly', () => {
      render(
        <CopyToClipboard
          textData="test"
          className="custom-container additional-class"
          buttonClassName="custom-button extra-button-class"
        />
      )

      const container = document.querySelector(
        '.yv-iwc-copy-to-clipboard-container'
      )
      expect(container).toHaveClass(
        'yv-iwc-copy-to-clipboard-container',
        'custom-container',
        'additional-class'
      )

      const button = document.querySelector('.yv-iwc-copy-to-clipboard-button')
      expect(button).toHaveClass(
        'yv-iwc-copy-to-clipboard-button',
        'custom-button',
        'extra-button-class'
      )
    })

    it('should handle empty string custom classNames gracefully', () => {
      render(
        <CopyToClipboard textData="test" className="" buttonClassName="" />
      )

      const container = document.querySelector(
        '.yv-iwc-copy-to-clipboard-container'
      )
      expect(container?.className).toBe('yv-iwc-copy-to-clipboard-container')

      const button = document.querySelector('.yv-iwc-copy-to-clipboard-button')
      expect(button?.className).toBe('yv-iwc-copy-to-clipboard-button')
    })

    it('should handle undefined custom classNames gracefully', () => {
      render(
        <CopyToClipboard
          textData="test"
          className={undefined}
          buttonClassName={undefined}
        />
      )

      const container = document.querySelector(
        '.yv-iwc-copy-to-clipboard-container'
      )
      expect(container?.className).toBe('yv-iwc-copy-to-clipboard-container')

      const button = document.querySelector('.yv-iwc-copy-to-clipboard-button')
      expect(button?.className).toBe('yv-iwc-copy-to-clipboard-button')
    })
  })

  describe('Custom Text Props', () => {
    it('should display custom pre-copy button text', () => {
      render(
        <CopyToClipboard textData="test" buttonTextPreCopy="Custom Copy Text" />
      )
      expect(screen.getByText('Custom Copy Text')).toBeInTheDocument()
    })

    it('should accept custom post-copy button text prop', () => {
      // Test that the prop is accepted without errors
      expect(() => {
        render(
          <CopyToClipboard
            textData="test"
            buttonTextPostCopy="Custom Copied!"
          />
        )
      }).not.toThrow()
    })
  })

  describe('Icon Structure', () => {
    it('should render SVG icon with correct structure', () => {
      render(<CopyToClipboard textData="test" />)

      const icon = document.querySelector('.yv-iwc-copy-to-clipboard-icon')
      expect(icon).toBeInTheDocument()
      expect(icon?.tagName).toBe('svg')

      const path = icon?.querySelector('path')
      expect(path).toBeInTheDocument()
    })

    it('should have proper SVG attributes', () => {
      render(<CopyToClipboard textData="test" />)

      const icon = document.querySelector('.yv-iwc-copy-to-clipboard-icon')
      expect(icon).toHaveAttribute('viewBox', '0 0 24 24')
      expect(icon).toHaveAttribute('fill', 'none')
      expect(icon).toHaveAttribute('stroke', 'currentColor')
    })
  })

  describe('Accessibility', () => {
    it('should render as a button element', () => {
      render(<CopyToClipboard textData="test" />)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('should be enabled by default', () => {
      render(<CopyToClipboard textData="test" />)

      const button = screen.getByRole('button')
      expect(button).toBeEnabled()
    })

    it('should have proper button text for screen readers', () => {
      render(
        <CopyToClipboard
          textData="test"
          buttonTextPreCopy="Copy code snippet"
        />
      )
      expect(screen.getByText('Copy code snippet')).toBeInTheDocument()
    })
  })
})
