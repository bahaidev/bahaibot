// API: https://discord.js.org/#/docs/main/stable/general/welcome
// Reference: If any bugs remaining from v11, see
//   https://discordjs.guide/additional-info/changes-in-v12.html

import * as fs from 'fs/promises';

import {join} from 'path';

// Import the discord.js module
import * as Discord from 'discord.js';

import * as discordTTS from 'discord-tts';

// ChatBot functions
// Require Modules and settings for AI

// Importing dialogflow v2 api
import dialogflow from '@google-cloud/dialogflow';

import {i18n, setFetch} from 'intl-dom';
import fileFetch from 'file-fetch'; // For `intl-dom`
// eslint-disable-next-line no-shadow -- Familiar
import fetch from 'node-fetch';
// eslint-disable-next-line import/no-unresolved -- Bug
import {stripHtml} from 'string-strip-html';

import bot from './bot.js';

/**
 * @typedef {{
 *   PROJECT_JSON?: string,
 *   PROJECT_ID?: string,
 *   PUPPET_AUTHOR?: string,
 *   ADMIN_PERMISSION?: string,
 *   ADMIN_IDS?: string[],
 *   ADMIN_ROLES?: string[],
 *   enabledCommandGroups?: string[],
 *   disabledCommandGroups?: string[],
 *   token?: string,
 *   disableNotMentioned?: boolean,
 *   welcomeChannel?: string,
 *   awesomeEmoji?: string,
 *   helpTeam?: string,
 *   rulesChannel?: string,
 *   embedColor?: number,
 *   embedTextLimit?: number,
 *   bstarEmoji?: string,
 *   locales?: Record<string, Record<string, string | {
 *     guildMemberAdd: (str: string) => string[]
 *   }>>
 *   checkinGuilds?: {
 *     guildID: string,
 *     guildName: string,
 *     guildChannels: {
 *       id: string,
 *       greetings?: string,
 *       bpToday?: boolean
 *     }[]
 *   }[]
 * }} Settings
 */

/**
 * @typedef {{
 *   production: Settings
 *   development: Settings
 * }} SettingsFile
 */

// GET LOCALE

/** @type {string[]} */
let locales;
const localeIndex = process.argv.indexOf('--locales');
// Ignoring flag coverage as seem unable to override even `global.process`
//   during unit testing
/* c8 ignore next 3 */
if (localeIndex !== -1) {
  locales = [process.argv[localeIndex + 1]];
}

// GET OTHER OPTIONS
const checkins = process.argv.includes('--checkins');

// Needed by intl-dom
setFetch(fileFetch);

/**
 * @callback GetPath
 * @param {string} path
 * @returns {string}
 */

/**
* @type {GetPath}
*/
const getPath = (path) => {
  return join(process.cwd(), path);
};

/**
* @param {SettingsFile} sys
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
 * @param {import('./bot.js').BotOptions} [args]
 * @returns {Promise<import('./bot.js').BotResponse>}
 */
function discordBot (args) {
  return bot({
    checkins,
    locales,
    fs,
    getSettings,
    getPath,
    dialogflow,
    i18n,
    striptags: (str) => stripHtml(str).result,
    fetch,
    Discord,
    discordTTS,
    ...args
  });
}

export default discordBot;
