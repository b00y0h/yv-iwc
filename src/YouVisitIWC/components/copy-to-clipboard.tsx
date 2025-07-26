import { FC, useState } from 'react'
import { combineClasses } from '../utils'

const CopyToClipboard: FC<{
  textData: string
  buttonTextPreCopy?: string
  buttonTextPostCopy?: string
  className?: string
  buttonClassName?: string
}> = ({
  textData,
  buttonTextPreCopy = 'Copy to clipboard',
  buttonTextPostCopy = 'Copied!',
  className,
  buttonClassName,
}) => {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = async () => {
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(textData)
        setCopied(true)
      } catch (err) {
        console.error('Failed to copy with Clipboard API:', err)
        fallbackCopyToClipboard()
      }
    } else {
      fallbackCopyToClipboard()
    }

    setTimeout(() => {
      setCopied(false)
    }, 500)
  }

  const fallbackCopyToClipboard = () => {
    try {
      // Create a temporary textarea element
      const textArea = document.createElement('textarea')
      textArea.value = textData

      // Avoid scrolling to bottom
      textArea.style.top = '0'
      textArea.style.left = '0'
      textArea.style.position = 'fixed'
      textArea.style.opacity = '0'

      document.body.appendChild(textArea)
      textArea.focus()
      textArea.select()

      const successful = document.execCommand('copy')
      document.body.removeChild(textArea)

      if (successful) {
        setCopied(true)
      } else {
        console.error('Fallback clipboard copy failed')
      }
    } catch (err) {
      console.error('Fallback clipboard copy error:', err)
    }
  }

  return (
    <div
      className={combineClasses(
        'yv-iwc-copy-to-clipboard-container',
        className
      )}
    >
      <button
        onClick={copyToClipboard}
        className={combineClasses(
          'yv-iwc-copy-to-clipboard-button',
          buttonClassName
        )}
      >
        <span>{copied ? buttonTextPostCopy : buttonTextPreCopy}</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          className={combineClasses(
            'yv-iwc-copy-to-clipboard-icon',
            copied ? 'yv-iwc-copy-to-clipboard-icon-copied' : ''
          )}
        >
          {copied ? (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
            />
          )}
        </svg>
      </button>
    </div>
  )
}

export default CopyToClipboard
