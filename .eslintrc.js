module.exports = {
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: 'tsconfig.json',
    tsconfigRootDir: __dirname,
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint/eslint-plugin',
    'simple-import-sort',
    'prettier',
    'unused-imports',
    'sort-class-members',
  ],
  extends: [
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:prettier/recommended',
  ],
  root: true,
  env: {
    node: true,
    jest: true,
  },
  ignorePatterns: ['dist/', 'node_modules/', 'migrations/', '.eslintrc.js'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/no-inferrable-types': 'off',
    '@typescript-eslint/explicit-member-accessibility': ['error', { accessibility: 'no-public' }],
    '@typescript-eslint/no-unused-vars': ['error', { ignoreRestSiblings: true }],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../../../*'],
      },
    ],
    '@typescript-eslint/naming-convention': [
      'error',
      {
        selector: 'interface',
        format: ['PascalCase'],
        custom: {
          regex: '^I[A-Z]',
          match: true,
        },
      },
      {
        selector: 'memberLike',
        modifiers: ['private'],
        format: ['camelCase', 'PascalCase'],
        leadingUnderscore: 'require',
      },
    ],
    'simple-import-sort/imports': [
      'error',
      {
        groups: [
          // External packages.
          [
            // Import type
            '^(typeorm|dotenv|@nestjs|fs|path|helmet|express-rate-limit|express-basic-auth|express|body-parser|class-validator|class-transformer|nodemailer|jsonwebtoken|crypto|pg|child_process)(/.*\\u0000|.*\\u0000$)',
            '^(typeorm|dotenv|@nestjs|fs|path|helmet|express-rate-limit|express-basic-auth|express|body-parser|class-validator|class-transformer|nodemailer|jsonwebtoken|crypto|pg|child_process)(/.*|$)',
          ],
          // Internal packages.
          [
            // Import type
            '^(@core|@entities|@models|@shared|@modules|@fixtures|@repositories)(/.*\\u0000|.*\\u0000$)',
            '^(@core|@entities|@models|@shared|@modules|@fixtures|@repositories)(/.*|$)',
          ],
          [
            // Import type
            '^@?\\w.*\\u0000$',
            '^[^.].*\\u0000$',
            '^\\..*\\u0000$',
            // Side effect imports.
            '^\\u0000',
            // Parent imports. Put `..` last.
            '^\\.\\.(?!/?$)',
            '^\\.\\./?$',
            // Other relative imports. Put same-folder imports and `.` last.
            '^\\./(?=.*/)(?!/?$)',
            '^\\.(?!/?$)',
            '^\\./?$',
          ],
        ],
      },
    ],

    'sort-imports': 'off',
    'import/order': 'off',
    'no-multiple-empty-lines': [
      'error',
      {
        max: 1,
        maxEOF: 0,
      },
    ],
    'sort-class-members/sort-class-members': [
      'error',
      {
        order: [
          '[static-properties]',
          '[properties]',
          '[conventional-private-properties]',
          'constructor',
          '[static-getters]',
          '[getters]',
          '[setters]',
          '[conventional-private-getters]',
          '[conventional-private-setters]',
          '[methods]',
          '[conventional-private-methods]',
        ],
        groups: {
          'static-getters': [
            {
              type: 'method',
              kind: 'get',
              static: true,
              sort: 'alphabetical',
            },
          ],
          'conventional-private-getters': [
            {
              name: '/_.+/',
              type: 'method',
              kind: 'get',
              sort: 'alphabetical',
            },
          ],
          'conventional-private-setters': [
            {
              name: '/_.+/',
              type: 'method',
              kind: 'set',
              sort: 'alphabetical',
            },
          ],
        },
        accessorPairPositioning: 'getThenSet',
        stopAfterFirstProblem: false,
      },
    ],
    'no-restricted-syntax': 'off',
    'class-methods-use-this': 'off',

    'lines-between-class-members': ['error', 'always', { exceptAfterSingleLine: true }],
    '@typescript-eslint/typedef': [
      'error',
      {
        arrayDestructuring: false,
        arrowParameter: true,
        memberVariableDeclaration: true,
        objectDestructuring: false,
        parameter: true,
        propertyDeclaration: true,
        variableDeclaration: false,
        variableDeclarationIgnoreFunction: true,
      },
    ],
    'unused-imports/no-unused-imports-ts': 'error',
    '@typescript-eslint/no-empty-function': [
      'error',
      {
        allow: ['constructors'],
      },
    ],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: '*',
        next: ['return', 'break'],
      },
      {
        blankLine: 'always',
        prev: ['const', 'let'],
        next: '*',
      },
      {
        blankLine: 'any',
        prev: ['const', 'let'],
        next: ['const', 'let'],
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'if',
      },
      {
        blankLine: 'always',
        prev: 'if',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'throw',
      },
    ],
  },

};
