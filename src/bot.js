// Todo: Ought to do a review to ensure all Promise APIs are awaited or at
//   least flagged as deliberately not awaiting

import setSaferInterval from 'set-safer-interval';
import {RateLimiter} from 'discord.js-rate-limiter';

import getWikiTools from './getWikiTools.js';
import getCommands from './commands/getCommands.js';
import router from './router.js';
import getCheckin from './getCheckin.js';
import {greets, happies} from './messages/messages.js';
import * as DiscordConstants from './messages/DiscordConstants.js';

/**
 * This lets us also update the `client` value and dependent code against
 * a unit testing mock client.
 * @typedef {PlainObject} BotOptions
 * @property {boolean} [checkins=false]
 * @property {string[]} [locales=["en-US"]]
 * @property {window.fetch} [fetch=window.fetch]
 * @property {IntlDomI18N} [i18n=window?.intlDom?.i18n]
 * @property {striptags} [striptags=window.striptags]
 * @property {DiscordClient} [client=new Discord.Client()]
 * @property {Discord} Discord
 * @property {dialogflow} dialogflow
 * @property {FileSystem} fs
 * @property {GetPath} getPath
 * @property {boolean} [exitNoThrow=false] Set to true for testing
 */

/**
* @typedef {{client, botCommands, guildCheckin}} BotResponse
*/

const defaultLocale = 'en-US';
const supportedLocales = [
  // Add any other available locales here (or read `_locales` for directory
  //   names):
  defaultLocale
];

/**
 * @callback GetSettings
 * @returns {Object<string,any>}
 */

/**
 * @param {BotOptions} cfg
 * @returns {Promise<BotResponse>}
 */
const bot = async ({
  checkins = false,
  locales = typeof navigator === 'undefined'
    ? [defaultLocale]
    /* c8 ignore next 3 */
    : [...navigator.languages.filter((locale) => {
      return supportedLocales.includes(locale);
    }), defaultLocale],
  fetch = window.fetch,
  // Default to dependencies' globals in case using UMD files and user not
  //  supplying own modular versions
  i18n = window?.intlDom?.i18n,
  striptags = window.striptags,
  client: cl,
  Discord,
  discordTTS, // `speak` admin command
  dialogflow,
  fs,
  /**
   * @type {GetSettings}
   */
  getSettings: defaultGetSettings,
  getPath,
  numberOfCommands = 1,
  commandInterval = 2000,
  rateLimiter = new RateLimiter(1, commandInterval),
  exitNoThrow = false
} = {}) => {
  /**
  * @param {external:DiscordMessage} message
  * @returns {boolean}
  */
  const isUserAbusive = (message) => {
    const limited = rateLimiter.take(message.author.id);
    return limited;
  };

  // Update local copy
  // Create an instance of a Discord client
  const client = cl || /* c8 ignore next */ new Discord.Client();

  // Import the .json settings (use this when JSON importing is standard in
  //   Node and the browser)
  // // eslint-disable-next-line node/no-unpublished-import -- User must set
  // import system from '../settings.json';

  const system = JSON.parse(
    await fs.readFile(getPath('settings.json'), 'utf8')
  );

  const getSettings = typeof defaultGetSettings === 'function'
    ? defaultGetSettings
    : (sys) => sys.development;

  const settings = getSettings(system);

  // const dayInSeconds = 24 * 60 * 60;
  // const twelveHoursInSeconds = 12 * 60 * 60;
  const fortyMinutesInMilliseconds = 40 * 60 * 1000;
  const fiftyMinutesInMilliseconds = 50 * 60 * 1000;

  // Dialogflow setup
  const app = new dialogflow.SessionsClient({
    keyFilename: getPath(settings.PROJECT_JSON)
  });

  const {
    // The token of your bot -
    // https://discordapp.com/developers/applications/me
    //  (set on settings.json)
    token,
    disableNotMentioned = false,
    welcomeChannel = 'welcome',
    awesomeEmoji = 'awesome',
    helpTeam = DiscordConstants.BAHAI_FYI_HELP_TEAM,
    rulesChannel = DiscordConstants.BAHAI_FYI_RULES_CHANNEL_ID
  } = settings;

  /**
  * @external IntlDOMInternationalizer
  * @see {@link https://github.com/brettz9/intl-dom}
  */
  /**
  * @type {external:IntlDOMInternationalizer}
  */
  const _ = await i18n({
    localesBasePath: 'src',
    locales
  });

  /**
   * @callback GetLocalizedSetting
   * @param {string} key
   * @param {PlainObject} cfg
   * @param {boolean} cfg.noDefaults
   * @returns {any}
   */

  /**
   * @type {GetLocalizedSetting}
   */
  const getLocalizedSetting = (key, {defaultValue} = {}) => {
    return settings?.locales?.[_.resolvedLocale][key] ||
      defaultValue || _(key);
  };

  const wikiTools = getWikiTools({
    fetch, striptags, _
  });

  // Import commands and set default command
  const guildCheckin = getCheckin({
    client, fs, wikiTools, settings, getLocalizedSetting, _
  });

  const botCommands = await getCommands({
    app, router, Discord,
    wikiTools, client, guildCheckin,
    _, getLocalizedSetting,
    fs, settings, discordTTS
  });

  /**
  * @callback ReadyListener
  * @returns {void}
  */

  // The ready event is vital, it means that your bot will only start
  //  reacting to information from Discord _after_ ready is emitted
  client.on('ready', /** @type {ReadyListener} */ () => {
    // eslint-disable-next-line no-console -- CLI
    console.log(_('BahaiBotOnline'));

    // To run immediately (as for testing), uncomment:
    // guildCheckin();

    if (!checkins) {
      return;
    }

    // Set presence to show help syntax

    client.user.setPresence({
      activity: {name: '@BahaiBot !help', type: 'PLAYING'}
    });

    setSaferInterval((interval) => {
      const date = new Date();
      // console.log('Checking date', date,
      //  'hours?', date.getUTCHours(), 'minutes', date.getUTCMinutes());
      // 12pm UTC == 8am EST (8:00am-8:59am)
      if (date.getUTCHours() === 12) { // 0-23 UTC
        // console.log('Matches 12 hours');
        // To avoid running twice in the hour, bump forty minutes before
        //   next check
        if (date.getUTCMinutes() < 15) {
          // console.log('Under 15 minutes, so jumping 40');
          return fortyMinutesInMilliseconds - interval;
        }
        // console.log('Not under 15, so safe to execute');
        // 8:15am-8:59am EST (so safe to increment 50 minutes without
        //   recurring within the 8am EST (12pm UTC) window)
        guildCheckin();
      } /* else {
        console.log('FAILED check');
      } */
      // Keep normal supplied interval (`fiftyMinutesInMilliseconds`); we could
      //   also just return `undefined`
      return 0;
    }, fiftyMinutesInMilliseconds, {
      exitNoThrow
    });
  });

  // Process Bot Commands

  /**
  * @callback MessageListener
  * @param {external:DiscordMessage} message
  * @returns {void}
  */

  // Create an event listener for messages
  client.on(
    'message', /** @type {MessageListener} */ async (message) => {
      // Collect userID
      // Ensure that the bot is being messaged
      if (message.mentions.has(client.user)) {
        if (isUserAbusive(message)) {
          return;
        }
        /* MAIN FUNCTIONS */
        for (const command of Object.values(botCommands)) {
          // console.log('Command info',
          //  command.re, message.content, command.re.test(message.content)
          // );
          if (command.re.test(message.content)) {
            try {
              // eslint-disable-next-line max-len -- Long
              // eslint-disable-next-line no-await-in-loop -- Needs to be in series
              await command.action(message);
            /* c8 ignore start */
            } catch (err) {
              // eslint-disable-next-line no-console -- CLI
              console.error(
                _('errorExecuting')
              );
              // eslint-disable-next-line no-console -- CLI
              console.error(
                message.content, err
              );
            }
            client.emit('bahaibot:command-finished');
            /* c8 ignore stop */
            break;
          }
        }
        client.emit('bahaibot:command-finished');
      } else if (!disableNotMentioned) { // If the Bot is NOT Mentioned
        const notMentionedCommands = Object.values(
          botCommands
        ).filter((cmd) => {
          return cmd.notMentioned;
        });
        for (const {re, notMentioned} of notMentionedCommands) {
          if (re.test(message.content) &&
            (!notMentioned.check ||
              // Any extra checks
              notMentioned.check(message))
          ) {
            // eslint-disable-next-line max-len -- Long
            // eslint-disable-next-line no-await-in-loop -- Needs to be in series
            await notMentioned.action(message);
            client.emit('bahaibot:command-finished');
            break;
          }
        }
        client.emit('bahaibot:command-finished');
      }
    }
  );

  // EVENT BASED ACTIONS

  // New user added

  /**
  * @callback GuildMemberAddListener
  * @param {DiscordGuildMember} ev
  * @returns {void}
  */

  client.on('guildMemberAdd', /** @type {GuildMemberAddListener} */ (ev) => {
    const wcChannel = ev.guild.channels.cache.find(
      (val) => val.name === welcomeChannel
    );
    if (!wcChannel) {
      return;
    }
    const awesome = client.emojis.cache.find(
      (val) => val.name === awesomeEmoji
    );

    const greetGuildMemberAdd = getLocalizedSetting(
      'greet-guildMemberAdd', {
        defaultValue: greets.guildMemberAdd
      }
    );

    const greet = greetGuildMemberAdd[
      Math.floor(Math.random() * greetGuildMemberAdd.length)
    ]; // Pick a random greeting

    const happiesObj = getLocalizedSetting(
      'happies', {
        defaultValue: happies
      }
    );

    const happiesArray = awesome
      ? happiesObj.guildMemberAdd(awesome.toString())
      : happiesObj.guildMemberAdd(':smile:');

    const happy = happiesArray[
      Math.floor(Math.random() * happiesArray.length)
    ]; // Pick a random greeting

    wcChannel.send(
      _('guildMemberAddWelcome', {
        userID: `<@!${ev.user.id}>`,
        greet,
        happy,
        serverName: getLocalizedSetting('serverName'),
        helpTeam: `<@&${helpTeam}>`,
        rulesChannel: ev.guild.channels.cache.get(rulesChannel).toString()
      })
    );
  });

  // Log our bot in
  client.login(token);

  return {client, botCommands, guildCheckin, system, getSettings};
};

export default bot;
