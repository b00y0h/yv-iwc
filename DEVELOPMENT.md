# Development Guide

## Development Environment Setup

This project uses pnpm workspaces to enable seamless development between the main library and the Next.js example.

### Quick Start

1. **Install dependencies:**

   ```bash
   pnpm install
   ```

2. **Start development with live reloading:**
   ```bash
   pnpm run dev:all
   ```
   This runs both the library build in watch mode and the Next.js example simultaneously.

### Available Scripts

#### Development

- `pnpm run dev:build` - Build the library in watch mode (rebuilds on file changes)
- `pnpm run dev:example` - Run the Next.js example app
- `pnpm run dev:all` - Run both library build and example app concurrently
- `pnpm run dev` - Run tests in watch mode

#### Testing & Building

- `pnpm run test` - Run tests once
- `pnpm run test:watch` - Run tests in watch mode
- `pnpm run build` - Build the library for production
- `pnpm run build:all` - Build both library and example
- `pnpm run lint` - Type check with TypeScript
- `pnpm run ci` - Run full CI pipeline (lint + test + build)

#### Release Management

- `pnpm changeset` - Create a new changeset for versioning
- `pnpm run version` - Update versions based on changesets
- `pnpm run release` - Publish to npm (after building)
- `pnpm run changeset:publish` - Build and publish in one command

### Development Workflow

1. **Make changes to the library** in `src/` directory
2. **Library automatically rebuilds** thanks to the watch mode
3. **Next.js example automatically picks up changes** via workspace linking
4. **View changes instantly** in the browser at the Next.js dev server

### Workspace Structure

- **Root package** (`@ux_bob/yv-iwc`) - Main library
- **Example package** (`examples/nextjs`) - Next.js testing environment

The Next.js example uses `workspace:*` protocol to link directly to the local library, ensuring you're always testing against your latest changes.

### Testing Changes

1. Start the development environment: `pnpm run dev:all`
2. Open the Next.js example in your browser
3. Make changes to components in `src/YouVisitIWC/`
4. See changes reflected immediately in the example app

### Building for Production

```bash
pnpm run ci  # Runs lint, test, and build
```

This ensures your changes are production-ready before publishing.

## Testing with External Projects

If you want to test the library in your own project while developing, you have several options:

### Option 1: pnpm link (Recommended)

This creates a global symlink that you can use in any project:

#### 1. In this repository (yv-iwc):

```bash
# Build the library first
pnpm run build

# Create a global link
pnpm link --global
```

#### 2. In your external project:

```bash
# Link to the local development version
pnpm link --global @ux_bob/yv-iwc

# Or if using npm
npm link @ux_bob/yv-iwc

# Or if using yarn
yarn link @ux_bob/yv-iwc
```

#### 3. Development workflow:

```bash
# In yv-iwc repo - start watch mode
pnpm run dev:build

# Your external project will automatically pick up changes
# as you modify the library code
```

#### 4. When done testing:

```bash
# In your external project - unlink
pnpm unlink --global @ux_bob/yv-iwc

# Install the published version
pnpm install @ux_bob/yv-iwc
```

### Option 2: Direct File Path (Alternative)

If linking doesn't work, you can reference the local path directly:

#### In your external project's package.json:

```json
{
  "dependencies": {
    "@ux_bob/yv-iwc": "file:../path/to/yv-iwc"
  }
}
```

Then run:

```bash
pnpm install
```

### Option 3: Packed Tarball (For Testing Builds)

Test the exact package that would be published:

#### 1. In this repository:

```bash
# Build and pack the library
pnpm run build
pnpm pack
```

#### 2. In your external project:

```bash
# Install the packed tarball
pnpm install ../path/to/yv-iwc/ux_bob-yv-iwc-*.tgz
```

### Development Tips for External Testing

1. **Always build first**: Run `pnpm run build` before linking
2. **Use watch mode**: Run `pnpm run dev:build` for automatic rebuilds
3. **Check symlinks**: Verify the link with `ls -la node_modules/@ux_bob/`
4. **Clear cache**: If changes aren't reflected, try clearing your bundler cache
5. **TypeScript support**: Linked packages include full TypeScript definitions

### Troubleshooting External Links

#### Link not working?

```bash
# Check if link exists
pnpm list --global --depth=0

# Remove and recreate link
pnpm unlink --global
pnpm link --global
```

#### Changes not reflecting?

```bash
# Ensure library is built
pnpm run build

# Restart your development server
# Clear bundler cache (varies by bundler)
```

#### TypeScript errors?

```bash
# Ensure types are built
pnpm run build

# Check if .d.ts files exist in dist/
ls -la dist/
```

### Example External Project Setup

Here's a complete example of setting up a Next.js project to test your library:

```bash
# Create a new Next.js project
npx create-next-app@latest my-test-app
cd my-test-app

# Link to your local library
pnpm link --global @ux_bob/yv-iwc

# Use in your component
```

```tsx
// pages/index.tsx or app/page.tsx
import { YouVisitIWC } from '@ux_bob/yv-iwc'
import '@ux_bob/yv-iwc/dist/index.css'

export default function Home() {
  return (
    <div>
      <h1>Testing YV-IWC</h1>
      <YouVisitIWC
        src="https://www.youvisit.com/tour/Embed/123456"
        width={800}
        height={600}
      />
    </div>
  )
}
```

This setup allows you to develop the library and immediately see changes in your external project!
