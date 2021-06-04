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
* @param {DiscordMessage} message
* @returns {Promise<void>|void}
*/

/**
* @callback ActionCheck
* @param {DiscordMessage} message
* @returns {boolean}
*/

/**
* @typedef {PlainObject} NotMentionedCommand
* @property {ActionBehavior} action
* @property {ActionCheck} [check]
*/

/**
* @typedef {PlainObject} BotCommand
* @property {RegExp} re
* @property {ActionBehavior} action
* @property {NotMentionedCommand} [notMentioned]
*/

/**
* @typedef {Object<string,BotCommand>} BotCommands
*/

/**
 * @param {PlainObject} cfg
 * @param {DialogflowApp} cfg.app
 * @param {Router} cfg.router
 * @param {Discord} cfg.Discord
 * @param {BotWikiTools} cfg.wikiTools
 * @param {DiscordClient} cfg.client
 * @param {GuildCheckin} cfg.guildCheckin
 * @param {external:IntlDom} cfg._
 * @param {GetLocalizedSetting} cfg.getLocalizedSetting
 * @param {FileSystem} cfg.fs
 * @param {Settings} cfg.settings
 * @param {DiscordTTS} cfg.discordTTS
 * @returns {BotCommands}
 */
const getCommands = async function ({
  app, router, Discord,
  wikiTools, client, guildCheckin,
  _, getLocalizedSetting,
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

  const objs = await Promise.all([
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
  ].map(async ([name, cmd]) => {
    if (
      (anyCommand || enabledCommandGroups.includes(name)) &&
      !disabledCommandGroups.includes(name)
    ) {
      return await cmd();
    }
    return null;
  }));

  const commands = objs.reduce((cmds, obj) => {
    cmds = {...cmds, ...obj};
    return cmds;
  }, {});

  addHelp({commands});

  // After adding help to ensure `!help` has priority
  commands.default = getDefaultCommand({
    app, router, client, Discord, _, settings
  });

  return commands;
};

export default getCommands;
