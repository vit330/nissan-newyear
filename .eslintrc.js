module.exports = {
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  env: {
    es6: true,
    browser: true,
    node: true
  },
  plugins: [
    'svelte3'
  ],
  overrides: [
    {
      files: ['*.svelte'],
      processor: 'svelte3/svelte3'
    }
  ],
  extends: [
    'eslint:recommended'
  ],
  rules: {
    'semi': ['error', 'never'],
    'quotes': ['error', 'single'],
    'no-trailing-spaces': 'error',
    'eqeqeq': ['error', 'always']
  }
}
