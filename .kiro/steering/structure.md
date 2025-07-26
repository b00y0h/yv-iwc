# Project Structure

## Root Level Organization

```
├── src/                    # Main source code
├── examples/               # Example implementations
├── dist/                   # Built library output
├── .kiro/                  # Kiro AI assistant configuration
├── .changeset/             # Changesets configuration
└── public/                 # Static assets
```

## Source Code Structure (`src/`)

```
src/
├── __tests__/             # All test files organized by type
│   ├── unit/              # Unit tests for functions and components
│   ├── integration/       # Integration tests for component interactions
│   ├── styling/           # CSS and styling-specific tests
│   ├── setup/             # Test configuration and setup files
│   └── README.md          # Test organization documentation
├── YouVisitIWC/           # Main component module (clean, no tests)
│   ├── YouVisitIWC.tsx    # Primary React component
│   ├── YouVisitIWC.css    # Component-specific styles
│   ├── types.ts           # TypeScript type definitions
│   ├── config.ts          # Configuration constants
│   ├── utils.ts           # Utility functions
│   ├── index.ts           # Module exports
│   └── components/        # Sub-components
│       ├── JsonLd.tsx     # JSON-LD structured data
│       └── copy-to-clipboard.tsx # Copy functionality
├── hooks/                 # Reusable React hooks
│   └── useScript.ts       # Script loading hook
├── styles/                # Global styles
│   └── syntax.css         # Syntax highlighting styles
├── types/                 # Global type declarations
│   └── react-syntax-highlighter.d.ts
└── index.ts               # Main library entry point
```

## Test Structure (`tests/`)

```
tests/
├── integration/           # Build and distribution tests
│   ├── test-consumer-import.mjs    # ES module import tests
│   ├── test-css-auto-import.mjs    # Auto CSS import tests
│   └── test-css-import.js          # Manual CSS import tests
└── README.md              # Integration test documentation
```

## Examples Structure

- `examples/nextjs/` - Next.js implementation example for testing and validation

## Architecture Patterns

### Component Organization

- **Single Responsibility**: Each component has a focused purpose
- **Co-location**: Component-specific styles and utilities are kept together
- **Barrel Exports**: Clean public API through index.ts files
- **Test Separation**: All tests are organized in dedicated `__tests__/` directory by type

### File Naming Conventions

- **Components**: PascalCase (e.g., `YouVisitIWC.tsx`)
- **Hooks**: camelCase with "use" prefix (e.g., `useScript.ts`)
- **Utilities**: camelCase (e.g., `utils.ts`)
- **Types**: camelCase (e.g., `types.ts`)
- **CSS Files**: Component name + `.css` with semantic class names
- **Tests**: Component/utility name + `.test.ts/.tsx` organized by type in `__tests__/`

### Import/Export Strategy

- Main component and types exported from root `index.ts`
- Internal utilities and components not exposed publicly
- CSS imported at the library level for global syntax highlighting

### Configuration Management

- Constants centralized in `config.ts`
- Environment-specific settings handled through build configuration
- Type definitions separated for maintainability
