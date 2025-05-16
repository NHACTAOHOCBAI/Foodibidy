import parser from '@typescript-eslint/parser'
import eslintPlugin from '@typescript-eslint/eslint-plugin'
import prettierPlugin from 'eslint-plugin-prettier'
import js from '@eslint/js'
import eslintConfigPrettier from 'eslint-config-prettier'

export default [
  js.configs.recommended,
  eslintConfigPrettier,
  {
    languageOptions: { parser },
    plugins: {
      '@typescript-eslint': eslintPlugin,
      prettier: prettierPlugin
    },
    ignores: ['node_modules/', 'dist/'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'prettier/prettier': [
        'warn',
        {
          arrowParens: 'always',
          semi: false,
          trailingComma: 'none',
          tabWidth: 2,
          endOfLine: 'auto',
          useTabs: false,
          singleQuote: true,
          printWidth: 120,
          jsxSingleQuote: true
        }
      ]
    }
  }
]
