import React from 'react'
import { YouVisitIWC } from '@ux_bob/yv-iwc'

const App = () => {
  return (
    <div>
      <h1>Testing IWCs</h1>
      {/* <YouVisitIWC
        containerWidth='100%'
        containerHeight='500px'
        title='{locations.name}'
        institution='121419'
        // type='hover-panel'
        // location={locations.loc_id}
        // loadStopOnly="1"
        showCode='true'
        // dataStopid={stop.stopid}
      /> */}
      <YouVisitIWC
        containerWidth='100%'
        containerHeight='500px'
        title='University of Oklahoma Online'
        institution={139387}
        location={144388}
        // loadStopOnly='1'
        showCode={true}
        // stopId='270825'
      />
    </div>
  )
}
export default App
