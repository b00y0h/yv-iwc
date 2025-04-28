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
pnpm install

# Run development build with watch mode
pnpm run dev

# Build the package
pnpm run build
```

### Testing App

TBD

## Deployment

This package uses [Changesets](https://github.com/changesets/changesets) for versioning and publishing. To release a new version:

1. Make your changes and commit them
2. Create a new changeset:

   ```bash
   pnpm changeset
   ```

3. Follow the prompts to:
   - Select the type of change (patch, minor, or major)
   - Provide a description of the changes
   - Confirm your choices
4. Commit the generated changeset file
5. Push your changes to the main branch

The GitHub Actions workflow will automatically:

- Create a Release PR if there are any changesets to process
- When the PR is merged, it will:
  - Update the package version
  - Generate/update the changelog
  - Publish to npm
