import ashNazg from 'eslint-config-ash-nazg';

export default [
  {
    name: 'bahaibot/ignores',
    ignores: [
      'coverage',
      'dist',
      '.idea'
    ]
  },
  ...ashNazg(['sauron', 'polyglot']),
  {
    name: 'bahaibot/rules',
    rules: {
      'sonarjs/pseudo-random': 0,
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

      // Allow for extensibility/clarity
      'no-lonely-if': 0
    }
  },
  ...ashNazg(['sauron', 'browser']).map((cfg) => {
    return {
      files: ['src/integratedClientServerBot.js'],
      ...cfg
    };
  }),
  ...ashNazg(['sauron', 'node']).map((cfg) => {
    return {
      files: ['src/discordBot.js', 'test/**/*.js'],
      ...cfg
    };
  }),
  {
    name: 'bahaibot/markdown',
    files: ['**/*.md/*.js'],
    languageOptions: {
      globals: {
        doAIProcessing: 'readonly',
        internalBotResponseListener: 'readonly',
        internalBotErrorListener: 'readonly',

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
        dialogflow: 'readonly',
        getPath: 'readonly',
        bot: 'readonly',
        settings: 'readonly',
        languageCode: 'readonly',
        Discord: 'readonly',
        client: 'readonly',
        fs: 'readonly',
        getSettings: 'readonly',
        getSettingsPath: 'readonly'
      }
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
];
