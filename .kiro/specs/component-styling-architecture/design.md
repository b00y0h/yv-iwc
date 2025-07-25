# Design Document

## Overview

The YouVisit IWC component library will transition from CSS modules to a hybrid styling approach that combines default CSS styles with customizable className props. This approach ensures the component works out-of-the-box while providing flexibility for customization. The solution will use a single CSS file that gets bundled with the library and optional className props for each styled element.

## Architecture

### Styling Strategy

The new architecture will use:

1. **Default CSS file**: A single `YouVisitIWC.css` file containing all default styles using semantic class names
2. **Style injection**: CSS imported at the component level and included in the library build
3. **Customizable classNames**: Optional props for each styled element allowing consumers to override or extend styles
4. **Semantic class naming**: Predictable class names that consumers can target if needed

### Style Distribution

- CSS file bundled with the library distribution
- Automatic style injection when component is imported
- No additional setup required for consumers
- Works across all React frameworks and build systems

## Components and Interfaces

### Updated Component Props

```typescript
export interface YouVisitIWCProps {
  // Existing props...
  containerHeight?: string
  containerWidth?: string
  title?: string
  description?: string
  thumb?: string
  uploadDate?: string
  institution?: number
  linkType?: string
  location?: number
  type?: string
  stopId?: string
  hoverWidth?: string
  hoverHeight?: string
  iwcWidth?: string
  iwcHeight?: string
  showCode?: boolean

  // New className props for customization
  className?: string // Main container
  codeContainerClassName?: string // Code snippet containers
  copyButtonClassName?: string // Copy to clipboard buttons
  headingClassName?: string // Section headings
}
```

### CSS Class Structure

```css
/* Main component container */
.yv-iwc-container {
}

/* Virtual tour embed container */
.yv-iwc-embed-container {
}

/* Code snippet sections */
.yv-iwc-code-container {
}

/* Copy button containers */
.yv-iwc-copy-button-container {
}

/* Copy buttons */
.yv-iwc-copy-button {
}

/* Section headings */
.yv-iwc-heading {
}

/* Syntax highlighter wrapper */
.yv-iwc-syntax-wrapper {
}
```

## Data Models

### Style Configuration

```typescript
interface StyleConfig {
  useDefaultStyles: boolean
  cssPrefix: string
}

interface ClassNameProps {
  className?: string
  codeContainerClassName?: string
  copyButtonClassName?: string
  headingClassName?: string
}
```

## Implementation Details

### CSS File Structure

The new `YouVisitIWC.css` file will contain:

1. **Base styles**: Default styling for all elements
2. **Layout styles**: Positioning and spacing
3. **Interactive states**: Hover, focus, and active states
4. **Responsive considerations**: Basic responsive behavior

### Component Updates

1. **Remove CSS module imports**: Replace `styles` object with semantic class names
2. **Add className props**: Accept optional className props for each styled element
3. **Combine classes**: Merge default classes with custom classes using a utility function
4. **Import CSS**: Import the CSS file at the component level

### Build Configuration

1. **CSS bundling**: Ensure CSS is included in the library build output
2. **Style injection**: CSS automatically loaded when component is imported
3. **Tree shaking**: Maintain compatibility with tree shaking

### Utility Functions

```typescript
// Class name combination utility
function combineClasses(defaultClass: string, customClass?: string): string {
  return customClass ? `${defaultClass} ${customClass}` : defaultClass
}
```

## Error Handling

### Fallback Behavior

- If custom CSS fails to load, default styles still work
- Graceful degradation if className props are invalid
- Console warnings for development debugging

### Style Conflicts

- Default styles use moderate specificity to allow easy overriding
- Custom classes applied after default classes for proper cascade
- CSS custom properties for easy theming

## Testing Strategy

### Visual Regression Testing

- Test component appearance with default styles
- Test component with custom className props
- Test in different React frameworks (Next.js, CRA, Vite)

### Integration Testing

- Verify styles load correctly in consuming applications
- Test className prop functionality
- Test style override behavior

### Cross-Framework Testing

- Next.js application testing
- Create React App testing
- Vite application testing
- Server-side rendering compatibility

### Performance Testing

- CSS bundle size impact
- Style injection performance
- Runtime className combination performance

## Migration Strategy

### Phase 1: CSS File Creation

- Create new `YouVisitIWC.css` with converted styles
- Maintain existing functionality during transition

### Phase 2: Component Updates

- Add className props to component interface
- Update component implementation to use new classes
- Implement class combination utility

### Phase 3: CSS Module Removal

- Remove CSS module file
- Update imports and references
- Clean up unused styles

### Phase 4: Testing and Validation

- Test in example Next.js application
- Verify all styling works as expected
- Document new customization options

## Design Decisions and Rationales

### Why CSS Files Over CSS-in-JS

1. **Bundle size**: CSS files are smaller than CSS-in-JS runtime
2. **Performance**: No runtime style generation
3. **Familiarity**: Easier for consumers to understand and customize
4. **Tooling**: Better support for CSS tooling and optimization

### Why Semantic Class Names

1. **Predictability**: Consumers can target classes if needed
2. **Debugging**: Easier to identify elements in dev tools
3. **Customization**: Clear targets for style overrides
4. **Maintainability**: Self-documenting class names

### Why Optional className Props

1. **Flexibility**: Consumers can customize without touching library CSS
2. **Framework agnostic**: Works with any CSS framework or methodology
3. **Gradual adoption**: Can customize individual elements as needed
4. **Backward compatibility**: Component works without any className props
