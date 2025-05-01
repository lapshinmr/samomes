// @ts-check
import withNuxt from './.nuxt/eslint.config.mjs';

export default withNuxt([
  {
    ignores: [
      '_old_code',
      'static',
    ],
  },
  // Include Nuxt's default ESLint configuration

  // Apply Airbnb-like rules directly
  {
    rules: {
      // Enforce semicolons
      'semi': ['error', 'always'],

      // Common Airbnb-style rules
      'quotes': ['error', 'single'],
      'indent': ['error', 2],
      'comma-dangle': ['error', 'always-multiline'],
      'no-unused-vars': 'error',
      'no-console': 'error',
      'no-debugger': 'error',
      'prefer-const': 'error',
      'arrow-parens': ['error', 'always'],
      'object-curly-spacing': ['error', 'always'],
      'array-bracket-spacing': ['error', 'never'],
      'max-len': ['error', { code: 120, ignoreUrls: true }],
      'no-multiple-empty-lines': ['error', { max: 1, maxEOF: 1 }],
      'eol-last': ['error', 'always'],

      // Vue specific rules
      'vue/html-indent': ['error', 2],
      'vue/html-quotes': ['error', 'double'],
      'vue/max-attributes-per-line': ['error', {
        singleline: 3,
        multiline: 1,
      }],
      'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    },
  },
]);
