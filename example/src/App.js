import React from "react";
import { YouVisitIWC } from "@ux_bob/yv-iwc";

const App = () => {
  return (
    <div>
      <YouVisitIWC
        containerWidth="100%"
        containerHeight="400px"
        title="IWC Title"
        institution="institution-id"
        location="location-id"
        showCode="true or blank"
      />
    </div>
  );
};
export default App;
