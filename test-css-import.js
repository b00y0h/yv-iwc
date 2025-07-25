// Simple test to verify CSS is bundled and importable
import fs from 'fs'

// Check if CSS file exists in dist
const cssExists = fs.existsSync('./dist/index.css')
console.log('CSS file exists in dist:', cssExists)

if (cssExists) {
  const cssContent = fs.readFileSync('./dist/index.css', 'utf8')
  const hasYvIwcStyles = cssContent.includes('.yv-iwc-container')
  const hasSyntaxStyles = cssContent.includes('prettylights-syntax')

  console.log('CSS contains YouVisitIWC styles:', hasYvIwcStyles)
  console.log('CSS contains syntax highlighting styles:', hasSyntaxStyles)
  console.log('CSS file size:', cssContent.length, 'bytes')

  if (hasYvIwcStyles && hasSyntaxStyles) {
    console.log('✅ CSS bundling test PASSED - All styles are properly bundled')
  } else {
    console.log('❌ CSS bundling test FAILED - Missing expected styles')
  }
} else {
  console.log('❌ CSS bundling test FAILED - CSS file not found')
}
