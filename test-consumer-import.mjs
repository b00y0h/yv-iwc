// Test to simulate how a consumer would import the component with CSS injection
import fs from 'fs'

console.log('Testing consumer CSS injection...')

// Test 1: Verify CSS is injected into the JS bundle
console.log('\nTesting CSS injection in built files...')
const indexJs = fs.readFileSync('./dist/index.js', 'utf8')
const indexCjs = fs.readFileSync('./dist/index.cjs', 'utf8')

// Check if CSS is injected using our custom injection function
const cssInjectionPattern = /document\.createElement\(['"]style['"]\)/
const hasEsmCssInjection = cssInjectionPattern.test(indexJs)
const hasCjsCssInjection = cssInjectionPattern.test(indexCjs)

console.log('ESM build has CSS injection:', hasEsmCssInjection)
console.log('CJS build has CSS injection:', hasCjsCssInjection)

// Test 2: Check for specific CSS classes in the injected styles
const cssClassPattern = /\.yv-iwc-container/
const hasComponentStyles = cssClassPattern.test(indexJs)

console.log('Component CSS classes found in bundle:', hasComponentStyles)

// Test 3: Verify no separate CSS file is needed
const distFiles = fs.readdirSync('./dist')
const hasSeparateCssFile = distFiles.some((file) => file.endsWith('.css'))

console.log('Separate CSS file in dist:', hasSeparateCssFile)

// Test 4: Check package.json exports
const packageJson = JSON.parse(fs.readFileSync('./package.json', 'utf8'))
const hasStylesExport = packageJson.exports && packageJson.exports['./styles']

console.log('Package has styles export:', !!hasStylesExport)

console.log('\n📋 Summary for consumers:')
if (hasEsmCssInjection && hasCjsCssInjection && hasComponentStyles) {
  console.log('✅ CSS is automatically injected when component is imported')
  console.log('✅ No additional CSS imports required')
  console.log('✅ Works with both ESM and CJS imports')
  console.log(
    '1. Import component: import { YouVisitIWC } from "@ux_bob/yv-iwc"'
  )
  console.log(
    '2. Styles are automatically applied - no additional setup needed'
  )
} else {
  console.log('❌ CSS injection may not be working properly')
  console.log('ESM CSS injection:', hasEsmCssInjection)
  console.log('CJS CSS injection:', hasCjsCssInjection)
  console.log('Component styles present:', hasComponentStyles)
}
