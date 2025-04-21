import { useState, useEffect, useRef } from 'react'

type ScriptStatus = 'loading' | 'ready' | 'error'

interface UseScriptOptions {
  removeOnUnmount?: boolean
}

export function useScript(
  src: string,
  options: UseScriptOptions = {}
): ScriptStatus {
  const [status, setStatus] = useState<ScriptStatus>('loading')
  const optionsRef = useRef(options)

  useEffect(() => {
    let script = document.querySelector(
      `script[src="${src}"]`
    ) as HTMLScriptElement

    if (script) {
      // Check if script has our data-status attribute
      const domStatus = script.getAttribute('data-status')
      if (domStatus) {
        setStatus(domStatus as ScriptStatus)
        return
      }

      // If no data-status attribute, set it based on whether the script appears to be loaded
      // A script without data-status that exists in DOM is likely already loaded
      script.setAttribute('data-status', 'ready')
      setStatus('ready')
      return
    }

    // Create new script if it doesn't exist
    script = document.createElement('script')
    script.src = src
    script.async = true
    script.setAttribute('data-status', 'loading')
    document.body.appendChild(script)

    const handleScriptLoad = () => {
      script.setAttribute('data-status', 'ready')
      setStatus('ready')
      removeEventListeners()
    }

    const handleScriptError = () => {
      script.setAttribute('data-status', 'error')
      setStatus('error')
      removeEventListeners()
    }

    const removeEventListeners = () => {
      script.removeEventListener('load', handleScriptLoad)
      script.removeEventListener('error', handleScriptError)
    }

    script.addEventListener('load', handleScriptLoad)
    script.addEventListener('error', handleScriptError)

    const removeOnUnmount = optionsRef.current.removeOnUnmount

    return () => {
      if (removeOnUnmount === true) {
        script.remove()
        removeEventListeners()
      }
    }
  }, [src])

  return status
}
