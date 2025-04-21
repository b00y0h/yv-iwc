# YV IWC React Component

> A React component for embedding YouVisit Interactive Web Component (IWC)

[![NPM](https://img.shields.io/npm/v/@ux_bob/yv-iwc.svg)](https://www.npmjs.com/package/@ux_bob/yv-iwc)
[![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Installation

You can install the package using npm or pnpm:

```bash
npm install @ux_bob/yv-iwc
# or
pnpm add @ux_bob/yv-iwc
```

## Usage

```jsx
import React from 'react'
import { YouVisitIWC } from '@ux_bob/yv-iwc'

const App = () => {
  return (
    <YouVisitIWC
      containerWidth="100%"
      containerHeight="400px"
      title="Campus Tour"
      institution="your-institution-id"
      location="your-location-id"
      showCode={true}
    />
  )
}

export default App
```

## Props

| Prop              | Type    | Required | Description                                           |
| ----------------- | ------- | -------- | ----------------------------------------------------- |
| `containerWidth`  | string  | Yes      | Width of the IWC container (e.g., "100%", "800px")    |
| `containerHeight` | string  | Yes      | Height of the IWC container (e.g., "400px")           |
| `title`           | string  | Yes      | Title of the IWC experience                           |
| `institution`     | string  | Yes      | Institution ID for the YouVisit experience            |
| `location`        | string  | Yes      | Location ID for the YouVisit experience               |
| `showCode`        | boolean | No       | Whether to display the embed code (defaults to false) |

## Development

To develop and test the component locally:

1. Run `pnpm dev` in the package directory to watch for and build changes
2. Navigate to the `testing` directory and run `pnpm start` to start a test React app

### Local Testing in Another Project

To test the component in another project locally:

1. In this package directory, run: `pnpm link --global`
2. In your test project, run: `pnpm link --global @ux_bob/yv-iwc`

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT © [b00y0h](https://github.com/b00y0h)
