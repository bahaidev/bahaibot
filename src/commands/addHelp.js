import {searchEngines} from './searchEngines.js';
import {searchReferences} from './searchReferences.js';

/**
 * @typedef {{name: string, value: string}} BotHelpField
 */

/**
 * @param {object} cfg
 * @param {import('./getCommands.js').BotCommands} cfg.commands
 * @param {import('discord.js')} cfg.Discord
 */
const addHelp = ({commands, Discord}) => {
  const help = {
    name: 'help',
    description: 'List available help commands',
    re: /!help\b/iv,
    helpInfo: {
      name: '!help',
      value: 'Displays help text. For more commands, use ' +
                '`!helpextras`, `!helpadmin`, and `!helpshortcuts`'
    },
    /**
     * @param {import('./getCommands.js').InputCommandOrSelectMenu} interaction
     * @returns {Promise<void>}
     */
    async slashCommand (interaction) {
      /* c8 ignore next 3 -- TS guard */
      if (!interaction.inCachedGuild()) {
        return;
      }
      await this.action?.({
        author: interaction.user,
        channel: {
          /**
           * @param {string} reply
           */
          // @ts-expect-error Just mocking what we need
          send (reply) {
            interaction.reply(reply);
          }
        }
      });
    },
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {void}
     */
    action (message) {
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embeds: [{
          color: 8359053,
          description: 'I can respond to well-formed questions about basic ' +
              "Bahá'í topics. As well, the following commands can help me " +
              'process your requests. Make sure to mention me when trying ' +
              'to use them, like this: `@BahaiBot !help`',
          fields
        }]
      });
    }
  };

  const helpextras = {
    name: 'helpextras',
    description: 'Displays help text for rarer commands.',
    re: /!helpextras\b/iv,
    helpInfo: {
      name: '!helpextras',
      value: 'Displays help text for rarer commands.'
    },
    /**
     * @param {import('./getCommands.js').InputCommandOrSelectMenu} interaction
     * @returns {Promise<void>}
     */
    async slashCommand (interaction) {
      /* c8 ignore next 3 -- TS guard */
      if (!interaction.inCachedGuild()) {
        return;
      }
      await this.action?.({
        author: interaction.user,
        channel: {
          /**
           * @param {string} reply
           */
          // @ts-expect-error Just mocking what we need
          send (reply) {
            interaction.reply(reply);
          }
        }
      });
    },
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {void}
     */
    action (message) {
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embeds: [{
          color: 8359053,
          description: 'The following commands can help me ' +
              'process your requests. Make sure to mention me when trying ' +
              'to use them, like this: `@BahaiBot !helpextras`',
          fields: fieldsExtra
        }]
      });
    }
  };

  const helpadmin = {
    name: 'helpadmin',
    description: 'List available help commands available only to admins.',
    re: /!helpadmin\b/iv,
    helpInfo: {
      name: '!helpadmin',
      value: 'Displays help text for commands available only to admins.'
    },
    /**
     * @param {import('./getCommands.js').InputCommandOrSelectMenu} interaction
     * @returns {Promise<void>}
     */
    async slashCommand (interaction) {
      if (!interaction.inCachedGuild()) {
        return;
      }
      await this.action?.({
        author: interaction.user,
        channel: {
          /**
           * @param {string} reply
           */
          // @ts-expect-error Just mocking what we need
          send (reply) {
            interaction.reply(reply);
          }
        }
      });
    },
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {void}
     */
    action (message) {
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embeds: [{
          color: 8359053,
          description: 'The following administrator commands can help me ' +
              'process your requests. Make sure to mention me when trying ' +
              'to use them, like this: `@BahaiBot !helpadmin`',
          fields: fieldsAdmin
        }]
      });
    }
  };

  const maxFieldsPerPage = 25;
  const helpshortcuts = /** @type {import('./getCommands.js').BotCommand} */ ({
    name: 'helpshortcuts',
    description: 'Displays help text for shortcuts to searches.',
    re: /!helpshortcuts\b/iv,
    helpInfo: {
      name: '!helpshortcuts',
      value: 'Displays help text for shortcuts to searches.'
    },
    options: [
      {
        name: 'page',
        description: 'The page number of shortcuts to retrieve',
        type: Discord.ApplicationCommandOptionType.Integer,
        required: true,
        autocomplete: true
      }
    ],
    /**
     * @param {import('discord.js').AutocompleteInteraction<
     *   import('discord.js').CacheType
     * >} interaction
     * @returns {Promise<void>}
     */
    async autocomplete (interaction) {
      // Get the value the user is typing
      const focusedValue = interaction.options.getFocused();
      const choices = [];

      const totalPages = Math.ceil(
        (searchEngines.length + searchReferences.length) / maxFieldsPerPage
      );
      for (let i = 1; i <= totalPages; i++) {
        choices.push(String(i));
      }

      const filtered = choices.filter(
        (choice) => choice.startsWith(focusedValue)
      );
      await interaction.respond(
        filtered.map((choice) => ({name: choice, value: choice}))
      );
    },
    /**
     * @param {import('./getCommands.js').InputCommandOrSelectMenu} interaction
     * @returns {Promise<void>}
     */
    async slashCommand (interaction) {
      /* c8 ignore next 3 -- TS */
      if (interaction.isStringSelectMenu() || !interaction.inCachedGuild()) {
        return;
      }
      /* c8 ignore next -- Should always match as required */
      const pageNum = interaction.options.getInteger('page') ?? '';
      await this.action?.({
        content: `!helpshortcuts ${pageNum}`,
        author: interaction.user,
        channel: {
          /**
           * @param {string} reply
           */
          // @ts-expect-error Just mocking what we need
          send (reply) {
            interaction.reply(reply);
          }
        }
      });
    },
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {void}
     */
    action (message) {
      const page = Number.parseInt(
        /* c8 ignore next -- Should always match */
        (/!helpshortcuts (?<number>[1-9]\d*)/v).exec(message.content)?.groups?.number ?? '1'
      ) - 1;
      const start = page * maxFieldsPerPage;
      const end = start + maxFieldsPerPage;
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embeds: [{
          color: 8359053,
          description: 'Use the shortcuts like this: `kap:15` or, ' +
            'with the longer form ones, add a space like: "Aqdas 20"',
          fields: [
            ...searchEngines.map(({
              keyword, short_name: shortName
            }) => {
              return {
                name: keyword,
                value: shortName
              };
            }),
            ...searchReferences.map(({keyword, reference}) => {
              return {
                name: reference,
                value: searchEngines.find(({keyword: kw}) => {
                  return kw === keyword;
                /* c8 ignore next -- Should always match */
                })?.short_name ?? ''
              };
            })
          ].toSorted(({name: name1}, {name: name2}) => {
            /* c8 ignore next -- Guard */
            return name1 < name2 ? -1 : name1 > name2 ? 1 : 0;
          }).slice(start, end)
        }]
      });
    }
  });

  commands.help = help;
  commands.helpextras = helpextras;
  commands.helpadmin = helpadmin;
  commands.helpshortcuts = helpshortcuts;

  /**
   * @type {BotHelpField[]}
   */
  const fields = /** @type {BotHelpField[]} */ (
    Object.values(commands).map(({helpInfo}) => {
      return helpInfo;
    }).filter(Boolean)
  );

  /**
   * @type {BotHelpField[]}
   */
  const fieldsExtra = /** @type {BotHelpField[]} */ (
    Object.values(commands).map(({helpExtra}) => {
      return helpExtra;
    }).filter(Boolean)
  );

  /**
   * @type {BotHelpField[]}
   */
  const fieldsAdmin = /** @type {BotHelpField[]} */ (
    Object.values(commands).map(({helpAdmin}) => {
      return helpAdmin;
    }).filter(Boolean)
  );

  return commands;
};

export default addHelp;
