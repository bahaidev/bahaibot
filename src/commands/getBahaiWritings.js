import getReader from './getReader.js';

/**
 * @param {object} cfg
 * @param {FileSystem} cfg.fs
 * @param {Settings} cfg.settings
 * @param {DiscordClient} cfg.client
 * @param {Discord} cfg.Discord
 * @returns {BotCommands}
 */
const getBahaiWritings = async ({fs, settings, client, Discord}) => {
  const reader = await getReader({fs, settings});

  return {
    readBook: {
      re: /\bread (?<refName>\S.+) (?<index>[\-.\d]+)\b/iv,
      /**
       * Reads some scripture.
       * @param {DiscordMessage} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.readBook(
          message, client.user.avatarURL(), Discord
        );
      }
    },
    showList: {
      re: /\bread list$/iv,
      /**
       *
       * @param {DiscordMessage} message
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
       * @param {DiscordMessage} message
       * @returns {Promise<void>}
       */
      async action (message) {
        return await reader.readRandom(
          message, client.user.avatarURL(), Discord
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
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        return reader.reader(message);
      }
    }
  };
};

export default getBahaiWritings;
