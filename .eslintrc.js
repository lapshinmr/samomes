module.exports = {
  root: true,
  env: {
    node: true,
  },
  'extends': [
    'plugin:vue/essential',
    'plugin:vue/strongly-recommended',
    '@vue/airbnb'
  ],
  parserOptions: {
    parser: 'babel-eslint'
  },
  rules: {
    'template-curly-spacing' : 'off',
    'indent' : 'off',
    'max-len': ['warn', { code: 120 }],
    'vue/max-len': ['warn', {
      code: 120,
      template: 120,
    }],
    "no-param-reassign": 0,
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
