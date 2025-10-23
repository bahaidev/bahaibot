
import {expect} from 'chai';
import MockDiscord from './helpers/MockDiscord.js';
import bot from '../src/discordBot.js';

describe('`interactionCreate`', function () {
  it(
    '`interactionCreate` is ignored if not of the expected type',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
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
      // @ts-expect-error Don't need a full mock
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
    '`interactionCreate` finds an autocomplete',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];
      let filteredChoicesRan = false;
      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'read',
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
    '`interactionCreate` finds a StringSelectMenu',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let reply;
      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'rand-wiki',
        customId: 'rand-wiki_site',
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

      // eslint-disable-next-line promise/avoid-new -- Delay test
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(/** @type {import('discord.js').APIEmbed} */ (
            reply.embeds?.[0]
          )?.description).includes(
            'Bahai9 has returned the following random page, abc:'
          );
          expect(checkedCommands.length).to.equal(6);
          resolve();
        }, 3000);
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let optionName;

      /** @type {string} */
      let message;

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

      // eslint-disable-next-line promise/avoid-new -- Delay test
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(checkedCommands.length).to.equal(5);
          expect(optionName).to.equal('echo-text');
          expect(message).to.equal(
            "Here's what you said, brettz9: ``testing``"
          );
          resolve();
        });
      });
    }
  );
});
