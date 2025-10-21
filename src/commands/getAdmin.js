/**
 * Puppet Function.
 * @callback PuppetTool
 * @param {import('discord.js').Message<true>} message
 * @param {{authorID: string, permission: string}} permissions
 * @returns {void}
 */
/**
 * @type {PuppetTool}
 */
function puppet ({
  content, guild, /* author, member, */ channel
  // eslint-disable-next-line no-unused-vars -- Keeping signature for now
}, permissions) {
  // Transmit message as:
  // !puppet <CHANNEL> | <MESSAGE>
  // if (author.id !== permissions.authorID

  // Reenable this if we allow `getCommands.js` to pass in arbitrary users
  // or are using this file elsewhere
  // && !member.permissions.has(permissions.permission)
  // ) {
  //   return;
  // }

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
    if (destination && destination.isTextBased()) {
      destination.send(msg);
    } else {
      channel.send(
        `Channel ${userChannel} does not exist or is not text-based!`
      );
    }
  }
}

/**
 * @param {object} cfg
 * @param {string[]} cfg.ADMIN_IDS
 * @param {string} cfg.ADMIN_PERMISSION
 * @param {string} cfg.PUPPET_AUTHOR
 * @param {import('../getCheckin.js').GuildCheckin} cfg.guildCheckin
 * @param {import('intl-dom').I18NCallback} cfg._
 * @param {import('discord-tts')} cfg.discordTTS
 * @param {Pick<import('@discordjs/voice'),
 *   "joinVoiceChannel"|"createAudioPlayer"|
 *   "createAudioResource">} cfg.DiscordVoice
 * @returns {import('./getCommands.js').BotCommands}
 */
const getAdmin = ({
  ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR,
  DiscordVoice,
  discordTTS, guildCheckin, _
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
      /* c8 ignore next 40 */
      /* eslint-disable require-await -- Easier */
      /**
       * Reads some scripture.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        /* eslint-enable require-await -- Easier */
        // Todo: Needs testing
        if (!ADMIN_IDS.includes(message.author.id)) {
          return;
        }

        const words = message.content.split(' ').slice(2).join(' ');

        // Todo: Abstract out code so browser can instead use `SpeechSynthesis`
        const channel = message.member?.voice.channel;
        if (!channel) {
          // eslint-disable-next-line no-console -- Debugging
          console.log('Message member not in a voice channel with `channel`');
          return;
        }
        const connection = DiscordVoice.joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
        });

        const player = DiscordVoice.createAudioPlayer();

        player.play(
          DiscordVoice.createAudioResource(discordTTS.getVoiceStream(words))
        );
        connection.subscribe(player);

        // console.error(_('speechError'), err);

        // eslint-disable-next-line no-console -- Debugging
        console.log(_('speakingBegun'));
      }
    },
    puppet: {
      re: /!puppet (?:\S.+) \| (?:\S.+)/iv,
      /**
       * Puppet enables the administrators + bot developers to puppeteer a bot
       * Must be positioned on top so it can handle sub requests listed below.
       * @param {import('discord.js').Message<true>} message
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
       * @param {import('discord.js').Message<true>} message
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
       * @param {import('discord.js').Message<true>} message
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
