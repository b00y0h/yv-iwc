/* eslint-disable react/prop-types */
import React, { useEffect } from 'react'
import Prism from 'prismjs'
import 'prismjs/plugins/toolbar/prism-toolbar'
import 'prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard'

export default function PrismCode({ code, plugins, language }) {
  useEffect(() => {
    Prism.highlightAll()
  }, [])
  return (
    <pre className={!plugins ? '' : plugins.join(' ')}>
      <code className={`language-${language}`} data-prismjs-copy='Copy the HTML snippet!'>{code.trim()}</code>
    </pre>
  )
}
