import ashNazg from 'eslint-config-ash-nazg';

const commonRules = {
  'unicorn/no-this-outside-of-class': 0
};

export default [
  {
    name: 'bahaibot/ignores',
    ignores: [
      'coverage',
      'dist',
      'docs',
      '.idea'
    ]
  },
  ...ashNazg(['sauron', 'polyglot']),
  {
    name: 'bahaibot/rules',
    rules: {
      ...commonRules,

      'sonarjs/pseudo-random': 0,
      'prefer-template': ['error'],

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
      ...cfg,
      rules: {
        ...cfg.rules,
        ...commonRules
      }
    };
  }),
  ...ashNazg(['sauron', 'node']).map((cfg) => {
    return {
      files: ['src/discordBot.js', 'test/**/*.js', 'dolt-scripts/**/*.js'],
      rules: {
        ...commonRules,
        // Doesn't handle globals we use or some packages that rely
        //   on main file location for types instead of `package.json`
        'jsdoc/imports-as-dependencies': 0
      },
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
      'import-x/unambiguous': 0,

      // Todo[eslint-config-ash-nazg@>=43.0.0]: Reenable when supported again
      // 'import-x/no-unresolved': ['error', {
      //   ignore: ['bahaibot']
      // }],
      'no-unused-vars': ['error', {
        varsIgnorePattern: 'commands|buildBahaiBot|bahaibot|fulfillmentText',
        argsIgnorePattern: 'message'
      }]
    }
  }
];
