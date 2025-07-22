# Technology Stack

## Build System & Tools

- **Build Tool**: Vite for development and library building
- **Package Bundler**: tsup for creating ESM/CJS builds with TypeScript declarations
- **Package Manager**: pnpm (v9.3.0)
- **Testing**: Vitest for unit testing
- **Linting**: ESLint with TypeScript support
- **Versioning**: Changesets for automated versioning and publishing

## Core Technologies

- **Language**: TypeScript (v5.7.3) with strict mode enabled
- **Framework**: React 18+ (peer dependency, supports React 19)
- **Module System**: ESNext with ESM/CJS dual builds
- **CSS**: CSS Modules for component styling

## Key Dependencies

- `react-syntax-highlighter`: Code syntax highlighting with Prism themes
- Custom hooks for script loading (`useScript`)

## Common Commands

### Development

```bash
pnpm install          # Install dependencies
pnpm run dev          # Run tests in watch mode
pnpm run build        # Build library for production
pnpm run lint         # Type checking with TypeScript
```

### Testing & CI

```bash
pnpm run test         # Run tests once
pnpm run ci           # Full CI pipeline (lint + test + build)
```

### Release Process

```bash
pnpm changeset        # Create a new changeset
pnpm run version      # Update versions based on changesets
pnpm run release      # Build and publish to npm
```

## Build Configuration

- **Output**: Dual ESM/CJS builds with TypeScript declarations
- **External Dependencies**: React and ReactDOM are externalized
- **Source Maps**: Generated for debugging
- **CSS**: Bundled separately with code splitting support
