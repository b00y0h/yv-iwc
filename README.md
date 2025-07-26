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

### 1. Import the CSS

First, import the CSS file in your app's root layout or main CSS file:

```jsx
// In your layout.tsx, _app.tsx, or main.tsx
import '@ux_bob/yv-iwc/dist/index.css'
```

### 2. Use the Component

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

### Framework-Specific Setup

#### Next.js (App Router)

```jsx
// app/layout.tsx
import '@ux_bob/yv-iwc/dist/index.css'

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
```

#### Next.js (Pages Router)

```jsx
// pages/_app.tsx
import '@ux_bob/yv-iwc/dist/index.css'

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />
}
```

#### Create React App

```jsx
// src/index.tsx or src/App.tsx
import '@ux_bob/yv-iwc/dist/index.css'
```

#### Vite

```jsx
// src/main.tsx or src/App.tsx
import '@ux_bob/yv-iwc/dist/index.css'
```

## Props

| Prop                     | Type    | Required | Description                                           |
| ------------------------ | ------- | -------- | ----------------------------------------------------- |
| `containerWidth`         | string  | Yes      | Width of the IWC container (e.g., "100%", "800px")    |
| `containerHeight`        | string  | Yes      | Height of the IWC container (e.g., "400px")           |
| `title`                  | string  | Yes      | Title of the IWC experience                           |
| `institution`            | string  | Yes      | Institution ID for the YouVisit experience            |
| `location`               | string  | Yes      | Location ID for the YouVisit experience               |
| `showCode`               | boolean | No       | Whether to display the embed code (defaults to false) |
| `className`              | string  | No       | Custom CSS class for the main container               |
| `codeContainerClassName` | string  | No       | Custom CSS class for code snippet containers          |
| `copyButtonClassName`    | string  | No       | Custom CSS class for copy-to-clipboard buttons        |
| `headingClassName`       | string  | No       | Custom CSS class for section headings                 |

## Styling and Customization

The component comes with default styling that works out of the box. You can customize the appearance using the className props:

### Basic Customization

```jsx
<YouVisitIWC
  // ... other props
  className="my-custom-container"
  copyButtonClassName="my-custom-copy-button"
  headingClassName="my-custom-heading"
/>
```

### CSS Framework Integration (Tailwind CSS)

```jsx
<YouVisitIWC
  // ... other props
  className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg"
  copyButtonClassName="bg-blue-500 hover:bg-blue-600 text-white font-semibold"
  headingClassName="text-2xl font-bold text-blue-600 border-b-2 border-blue-200"
/>
```

### Custom CSS Classes

```css
/* Your custom CSS */
.my-custom-copy-button {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
  padding: 12px 20px;
}

.my-custom-copy-button:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 12px rgba(102, 126, 234, 0.4);
}
```

## Development

This repository contains both the main package and a Next.js testing app to validate the package functionality.

### Package Development

See Development.md file for instructions and deployment.md for deployment steps.

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
