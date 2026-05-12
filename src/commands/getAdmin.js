import {getTodayJSON} from 'bahai-date-api';
import istr from '../utils/istr.js';

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
 * @param {import('discord.js').Client} cfg.client
 * @param {string[]} cfg.ADMIN_IDS
 * @param {string} cfg.ADMIN_PERMISSION
 * @param {string} cfg.PUPPET_AUTHOR
 * @param {string[]} cfg.BADI_DATE_CHANNELS
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
  client,
  ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR, BADI_DATE_CHANNELS,
  Discord,
  DiscordVoice,
  discordTTS, guildCheckin, _
}) => {
  const immutableDateChannelIDs = new Map();
  const dateToggleTimeouts = new Map();

  /**
   * Calculate milliseconds until the next day.
   * @param {number} hour - Current hour (0-23)
   * @param {number} minute - Current minute (0-59)
   * @param {number} second - Current second (0-59)
   * @returns {number} Milliseconds until next midnight
   */
  const calculateMsUntilNextDay = (hour, minute, second) => {
    const secondsSinceStartOfDay = (hour * 3600) + (minute * 60) + second;
    const secondsUntilMidnight = 86400 - secondsSinceStartOfDay;
    return secondsUntilMidnight * 1000;
  };

  const startTime = Date.now();
  const startDate = new Date(startTime).toLocaleDateString(
    _.resolvedLocale,
    {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit'
    }
  );

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
    uptime: {
      name: 'uptime',
      // eslint-disable-next-line @stylistic/max-len -- Long
      description: 'Reports the duration of time since the server has been online',
      re: /!uptime/iv,
      helpAdmin: {
        name: '!uptime',
        value: 'Reports the duration of time since the server has been online'
      },
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
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
       * @returns {Promise<void>}
       */
      async action (message) {
        if (ADMIN_IDS.includes(message.author.id)) {
          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Uptime command issued by ${message.author.username}.`
          );

          const upTime = istr(
            _.resolvedLocale, Math.floor((Date.now() - startTime) / 1000)
          );

          await message.channel.send(
            `I have been online for ${upTime} (since ${startDate}).`
          );
        }

        return undefined;
      }
    },
    datetoggle: {
      name: 'date-toggle',
      description: 'Toggles whether to show the date as a channel',
      re: /!date toggle\b/iv,
      helpAdmin: {
        name: '!date toggle',
        value: 'Toggles whether to show the date as a channel'
      },
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        await interaction.deferReply({
          flags: Discord.MessageFlags.Ephemeral
        });

        // @ts-expect-error Just supplying what we need
        await this.action?.({
          author: interaction.user
        });

        await interaction.editReply(
          /** @type {string} */ (
            _('toggled_date')
          )
        );
      },
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        if (!ADMIN_IDS.includes(message.author.id)) {
          return;
        }

        // Check if this is a scheduled replacement call
        const isScheduledReplacement =
          // @ts-expect-error Custom property added for scheduled execution
          message.__isScheduledReplacement === true;

        for (const guildID of BADI_DATE_CHANNELS) {
          const guild = client.guilds.cache.get(guildID);
          if (!guild) {
            continue;
          }

          const me = guild.members.me ??
            // eslint-disable-next-line no-await-in-loop -- Needed per guild
            await guild.members.fetchMe();
          if (!me.permissions.has([
            Discord.PermissionFlagsBits.ViewChannel,
            Discord.PermissionFlagsBits.ManageChannels
          ])) {
            // eslint-disable-next-line no-console -- CLI
            console.error(
              `Skipping date toggle for guild ${guild.name} (${guild.id}): ` +
              'the bot needs View Channel and Manage Channels permissions.'
            );
            continue;
          }

          const anyDateChannel = guild.channels.cache.find(
            (ch) => (/\d{3,} BE$/v).test(ch.name) &&
              ch.type === Discord.ChannelType.GuildVoice
          ) ?? null;
          const targetChannel = guild.channels.cache.find(
            // Without a date parser, we check that it ends with a year.
            // We also require the channel to be manageable/deletable so we
            // don't pin protected/system-like channels.
            (ch) => (/\d{3,} BE$/v).test(ch.name) &&
              ch.type === Discord.ChannelType.GuildVoice &&
              (!('manageable' in ch) || ch.manageable) &&
              (!('deletable' in ch) || ch.deletable)
          ) ?? null;

          const {json: {
            badi_date: {
              day,
              month_name: monthName,
              year
            },
            greg_date: {
              hour, minute, second
            }
          }} = getTodayJSON();
          const channelName = `${day} ${monthName} ${year} BE`;
          let actionAttempted = 'none';

          try {
            if (isScheduledReplacement) {
              // In replacement mode, always delete old and create new
              if (targetChannel) {
                actionAttempted = 'delete';
                // eslint-disable-next-line no-await-in-loop -- Easier
                await targetChannel.delete(
                  'Scheduled date channel replacement'
                );
                immutableDateChannelIDs.delete(guild.id);
              }

              // Now create the new channel with the current date
              actionAttempted = 'create';
              // eslint-disable-next-line no-await-in-loop -- Easier
              await guild.channels.create({
                name: channelName,
                type: Discord.ChannelType.GuildVoice,
                permissionOverwrites: [
                  {
                    id: me.id,
                    allow: [
                      Discord.PermissionFlagsBits.ViewChannel,
                      Discord.PermissionFlagsBits.ManageChannels,
                      Discord.PermissionFlagsBits.Connect,
                      Discord.PermissionFlagsBits.Speak
                    ]
                  },
                  {
                    id: guild.roles.everyone.id,
                    deny: [
                      Discord.PermissionFlagsBits.Connect,
                      Discord.PermissionFlagsBits.Speak
                    ]
                  }
                ]
              });
              immutableDateChannelIDs.delete(guild.id);
            } else if (targetChannel) {
              // Refresh in case cached roles/overwrites are stale.
              // eslint-disable-next-line no-await-in-loop -- Needed per guild
              const guildRefreshed = await guild.fetch();
              // eslint-disable-next-line no-await-in-loop -- Needed per guild
              const meRefreshed = await guild.members.fetchMe();
              // eslint-disable-next-line no-await-in-loop -- Needed per channel
              const targetChannelRefreshed = await guild.channels.fetch(
                targetChannel.id
              );
              if (!targetChannelRefreshed) {
                // eslint-disable-next-line no-console -- CLI
                console.error(
                  'Skipping date toggle delete for guild ' +
                  `${guild.name} (${guild.id}) ` +
                  `channel ${targetChannel.name} (${targetChannel.id}): ` +
                  'channel could not be fetched before deletion.'
                );
                continue;
              }

              const requiredPermissions = [
                Discord.PermissionFlagsBits.ViewChannel,
                Discord.PermissionFlagsBits.ManageChannels
              ];
              const permissions = targetChannelRefreshed.permissionsFor(
                meRefreshed
              );
              const missingPermissions = requiredPermissions.filter((perm) => {
                return !permissions?.has(perm, false);
              });
              const parentName = targetChannelRefreshed.parent?.name ?? 'none';
              const parentID = targetChannelRefreshed.parent?.id ?? 'none';

              if (missingPermissions.length) {
                // eslint-disable-next-line no-console -- CLI
                console.error(
                  'Skipping date toggle delete for guild ' +
                  `${guild.name} (${guild.id}) ` +
                  `channel ${targetChannelRefreshed.name} ` +
                  `(${targetChannelRefreshed.id}): ` +
                  `missing permissions ${missingPermissions.join(', ')}. ` +
                  `Parent ${parentName} (${parentID}).`
                );
                continue;
              }

              if (
                'deletable' in targetChannelRefreshed &&
                !targetChannelRefreshed.deletable
              ) {
                const viewNoAdmin = permissions?.has(
                  Discord.PermissionFlagsBits.ViewChannel,
                  false
                ) ?? false;
                const manageNoAdmin = permissions?.has(
                  Discord.PermissionFlagsBits.ManageChannels,
                  false
                ) ?? false;
                const isNonManageable =
                  'manageable' in targetChannelRefreshed &&
                  !targetChannelRefreshed.manageable;
                const isRepeatedImmutable = isNonManageable &&
                  immutableDateChannelIDs.get(guild.id) ===
                  targetChannelRefreshed.id;
                if (isRepeatedImmutable) {
                  continue;
                }

                // eslint-disable-next-line no-console -- CLI
                console.error(
                  'Skipping date toggle delete for guild ' +
                  `${guild.name} (${guild.id}) ` +
                  `channel ${targetChannelRefreshed.name} ` +
                  `(${targetChannelRefreshed.id}): ` +
                  `deletable=false (view=${String(viewNoAdmin)}, ` +
                  `manage=${String(manageNoAdmin)}), ` +
                  `parent ${parentName} (${parentID}).`
                );

                const linkedFlags = {
                  isAfk:
                    guildRefreshed.afkChannelId === targetChannelRefreshed.id,
                  isSystem:
                    guildRefreshed.systemChannelId ===
                    targetChannelRefreshed.id,
                  isRules:
                    guildRefreshed.rulesChannelId === targetChannelRefreshed.id,
                  isUpdates:
                    guildRefreshed.publicUpdatesChannelId ===
                    targetChannelRefreshed.id,
                  isSafetyAlerts:
                    guildRefreshed.safetyAlertsChannelId ===
                    targetChannelRefreshed.id,
                  isWidget:
                    guildRefreshed.widgetChannelId ===
                    targetChannelRefreshed.id
                };
                if (Object.values(linkedFlags).some(Boolean)) {
                  const linkedFlagsString = JSON.stringify(linkedFlags);
                  // eslint-disable-next-line no-console -- CLI
                  console.error(
                    'Date toggle channel is linked in guild settings; ' +
                    `cannot delete until unlinked: ${linkedFlagsString}`
                  );
                }

                if (isNonManageable) {
                  immutableDateChannelIDs.set(
                    guild.id,
                    targetChannelRefreshed.id
                  );
                  // eslint-disable-next-line no-console -- CLI
                  console.error(
                    'Skipping rename for non-deletable date channel in guild ' +
                    `${guild.name} (${guild.id}) ` +
                    `channel ${targetChannelRefreshed.name} ` +
                    `(${targetChannelRefreshed.id}): manageable=false.`
                  );
                  continue;
                }

                if (targetChannelRefreshed.name !== channelName) {
                  actionAttempted = 'rename';
                  // eslint-disable-next-line no-await-in-loop -- Easier
                  await targetChannelRefreshed.edit({
                    name: channelName,
                    reason: 'Date channel is not deletable; renamed instead'
                  });
                  // eslint-disable-next-line no-console -- CLI
                  console.log(
                    'Renamed non-deletable date channel for guild ' +
                    `${guild.name} (${guild.id}) to ${channelName}.`
                  );
                }

                continue;
              }

              actionAttempted = 'delete';
              // eslint-disable-next-line no-await-in-loop -- Easier
              await targetChannelRefreshed.delete('Toggling date off');
              immutableDateChannelIDs.delete(guild.id);
              // Clear any scheduled timeout when toggling off
              const existingTimeoutToCancel = dateToggleTimeouts.get(guildID);
              if (existingTimeoutToCancel) {
                clearTimeout(existingTimeoutToCancel);
                dateToggleTimeouts.delete(guildID);
              }
            } else {
              if (anyDateChannel) {
                // eslint-disable-next-line no-console -- CLI
                console.error(
                  'Skipping date toggle create for guild ' +
                  `${guild.name} (${guild.id}): ` +
                  'a date channel already exists ' +
                  `(${anyDateChannel.name}, ${anyDateChannel.id}).`
                );
                continue;
              }

              actionAttempted = 'create';
              // eslint-disable-next-line no-await-in-loop -- Easier
              await guild.channels.create({
                name: channelName,
                type: Discord.ChannelType.GuildVoice,
                permissionOverwrites: [
                  {
                    id: me.id,
                    allow: [
                      Discord.PermissionFlagsBits.ViewChannel,
                      Discord.PermissionFlagsBits.ManageChannels,
                      Discord.PermissionFlagsBits.Connect,
                      Discord.PermissionFlagsBits.Speak
                    ]
                  },
                  {
                    id: guild.roles.everyone.id,
                    deny: [
                      Discord.PermissionFlagsBits.Connect,
                      Discord.PermissionFlagsBits.Speak
                    ]
                  }
                ]
              });
              immutableDateChannelIDs.delete(guild.id);
            }
          } catch (err) {
            // eslint-disable-next-line no-console -- CLI
            console.error(
              `Failed to ${actionAttempted} the date channel for guild ` +
              `${guild.name} (${guild.id})${
                targetChannel
                  ? ` channel ${targetChannel.name} (${targetChannel.id})`
                  : ''
              }.`,
              err
            );
          }

          // Schedule next update at midnight
          const msUntilNextDay = calculateMsUntilNextDay(hour, minute, second);
          const nextUpdateTime = new Date(Date.now() + msUntilNextDay).
            toLocaleString(_.resolvedLocale);

          // Clear any existing timeout for this guild
          const existingTimeout = dateToggleTimeouts.get(guildID);
          if (existingTimeout) {
            clearTimeout(existingTimeout);
          }

          // Schedule the next date channel update at midnight
          const timeoutId = setTimeout(async () => {
            // eslint-disable-next-line no-console -- CLI
            console.log(
              `Executing scheduled date toggle for guild ${guild.name} ` +
              `(${guild.id}) at ${nextUpdateTime}.`
            );
            // Re-run the datetoggle action by calling getAdmin recursively
            const adminCommands = getAdmin({
              client,
              ADMIN_IDS, ADMIN_PERMISSION, PUPPET_AUTHOR, BADI_DATE_CHANNELS,
              Discord,
              DiscordVoice,
              discordTTS, guildCheckin, _
            });
            // Create a minimal message-like object for scheduled execution
            // Flag as replacement mode to ensure channel is recreated
            const mockMsg = {
              author: {
                id: PUPPET_AUTHOR
              },
              __isScheduledReplacement: true
            };
            // @ts-expect-error Custom mock for scheduled execution
            await adminCommands.datetoggle.action?.(mockMsg);
          }, msUntilNextDay);

          dateToggleTimeouts.set(guildID, timeoutId);
          // eslint-disable-next-line no-console -- CLI
          console.log(
            `Scheduled next date channel update for guild ${guild.name} ` +
            `(${guild.id}) at ${nextUpdateTime}.`
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
