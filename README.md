# @ux_bob/yv-iwc

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

This repository contains both the main package and a Next.js testing app to validate the package functionality.

### Package Development

```bash
# Install dependencies
npm install

# Run development build with watch mode
npm run dev

# Build the package
npm run build
```

### Testing App

The `testing` directory contains a Next.js app that uses the package locally for development and testing purposes.

```bash
# Run the test app
npm run dev:test
```

This will start the Next.js development server with the local version of the package.
