import { useState, useEffect } from 'react'
import { YV_SOURCE, DEFAULT_DESCRIPTION, DEFAULT_UPLOAD_DATE } from './config'
import { YouVisitIWCProps } from './types'
import JsonLd from './components/JsonLd'
import {
  generateJsonLdData,
  generateAnchorProps,
  generateDataAttributesString,
} from './utils'
import { useScript } from '../hooks/useScript'
import { PrismLight as SyntaxHighlighter } from 'react-syntax-highlighter'
import markup from 'react-syntax-highlighter/dist/cjs/languages/prism/markup'
import { coldarkCold } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import CopyToClipboard from './components/copy-to-clipboard'
import styles from './YouVisitIWC.module.css'

SyntaxHighlighter.registerLanguage('html', markup)

export const YouVisitIWC: React.FC<YouVisitIWCProps> = ({
  containerHeight = '300px',
  containerWidth = '100%',
  title = 'Launch Experience',
  description = DEFAULT_DESCRIPTION,
  thumb,
  uploadDate = DEFAULT_UPLOAD_DATE,
  institution = 0,
  linkType = 'immersive',
  location = 0,
  type = 'inline-embed',
  stopId,
  hoverWidth = '90%',
  hoverHeight = '70%',
  iwcWidth = '100%',
  iwcHeight = '100%',
  showCode,
}) => {
  const [isReady, setIsReady] = useState(false)
  const jsonLdData = generateJsonLdData(title, description, thumb, uploadDate)

  const status = useScript(YV_SOURCE, {
    removeOnUnmount: false,
  })

  useEffect(() => {
    if (
      status === 'ready' &&
      typeof window !== 'undefined' &&
      window.YVScript
    ) {
      window.YVScript.scanEmbeds()
      setIsReady(true)
    }
  }, [status])

  const anchorProps = generateAnchorProps({
    title,
    institution,
    linkType,
    location,
    type,
    stopId,
    hoverWidth,
    hoverHeight,
    iwcWidth,
    iwcHeight,
  })

  const dataAttributesString = generateDataAttributesString(anchorProps)

  const codeString = `<div style="height: ${containerHeight}; width: ${containerWidth}">
  <a alt="Launch Experience" href="https://www.youvisit.com/#/vte/
${dataAttributesString}">
    Virtual Tour
  </a>
</div>`

  const codeString2 = `<script async="async" defer="defer" src="${YV_SOURCE}"></script>`

  return (
    <>
      <div
        className={`${styles.codeSnippetContainer}${isReady ? ' ready' : ''}`}
        style={{ width: containerWidth, height: containerHeight }}
      >
        <a className="virtualtour_embed" {...anchorProps}>
          Virtual Tour
        </a>
      </div>
      {showCode && (
        <>
          <h3>
            Place the HTML below anywhere on your page to display your IWC:
          </h3>
          <div className={styles.codeSnippetContainer}>
            <div className={styles.copyButtonContainer}>
              <CopyToClipboard textData={codeString} />
            </div>
            <SyntaxHighlighter
              language="html"
              style={coldarkCold}
              customStyle={{
                margin: '1rem 0',
                borderRadius: '4px',
                background: '#f5f5f5',
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {codeString.trim()}
            </SyntaxHighlighter>
          </div>

          <h3>
            Place the script below anywhere on the same page as HTML above:
          </h3>
          <div className={styles.codeSnippetContainer}>
            <div className={styles.copyButtonContainer}>
              <CopyToClipboard textData={codeString2} />
            </div>
            <SyntaxHighlighter
              language="html"
              style={coldarkCold}
              customStyle={{
                margin: '1rem 0',
                borderRadius: '4px',
                background: '#f5f5f5',
              }}
              wrapLines={true}
              wrapLongLines={true}
            >
              {codeString2.trim()}
            </SyntaxHighlighter>
          </div>
        </>
      )}
      <JsonLd data={jsonLdData} />
    </>
  )
}
