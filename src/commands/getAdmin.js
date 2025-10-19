/**
 * Puppet Function.
 * @callback PuppetTool
 * @param {import('discord.js').Message} message
 * @param {{authorID: string, permission: string}} permissions
 * @returns {void}
 */
/**
 * @type {PuppetTool}
 */
function puppet ({content, guild, author, /* member, */ channel}, permissions) {
  // Transmit message as:
  // !puppet <CHANNEL> | <MESSAGE>
  if (
    author.id === permissions.authorID

  // Reenable this if we allow `getCommands.js` to pass in arbitrary users
  // or are using this file elsewhere
  // || member.permissions.has(permissions.permission)
  ) {
    const regex = /!puppet (?<userChannel>\S.+) \| (?<msg>\S.+)/iv;
    const echo = content.match(regex);

    // Did regex pass
    if (echo) {
      // eslint-disable-next-line @stylistic/max-len -- Long
      const {userChannel, msg} = /** @type {{userChannel: string, msg: string}} */ (
        echo.groups
      );

      const destination = guild?.channels.cache.find(
        (val) => val.name === userChannel
      );

      // Does the channel exist?
      if (destination) {
        destination.send(msg);
      } else {
        channel.send(`Channel ${userChannel} does not exist!`);
      }
    }
  }
}

/* eslint-disable jsdoc/imports-as-dependencies -- Bug */
/**
 * @param {object} cfg
 * @param {string[]} cfg.ADMIN_IDS
 * @param {string} cfg.ADMIN_PERMISSION
 * @param {string} cfg.PUPPET_AUTHOR
 * @param {import('../getCheckin.js').GuildCheckin} cfg.guildCheckin
 * @param {import('intl-dom').I18NCallback} cfg._
 * @param {import('discord.js').Client} cfg.client
 * @param {import('discord-tts')} cfg.discordTTS
 * @returns {import('./getCommands.js').BotCommands}
 */
const getAdmin = ({
  /* eslint-enable jsdoc/imports-as-dependencies -- Bug */
  ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR,
  discordTTS, guildCheckin, _, client
}) => {
  return {
    speak: {
      re: /!speak/iv,
      /*
      helpInfo: {
        name: '!speak some words',
        value: 'Reads some words as speech'
      },
      */
      /* c8 ignore next 39 */
      /**
       * Reads some scripture.
       * @param {import('discord.js').Message} message
       * @returns {Promise<void>}
       */
      async action (message) {
        // Todo: Needs testing
        if (!ADMIN_IDS.includes(message.author.id)) {
          return;
        }

        const words = message.content.split(' ').slice(2).join(' ');

        // Todo: Abstract out code so browser can instead use `SpeechSynthesis`
        const broadcast = client.voice.createBroadcast();
        const channelId = message.member?.voice.channelID;
        if (!channelId) {
          // eslint-disable-next-line no-console -- Debug
          console.log('Message member not in a voice channel with `channelID`');
        }
        const channel = client.channels.cache.get(channelId);
        const connection = await channel?.join('');
        broadcast.play(discordTTS.getVoiceStream(words));
        const dispatcher = connection.play(broadcast);
        /* c8 ignore next 17 */
        // Would seem difficult to simulate this.
        dispatcher.on(
          'error',
          /** @type {(err: Error) => void} */
          (err) => {
            // eslint-disable-next-line no-console -- Debug
            console.error(_('speechError'), err);
          }
        );
        dispatcher.on(
          'debug',
          /** @type {(err: Error) => void} */
          (err) => {
            // eslint-disable-next-line no-console -- Debug
            console.log(err);
          }
        );
        /* c8 ignore next 5 */
        dispatcher.on('start', () => {
          // eslint-disable-next-line no-console -- Debug
          console.log(_('speakingBegun'));
        });
      }
    },
    puppet: {
      re: /!puppet (?:\S.+) \| (?:\S.+)/iv,
      /**
       * Puppet enables the administrators + bot developers to puppeteer a bot
       * Must be positioned on top so it can handle sub requests listed below.
       * @param {import('discord.js').Message} message
       * @returns {void}
       */
      action (message) {
        if (ADMIN_IDS.includes(message.author.id)) {
          // Puppet handling
          puppet(message, {
            authorID: PUPPET_AUTHOR,
            permission: ADMIN_PERMISSION
          });

          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Puppet command issued by ${message.author.username}.`
          );
        }
      }
    },
    echo: {
      re: /!echo\b/iv,
      /**
       * Echo what was said.
       * @param {import('discord.js').Message} message
       * @returns {void}
       */
      action (message) {
        if (ADMIN_IDS.includes(message.author.id)) {
          message.channel.send(
            `Here's what you said, ${
              message.author.username
            }: \`\`${message.content}\`\``
          );

          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Echo command issued by ${message.author.username}.`
          );
        }
      }
    },
    checkin: {
      re: /!checkin\b/iv,
      /**
       * @param {import('discord.js').Message} message
       * @returns {Promise<void>}
       */
      async action (message) {
        if (ADMIN_IDS.includes(message.author.id)) {
          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Checkin command issued by ${message.author.username}.`
          );
          try {
            return await guildCheckin();
          /* c8 ignore next 4 */
          } catch (err) {
            // eslint-disable-next-line no-console -- CLI
            console.error('Error checking in', err);
          }
        }
        return undefined;
      }
    }
  };
};

export default getAdmin;
