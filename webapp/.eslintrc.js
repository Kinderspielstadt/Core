module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    '@vue/eslint-config-typescript',
    'plugin:vue/vue3-recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:tailwindcss/recommended',
    // This extension disables all formatting rules that might conflict with prettier
    // Make sure it is the last element in this list, see https://eslint.vuejs.org/user-guide/#conflict-with-prettier
    '@vue/eslint-config-prettier/skip-formatting',
  ],
  parser: 'vue-eslint-parser',
  env: {
    node: true,
    es6: true,
  },
  rules: {
    'no-console': 'warn',
    'no-debugger': 'warn',
    'vue/no-deprecated-slot-attribute': 'off',
    'vue/v-on-event-hyphenation': ['warn', 'always', { autofix: true }], // Autofix is disabled by default, activating it makes the migration much easier.
    'vue/component-name-in-template-casing': ['error', 'PascalCase'],
    'vue/component-tags-order': [
      'error',
      { order: ['script', 'template', 'style'] },
    ],
    'vue/require-default-prop': 'off',
    // Ignoring unused variables that start with a underscore (useful for array destructuring)
    '@typescript-eslint/no-unused-vars': [
      'warn',
      {
        argsIgnorePattern: '^_',
        varsIgnorePattern: '^_',
        caughtErrorsIgnorePattern: '^_',
      },
    ],
    'vue/no-multiple-template-root': 'warn',
    'vue/html-self-closing': [
      'warn',
      {
        html: {
          void: 'any',
          normal: 'any',
          component: 'always',
        },
      },
    ],
    'tailwindcss/no-custom-classname': 'off',
    'tailwindcss/classnames-order': 'off',
  },
};
