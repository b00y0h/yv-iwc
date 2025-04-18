import React, { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/themes/prism.css'
import 'prismjs/components/prism-jsx'
import 'prismjs/plugins/line-numbers/prism-line-numbers'
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'

interface PrismCodeProps {
  code: string
  language: string
  plugins?: string[]
}

const PrismCode: React.FC<PrismCodeProps> = ({
  code,
  language,
  plugins = [],
}) => {
  useEffect(() => {
    Prism.highlightAll()
  }, [code])

  return (
    <pre
      className={`language-${language} ${plugins.includes('line-numbers') ? 'line-numbers' : ''}`}
    >
      <code>{code.trim()}</code>
    </pre>
  )
}

export default PrismCode
