# @ux_bob/yv-iwc

> React component for YouVisit IWC

[![NPM](https://img.shields.io/npm/v/@ux_bob/yv-iwc.svg)](https://www.npmjs.com/package/@ux_bob/yv-iwc) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @ux_bob/yv-iwc
```

## Test locally

Run `npm run start` in this folder to watch for and build changes.

`cd` into `testing` directory and run `npm run start` to start a react app that has the `YouVisitIWC` component.

Go to `http://local.dev.youvisit.com:3000/` to see the IWC on a page.

# Building and pushing to NPM

Run `npm run publishToNpm`

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
        institution={institutionId}
        location={locationId}
        showCode="true or blank"
      />
    </div>
  );
};
export default App;
```

## License

MIT © [b00y0h](https://github.com/b00y0h)
