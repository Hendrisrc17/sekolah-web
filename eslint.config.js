import js from '@eslint/js';
import reactHooks from 'eslint-plugin-react-hooks';

export default [
  { ignores: ['dist', 'node_modules', 'coverage'] },
  js.configs.recommended,
  { files: ['**/*.{js,jsx}'], languageOptions: { parserOptions: { ecmaFeatures: { jsx: true } }, globals: { process: 'readonly', console: 'readonly', fetch: 'readonly', document: 'readonly', window: 'readonly', sessionStorage: 'readonly', Blob: 'readonly', URL: 'readonly' } }, plugins: { 'react-hooks': reactHooks }, rules: { ...reactHooks.configs.recommended.rules, 'react-hooks/exhaustive-deps': 'off', 'no-unused-vars': ['error', { argsIgnorePattern: '^_' }] } },
  { files: ['src/**/*.jsx'], rules: { 'no-unused-vars': 'off' } },
];
