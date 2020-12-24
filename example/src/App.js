import React from "react";
import { YouVisitIWC } from "@ux_bob/yv-iwc";

const App = () => {
  return (
    <div>
      <YouVisitIWC
        containerWidth="100%"
        containerHeight="400px"
        title="IWC Title"
        institution="120207"
        // location="location-id"
        showCode="true"
      />
    </div>
  );
};
export default App;
