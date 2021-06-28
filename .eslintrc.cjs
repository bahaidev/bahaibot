'use strict';

module.exports = {
  extends: [
    'ash-nazg/sauron-node-overrides',
    'plugin:chai-friendly/recommended'
  ],
  env: {
    node: false,
    browser: false,
    'shared-node-browser': true
  },

  parser: '@babel/eslint-parser',

  // Auto-set dynamically by config but needs to be explicit for Atom
  parserOptions: {
    ecmaVersion: 2021
  },

  overrides: [
    {
      files: '**/*.md/*.js',
      globals: {
        doAIProcessing: 'readonly',
        bot: 'readonly',
        theCurrentLocale: 'readonly',
        languageCode: 'readonly',

        DiscordConstants: 'readonly',
        getLocalizedSetting: 'readonly',
        greets: 'readonly',
        checkinGuilds: 'writeable',

        message: 'readonly',
        bahaibot: 'readonly',
        buildBahaiBot: 'readonly',
        checkins: 'readonly',
        locales: 'readonly',
        fetch: 'readonly',
        i18n: 'readonly',
        striptags: 'readonly',
        Discord: 'readonly',
        client: 'readonly',
        dialogflow: 'readonly',
        fs: 'readonly',
        getSettings: 'readonly',
        getPath: 'readonly',
        settings: 'readonly'
      },
      rules: {
        'no-shadow': 0,
        'jsdoc/require-jsdoc': 0,
        'import/unambiguous': 0,
        'import/no-unresolved': ['error', {
          ignore: ['bahaibot']
        }],
        'no-unused-vars': ['error', {
          varsIgnorePattern: 'commands|buildBahaiBot|bahaibot|fulfillmentText',
          argsIgnorePattern: 'message'
        }]
      }
    }
  ],

  rules: {
    'prefer-template': ['error'],

    // Can remove this when to-dos are done
    'unicorn/expiring-todo-comments': ['warn', {
      allowWarningComments: false, terms: ['todo']
    }],

    'jsdoc/require-jsdoc': ['error', {
      exemptEmptyFunctions: true,
      require: {
        ArrowFunctionExpression: true,
        ClassDeclaration: true,
        ClassExpression: true,
        FunctionDeclaration: true,
        FunctionExpression: true,
        MethodDefinition: true
      }
    }],

    // Browser-only
    'compat/compat': 0,

    // Allow for extensibility/clarity
    'no-lonely-if': 0,

    // A bit oppressive
    'unicorn/prefer-prototype-methods': 0
  }
};
