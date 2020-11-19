import React from 'react'
import { useMyHook } from '@ux_bob/yv-iwc'

const App = () => {
  const example = useMyHook()
  return (
    <div>
      {example}
    </div>
  )
}
export default App