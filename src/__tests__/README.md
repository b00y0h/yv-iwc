# Test Organization

This directory contains all test files organized by type and purpose.

## Structure

```
__tests__/
├── unit/           # Unit tests for individual functions and components
├── integration/    # Integration tests for component interactions
├── styling/        # Tests focused on CSS classes and styling behavior
└── setup/          # Test configuration and setup files
```

## Test Types

### Unit Tests (`unit/`)

- Test individual functions, utilities, and component behavior
- Mock external dependencies
- Focus on isolated functionality

### Integration Tests (`integration/`)

- Test component interactions and data flow
- Test anchor format and URL generation
- End-to-end component behavior

### Styling Tests (`styling/`)

- Test CSS class application
- Test custom className props
- Test style combinations and overrides

### Setup (`setup/`)

- Test configuration files
- Global test setup and mocks
