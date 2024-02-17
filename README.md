# @ux_bob/yv-iwc

> React component for YouVisit IWC

[![NPM](https://img.shields.io/npm/v/@ux_bob/yv-iwc.svg)](https://www.npmjs.com/package/@ux_bob/yv-iwc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @ux_bob/yv-iwc
```

## Test locally
```bash
npm link
```

## Usage

```jsx
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
```

## License

MIT © [b00y0h](https://github.com/b00y0h)
