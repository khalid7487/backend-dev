// import globals from 'globals'
// import pluginJs from '@eslint/js'
// import tseslint from 'typescript-eslint'
// import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended'

// export default [
//   {files: ['**/*.{js,mjs,cjs,ts}']},
//   {languageOptions: {globals: globals.browser}},
//   pluginJs.configs.recommended,
//   ...tseslint.configs.recommended,
//   eslintPluginPrettierRecommended,
// ]

import js from '@eslint/js'
import globals from 'globals'
import tseslint from 'typescript-eslint'
import eslintPluginPrettier from 'eslint-plugin-prettier'
import eslintImport from 'eslint-plugin-import'

export default tseslint.config(
  {ignores: ['dist']},
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      prettier: eslintPluginPrettier,
      import: eslintImport,
    },
    // plugins: ['react-refresh', 'import', 'prettier', 'react', '@typescript-eslint'],
    rules: {
      'no-console': 'warn',
      'prettier/prettier': ['warn'],
      'arrow-body-style': ['warn', 'as-needed'],
      'no-empty-function': 'error',
      quotes: ['warn', 'single', {avoidEscape: true}],
      'prefer-const': 'off',
      'no-dupe-keys': 'warn',
      'react/react-in-jsx-scope': ['off'],
      'no-duplicate-imports': ['warn'],
      '@typescript-eslint/no-unused-vars': ['warn'],
      '@typescript-eslint/no-explicit-any': ['error'],
      'valid-typeof': ['error', {requireStringLiterals: true}],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', ['parent', 'sibling', 'index']],
          'newlines-between': 'always',
          pathGroups: [
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
          ],
          // pathGroupsExcludedImportTypes: ['internal'],
        },
      ],
      'import/no-named-as-default-member': ['off'],
      'import/no-anonymous-default-export': [
        'error',
        {
          allowArray: false,
          allowArrowFunction: false,
          allowAnonymousClass: false,
          allowAnonymousFunction: false,
          allowCallExpression: true,
          allowNew: false,
          allowLiteral: false,
          allowObject: false,
        },
      ],
    },
  },
)
