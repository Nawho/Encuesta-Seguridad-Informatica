module.exports = {
  parser: 'vue-eslint-parser',
  parserOptions: {
    parser: '@typescript-eslint/parser'
  },
  rules: {
    semi: ['error', 'never'],
    'max-len': ['error', { code: 100 }],
    'indent': ['error', 2],
    'no-trailing-spaces': 'error',
    'eol-last': ['error', 'always'],
  }
}
