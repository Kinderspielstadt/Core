module.exports = {
  root: true,
  extends: [
    'eslint:recommended',
    'plugin:vue/vue3-recommended',
    'plugin:vue-scoped-css/vue3-recommended',
    'plugin:tailwindcss/recommended',
  ],
  parser: 'vue-eslint-parser',
  env: {
    'node': true,
    'es6': true,
  },
  rules: {
    'camelcase': ['error', {
      'properties': 'always',
      'ignoreDestructuring': false,
      'ignoreImports': false,
    }],
    'comma-dangle': ['error', 'always-multiline'],
    'comma-spacing': ['error', { 'before': false, 'after': true }],
    'curly': ['error', 'all'],
    'eol-last': ['error', 'never'],
    'indent': ['error', 2],
    'key-spacing': ['error', {
      'beforeColon': false,
      'afterColon': true,
      'mode': 'strict',
    }],
    'keyword-spacing': ['error', {
      'after': true,
      'overrides': {
        'if': { 'after': false },
        'for': { 'after': false },
        'while': { 'after': false },
      },
    }],
    'max-classes-per-file': ['error', 1],
    'max-len': ['error', 150],
    'no-console': ['warn'],
    'no-empty': ['error', { 'allowEmptyCatch': false }],
    'no-multi-spaces': ['error', { 'ignoreEOLComments': false }],
    'no-trailing-spaces': ['error', { 'ignoreComments': false }],
    'no-warning-comments': ['warn', { 'location': 'start' }],
    'object-curly-spacing': ['error', 'always'],
    'quotes': ['error', 'single'],
    'semi': ['error', 'always'],
    'sort-vars': ['error', { 'ignoreCase': true }],
    'space-before-blocks': ['error', 'always'],
    'space-before-function-paren': ['error', {
      'anonymous': 'always',
      'named': 'never',
      'asyncArrow': 'always',
    }],
    'space-in-parens': ['error', 'never'],
    'spaced-comment': ['error', 'always'],
  },
  overrides: [
    {
      files: ['*.js'],
      parserOptions: {
        'sourceType': 'module',
      },
      env: {
        'browser': true,
      },
    },
    {
      files: ['*.ts', '*.vue'],
      parser: 'vue-eslint-parser',
      parserOptions: {
        parser: '@typescript-eslint/parser',
        sourceType: 'module',
        project: 'tsconfig.json',
        tsconfigRootDir: __dirname,
        extraFileExtensions: ['.vue'],
      },
      plugins: [
        '@typescript-eslint',
      ],
      extends: [
        'plugin:@typescript-eslint/eslint-recommended',
        'plugin:@typescript-eslint/recommended',
      ],
      globals: {
        defineProps: 'readonly',
        defineEmits: 'readonly',
        defineExpose: 'readonly',
      },
      rules: {
        '@typescript-eslint/naming-convention': [
          'error',
          {
            'selector': 'default',
            'format': ['camelCase'],
          },
          {
            'selector': 'variable',
            'modifiers': ['const'],
            'format': ['PascalCase', 'camelCase', 'UPPER_CASE'],
          },
          {
            'selector': ['parameter', 'property'],
            'format': ['camelCase'],
            'leadingUnderscore': 'allow',
          },
          {
            'selector': 'typeLike',
            'format': ['PascalCase'],
          },
          {
            'selector': 'interface',
            'format': ['PascalCase'],
            'prefix': ['I'],
          },
          {
            'selector': 'enumMember',
            'format': ['UPPER_CASE'],
          },
          {
            'selector': 'variable',
            'types': ['boolean'],
            'format': ['PascalCase'],
            'prefix': ['is', 'should', 'has', 'can', 'did', 'will'],
          },
        ],
        '@typescript-eslint/no-empty-interface': ['error', { 'allowSingleExtends': false }],
        'quotes': 'off',
        '@typescript-eslint/quotes': ['error', 'single'],
        '@typescript-eslint/type-annotation-spacing': ['error', { 'before': false, 'after': true }],
        'vue/singleline-html-element-content-newline': 0,
        'vue/require-v-for-key': 'off',
        'vue/no-v-html': 'off',
        'vue/html-self-closing': ['error', {
          'html': {
            'void': 'any',
            'normal': 'always',
            'component': 'always',
          },
          'svg': 'always',
          'math': 'always',
        }],
        'tailwindcss/no-custom-classname': 'off',
      },
    },
  ],
};