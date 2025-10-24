
import {expect} from 'chai';
import MockDiscord from './helpers/MockDiscord.js';
import bot from '../src/discordBot.js';

describe('`interactionCreate` admin', function () {
  it(
    '`interactionCreate` finds a ChatInputCommand (checkin)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'checkin',
        user: {username: 'brettz9'},
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
        }
      });

      // eslint-disable-next-line promise/avoid-new -- Delay test
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(checkedCommands.length).to.equal(4);
          resolve();
        });
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (puppet)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string[]} */
      const optionNames = [];

      /** @type {string} */
      let message;

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'puppet',
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
            optionNames.push(optName);
            return {
              value: optName === 'channel' ? 'bot-testing' : 'hello'
            };
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      // eslint-disable-next-line promise/avoid-new -- Delay test
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(checkedCommands.length).to.equal(6);
          expect(optionNames).to.deep.equal(['channel', 'message']);
          expect(message).to.equal(
            'Channel bot-testing does not exist or is not text-based!'
          );
          resolve();
        });
      });
    }
  );
});
