# Release Notes - v2.0.0

## 🚀 Major Release: New Styling Architecture

This is a **major release** that introduces a completely new styling architecture for the YouVisit IWC React component. This release addresses compatibility issues with Next.js and other React frameworks while providing enhanced customization capabilities.

## ⚠️ Breaking Changes

### CSS Module Removal

- **Removed**: CSS Modules (`YouVisitIWC.module.css`) have been completely removed
- **Replaced with**: Standard CSS file with semantic class names (`YouVisitIWC.css`)
- **Impact**: This change improves compatibility across all React frameworks and build systems

### New Styling Approach

- Components now use semantic CSS class names instead of CSS module classes
- Default styles are automatically injected when the component is imported
- No additional CSS imports required for basic functionality

## ✨ New Features

### Enhanced Customization

- **New className props** for granular styling control:
  - `className` - Main container styling
  - `codeContainerClassName` - Code snippet containers
  - `copyButtonClassName` - Copy to clipboard buttons
  - `headingClassName` - Section headings

### Improved Framework Compatibility

- ✅ **Next.js**: Full compatibility with App Router and Pages Router
- ✅ **Create React App**: Works out of the box
- ✅ **Vite**: Seamless integration
- ✅ **Server-Side Rendering**: Full SSR support

### Better Developer Experience

- **Zero configuration**: Component works immediately after installation
- **Semantic class names**: Predictable, debuggable CSS classes
- **TypeScript support**: Full type definitions for all new props
- **Backward compatibility**: All existing props continue to work

## 🔧 Technical Improvements

### Build System Enhancements

- CSS is now properly bundled with the library distribution
- Automatic style injection eliminates manual CSS imports
- Improved tree-shaking compatibility
- Smaller bundle size with optimized CSS delivery

### Code Quality

- Comprehensive test coverage for new styling functionality
- Updated utility functions for class name combination
- Improved error handling and fallback behavior

## 📦 Migration Guide

### For Existing Users

**Good news!** This is largely a drop-in replacement. Your existing code will continue to work without changes.

#### Before (v1.x):

```jsx
import { YouVisitIWC } from '@ux_bob/yv-iwc'

;<YouVisitIWC
  containerWidth="100%"
  containerHeight="400px"
  title="Campus Tour"
  institution="123"
  location="456"
  showCode={true}
/>
```

#### After (v2.0):

```jsx
import { YouVisitIWC } from '@ux_bob/yv-iwc'

// Same props work exactly as before
<YouVisitIWC
  containerWidth="100%"
  containerHeight="400px"
  title="Campus Tour"
  institution="123"
  location="456"
  showCode={true}
/>

// NEW: Optional customization with className props
<YouVisitIWC
  containerWidth="100%"
  containerHeight="400px"
  title="Campus Tour"
  institution="123"
  location="456"
  showCode={true}
  className="my-custom-container"
  codeContainerClassName="my-code-style"
  copyButtonClassName="my-button-style"
  headingClassName="my-heading-style"
/>
```

### For New Users

Simply install and use - no additional setup required:

```bash
npm install @ux_bob/yv-iwc
# or
pnpm add @ux_bob/yv-iwc
```

```jsx
import { YouVisitIWC } from '@ux_bob/yv-iwc'
// No CSS import needed - styles are automatically included!

export default function MyComponent() {
  return (
    <YouVisitIWC
      containerWidth="100%"
      containerHeight="400px"
      title="Virtual Tour"
      institution="your-institution-id"
      location="your-location-id"
    />
  )
}
```

## 🎨 Customization Examples

### Basic Styling Override

```jsx
<YouVisitIWC
  // ... other props
  className="border rounded-lg shadow-lg p-4"
  headingClassName="text-2xl font-bold text-blue-600"
/>
```

### CSS Framework Integration (Tailwind)

```jsx
<YouVisitIWC
  // ... other props
  className="max-w-4xl mx-auto bg-white"
  codeContainerClassName="bg-gray-100 rounded-md"
  copyButtonClassName="bg-blue-500 hover:bg-blue-600 text-white"
/>
```

### Custom CSS Classes

```css
/* Your custom CSS */
.my-iwc-container {
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.my-custom-button {
  background: linear-gradient(45deg, #667eea 0%, #764ba2 100%);
  border: none;
  border-radius: 8px;
  color: white;
  font-weight: 600;
}
```

```jsx
<YouVisitIWC
  // ... other props
  className="my-iwc-container"
  copyButtonClassName="my-custom-button"
/>
```

## 🐛 Bug Fixes

- Fixed CSS not loading in Next.js applications
- Resolved styling conflicts with CSS-in-JS libraries
- Improved component rendering in server-side rendering environments
- Fixed copy button positioning issues across different screen sizes

## 📊 Performance Improvements

- **Reduced bundle size**: Eliminated CSS module runtime overhead
- **Faster initial load**: CSS is injected only once per application
- **Better caching**: Static CSS files benefit from browser caching
- **Improved tree-shaking**: Better dead code elimination

## 🧪 Testing

This release includes comprehensive testing across multiple environments:

- ✅ Next.js 14+ (App Router and Pages Router)
- ✅ Create React App
- ✅ Vite-based applications
- ✅ Server-side rendering scenarios
- ✅ TypeScript strict mode
- ✅ Various CSS frameworks (Tailwind, Bootstrap, etc.)

## 🔮 Future Roadmap

- Enhanced theming system with CSS custom properties
- Additional customization props for more granular control
- Performance optimizations for large-scale applications
- Accessibility improvements and ARIA enhancements

## 💬 Support

If you encounter any issues during migration or have questions about the new features:

1. Check the [GitHub Issues](https://github.com/your-repo/yv-iwc/issues) for known issues
2. Review the updated documentation and examples
3. Create a new issue with detailed reproduction steps

## 🙏 Acknowledgments

This major release was driven by community feedback and the need for better framework compatibility. Thank you to all users who reported issues and provided valuable feedback that shaped this release.

---

**Full Changelog**: [v1.x.x...v2.0.0](https://github.com/your-repo/yv-iwc/compare/v1.x.x...v2.0.0)
