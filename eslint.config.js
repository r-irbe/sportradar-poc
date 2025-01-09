import eslint from '@eslint/js'
import * as tseslint from '@typescript-eslint/eslint-plugin'
import typescript from '@typescript-eslint/parser'
import prettier from 'eslint-config-prettier'

export default [
  eslint.configs.recommended,
  {
    files: ['src/**/*.ts'],
    ignores: ['**/*.test.ts'],
    languageOptions: {
      parser: typescript,
      parserOptions: {
        project: './tsconfig.json',
      },
      globals: {
        console: 'readonly',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint,
    },
    rules: {
      ...tseslint.configs.recommended.rules,
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/no-explicit-any': 'error',
      '@typescript-eslint/no-unused-vars': 'error',
      'no-console': 'off',
    },
  },
  prettier,
]
