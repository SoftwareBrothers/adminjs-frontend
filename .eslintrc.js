module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  plugins: [
    'react',
    '@typescript-eslint'
  ],
  rules: {
    'react/jsx-filename-extension': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    indent: ['error', 2],
    '@typescript-eslint/explicit-function-return-type': 'off',
    'import/prefer-default-export': 'off',
    'linebreak-style': ['error', 'unix'],
    quotes: ['error', 'single'],
    semi: ['error', 'never'],
    'import/no-unresolved': 'off',
    'func-names': 'off',
    'no-underscore-dangle': 'off',
    'guard-for-in': 'off',
    'no-restricted-syntax': 'off',
    'no-await-in-loop': 'off',
    'object-curly-newline': 'off',
    'import/extensions': 'off',
    'mocha/no-hooks-for-single-case': 'off',
    'no-param-reassign': 'off',
  },
}
