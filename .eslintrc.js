module.exports = {
  root: true,
  extends: ['eslint:recommended'],
  globals: {
    context: true,
    mockOpenApiSchemaRequest: true,
  },
  env: {
    es6: true,
    node: true,
    jest: true,
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    sourceType: 'module',
    ecmaVersion: 2020,
    decoratorsBeforeExport: true,
  },
  plugins: ['@typescript-eslint', 'jest'],
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
      },
    },
  },
  rules: {
    'no-unused-vars': 'off',
    'import/no-unresolved': 'off',
    'jest/no-disabled-tests': 'error',
    'jest/no-focused-tests': 'error',
  },
  overrides: [
    {
      files: ['src/**/*.ts'],
      extends: [
        'plugin:@typescript-eslint/recommended',
        'plugin:@typescript-eslint/recommended-requiring-type-checking',
      ],
      rules: {
        '@typescript-eslint/no-unnecessary-type-arguments': 'error',
        '@typescript-eslint/prefer-nullish-coalescing': 'error',
        '@typescript-eslint/prefer-optional-chain': 'error',
        'require-await': 'off',
        '@typescript-eslint/require-await': 'error',
        '@typescript-eslint/no-explicit-any': 'off', //TODO: Remove all the offs
        '@typescript-eslint/no-unsafe-assignment': 'off',
        '@typescript-eslint/no-unsafe-call': 'off',
        '@typescript-eslint/no-unsafe-return': 'off',
        '@typescript-eslint/no-unsafe-member-access': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-namespace': 'off',
        '@typescript-eslint/no-non-null-assertion': 'off',
      },
      parserOptions: {
        tsconfigRootDir: './',
        project: './tsconfig.json',
      },
    },
  ],
};
