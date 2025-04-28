'use client'
// import { YouVisitIWC } from '@ux_bob/yv-iwc'
import { YouVisitIWC } from '../../../../../dist/index.js'

export default function PageTwo() {
  return (
    <div className="">
      <main>
        <div>
          <YouVisitIWC
            containerWidth="100%"
            containerHeight="500px"
            title="University of Oklahoma Online"
            institution={139387}
            location={144388}
            showCode={false}
          />
        </div>
      </main>
    </div>
  )
}
