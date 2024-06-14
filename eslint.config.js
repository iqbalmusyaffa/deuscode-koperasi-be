export default {
  env: {
    es2021: true,
    node: true
  },
  extends: 'standard',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  ignorePatterns: ['**/node_modules/*', '**/public/*'],
  rules: {}
}
