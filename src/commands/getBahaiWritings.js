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
    readBook: {
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
      re: /\bread random$/iv,
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
