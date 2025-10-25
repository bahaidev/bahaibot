// API: https://discord.js.org/#/docs/main/stable/general/welcome
// Reference: If any bugs remaining from v11, see
//   https://discordjs.guide/additional-info/changes-in-v12.html

import * as fs from 'fs/promises';

import {join} from 'path';

// Import the discord.js module
import * as Discord from 'discord.js';

import * as discordTTS from 'discord-tts';
import * as DiscordVoice from '@discordjs/voice';

// ChatBot functions
// Require Modules and settings for AI

// Importing dialogflow v2 api
import dialogflow from '@google-cloud/dialogflow';

import {i18n, setFetch} from 'intl-dom';
import fileFetch from 'file-fetch'; // For `intl-dom`
// eslint-disable-next-line import/no-unresolved -- Bug
import {stripHtml} from 'string-strip-html';

import bot from './bot.js';

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
 * Get the `webhookURL` from channel settings -> Integrations -> Webhooks.
 * @typedef {{
 *   PROJECT_JSON?: string,
 *   PROJECT_ID?: string,
 *   PUPPET_AUTHOR?: string,
 *   ADMIN_PERMISSION?: string,
 *   ADMIN_IDS?: string[],
 *   ADMIN_ROLES?: string[],
 *   webhookURL?: string,
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

/**
* @param {SettingsFile} sys
*/
const getSettings = (sys) => {
  return process.argv.includes('--production')
    /* c8 ignore next -- Not needed for testing */
    ? sys.production
    : sys.development;
};

const system = JSON.parse(
  await fs.readFile(getPath('settings.json'), 'utf8')
);
const {webhookURL} = getSettings(system);

/* c8 ignore next 32 -- Emergencies only */
/**
 * @param {string} msg
 */
const notifyDiscordChannel = async (msg) => {
  if (webhookURL) {
    const webhookClient = new Discord.WebhookClient({
      url: webhookURL
    });

    await webhookClient.send({
      content: `The bot service went down! Error: ${msg}`
    });
  }
};

process.on('uncaughtException', async (err) => {
  // eslint-disable-next-line no-console -- Debugging
  console.error('Uncaught Exception:', err);

  const errStr = err.toString();
  const idx = errStr.lastIndexOf('\n');
  const errString = idx === -1 ? errStr : errStr.slice(0, idx);
  await notifyDiscordChannel(errString);

  process.exit(1);
});

process.on('beforeExit', async (code) => {
  // eslint-disable-next-line no-console -- Debugging
  console.log('Exiting');
  await notifyDiscordChannel(`Error \`beforeExit\` code: ${String(code)}`);
});

// GET LOCALE

/** @type {string[]} */
let locales;
const localeIndex = process.argv.indexOf('--locales');

/* c8 ignore next 4 -- Ignoring flag coverage as seem unable to override
    even `global.process` during unit testing */
if (localeIndex !== -1) {
  locales = [process.argv[localeIndex + 1]];
}

// GET OTHER OPTIONS
const checkins = process.argv.includes('--checkins');

// Needed by intl-dom
setFetch(fileFetch);

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
    DiscordVoice,
    ...args
  });
}

export default discordBot;
