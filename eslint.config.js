import js from '@eslint/js'
import typescript from '@typescript-eslint/eslint-plugin'
import typescriptParser from '@typescript-eslint/parser'
import prettier from 'eslint-plugin-prettier'
import eslintConfigPrettier from 'eslint-config-prettier'

const typescriptConfig = {
  files: ['**/*.{ts,tsx}'],
  languageOptions: {
    parser: typescriptParser,
    parserOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      ecmaFeatures: {
        jsx: true,
      },
      project: './tsconfig.json',
    },
  },
  plugins: {
    '@typescript-eslint': typescript,
    prettier: prettier,
  },
  rules: {
    'prettier/prettier': 'error',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'warn',
    '@typescript-eslint/no-unused-vars': ['warn', { argsIgnorePattern: '^_' }],
  },
}

const jsConfig = {
  files: ['**/*.{js,jsx}'],
  plugins: {
    prettier: prettier,
  },
  rules: {
    'prettier/prettier': 'error',
  },
}

export default [
  js.configs.recommended,
  typescriptConfig,
  jsConfig,
  {
    ignores: ['dist/**', 'node_modules/**', 'build/**'],
  },
  eslintConfigPrettier,
]
