import getReader from './getReader.js';

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

  return {
    // Todo: Finish for other books
    // Todo: Add subcommands for page, Q&A, note, paragraph numbers
    kitabIAqdas: {
      name: 'kitabiaqdas',
      description: 'The Kitáb-i-Aqdas (Most Holy Book)',
      options: [
        {
          name: 'verse-number',
          description: 'The verse number',
          type: Discord.ApplicationCommandOptionType.Integer
        }
      ],
      /**
       * @param {import('discord.js').ChatInputCommandInteraction<
       *   import('discord.js').CacheType
       * >} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        const verse = interaction.options.get('verse-number')?.value;
        await interaction.reply(
          `[Kitáb-i-Aqdas${verse ? `, verse ${verse}` : ''}](https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#par${verse ?? ''})`
        );
      }
    },
    randomWritings: {
      name: 'rand-writings',
      description: "A link to a random selection from the Bahá'í Writings",
      /**
       * @param {import('discord.js').ChatInputCommandInteraction<
       *   import('discord.js').CacheType
       * >} interaction
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
      // Todo: Add subcommand autocomplete or pull-down
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
       * @param {import('discord.js').ChatInputCommandInteraction<
       *   import('discord.js').CacheType
       * >} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
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
  };
};

export default getBahaiWritings;
