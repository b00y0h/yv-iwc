import { describe, expect, it, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import YouVisitIWC from './YouVisitIWC'
import { combineClasses } from './utils'

// Mock the useScript hook
vi.mock('../hooks/useScript', () => ({
  useScript: vi.fn(() => 'ready'),
}))

describe('YouVisitIWC Styling', () => {
  describe('Default Styles', () => {
    it('should apply default container class', () => {
      render(<YouVisitIWC />)
      const container = document.querySelector('.yv-iwc-container')
      expect(container).toBeInTheDocument()
      expect(container).toHaveClass('yv-iwc-container')
    })

    it('should apply ready class when component is ready', () => {
      render(<YouVisitIWC />)
      const container = document.querySelector('.yv-iwc-container')
      expect(container).toHaveClass('ready')
    })

    it('should apply default heading styles when showCode is true', () => {
      render(<YouVisitIWC showCode />)
      const headings = document.querySelectorAll('.yv-iwc-heading')
      expect(headings).toHaveLength(2)
      headings.forEach((heading) => {
        expect(heading).toHaveClass('yv-iwc-heading')
      })
    })

    it('should apply default code container styles when showCode is true', () => {
      render(<YouVisitIWC showCode />)
      const codeContainers = document.querySelectorAll('.yv-iwc-code-container')
      expect(codeContainers).toHaveLength(2)
      codeContainers.forEach((container) => {
        expect(container).toHaveClass('yv-iwc-code-container')
      })
    })

    it('should apply default copy button container styles when showCode is true', () => {
      render(<YouVisitIWC showCode />)
      const copyButtonContainers = document.querySelectorAll(
        '.yv-iwc-copy-button-container'
      )
      expect(copyButtonContainers).toHaveLength(2)
      copyButtonContainers.forEach((container) => {
        expect(container).toHaveClass('yv-iwc-copy-button-container')
      })
    })

    it('should apply default copy-to-clipboard button styles when showCode is true', () => {
      render(<YouVisitIWC showCode />)
      const copyButtons = document.querySelectorAll(
        '.yv-iwc-copy-to-clipboard-button'
      )
      expect(copyButtons).toHaveLength(2)
      copyButtons.forEach((button) => {
        expect(button).toHaveClass('yv-iwc-copy-to-clipboard-button')
      })
    })
  })

  describe('Custom className Props', () => {
    it('should accept and apply custom className to main container', () => {
      render(<YouVisitIWC className="custom-container" />)
      const container = document.querySelector('.yv-iwc-container')
      expect(container).toHaveClass('yv-iwc-container', 'custom-container')
    })

    it('should accept and apply custom headingClassName when showCode is true', () => {
      render(<YouVisitIWC showCode headingClassName="custom-heading" />)
      const headings = document.querySelectorAll('.yv-iwc-heading')
      headings.forEach((heading) => {
        expect(heading).toHaveClass('yv-iwc-heading', 'custom-heading')
      })
    })

    it('should accept and apply custom codeContainerClassName when showCode is true', () => {
      render(
        <YouVisitIWC showCode codeContainerClassName="custom-code-container" />
      )
      const codeContainers = document.querySelectorAll('.yv-iwc-code-container')
      codeContainers.forEach((container) => {
        expect(container).toHaveClass(
          'yv-iwc-code-container',
          'custom-code-container'
        )
      })
    })

    it('should accept and apply custom copyButtonClassName when showCode is true', () => {
      render(<YouVisitIWC showCode copyButtonClassName="custom-copy-button" />)
      const copyButtonContainers = document.querySelectorAll(
        '.yv-iwc-copy-button-container'
      )
      copyButtonContainers.forEach((container) => {
        expect(container).toHaveClass(
          'yv-iwc-copy-button-container',
          'custom-copy-button'
        )
      })
    })

    it('should pass copyButtonClassName to CopyToClipboard components', () => {
      render(<YouVisitIWC showCode copyButtonClassName="custom-copy-btn" />)
      const copyButtons = document.querySelectorAll(
        '.yv-iwc-copy-to-clipboard-button'
      )
      copyButtons.forEach((button) => {
        expect(button).toHaveClass(
          'yv-iwc-copy-to-clipboard-button',
          'custom-copy-btn'
        )
      })
    })

    it('should combine multiple custom classes correctly', () => {
      render(
        <YouVisitIWC
          showCode
          className="custom-container additional-class"
          headingClassName="custom-heading another-heading-class"
          codeContainerClassName="custom-code multiple-code-classes"
          copyButtonClassName="custom-copy-btn extra-btn-class"
        />
      )

      const container = document.querySelector('.yv-iwc-container')
      expect(container).toHaveClass(
        'yv-iwc-container',
        'custom-container',
        'additional-class'
      )

      const headings = document.querySelectorAll('.yv-iwc-heading')
      headings.forEach((heading) => {
        expect(heading).toHaveClass(
          'yv-iwc-heading',
          'custom-heading',
          'another-heading-class'
        )
      })

      const codeContainers = document.querySelectorAll('.yv-iwc-code-container')
      codeContainers.forEach((container) => {
        expect(container).toHaveClass(
          'yv-iwc-code-container',
          'custom-code',
          'multiple-code-classes'
        )
      })
    })
  })

  describe('Style Override Behavior', () => {
    it('should maintain default styles when no custom className is provided', () => {
      render(<YouVisitIWC showCode />)

      const container = document.querySelector('.yv-iwc-container')
      expect(container?.className).toBe('yv-iwc-container ready')

      const headings = document.querySelectorAll('.yv-iwc-heading')
      headings.forEach((heading) => {
        expect(heading.className).toBe('yv-iwc-heading')
      })
    })

    it('should preserve default classes when custom classes are added', () => {
      render(
        <YouVisitIWC
          showCode
          className="custom-main"
          headingClassName="custom-heading"
          codeContainerClassName="custom-code"
          copyButtonClassName="custom-copy"
        />
      )

      // Verify default classes are still present
      expect(document.querySelector('.yv-iwc-container')).toBeInTheDocument()
      expect(document.querySelector('.yv-iwc-heading')).toBeInTheDocument()
      expect(
        document.querySelector('.yv-iwc-code-container')
      ).toBeInTheDocument()
      expect(
        document.querySelector('.yv-iwc-copy-button-container')
      ).toBeInTheDocument()

      // Verify custom classes are also present
      expect(document.querySelector('.custom-main')).toBeInTheDocument()
      expect(document.querySelector('.custom-heading')).toBeInTheDocument()
      expect(document.querySelector('.custom-code')).toBeInTheDocument()
      expect(document.querySelector('.custom-copy')).toBeInTheDocument()
    })

    it('should handle empty string custom classNames gracefully', () => {
      render(
        <YouVisitIWC
          showCode
          className=""
          headingClassName=""
          codeContainerClassName=""
          copyButtonClassName=""
        />
      )

      const container = document.querySelector('.yv-iwc-container')
      expect(container?.className).toBe('yv-iwc-container ready')

      const headings = document.querySelectorAll('.yv-iwc-heading')
      headings.forEach((heading) => {
        expect(heading.className).toBe('yv-iwc-heading')
      })
    })

    it('should handle undefined custom classNames gracefully', () => {
      render(
        <YouVisitIWC
          showCode
          className={undefined}
          headingClassName={undefined}
          codeContainerClassName={undefined}
          copyButtonClassName={undefined}
        />
      )

      const container = document.querySelector('.yv-iwc-container')
      expect(container?.className).toBe('yv-iwc-container ready')

      const headings = document.querySelectorAll('.yv-iwc-heading')
      headings.forEach((heading) => {
        expect(heading.className).toBe('yv-iwc-heading')
      })
    })
  })

  describe('Conditional Styling', () => {
    it('should not render code-related styles when showCode is false', () => {
      render(<YouVisitIWC showCode={false} />)

      expect(document.querySelector('.yv-iwc-heading')).not.toBeInTheDocument()
      expect(
        document.querySelector('.yv-iwc-code-container')
      ).not.toBeInTheDocument()
      expect(
        document.querySelector('.yv-iwc-copy-button-container')
      ).not.toBeInTheDocument()
    })

    it('should render code-related styles when showCode is true', () => {
      render(<YouVisitIWC showCode={true} />)

      expect(document.querySelectorAll('.yv-iwc-heading')).toHaveLength(2)
      expect(document.querySelectorAll('.yv-iwc-code-container')).toHaveLength(
        2
      )
      expect(
        document.querySelectorAll('.yv-iwc-copy-button-container')
      ).toHaveLength(2)
    })

    it('should apply ready class only when component is ready', () => {
      const { rerender } = render(<YouVisitIWC />)

      // Component should have ready class by default due to mock
      const container = document.querySelector('.yv-iwc-container')
      expect(container).toHaveClass('ready')

      // Test that the class structure is correct
      expect(container?.className).toContain('yv-iwc-container')
      expect(container?.className).toContain('ready')
    })
  })

  describe('CSS Import', () => {
    it('should import CSS file at component level', () => {
      // This test verifies that the CSS import doesn't cause errors
      // The actual CSS loading is handled by the build system
      expect(() => {
        render(<YouVisitIWC />)
      }).not.toThrow()
    })
  })
})
