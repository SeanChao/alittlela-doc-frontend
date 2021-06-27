module.exports = {
  extends: ['eslint:recommended', 'plugin:react/recommended'],
  plugins: ['prettier', 'simple-import-sort'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  parser: 'babel-eslint',
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  globals: {
    alert: true,
    localStorage: true,
    fetch: true,
    test: true,
    expect: true,
    document: true,
    window: true,
    navigator: true,
    cy: true,
    it: true,
    describe: true,
    context: true,
    beforeEach: true,
    on: true,
    config: true,
  },
  rules: {
    'no-unused-vars': 'warn',
    'react/prop-types': 'off',
  },
};
