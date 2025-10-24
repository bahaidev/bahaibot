// eslint-disable-next-line no-shadow -- Ok
import {setTimeout} from 'node:timers/promises';
import {expect} from 'chai';
import MockDiscord from './helpers/MockDiscord.js';
import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

describe('`interactionCreate` Bahá\'í wiki', function () {
  it(
    '`interactionCreate` finds a ChatInputCommand (today)',
    async function () {
      const discord = new MockDiscord({
        guildChannels: true,
        guilds: [
          {
            id: DiscordConstants.BAHAI_FYI_GUILD_ID,
            name: "Bahá'í FYI",
            channels: [
              {
                id: DiscordConstants.BAHAI_FYI_GENERAL_CHANNEL_ID,
                name: 'general'
              },
              {
                id: DiscordConstants.BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID,
                name: 'irc-bridge'
              },
              {
                id: DiscordConstants.BAHAI_FYI_STUDY_HALL_CHANNEL_ID,
                name: 'study-hall'
              }
            ],
            emojis: [
              {
                id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
                name: 'bstar'
              }
            ]
          }
        ]
      });
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'today',
        inCachedGuild () {
          checkedCommands.push(true);
          return true;
        },
        isChatInputCommand () {
          checkedCommands.push(true);
          return true;
        },
        isStringSelectMenu () {
          checkedCommands.push(true);
          return false;
        },
        isAutocomplete () {
          checkedCommands.push(true);
          return false;
        },
        user: {
          username: 'brettz9',
          id: '410259427770499072'
        },
        reply (msg) {
          // eslint-disable-next-line @stylistic/max-len -- Long
          message = /** @type {import('discord.js').InteractionReplyOptions} */ (
            msg
          );
        }
      });

      await setTimeout(3000);
      expect(checkedCommands.length).to.equal(5);
      expect(message.content).to.equal(
        'Here is the result of your query.'
      );
      expect(
        /** @type {import('discord.js').APIEmbed} */
        (message.embeds?.[0])?.color
      ).to.equal(3447003);
      expect(
        /** @type {import('discord.js').APIEmbed} */
        (message.embeds?.[0])?.description
      ).to.include(
        "Here's Bahaipedia's Today in History entry for"
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (b9)',
    async function () {
      const discord = new MockDiscord({
        guildChannels: true,
        guilds: [
          {
            id: DiscordConstants.BAHAI_FYI_GUILD_ID,
            name: "Bahá'í FYI",
            channels: [
              {
                id: DiscordConstants.BAHAI_FYI_GENERAL_CHANNEL_ID,
                name: 'general'
              },
              {
                id: DiscordConstants.BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID,
                name: 'irc-bridge'
              },
              {
                id: DiscordConstants.BAHAI_FYI_STUDY_HALL_CHANNEL_ID,
                name: 'study-hall'
              }
            ],
            emojis: [
              {
                id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
                name: 'bstar'
              }
            ]
          }
        ]
      });
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      let optionName = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'b9',
        inCachedGuild () {
          checkedCommands.push(true);
          return true;
        },
        isChatInputCommand () {
          checkedCommands.push(true);
          return true;
        },
        isStringSelectMenu () {
          checkedCommands.push(true);
          return false;
        },
        isAutocomplete () {
          checkedCommands.push(true);
          return false;
        },
        user: {
          username: 'brettz9',
          id: '410259427770499072'
        },
        options: {
          get (optName) {
            optionName = optName;
            return {
              value: 'God'
            };
          }
        },
        reply (msg) {
          // eslint-disable-next-line @stylistic/max-len -- Long
          message = /** @type {import('discord.js').InteractionReplyOptions} */ (
            msg
          );
        }
      });

      await setTimeout(3000);
      expect(checkedCommands.length).to.equal(6);
      expect(optionName).to.equal('keywords');
      expect(message.content).to.equal(
        'Here is the result of your search.'
      );
      expect(
        /** @type {import('discord.js').APIEmbed} */
        (message.embeds?.[0])?.color
      ).to.equal(3447003);
      expect(
        /** @type {import('discord.js').APIEmbed} */
        (message.embeds?.[0])?.description
      ).to.include(
        'Bahai9 has returned the following page'
      );
    }
  );
});
