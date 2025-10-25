import setSaferInterval from 'set-safer-interval';
import {RateLimiter} from 'discord.js-rate-limiter';

import getWikiTools from './getWikiTools.js';
import getCommands from './commands/getCommands.js';
import router from './router.js';
import getCheckin from './getCheckin.js';
import {greets, happies} from './messages/messages.js';
import * as DiscordConstants from './messages/DiscordConstants.js';
import areCommandsDifferent from './utils/areCommandsDifferent.js';
import {
  ensureDurationFormatPolyfill
} from './utils/ensureDurationFormatPolyfill.js';

/**
 * @callback MessageListener
 * @param {import('discord.js').Message} msg
 * @returns {Promise<void>}
 */

/**
 * This lets us also update the `client` value and dependent code against
 * a unit testing mock client.
 * @typedef {object} BotOptions
 * @property {boolean} [checkins=false]
 * @property {string[]} [locales=["en-US"]]
 * @property {globalThis.fetch} [fetch=globalThis.fetch]
 * @property {typeof import('intl-dom').i18n} [i18n=globalThis?.intlDom?.i18n]
 * @property {import('./getWikiTools.js').
 *   StripTags} [striptags=globalThis.striptags]
 * @property {import('discord.js').Client} [client=new Discord.Client()]
 * @property {import('discord.js')} Discord
 * @property {import('discord-tts')} discordTTS
 * @property {Pick<import('@discordjs/voice'),
 *   "joinVoiceChannel"|"createAudioPlayer"|
 *   "createAudioResource">} DiscordVoice
 * @property {import('@google-cloud/dialogflow')} dialogflow
 * @property {import('./integratedClientServerBot.js').LimitedFs} fs
 * @property {import('./discordBot.js').GetPath} getPath
 * @property {GetSettings} [getSettings]
 * @property {number} [commandInterval]
 * @property {import('discord.js-rate-limiter').RateLimiter} [rateLimiter]
 * @property {boolean} [exitNoThrow=false] Set to true for testing
 */

/**
 * @typedef {{
 *   client: import('discord.js').Client,
 *   botCommands: import('./commands/getCommands.js').BotCommands,
 *   guildCheckin: import('./getCheckin.js').GuildCheckin,
 *   system?: import('./discordBot.js').SettingsFile,
 *   getSettings?: GetSettings
 * }} BotResponse
 */

/**
 * @callback GetLocalizedSetting
 * @param {string} key
 * @param {object} [cfg]
 * @param {string[]|{
 *   guildMemberAdd: (str: string) => string[]
 * }} [cfg.defaultValue]
 * @returns {string|string[]|Text|DocumentFragment|{
 *   guildMemberAdd: (str: string) => string[]
 * }}
 */

const defaultLocale = 'en-US';
const supportedLocales = [
  // Add any other available locales here (or read `_locales` for directory
  //   names):
  defaultLocale
];

/**
 * @license MIT
 * @see Adapted from {@link https://github.com/notunderctrl/discordjs-v14-series/tree/master/07%20-%20Command%20Handler}
 * @param {import('discord.js').Client} client
 * @param {import('./commands/getCommands.js').BotCommands} localCommands
 * @param {import('intl-dom').I18NCallback} _
 */
const registerCommands = async (client, localCommands, _) => {
  const applicationCommands = await client.application?.commands;
  if (!applicationCommands) {
    // eslint-disable-next-line no-console -- CLI
    console.log(_('no_application_commands_found'));
    return;
  }
  await applicationCommands.fetch();

  await Promise.all(Object.values(localCommands).map(async (localCommand) => {
    const {name, description, options} = localCommand;

    if (!name || !description) {
      return;
    }

    const existingCommand = await applicationCommands.cache.find(
      (cmd) => {
        return cmd.name === name;
      }
    );

    if (existingCommand) {
      if (localCommand.deleted) {
        await applicationCommands.delete(existingCommand.id);
        // eslint-disable-next-line no-console -- CLI
        console.log(_('deleted_command', {name}));
        return;
      }

      if (areCommandsDifferent(existingCommand, localCommand)) {
        await applicationCommands.edit(existingCommand.id, {
          description,
          options
        });

        // eslint-disable-next-line no-console -- CLI
        console.log(_('edited_command', {name}));
      }
    } else {
      if (localCommand.deleted) {
        // eslint-disable-next-line no-console -- CLI
        console.log(
          `⏩ Skipping registering command "${name}" as it's set to delete.`
        );
        return;
      }

      await applicationCommands.create({
        name,
        description,
        options
      });

      // eslint-disable-next-line no-console -- CLI
      console.log(_('registered_command', {name}));
    }
  }));
};

/**
 * @template {object} T
 * @template {keyof T} Keys
 * @typedef {T & Required<Pick<T, Keys>>} WithRequired
 */


/**
 * @callback GetSettings
 * @param {import('./discordBot.js').SettingsFile} settings
 * @returns {import('./discordBot.js').Settings}
 */

/**
 * @param {WithRequired<
 *   Partial<BotOptions>,
 *   'fs' | 'dialogflow' | 'Discord' | 'discordTTS' | 'DiscordVoice'
 * > & Partial<BotOptions>} cfg
 * @returns {Promise<BotResponse>}
 */
const bot = async ({
  checkins = false,
  locales = typeof navigator === 'undefined'
    /* c8 ignore next 5 -- Browser */
    ? [defaultLocale]
    : [...navigator.languages.filter((locale) => {
      return supportedLocales.includes(locale);
    }), defaultLocale],
  // eslint-disable-next-line no-shadow -- Familiar
  fetch = globalThis.fetch,
  // Default to dependencies' globals in case using UMD files and user not
  //  supplying own modular versions
  /* c8 ignore next --- Ok */
  i18n = globalThis.intlDom?.i18n,
  striptags = globalThis.striptags,
  client: cl,
  Discord,
  discordTTS, // `speak` admin command
  DiscordVoice,
  dialogflow,
  fs,
  /**
   * @type {GetSettings}
   */
  getSettings: defaultGetSettings,
  getPath = (path) => path,
  // numberOfCommands = 1,
  commandInterval = 2000,
  rateLimiter = new RateLimiter(1, commandInterval),
  exitNoThrow = false
}) => {
  /**
  * @param {import('discord.js').Message} message
  * @returns {boolean}
  */
  const isUserAbusive = (message) => {
    const limited = rateLimiter.take(message.author.id);
    return limited;
  };

  // Update local copy
  // Create an instance of a Discord client
  const client = cl ||
  /* c8 ignore next -- Mocks don't use */ new Discord.Client({
    intents: [
      Discord.GatewayIntentBits.Guilds,
      Discord.GatewayIntentBits.GuildMessages,
      Discord.GatewayIntentBits.MessageContent,
      Discord.GatewayIntentBits.GuildMembers,
      Discord.GatewayIntentBits.GuildVoiceStates,
      Discord.GatewayIntentBits.GuildPresences
    ],
    partials: [Discord.Partials.GuildMember]
  });

  // Import the .json settings (use this when JSON importing is standard in
  //   Node and the browser)
  // // eslint-disable-next-line node/no-unpublished-import -- User must set
  // const system = (
  //   await import('../settings.json', {with: {type: 'json'}})
  // ).default;

  const system = JSON.parse(
    await fs.readFile(getPath('settings.json'), 'utf8')
  );

  const getSettings = typeof defaultGetSettings === 'function'
    ? defaultGetSettings
    : /** @type {GetSettings} */ (sys) => sys.development;

  const settings = getSettings(system);

  // const dayInSeconds = 24 * 60 * 60;
  // const twelveHoursInSeconds = 12 * 60 * 60;
  const fortyMinutesInMilliseconds = 40 * 60 * 1000;
  const fiftyMinutesInMilliseconds = 50 * 60 * 1000;

  // Dialogflow setup
  const app = new dialogflow.SessionsClient({
    keyFilename: getPath(/** @type {string} */ (settings.PROJECT_JSON))
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

  const _ = await i18n({
    localesBasePath: 'src',
    locales
  });

  await ensureDurationFormatPolyfill();

  /**
   * @type {GetLocalizedSetting}
   */
  const getLocalizedSetting = (key, {defaultValue} = {}) => {
    /* c8 ignore next --- Not used? */
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
    fs, settings, discordTTS, DiscordVoice
  });

  client.on('interactionCreate', async (interaction) => {
    if (!interaction.isChatInputCommand() &&
      !interaction.isStringSelectMenu() &&
      !interaction.isAutocomplete()) {
      return;
    }

    const commandObject = interaction.isAutocomplete()
      ? Object.values(botCommands).find((cmd) => {
        return cmd.name === interaction.commandName;
      })
      : interaction.isStringSelectMenu()
        ? Object.values(botCommands).find((cmd) => {
          return cmd.name === interaction.customId.split('_')[0];
        })
        : Object.values(botCommands).find((cmd) => {
          return cmd.name === interaction.commandName;
        });

    if (!commandObject) {
      return;
    }

    if (interaction.isAutocomplete()) {
      await commandObject?.autocomplete?.(interaction);
      client.emit('bahaibot:command-finished');
      return;
    }

    await commandObject?.slashCommand?.(interaction);
    client.emit('bahaibot:command-finished');
  });

  /**
  * @callback ReadyListener
  * @returns {Promise<void>}
  */

  // The ready event is vital, it means that your bot will only start
  //  reacting to information from Discord _after_ ready is emitted
  client.on('clientReady', /** @type {ReadyListener} */ async () => {
    // eslint-disable-next-line no-console -- CLI
    console.log(_('BahaiBotOnline'));

    await registerCommands(client, botCommands, _);

    // To run immediately (as for testing), uncomment:
    // guildCheckin();

    if (!checkins) {
      return;
    }

    // Set presence to show help syntax

    client.user?.setPresence({
      activities: [{
        name: '@BahaiBot !help', type: 0 // 'PLAYING'
      }]
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
        // console.log('FAILED check');
      } */
      // Keep normal supplied interval (`fiftyMinutesInMilliseconds`); we could
      //   also just return `undefined`
      return 0;
    }, fiftyMinutesInMilliseconds, {
      exitNoThrow
    });
  });

  // Process Bot Commands

  // Create an event listener for messages
  client.on(
    'messageCreate', /** @type {MessageListener} */ async (msg) => {
      // if (!msg.guildId) {
      //   return;
      // }
      const message = /** @type {import('discord.js').Message<true>} */ (msg);
      // Collect userID
      // Ensure that the bot is being messaged
      if (client.user && message.mentions.has(client.user)) {
        if (isUserAbusive(message)) {
          return;
        }
        /* MAIN FUNCTIONS */
        for (const command of Object.values(botCommands)) {
          // console.log('Command info',
          //  command.re, message.content, command.re.test(message.content)
          // );
          if (command.re?.test(message.content)) {
            try {
              // eslint-disable-next-line @stylistic/max-len -- Long
              // eslint-disable-next-line no-await-in-loop -- Needs to be in series
              await command.action?.(message);
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
          if (re?.test(message.content) &&
            (!notMentioned?.check ||
              // Any extra checks
              notMentioned.check(message))
          ) {
            // eslint-disable-next-line @stylistic/max-len -- Long
            // eslint-disable-next-line no-await-in-loop -- Needs to be in series
            await notMentioned?.action(message);
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
  * @param {import('discord.js').GuildMember} ev
  * @returns {void}
  */

  client.on('guildMemberAdd', /** @type {GuildMemberAddListener} */ (ev) => {
    const wcChannel = ev.guild.channels.cache.find(
      (val) => val.name === welcomeChannel
    );
    if (!wcChannel || !wcChannel.isTextBased()) {
      return;
    }
    const awesome = client.emojis.cache.find(
      (val) => val.name === awesomeEmoji
    );

    const greetGuildMemberAdd = /** @type {string[]} */ (getLocalizedSetting(
      'greet-guildMemberAdd', {
        defaultValue: greets.guildMemberAdd
      }
    ));

    const greet = greetGuildMemberAdd[
      Math.floor(Math.random() * greetGuildMemberAdd.length)
    ]; // Pick a random greeting

    const happiesObj = getLocalizedSetting(
      'happies',
      {
        defaultValue: happies
      }
    );

    const happiesArray = awesome
      ? /** @type {{guildMemberAdd: (str: string) => string[]}} */ (
        happiesObj
      ).guildMemberAdd(awesome.toString())
      : /** @type {{guildMemberAdd: (str: string) => string[]}} */ (
        happiesObj
      ).guildMemberAdd(':smile:');

    const happy = happiesArray[
      Math.floor(Math.random() * happiesArray.length)
    ]; // Pick a random greeting

    wcChannel.send(
      /** @type {string} */ (_('guildMemberAddWelcome', {
        userID: `<@!${ev.user.id}>`,
        greet,
        happy,
        serverName: /** @type {string} */ (
          getLocalizedSetting('serverName')
        ),
        helpTeam: `<@&${helpTeam}>`,
        /* c8 ignore next 2 --- TS */
        // eslint-disable-next-line @stylistic/max-len -- Long
        rulesChannel: ev.guild.channels.cache.get(rulesChannel)?.toString() ?? ''
      }))
    );
  });

  // Log our bot in
  client.login(/** @type {string} */ (token));

  return {client, botCommands, guildCheckin, system, getSettings};
};

export default bot;
export {registerCommands};
