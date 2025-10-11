import globals from 'globals';
import js from '@eslint/js';

export default [
  {
    // Общие настройки
    files: ['**/*.js', '**/*.ts'],
    ignores: ['node_modules/**'],
    languageOptions: {
      ecmaVersion: 2024,
      sourceType: 'module',
      globals: {
        ...globals.browser,
        ...globals.node,
      },
    },
    plugins: {
      '@typescript-eslint': {
        rules: {
          'no-restricted-properties': 'error',
        },
      },
    },
    rules: {
      'no-console': 'warn',
      'no-unused-vars': 'error',
    },
  },
  {
    files: ['**/*.test.ts'],
    rules: {
      'jest/expect-expect': 'error',
    },
  },
  {
    files: ['**/*.ts'],
    languageOptions: {
      parser: require('@typescript-eslint/parser'),
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
        sourceType: 'module',
      },
    },
    plugins: {
      '@typescript-eslint': require('@typescript-eslint/eslint-plugin'),
    },
    rules: {
      '@typescript-eslint/explicit-function-return-type': 'error',
      "no-restricted-imports": [
        "error",
        {
          "paths": [
            {
              "name": "@features",
              "message": "Avoid direct imports from features. Use only allowed layers."
            }
          ]
        }
      ],
    },
  },
  js.configs.recommended,
];