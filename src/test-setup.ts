import '@testing-library/jest-dom'
import { vi } from 'vitest'

// Mock window.YVScript for tests
Object.defineProperty(window, 'YVScript', {
  value: {
    scanEmbeds: vi.fn(),
  },
  writable: true,
})

// Mock document.execCommand for fallback copy functionality
Object.defineProperty(document, 'execCommand', {
  value: vi.fn().mockReturnValue(true),
  writable: true,
})
