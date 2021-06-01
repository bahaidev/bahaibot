/* eslint-env node -- This file *is* Node only */
// API: https://discord.js.org/#/docs/main/stable/general/welcome
// Reference: If any bugs remaining from v11, see
//   https://discordjs.guide/additional-info/changes-in-v12.html

import * as fs from 'fs/promises';

import {join} from 'path';

// Import the discord.js module
import Discord from 'discord.js';

import discordTTS from 'discord-tts';

// ChatBot functions
// Require Modules and settings for AI

// Todo: apiai should be replaced with:
//   https://cloud.google.com/dialogflow/es/docs/reference/libraries/nodejs
import apiai from 'apiai';
import {i18n, setFetch} from 'intl-dom';
import fileFetch from 'file-fetch'; // For `intl-dom`
import fetch from 'node-fetch';
import striptags from 'striptags';

import bot from './bot.js';

// GET LOCALE
let locales;
const localeIndex = process.argv.indexOf('--locales');
// Ignoring flag coverage as seem unable to override even `global.process`
//   during unit testing
/* c8 ignore next 3 */
if (localeIndex >= 0) {
  locales = [process.argv[localeIndex + 1]];
}

// GET OTHER OPTIONS
const checkins = process.argv.includes('--checkins');

// Needed by intl-dom
setFetch(fileFetch);

/**
 * @callback GetSettingsPath
 * @returns {string}
 */

/**
* @type {GetSettingsPath}
*/
const getSettingsPath = () => {
  return join(process.cwd(), 'settings.json');
};

/**
* @param {Settings} sys
*/
const getSettings = (sys) => {
  return process.argv.includes('--production')
    /* c8 ignore next */
    ? sys.production
    : sys.development;
};

/**
 * This is created separately from `index.js` so as to allow testing files to
 * have Discord conveniently baked in, requiring case-by-case overrides only.
 * @param {BotOptions} args
 * @returns {Promise<void>}
 */
function discordBot (args) {
  return bot({
    checkins,
    locales,
    fs,
    getSettings,
    getSettingsPath,
    apiai,
    i18n,
    striptags,
    fetch,
    Discord,
    discordTTS,
    ...args
  });
}

export default discordBot;
