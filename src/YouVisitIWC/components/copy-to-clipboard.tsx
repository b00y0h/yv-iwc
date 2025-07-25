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
          strokeWidth="1.5"
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
              d="M11.35 3.836c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m8.9-4.414c.376.023.75.05 1.124.08 1.131.094 1.976 1.057 1.976 2.192V16.5A2.25 2.25 0 0118 18.75h-2.25m-7.5-10.5H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V18.75m-7.5-10.5h6.375c.621 0 1.125.504 1.125 1.125v9.375m-8.25-3l1.5 1.5 3-3.75"
            />
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
            />
          )}
        </svg>
      </button>
    </div>
  )
}

export default CopyToClipboard
