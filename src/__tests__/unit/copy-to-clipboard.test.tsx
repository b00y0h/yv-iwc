import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import { render, screen, fireEvent, act, waitFor } from '@testing-library/react'
import CopyToClipboard from '../../YouVisitIWC/components/copy-to-clipboard'

describe('CopyToClipboard Component Styling', () => {
  let originalClipboard: typeof navigator.clipboard

  beforeEach(() => {
    vi.clearAllMocks()
    originalClipboard = navigator.clipboard

    // Set up a basic clipboard mock
    Object.defineProperty(navigator, 'clipboard', {
      value: {
        writeText: vi.fn().mockResolvedValue(undefined),
      },
      configurable: true,
    })

    // Mock document.execCommand for fallback tests
    vi.spyOn(document, 'execCommand').mockReturnValue(true)
  })

  afterEach(() => {
    Object.defineProperty(navigator, 'clipboard', {
      value: originalClipboard,
      configurable: true,
    })
    vi.restoreAllMocks()
  })

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

    it('should display custom post-copy button text after clicking', async () => {
      render(
        <CopyToClipboard textData="test" buttonTextPostCopy="Custom Copied!" />
      )

      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.click(button)
      })

      // Check that the text changes after the async operation
      await waitFor(() => {
        expect(screen.getByText('Custom Copied!')).toBeInTheDocument()
      })
    })
  })

  describe('Icon State Changes', () => {
    it('should apply copied icon class when button is clicked', async () => {
      render(<CopyToClipboard textData="test" />)

      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.click(button)
      })

      await waitFor(() => {
        const icon = document.querySelector('.yv-iwc-copy-to-clipboard-icon')
        expect(icon).toHaveClass('yv-iwc-copy-to-clipboard-icon-copied')
      })
    })

    it('should show different SVG paths for copy and copied states', async () => {
      render(<CopyToClipboard textData="test" />)

      // Get initial SVG path (copy state)
      const initialPath = document.querySelector('svg path')
      const initialPathData = initialPath?.getAttribute('d')

      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.click(button)
      })

      // Get SVG path after click (copied state)
      await waitFor(() => {
        const copiedPath = document.querySelector('svg path')
        const copiedPathData = copiedPath?.getAttribute('d')

        // Paths should be different
        expect(initialPathData).not.toBe(copiedPathData)
      })
    })
  })

  describe('Clipboard Functionality', () => {
    it('should call navigator.clipboard.writeText with correct text', async () => {
      const testText = 'test clipboard text'
      render(<CopyToClipboard textData={testText} />)

      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.click(button)
      })

      expect(navigator.clipboard.writeText).toHaveBeenCalledWith(testText)
    })

    it('should use fallback when clipboard API is not available', async () => {
      // Mock clipboard API as undefined
      Object.defineProperty(navigator, 'clipboard', {
        value: undefined,
        configurable: true,
      })

      const testText = 'test fallback text'
      render(<CopyToClipboard textData={testText} />)

      const button = screen.getByRole('button')

      await act(async () => {
        fireEvent.click(button)
      })

      expect(document.execCommand).toHaveBeenCalledWith('copy')
    })
  })

  describe('Accessibility', () => {
    it('should render as a button element', () => {
      render(<CopyToClipboard textData="test" />)
      const button = screen.getByRole('button')
      expect(button.tagName).toBe('BUTTON')
    })

    it('should be clickable', async () => {
      render(<CopyToClipboard textData="test" />)

      const button = screen.getByRole('button')
      expect(button).toBeEnabled()

      await act(async () => {
        fireEvent.click(button)
      })

      // Should not throw and should change text
      await waitFor(() => {
        expect(screen.getByText('Copied!')).toBeInTheDocument()
      })
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
