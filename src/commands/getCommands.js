// Todo: i18nize messages within `getBahaiWikis.js`, `getReader.js`,
//   `messages.js`, and the command files.
// Todo: i18nize behavior of `getWikiTools.js`, `getBahaiWikis.js`

import getSocialInfo from './getSocialInfo.js';
import getBahaiWritings from './getBahaiWritings.js';
import getBahaiWikis from './getBahaiWikis.js';
import getAdmin from './getAdmin.js';
import getBahaiInfo from './getBahaiInfo.js';
import getBahaiSalutations from './getBahaiSalutations.js';
import getSalutations from './getSalutations.js';
import getLightHearted from './getLightHearted.js';
import getDefaultCommand from './getDefaultCommand.js';
import addHelp from './addHelp.js';

import * as DiscordConstants from '../messages/DiscordConstants.js';

/**
* @callback ActionBehavior
* @param {import('discord.js').Message} message
* @returns {Promise<void>|void}
*/

/**
* @callback ActionCheck
* @param {import('discord.js').Message} message
* @returns {boolean}
*/

/**
* @typedef {object} NotMentionedCommand
* @property {ActionBehavior} action
* @property {ActionCheck} [check]
*/

/**
* @typedef {object} BotCommand
* @property {RegExp} re
* @property {ActionBehavior} action
* @property {NotMentionedCommand} [notMentioned]
* @property {{name: string, value: string}} [helpInfo]
*/

/**
* @typedef {Object<string,BotCommand>} BotCommands
*/

/* eslint-disable jsdoc/imports-as-dependencies -- Bug */
/**
 * @param {object} cfg
 * @param {import('@google-cloud/dialogflow').App} cfg.app
 * @param {import('../router.js').Router} cfg.router
 * @param {import('discord.js')} cfg.Discord
 * @param {import('../getWikiTools.js').BotWikiTools} cfg.wikiTools
 * @param {import('discord.js').Client} cfg.client
 * @param {import('../getCheckin.js').GuildCheckin} cfg.guildCheckin
 * @param {import('intl-dom').I18NCallback} cfg._
 * @param {import('../bot.js').GetLocalizedSetting} cfg.getLocalizedSetting
 * @param {import('./integratedClientServerBot.js').LimitedFs} cfg.fs
 * @param {import('../discordBot.js').Settings} cfg.settings
 * @param {import('discord-tts')} cfg.discordTTS
 * @returns {Promise<import('./getCommands.js').BotCommands>}
 */
const getCommands = async function ({
  /* eslint-enable jsdoc/imports-as-dependencies -- Bug */
  app, router, Discord,
  wikiTools, client, guildCheckin,
  _,
  // eslint-disable-next-line no-unused-vars -- Not currently in use
  getLocalizedSetting,
  fs, settings,
  discordTTS
}) {
  const {
    PUPPET_AUTHOR = DiscordConstants.USER_AB,
    ADMIN_PERMISSION = DiscordConstants.ADMIN_PERMISSION,
    ADMIN_IDS = DiscordConstants.ADMIN_IDS,
    ADMIN_ROLES = DiscordConstants.ADMIN_ROLES,
    enabledCommandGroups = ['*'],
    disabledCommandGroups = []
  } = settings;

  const anyCommand = enabledCommandGroups.includes('*');

  // eslint-disable-next-line @stylistic/max-len -- Long
  const objs = await Promise.all(/** @type {([string, () => BotCommands])[]} */ ([
    ['socialInfo', () => getSocialInfo({ADMIN_ROLES, client})],
    [
      'bahaiWritings',
      () => getBahaiWritings({fs, settings, client, Discord})
    ],
    ['bahaiWikis', () => getBahaiWikis({wikiTools, client, _})],
    ['admin', () => getAdmin({
      ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR, guildCheckin, _, client,
      discordTTS
    })],
    ['bahaiInfo', () => getBahaiInfo({client, Discord})],
    ['bahaiSalutations', () => getBahaiSalutations({client})],
    ['salutations', () => getSalutations()],
    ['lightHearted', () => getLightHearted()]
  ]).map(async ([name, cmd]) => {
    if (
      (anyCommand || enabledCommandGroups.includes(name)) &&
      !disabledCommandGroups.includes(name)
    ) {
      return await cmd();
    }
    return null;
  }));

  const commands = /** @type {{[x: string]: BotCommand}} */ (
    objs.reduce((cmds, obj) => {
      cmds = {...cmds, ...obj};
      return cmds;
    }, {})
  );

  addHelp({commands});

  // After adding help to ensure `!help` has priority
  commands.default = getDefaultCommand({
    app, router, client, Discord, _, settings
  });

  return commands;
};

export default getCommands;
