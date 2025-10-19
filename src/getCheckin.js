import istr from './utils/istr.js';
import * as DiscordConstants from './messages/DiscordConstants.js';
import {greets} from './messages/messages.js';

/**
 * @callback GuildCheckin
 * @param {import('./getWikiTools.js').Integer} [nowtime=Date.now()]
 * @returns {Promise<void>}
 */

// Start counting uptime prior to login
const readytime = Date.now();

/**
 * @param {object} cfg
 * @param {import('discord.js').Client} cfg.client
 * @param {import('./integratedClientServerBot.js').LimitedFs} cfg.fs
 * @param {import('./getWikiTools.js').BotWikiTools} cfg.wikiTools
 * @param {import('./discordBot.js').Settings} cfg.settings
 * @param {import('./bot.js').GetLocalizedSetting} cfg.getLocalizedSetting
 * @param {import('intl-dom').I18NCallback} cfg._
 * @returns {GuildCheckin}
 */
function getCheckin ({
  client, fs, wikiTools, settings, getLocalizedSetting, _
}) {
  const {
    bstarEmoji = 'bstar',
    checkinGuilds = [
      {
        guildID: DiscordConstants.BAHAI_LAB_GUILD_ID,
        guildName: getLocalizedSetting('labServerName'),
        guildChannels: [
          {
            id: DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID,
            greetings: getLocalizedSetting('debugCheckin', {
              defaultValue: greets.debugCheckin
            }),
            reportUptime: true
          }
        ]
      },
      {
        guildID: DiscordConstants.BAHAI_FYI_GUILD_ID,
        guildName: getLocalizedSetting('serverName'),
        guildChannels: [
          {
            id: DiscordConstants.BAHAI_FYI_GENERAL_CHANNEL_ID,
            greetings: getLocalizedSetting('fyiCheckin-general', {
              defaultValue: greets.fyiCheckin.general
            })
          },
          {
            id: DiscordConstants.BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID,
            greetings: getLocalizedSetting('fyiCheckin-ircBridge', {
              defaultValue: greets.fyiCheckin.ircBridge
            })
          },
          {
            id: DiscordConstants.BAHAI_FYI_STUDY_HALL_CHANNEL_ID,
            bpToday: true
          }
        ]
      }
    ]
  } = settings;

  /**
   * @type {GuildCheckin}
   */
  return async function guildCheckin (nowtime = Date.now()) {
    // Hi, guild (Bahá'í.FYI)

    let channels;
    for (const {guildID, guildName, guildChannels} of checkinGuilds) {
      const guild = client.guilds.cache.get(guildID);
      if (!guild) {
        continue;
      }
      // We found our guild (Bahá'í.FYI)

      // eslint-disable-next-line no-console -- CLI
      console.log(_('checkingIn', {
        // eslint-disable-next-line object-shorthand -- TS
        guildName: /** @type {string} */ (guildName)
      }));

      channels = guildChannels.map((guildChannel) => {
        const {
          id: guildChannelID, greetings
        } = guildChannel;
        const bpToday = 'bpToday' in guildChannel && guildChannel.bpToday;
        const reportUptime = 'reportUptime' in guildChannel &&
          guildChannel.reportUptime;

        return {
          guildName,
          bpToday,
          greetings,
          reportUptime,
          channel: /** @type {import('discord.js').TextChannel} */ (
            guild.channels.cache.get(guildChannelID)
          )
        };
      }).filter(({channel}) => {
        return channel;
      });

      if (!channels.length) {
        return;
      }
    }

    if (!channels) {
      return;
    }

    const channelList = {
      list: /** @type {[string[]]} */ ([
        channels.map(({channel}) => {
          const name = channel?.name;
          return `#${name}`;
        })
      ])
    };

    const guildFileName = 'greet.guild.txt';

    try {
      const stats = await fs.stat(guildFileName);
      const mtime = new Date(
        stats.mtime
      ); // When was the token file modified?
      const timedeltaSeconds = (nowtime - mtime.getTime()) / 1000;

      // eslint-disable-next-line no-console -- CLI
      console.log(
        _('lastGreeting', {
          relativeTime: istr(Math.floor(timedeltaSeconds)),
          channels: channelList
        })
      );
    } catch (err) {
      // eslint-disable-next-line no-console -- CLI
      console.log(_(
        'firstGreet', {
          channels: channelList
        }
      ));
    }

    // Avoid repeatedly retrieving today in history if present
    let todayInHistoryResult;
    if (channels.some(({bpToday}) => {
      return bpToday;
    })) {
      todayInHistoryResult = await wikiTools.bpGetToday();
    }

    // We found any of the channels
    for (const {
      channel, bpToday, greetings, guildName, reportUptime
    } of channels) {
      // eslint-disable-next-line no-console -- CLI
      console.log(_('channelFound', {
        // eslint-disable-next-line object-shorthand -- TS
        guildName: /** @type {string} */ (guildName),
        channelName: /** @type {string} */ (channel?.name)
      }));

      if (greetings) {
        const greet = /** @type {string[]} */ (greetings)[
          Math.floor(Math.random() * /** @type {string[]} */ (greetings).length)
        ]; // Pick a random greeting
        if (reportUptime) {
          const now = new Date();
          const uptime = nowtime - readytime;
          channel?.send(
            /** @type {string} */ (_('uptimeGreet', {
              greet,
              now: now.toString(),
              uptime: istr(Math.floor(uptime / 1000))
            }))
          ); // Check in
        } else {
          channel?.send(greet); // Greet everyone
        }
      }

      if (!bpToday ||
        !todayInHistoryResult) {
        continue;
      }

      const bstar = client.emojis.cache.find(
        (val) => val.name === bstarEmoji
      );

      // eslint-disable-next-line no-console -- CLI
      console.log(_('postingTodayInHistory'));

      channel?.send({
        content: /** @type {string} */ (_('hereIsQueryResult')),
        embeds: [{
          color: 3447003,
          description: /** @type {string} */ (_('todayInHistoryResult', {
            today: {
              date: [
                Date.now(),
                {month: 'long', day: 'numeric'}
              ]
            },
            bstar: bstar?.toString() ?? '',
            todayInHistoryResult
          }))
        }]
      });
    }

    try {
      await fs.writeFile(guildFileName, nowtime.toString());
      // eslint-disable-next-line no-console -- CLI
      console.log(_(
        'greetingSent', {
          channels: channelList
        }
      ));
    } catch (err) { // Update the token file
      // eslint-disable-next-line no-console -- CLI
      console.error(_('errorWritingGuild', {
        guildFileName
      }), err);
    }
  };
}

export default getCheckin;
