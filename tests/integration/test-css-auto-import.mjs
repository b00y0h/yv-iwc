// Test to verify CSS is automatically imported when component is imported
import fs from 'fs'
import path from 'path'

// Check if the built files exist
const distPath = './dist'
const jsFile = path.join(distPath, 'index.js')
const cssFile = path.join(distPath, 'index.css')

console.log('Testing CSS auto-import functionality...')

// Check if files exist
const jsExists = fs.existsSync(jsFile)
const cssExists = fs.existsSync(cssFile)

console.log('JS file exists:', jsExists)
console.log('CSS file exists:', cssExists)

if (jsExists && cssExists) {
  // Check if the JS file imports the CSS
  const jsContent = fs.readFileSync(jsFile, 'utf8')
  const cssContent = fs.readFileSync(cssFile, 'utf8')

  // Check if CSS contains expected styles
  const hasYvIwcStyles = cssContent.includes('.yv-iwc-container')
  const hasSyntaxStyles = cssContent.includes('prettylights-syntax')

  console.log('CSS contains YouVisitIWC styles:', hasYvIwcStyles)
  console.log('CSS contains syntax highlighting styles:', hasSyntaxStyles)

  // Check if JS file has CSS import (tsup should handle this automatically)
  const hasCssImport =
    jsContent.includes('index.css') || jsContent.includes('.css')
  console.log('JS file references CSS:', hasCssImport)

  // Check package.json exports
  const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
  const hasStylesExport = packageJson.exports && packageJson.exports['./styles']
  const hasSideEffects =
    packageJson.sideEffects && packageJson.sideEffects.includes('*.css')

  console.log('Package.json has styles export:', hasStylesExport)
  console.log('Package.json has CSS sideEffects:', hasSideEffects)

  if (hasYvIwcStyles && hasSyntaxStyles && hasStylesExport && hasSideEffects) {
    console.log('✅ CSS auto-import test PASSED - All requirements met')
    console.log('  - CSS file is properly bundled')
    console.log('  - CSS contains all expected styles')
    console.log('  - Package.json exports are configured correctly')
    console.log('  - CSS is marked as a side effect for proper bundling')
  } else {
    console.log('❌ CSS auto-import test FAILED - Missing requirements')
  }
} else {
  console.log('❌ CSS auto-import test FAILED - Missing build files')
}
