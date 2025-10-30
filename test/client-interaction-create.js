/* eslint-disable camelcase -- API */
// eslint-disable-next-line no-shadow -- Ok
import {setTimeout} from 'node:timers/promises';
import {expect} from 'chai';
import MockDiscord from './helpers/MockDiscord.js';
import commandFinished from './helpers/commandFinished.js';
import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

describe('`interactionCreate`', function () {
  it(
    '`interactionCreate` is ignored if not of the expected type',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];
      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        isChatInputCommand () {
          checkedCommands.push(true);
          return false;
        },
        isStringSelectMenu () {
          checkedCommands.push(true);
          return false;
        },
        isAutocomplete () {
          checkedCommands.push(true);
          return false;
        }
      });
      expect(checkedCommands.length).to.equal(3);
    }
  );

  it(
    '`interactionCreate` fails to find autocomplete',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];
      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'missingCommand',
        isChatInputCommand () {
          checkedCommands.push(true);
          return false;
        },
        isStringSelectMenu () {
          checkedCommands.push(true);
          return false;
        },
        isAutocomplete () {
          checkedCommands.push(true);
          return true;
        }
      });
      expect(checkedCommands.length).to.equal(4);
    }
  );

  it(
    '`interactionCreate` finds an autocomplete (quote)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];
      let filteredChoicesRan = false;
      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'quote',
        isChatInputCommand () {
          checkedCommands.push(true);
          return false;
        },
        isStringSelectMenu () {
          checkedCommands.push(true);
          return false;
        },
        isAutocomplete () {
          checkedCommands.push(true);
          return true;
        },
        options: {
          getFocused () {
            return 'hwa';
          }
        },
        respond (filteredChoices) {
          expect(filteredChoices.length).to.equal(1);
          filteredChoicesRan = true;
        }
      });
      expect(checkedCommands.length).to.equal(5);
      expect(filteredChoicesRan).to.be.true;
    }
  );

  it(
    '`interactionCreate` finds a StringSelectMenu (rand)',
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
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let reply = {};
      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'rand',
        customId: 'rand_site',
        values: ['b9'],
        user: {username: 'abc'},
        isChatInputCommand () {
          checkedCommands.push(true);
          return false;
        },
        isStringSelectMenu () {
          checkedCommands.push(true);
          return true;
        },
        isAutocomplete () {
          checkedCommands.push(true);
          return false;
        },
        reply (repl) {
          reply = /** @type {import('discord.js').InteractionReplyOptions} */ (
            repl
          );
        }
      });

      await commandFinished(client);
      expect(/** @type {import('discord.js').APIEmbed} */ (
        reply.embeds?.[0]
      )?.description).includes(
        'Bahai9 has returned the following random page, abc:'
      );
      expect(checkedCommands.length).to.equal(6);
    }
  );

  it(
    '`interactionCreate` finds a StringSelectMenu (rand chat input)',
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
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let reply = {};
      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'rand',
        customId: 'rand_site',
        values: ['b9'],
        user: {username: 'abc'},
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
        reply (repl) {
          reply = /** @type {import('discord.js').InteractionReplyOptions} */ (
            repl
          );
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(6);
      expect(/** @type {import('discord.js').APIEmbed} */ (
        reply
      )).to.deep.equal({
        components: [
          {
            components: [
              {
                data: {
                  custom_id: 'rand_site',
                  placeholder: 'Choose a site!',
                  type: 3
                },
                options: [
                  {
                    data: {
                      emoji: undefined,
                      label: 'bahaipedia.org',
                      value: 'bp'
                    }
                  },
                  {
                    data: {
                      emoji: undefined,
                      label: 'bahai9.com',
                      value: 'b9'
                    }
                  },
                  {
                    data: {
                      emoji: undefined,
                      label: 'bahai.media',
                      value: 'bm'
                    }
                  },
                  {
                    data: {
                      emoji: undefined,
                      label: 'bahai.works',
                      value: 'bw'
                    }
                  }
                ]
              }
            ],
            data: {
              type: 1
            }
          }
        ],
        content: 'Random wiki:',
        flags: 64
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (echo)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let optionName = '';

      /** @type {string} */
      let message = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'echo',
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
          message = /** @type {string} */ (msg);
        },
        options: {
          get (optName) {
            optionName = optName;
            return {
              value: 'testing'
            };
          }
        }
      });

      await setTimeout();
      expect(checkedCommands.length).to.equal(5);
      expect(optionName).to.equal('echo-text');
      expect(message).to.equal(
        "Here's what you said, brettz9: ``testing``"
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (info)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let message = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'info',
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
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await setTimeout();
      expect(checkedCommands.length).to.equal(4);
      expect(message).to.deep.equal({
        embeds: [
          {
            data: {
              author: {
                icon_url: 'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp',
                name: 'BahaiBot',
                url: undefined
              },
              description: "Bahá'í Bot for Discord\n",
              fields: [
                {
                  inline: false,
                  name: 'Support Server',
                  value: '[Invite link](https://discord.gg/NE6dJaw)'
                }
              ]
            }
          }
        ]
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (help)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'help',
        user: {username: 'abc'},
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
        inCachedGuild () {
          checkedCommands.push(true);
          return true;
        },
        reply (msg) {
          // eslint-disable-next-line @stylistic/max-len -- Long
          message = /** @type {import('discord.js').InteractionReplyOptions} */ (
            msg
          );
        }
      });

      await setTimeout();
      expect(checkedCommands.length).to.equal(5);
      expect(message).to.deep.equal({
        content: 'Here are the instructions you need, abc.',
        embeds: [
          {
            color: 8359053,
            description: 'I can respond to well-formed questions about ' +
              "basic Bahá'í topics. As well, the following commands can " +
              'help me process your requests. Make sure to mention me ' +
              'when trying to use them, like this: `@BahaiBot !help`',
            fields: [
              {
                name: '!quote [list | random | *‹text›* *‹chapter›*]',
                value: "Quotes from the Bahá'í Writings. Displays an " +
                  'excerpt from given *chapter* of *text*. Available ' +
                  'texts are displayed using `!quote list`; ' +
                  '`!quote random` displays a random passage from ' +
                  'available texts.'
              },
              {
                name: '!bp | !b9 | !bm | !bw [-rand | *‹keyword›*]',
                value: 'Return a link to the top result for *keyword* ' +
                  'on Bahaipedia (`!bp`), Bahai9.com (`!b9`), ' +
                  'Bahai.media (`!bm`), or Bahai.works; `-rand` displays ' +
                  'a random article (or file).'
              },
              {
                name: '!today',
                value: "Displays a list of events from today's date in " +
                  'history, via Bahaipedia.'
              },
              {
                name: '!help',
                value: 'Displays help text. For more commands, use ' +
                  '`!helpextras`, `!helpadmin`, and `!helpshortcuts`'
              },
              {
                name: '!helpextras',
                value: 'Displays help text for rarer commands.'
              },
              {
                name: '!helpadmin',
                value: 'Displays help text for commands available ' +
                  'only to admins.'
              },
              {
                name: '!helpshortcuts',
                value: 'Displays help text for shortcuts to searches.'
              }
            ]
          }
        ]
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (helpextras)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'helpextras',
        user: {username: 'abc'},
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
        inCachedGuild () {
          checkedCommands.push(true);
          return true;
        },
        reply (msg) {
          // eslint-disable-next-line @stylistic/max-len -- Long
          message = /** @type {import('discord.js').InteractionReplyOptions} */ (
            msg
          );
        }
      });

      await setTimeout();
      expect(checkedCommands.length).to.equal(5);
      expect(message).to.deep.equal({
        content: 'Here are the instructions you need, abc.',
        embeds: [
          {
            color: 8359053,
            description: 'The following commands can help me process ' +
              'your requests. Make sure to mention me when trying to ' +
              'use them, like this: `@BahaiBot !helpextras`',
            fields: [
              {
                name: '!users',
                value: 'Displays a count of online users.'
              },
              {
                name: '!seen',
                value: 'Displays the last time a user was seen online.'
              },
              {
                name: '!info',
                value: 'Provides a link to the support server'
              },
              {
                name: 'badi',
                value: "Provides a link to the illustrious Bahá'í youth"
              },
              {
                name: 'allahuabha',
                value: "Sends the Bahá'í greeting, Alláh'u'Abhá"
              },
              {
                name: 'nawruz',
                value: "Sends a greeting for the Bahá'í Holy Day Naw-Rúz"
              },
              {
                name: 'ridvan',
                value: "Sends a greeting for the Bahá'í Holy Day Ridván"
              },
              {
                name: '🟙',
                value: "Sends a greeting via a Bahá'í symbol, " +
                  'the nine-pointed star'
              },
              {
                name: 'sup',
                value: "Sends the greeting 'What's up'"
              },
              {
                name: 'good morning',
                value: "Sends the greeting 'Good morning'"
              },
              {
                name: 'good afternoon',
                value: "Sends the greeting 'Good afternoon'"
              },
              {
                name: 'good evening',
                value: "Sends the greeting 'Good evening'"
              },
              {
                name: 'hello',
                value: "Sends the greeting 'Hello'"
              },
              {
                name: 'welcome',
                value: "Sends the greeting 'Welcome'"
              },
              {
                name: '☕',
                value: 'Sends a coffee cup emoji'
              },
              {
                name: '🍵',
                value: 'Sends a tea emoji'
              },
              {
                name: '🍿',
                value: 'Sends a popcorn emoji'
              },
              {
                name: 'unladen swallow',
                value: 'Prompt for a Monty Python response'
              },
              {
                name: 'bruh',
                value: 'Sends a Bruh'
              },
              {
                name: 'good bot',
                value: 'Praises the bot'
              },
              {
                name: 'bad bot',
                value: 'Criticizes the bot'
              },
              {
                name: 'repeating yourself',
                value: 'Indicate the bot is repeating itself'
              },
              {
                name: 'santa cat',
                value: 'Makes reference to a Santa cat'
              },
              {
                name: 'ping',
                value: 'Pings the bot'
              }
            ]
          }
        ]
      });
    }
  );


  it(
    '`interactionCreate` finds a ChatInputCommand (helpadmin)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'helpadmin',
        user: {username: 'abc'},
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
        inCachedGuild () {
          checkedCommands.push(true);
          return true;
        },
        reply (msg) {
          // eslint-disable-next-line @stylistic/max-len -- Long
          message = /** @type {import('discord.js').InteractionReplyOptions} */ (
            msg
          );
        }
      });

      await setTimeout();
      expect(checkedCommands.length).to.equal(5);
      expect(message).to.deep.equal({
        content: 'Here are the instructions you need, abc.',
        embeds: [
          {
            color: 8359053,
            description: 'The following administrator commands can ' +
              'help me process your requests. Make sure to mention ' +
              'me when trying to use them, like this: ' +
              '`@BahaiBot !helpadmin`',
            fields: [
              {
                name: '!speak some words',
                value: 'Reads some words as speech'
              },
              {
                name: '!puppet userChannel | message',
                value: 'Allows administrators to puppeteer a bot, ' +
                  'channeling a message to another channel'
              },
              {
                name: '!echo words',
                value: 'Just echoes back the words supplied.'
              },
              {
                name: '!checkin',
                value: 'Checks in to send a greeting to a ' +
                  'bot-testing channel'
              }
            ]
          }
        ]
      });
    }
  );
});
