/**
 * Puppet Function.
 * @callback PuppetTool
 * @param {external:DiscordMessage} message
 * @param {{authorID: number, permission: string}} permissions
 * @returns {void}
 */
/**
 * @type {PuppetTool}
 */
function puppet ({content, guild, author, member, channel}, permissions) {
  // Transmit message as:
  // !puppet <CHANNEL> | <MESSAGE>
  if (
    author.id === permissions.authorID

  // Reenable this if we allow `getCommands.js` to pass in arbitrary users
  // or are using this file elsewhere
  // || member.permissions.has(permissions.permission)
  ) {
    const regex = /!puppet (?<userChannel>\S.+) \| (?<msg>\S.+)/iu;
    const echo = content.match(regex);

    // Did regex pass
    if (echo) {
      const {userChannel, msg} = echo.groups;

      const destination = guild.channels.cache.find(
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

/**
 * @param {PlainObject} cfg
 * @param {string[]} cfg.ADMIN_IDS
 * @param {string} cfg.ADMIN_PERMISSION
 * @param {string} cfg.PUPPET_AUTHOR
 * @param {GuildCheckin} cfg.guildCheckin
 * @param {external:IntlDom} cfg._
 * @param {DiscordClient} cfg.client
 * @param {DiscordTTS} cfg.discordTTS
 * @returns {BotCommands}
 */
const getAdmin = ({
  ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR,
  discordTTS, guildCheckin, _, client
}) => {
  return {
    speak: {
      re: /!speak/iu,
      /*
      helpInfo: {
        name: '!speak some words',
        value: 'Reads some words as speech'
      },
      */
      /* c8 ignore next 39 */
      /**
       * Reads some scripture.
       * @param {DiscordMessage} message
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
        const channelId = message.member.voice.channelID;
        if (!channelId) {
          // eslint-disable-next-line no-console -- Debug
          console.log('Message member not in a voice channel with `channelID`');
        }
        const channel = client.channels.cache.get(channelId);
        const connection = await channel.join('');
        broadcast.play(discordTTS.getVoiceStream(words));
        const dispatcher = connection.play(broadcast);
        /* c8 ignore next 9 */
        // Would seem difficult to simulate this.
        dispatcher.on('error', (err) => {
          // eslint-disable-next-line no-console -- Debug
          console.error(_('speechError'), err);
        });
        dispatcher.on('debug', (err) => {
          // eslint-disable-next-line no-console -- Debug
          console.log(err);
        });
        /* c8 ignore next 5 */
        dispatcher.on('start', () => {
          // eslint-disable-next-line no-console -- Debug
          console.log(_('speakingBegun'));
        });
      }
    },
    puppet: {
      re: /!puppet (?:\S.+) \| (?:\S.+)/iu,
      /**
       * Puppet enables the administrators + bot developers to puppeteer a bot
       * Must be positioned on top so it can handle sub requests listed below.
       * @param {DiscordMessage} message
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
      re: /!echo\b/iu,
      /**
       * Echo what was said.
       * @param {DiscordMessage} message
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
      re: /!checkin\b/iu,
      /**
       * @param {DiscordMessage} message
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
