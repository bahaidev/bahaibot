/**
 * Puppet Function.
 * @callback PuppetTool
 * @param {import('discord.js').Message<true>} message
 * @param {{authorID: string, permission: string}} permissions
 * @returns {Promise<string>}
 */
/**
 * @type {PuppetTool}
 */
async function puppet ({
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
  /* c8 ignore next 3 -- Just a guard as should not be possible */
  if (!echo) {
    return '';
  }


  const {userChannel, msg} = /** @type {{userChannel: string, msg: string}} */ (
    echo.groups
  );

  const destination = guild?.channels.cache.find(
    (val) => {
      if (userChannel.startsWith('<#') || (/^\d+$/v).test(userChannel)) {
        return val.id === userChannel.replace(/^<#/v, '').replace(/>$/v, '');
      }
      return val.name === userChannel;
    }
  );

  // Does the channel exist?
  if (destination && destination.isTextBased()) {
    await destination.send(msg);
    /* c8 ignore next 2 -- Above will throw given lack of tokens */
    return msg;
  }

  const message =
    `Channel ${userChannel} does not exist or is not text-based!`;
  await channel.send(message);
  return message;
}

/**
 * @param {object} cfg
 * @param {string[]} cfg.ADMIN_IDS
 * @param {string} cfg.ADMIN_PERMISSION
 * @param {string} cfg.PUPPET_AUTHOR
 * @param {import('../getCheckin.js').GuildCheckin} cfg.guildCheckin
 * @param {import('intl-dom').I18NCallback} cfg._
 * @param {import('discord-tts')} cfg.discordTTS
 * @param {import('discord.js')} cfg.Discord
 * @param {Pick<import('@discordjs/voice'),
 *   "joinVoiceChannel"|"createAudioPlayer"|
 *   "createAudioResource">} cfg.DiscordVoice
 * @returns {import('./getCommands.js').BotCommands}
 */
const getAdmin = ({
  ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR,
  Discord,
  DiscordVoice,
  discordTTS, guildCheckin, _
}) => {
  return {
    speak: {
      name: 'speak',
      description: 'Reads some words as speech',
      options: [
        {
          name: 'words',
          description: 'The words',
          type: Discord.ApplicationCommandOptionType.String,
          required: true
        }
      ],
      re: /!speak/iv,
      helpAdmin: {
        name: '!speak some words',
        value: 'Reads some words as speech'
      },
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS */
        if (interaction.isStringSelectMenu() || !interaction.inCachedGuild()) {
          return;
        }

        const words = interaction.options.getString('words');

        await interaction.deferReply({
          flags: Discord.MessageFlags.Ephemeral
        });

        const spoken = await this.action?.({
          member: {
            // @ts-expect-error Just use what we need
            voice: {
              channel: interaction.member?.voice?.channel
            }
          },
          author: interaction.user,
          content:
            `placeholder1 placeholder2 ${
              words
            }`
        });

        await interaction.editReply(
          typeof spoken === 'boolean' && spoken
            /* c8 ignore next -- Should be present */
            ? words ?? ''
            : /** @type {string} */ (
              spoken || _('was_not_able_to_speak')
            )
        );
      },
      /* eslint-disable require-await -- Easier */
      /**
       * Reads some scripture.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<boolean|string>}
       */
      // @ts-expect-error We re-use this function, so not wanting void here
      async action (message) {
        /* eslint-enable require-await -- Easier */
        if (!ADMIN_IDS.includes(message.author.id)) {
          return /** @type {string} */ (_('action_only_for_admins'));
        }

        const words = message.content.split(' ').slice(2).join(' ');

        const channel = message.member?.voice.channel;
        if (!channel) {
          // eslint-disable-next-line no-console -- CLI
          console.log(_('not_in_a_voice_channel'));
          return /** @type {string} */ (_('not_in_a_voice_channel'));
        }
        const connection = DiscordVoice.joinVoiceChannel({
          channelId: channel.id,
          guildId: channel.guild.id,
          adapterCreator: channel.guild.voiceAdapterCreator
        });

        const player = DiscordVoice.createAudioPlayer();

        // eslint-disable-next-line no-console -- CLI
        console.log(_('speakingBegun'));

        // eslint-disable-next-line promise/avoid-new -- API
        return new Promise((resolve) => {
          player.on('error', (error) => {
            // eslint-disable-next-line no-console -- Debugging
            console.error(_('error_with_resource', {
              message: error.message,
              /* c8 ignore next 2 -- Bug? */
              // @ts-expect-error Ok
              title: error.resource?.metadata?.title ?? ''
            }));
            resolve(false);
          });
          // @ts-expect-error Ok
          player.on('idle', () => {
            // Optionally disconnect after speaking
            // connection.destroy();
            resolve(true);
          });

          const audioStream = discordTTS.getVoiceStream(words, {
            lang: _.resolvedLocale.replace(/-US?/v, '')
          });

          player.play(
            DiscordVoice.createAudioResource(audioStream)
          );
          connection.subscribe(player);

        // console.error(_('speechError'), err);
        });
      }
    },
    puppet: {
      name: 'puppet',
      description: 'Allows administrators to puppeteer a bot, channeling a ' +
        'message to another channel',
      re: /!puppet (?:\S.+) \| (?:\S.+)/iv,
      helpAdmin: {
        name: '!puppet userChannel | message',
        value: 'Allows administrators to puppeteer a bot, channeling a ' +
          'message to another channel'
      },
      options: [
        {
          name: 'channel',
          description: 'The channel into which to send a message',
          type: Discord.ApplicationCommandOptionType.Channel,
          required: true
        },
        {
          name: 'message',
          description: 'The message to send',
          type: Discord.ApplicationCommandOptionType.String,
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
        if (!interaction.inCachedGuild() || interaction.isStringSelectMenu()) {
          return;
        }

        await interaction.deferReply({
          flags: Discord.MessageFlags.Ephemeral
        });
        const reply = await this.action?.({
          author: interaction.user,
          content: /** @type {string} */ (
            `!puppet ${interaction.options.get('channel')?.value} | ${
              interaction.options.get('message')?.value
            }`
          ),
          guild: interaction.guild,
          channel: {
            // @ts-expect-error Just mocking what we need
            send () {
              // No-op
            }
          }
        });

        /* c8 ignore next -- TS */
        await interaction.editReply(reply ?? '');
      },
      /**
       * Puppet enables the administrators + bot developers to puppeteer a bot
       * Must be positioned on top so it can handle sub requests listed below.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<string>}
       */
      // @ts-expect-error We pass it for `slashCommand`
      async action (message) {
        if (ADMIN_IDS.includes(message.author.id)) {
          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Puppet command issued by ${message.author.username}.`
          );

          // Puppet handling
          return await puppet(message, {
            authorID: PUPPET_AUTHOR,
            permission: ADMIN_PERMISSION
          });
        }

        return '';
      }
    },
    echo: {
      name: 'echo',
      description: 'Just echoes back the words supplied.',
      options: [
        {
          name: 'echo-text',
          description: 'The text to echo back',
          type: Discord.ApplicationCommandOptionType.String,
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
        if (interaction.isStringSelectMenu()) {
          return;
        }

        await this.action?.({
          author: interaction.user,
          content: /** @type {string} */ (
            interaction.options.get('echo-text')?.value
          ),
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
      re: /!echo\b/iv,
      helpAdmin: {
        name: '!echo words',
        value: 'Just echoes back the words supplied.'
      },
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
      name: 'checkin',
      description: 'Checks in to send a greeting to a bot-testing channel',
      re: /!checkin\b/iv,
      helpAdmin: {
        name: '!checkin',
        value: 'Checks in to send a greeting to a bot-testing channel'
      },
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        // @ts-expect-error Just supplying what we need
        await this.action?.({
          author: interaction.user
        });
      },
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
          /* c8 ignore next 4 -- How to simulate? */
          } catch (err) {
            // eslint-disable-next-line no-console -- CLI
            console.error(_('error_checking_in'), err);
          }
        }

        return undefined;
      }
    }
  };
};

export default getAdmin;
