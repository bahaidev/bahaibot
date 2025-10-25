import getReader from './getReader.js';
import {searchEngines} from './searchEngines.js';

/**
 * @param {object} cfg
 * @param {import('../integratedClientServerBot.js').LimitedFs} cfg.fs
 * @param {import('../discordBot.js').Settings} cfg.settings
 * @param {import('discord.js').Client} cfg.client
 * @param {import('discord.js')} cfg.Discord
 * @returns {Promise<import('./getCommands.js').BotCommands>}
 */
const getBahaiWritings = async ({fs, settings, client, Discord}) => {
  const reader = await getReader({fs, settings});

  const ret = /** @type {import('./getCommands.js').BotCommands} */ ({
    // NOTE: If we need to remove these, we can add `deleted` property to them,
    //        or invoke `client.application.commands.set([]);`, bearing in mind
    //        the 200 day Discord limit on new commands
    ...searchEngines.filter(({keyword}) => {
      // Remove those we already have below
      return !['ka', 'kap', 'kan', 'kaq'].includes(keyword);
    }).slice(
      // Discord has a limit on number of shortcuts
      0, 70
    ).reduce((obj, {short_name: shortName, keyword, url}) => {
      const simplifiedName = shortName.
        toLowerCase().
        normalize('NFD').replaceAll(/\p{Mark}/gv, '').
        replaceAll(/\W/gv, '-').
        // Max length per Discord
        slice(0, 32);
      return {
        ...obj,
        [simplifiedName]: {
          name: simplifiedName,
          // Todo: Remove this when converted to subcommands
          deleted: true,
          description: `${shortName} (shortcut: ${keyword})`,
          options: [
            {
              name: 'search-term-or-number',
              description: 'The number or search term',
              type: Discord.ApplicationCommandOptionType.String
            }
          ],
          /**
           * @param {import('./getCommands.js').
           *   InputCommandOrSelectMenu} interaction
           * @returns {Promise<void>}
           */
          async slashCommand (interaction) {
            /* c8 ignore next 3 -- TS guard */
            if (interaction.isStringSelectMenu()) {
              return;
            }
            const verse = interaction.options.getString(
              'search-term-or-number'
            );
            await interaction.reply(
              `[${shortName}${verse ? `, ${verse}` : ''}]` +
              `(${
                verse
                  ? url.replaceAll('%s', encodeURIComponent(verse) ?? '')
                  : ''
              })`
            );
          }
        }
      };
    }, {}),
    kitabIAqdas: {
      name: 'kitabiaqdas',
      description: 'The Kitáb-i-Aqdas (Most Holy Book) by paragraph number',
      options: [
        {
          name: 'paragraph-number',
          description: 'The paragraph number',
          type: Discord.ApplicationCommandOptionType.Integer
        }
      ],
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (interaction.isStringSelectMenu()) {
          return;
        }
        const verse = interaction.options.get('paragraph-number')?.value;
        await interaction.reply(
          `[Kitáb-i-Aqdas${verse ? `, paragraph ${verse}` : ''}](` +
          `https://bahai-library.com/writings/bahaullah/aqdas/kaall.html${
            verse ? `#par${verse}` : ''
          })`
        );
      }
    },
    kitabIAqdasPage: {
      name: 'kitabiaqdas-page',
      description: 'The Kitáb-i-Aqdas (Most Holy Book) by page number',
      options: [
        {
          name: 'page-number',
          description: 'The page number',
          type: Discord.ApplicationCommandOptionType.Integer
        }
      ],
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (interaction.isStringSelectMenu()) {
          return;
        }
        const page = interaction.options.get('page-number')?.value;
        await interaction.reply(
          `[Kitáb-i-Aqdas${page ? `, page ${page}` : ''}](` +
          `https://bahai-library.com/writings/bahaullah/aqdas/kaall.html${
            page ? `#${page}` : ''
          })`
        );
      }
    },
    kitabIAqdasQAndA: {
      name: 'kitabiaqdas-qna',
      description: 'The Kitáb-i-Aqdas (Most Holy Book) by Questions ' +
        '& Answers number',
      options: [
        {
          name: 'qna-number',
          description: 'The Questions & Answers number',
          type: Discord.ApplicationCommandOptionType.Integer
        }
      ],
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (interaction.isStringSelectMenu()) {
          return;
        }
        const qna = interaction.options.get('qna-number')?.value;
        await interaction.reply(
          `[Kitáb-i-Aqdas Questions & Answers${qna ? `, no. ${qna}` : ''}](` +
          `https://bahai-library.com/writings/bahaullah/aqdas/kaall.html${
            qna ? `#q${qna}` : '#105'
          })`
        );
      }
    },
    kitabIAqdasNote: {
      name: 'kitabiaqdas-notes',
      description: 'The Kitáb-i-Aqdas (Most Holy Book) by note number',
      options: [
        {
          name: 'note-number',
          description: 'The note number',
          type: Discord.ApplicationCommandOptionType.Integer
        }
      ],
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (interaction.isStringSelectMenu()) {
          return;
        }
        const note = interaction.options.get('note-number')?.value;
        await interaction.reply(
          `[Kitáb-i-Aqdas Notes${note ? `, no. ${note}` : ''}](` +
          `https://bahai-library.com/writings/bahaullah/aqdas/kaall.html${
            note ? `#note${note}` : '#165'
          })`
        );
      }
    },
    randomWritings: {
      name: 'rand-writings',
      description: "A link to a random selection from the Bahá'í Writings",
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        await interaction.reply(
          `<[Random Bahá'í Writings](https://bahai-library.com/random)>`
        );
      }
    },
    readBook: {
      name: 'read',
      description:
        "Provide a selection of the Bahá'í Writings by book and chapter",
      /**
       * @param {import('discord.js').AutocompleteInteraction<
       *   import('discord.js').CacheType
       * >} interaction
       * @returns {Promise<void>}
       */
      async autocomplete (interaction) {
        // Get the value the user is typing
        const focusedValue = interaction.options.getFocused();
        const choices = reader.getAvailableRandomOptions();

        const filtered = choices.filter(
          (choice) => choice.startsWith(focusedValue)
        );
        await interaction.respond(
          filtered.map((choice) => ({name: choice, value: choice}))
        );
      },
      options: [
        {
          name: 'book',
          description: 'The book to select',
          type: Discord.ApplicationCommandOptionType.String,
          autocomplete: true,
          required: true
        },
        {
          name: 'chapter',
          description: 'The chapter',
          type: Discord.ApplicationCommandOptionType.Integer,
          required: true
        }
      ],
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (!interaction.isChatInputCommand()) {
          return;
        }

        /* c8 ignore next 2 -- Required so fallback should not be necessary */
        const book = interaction.options.getString('book') ?? '';
        const chapter = interaction.options.getInteger('chapter') ?? '';
        await this.action?.({
          content: `!read ${book} ${chapter}`,
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

      re: /\bread (?<refName>\S.+) (?<index>[\-.\d]+)\b/iv,
      /**
       * Reads some scripture.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.readBook(
          message, /** @type {import('discord.js').ClientUser} */ (
            client.user
          ).avatarURL(), Discord
        );
      }
    },
    showList: {
      re: /\bread list$/iv,
      /**
       *
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.showList(message);
      }
    },
    readRandom: {
      name: 'read-random',
      description: "Provide a random selection of the Bahá'í Writings",
      re: /\bread random$/iv,
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (!interaction.inCachedGuild()) {
          return;
        }
        await this.action?.({
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
       *
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.readRandom(
          message,
          /** @type {import('discord.js').ClientUser} */ (
            client.user
          ).avatarURL(),
          Discord
        );
      }
    },
    read: {
      re: /!read\b/iv,
      // This is reused for the other commands
      helpInfo: {
        name: '!read [list | random | *‹text›* *‹chapter›*]',
        value: 'Reads from the Bahá\'í Writings. Displays an excerpt ' +
            'from given *chapter* of *text*. Available texts are ' +
            'displayed using `!read list`; `!read random` displays ' +
            'a random passage from available texts.'
      },
      /**
       * A fallback if the user fails to provide an argument.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        return reader.reader(message);
      }
    }
  });

  console.log('ret', ret);

  return ret;
};

export default getBahaiWritings;
