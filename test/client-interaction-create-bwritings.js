/* eslint-disable camelcase -- API */
import {expect} from 'chai';
import MockDiscord from './helpers/MockDiscord.js';
import commandFinished from './helpers/commandFinished.js';
import bot from '../src/discordBot.js';

describe('`interactionCreate` Bahá\'í Writings', function () {
  it(
    '`interactionCreate` finds a ChatInputCommand (kitabiaqdas)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      let optionName = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'kitabiaqdas',
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
              value: 5
            };
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(optionName).to.equal('paragraph-number');
      expect(message).to.equal(
        '[Kitáb-i-Aqdas, paragraph 5](https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#par5)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (kitabiaqdas no verse)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      let optionName = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'kitabiaqdas',
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
            return undefined;
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(optionName).to.equal('paragraph-number');
      expect(message).to.equal(
        '[Kitáb-i-Aqdas](https://bahai-library.com/writings/bahaullah/aqdas/kaall.html)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (kitabiaqdas-page)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      let optionName = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'kitabiaqdas-page',
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
              value: 5
            };
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(optionName).to.equal('page-number');
      expect(message).to.equal(
        '[Kitáb-i-Aqdas, page 5](https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#5)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (kitabiaqdas-page no page)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      let optionName = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'kitabiaqdas-page',
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
            return undefined;
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(optionName).to.equal('page-number');
      expect(message).to.equal(
        '[Kitáb-i-Aqdas](https://bahai-library.com/writings/bahaullah/aqdas/kaall.html)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (kitabiaqdas-qna)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      let optionName = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'kitabiaqdas-qna',
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
              value: 5
            };
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(optionName).to.equal('qna-number');
      expect(message).to.equal(
        '[Kitáb-i-Aqdas Questions & Answers, no. 5](https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#q5)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (kitabiaqdas-qna no number)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      let optionName = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'kitabiaqdas-qna',
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
            return undefined;
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(optionName).to.equal('qna-number');
      expect(message).to.equal(
        '[Kitáb-i-Aqdas Questions & Answers](https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#105)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (kitabiaqdas-notes)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      let optionName = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'kitabiaqdas-notes',
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
              value: 5
            };
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(optionName).to.equal('note-number');
      expect(message).to.equal(
        '[Kitáb-i-Aqdas Notes, no. 5](https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#note5)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (kitabiaqdas-notes ' +
      'no number)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      let optionName = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'kitabiaqdas-notes',
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
            return undefined;
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(optionName).to.equal('note-number');
      expect(message).to.equal(
        '[Kitáb-i-Aqdas Notes](https://bahai-library.com/writings/bahaullah/aqdas/kaall.html#165)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (rand-writings)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'rand-writings',
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
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(4);
      expect(message).to.equal(
        "<[Random Bahá'í Writings](https://bahai-library.com/random)>"
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (read)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'read',
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
          getString () {
            return 'hwa';
          },
          getInteger () {
            return 15;
          }
        },
        reply (msg) {
          // eslint-disable-next-line @stylistic/max-len -- Long
          message = /** @type {import('discord.js').InteractionReplyOptions} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(message).to.deep.equal({
        embeds: [{
          data: {
            color: 16732271,
            author: {
              name: 'The Arabic Hidden Words by Bahá’u’lláh',
              url: undefined,
              icon_url: 'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp'
            },
            description: '**15. **\n' +
              'O SON OF UTTERANCE! Turn thy face unto Mine and renounce ' +
              'all save Me; for My sovereignty endureth and My dominion ' +
              'perisheth not. If thou seekest another than Me, yea, if ' +
              'thou searchest the universe for evermore, thy quest will ' +
              'be in vain.'
          }
        }]
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (read-random)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'read-random',
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

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(
        /**
         * @type {{
         *   data: {
         *     color: number
         *   }
         * }}
         */
        (message.embeds?.[0])?.data.color
      ).to.equal(16732271);
    }
  );
});
