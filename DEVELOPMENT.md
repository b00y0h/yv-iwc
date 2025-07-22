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
