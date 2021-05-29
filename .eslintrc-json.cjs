'use strict';

module.exports = {
  extends: ['plugin:jsonc/recommended-with-json'],
  rules: {
    'jsonc/array-bracket-newline': ['error', 'consistent'],
    'jsonc/array-bracket-spacing': ['error', 'never'],
    'jsonc/array-element-newline': ['error', 'always'],
    'jsonc/comma-style': ['error', 'last'],
    'jsonc/indent': ['error', 'tab'],
    'jsonc/key-spacing': ['error', {
      beforeColon: false,
      afterColon: true,
      mode: 'strict'
    }],
    'jsonc/no-octal-escape': ['error'],
    'jsonc/object-curly-newline': ['error', 'always'],
    'jsonc/object-curly-spacing': ['error', 'never'],
    'jsonc/object-property-newline': ['error', {
      allowAllPropertiesOnSameLine: false
    }]
  }
};
