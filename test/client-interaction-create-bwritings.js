/* eslint-disable camelcase -- API */
import {expect} from 'chai';
import MockDiscord from './helpers/MockDiscord.js';
import commandFinished from './helpers/commandFinished.js';
import bot from '../src/discordBot.js';

describe('`interactionCreate` Bahá\'í Writings', function () {
  it(
    '`interactionCreate` finds an autocomplete (works-by-bahaullah-or-the-bab)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];
      let filteredChoicesRan = false;
      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'works-by-bahaullah-or-the-bab',
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
            return 'gwbs';
          }
        },
        respond (filteredChoices) {
          expect(filteredChoices.length).to.equal(1);
          filteredChoicesRan = true;
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(filteredChoicesRan).to.be.true;
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (works-by-abdul-baha)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'works-by-abdul-baha',
        user: {username: 'abc'},
        options: {
          getString () {
            return '15';
          },
          get () {
            return {
              value: 'abl'
            };
          }
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

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(message).to.equal(
        '[\'Abdu\'l-Baha in London, 15](https://bahai-library.com/writings/abdulbaha/abl/abdulbahalondon.html#15)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand ' +
      '(works-by-abdul-baha, no selection)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'works-by-abdul-baha',
        user: {username: 'abc'},
        options: {
          getString () {
            return undefined;
          },
          get () {
            return {
              value: 'abl'
            };
          }
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

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(message).to.equal(
        '[\'Abdu\'l-Baha in London](https://bahai-library.com/writings/abdulbaha/abl/abdulbahalondon.html#)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (randcat)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {import('discord.js').InteractionReplyOptions} */
      let message = {};

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'randcat',
        user: {username: 'abc'},
        options: {
          getString () {
            return 'Writings';
          },
          get () {
            return {
              value: 'b9randcat'
            };
          }
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

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(message).to.equal(
        '<[Bahai9.com random category, Writings](https://bahai9.com/wiki/Special:RandomInCategory/Writings)>'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (rand-writings)',
    async function () {
      const discord = new MockDiscord();
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
    '`interactionCreate` finds a ChatInputCommand (library)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'library',
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
            return 'will of God';
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(message).to.equal(
        '[will of God](https://www.bahai.org/library/authoritative-texts/' +
          'search?q=will%20of%20God)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (blo)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      let message = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'blo',
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
            return 'will of God';
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await commandFinished(client);
      expect(checkedCommands.length).to.equal(5);
      expect(message).to.equal(
        '[will of God](https://www.google.com/search?client=firefox-b-d&q=' +
          'site%3Abahai-library.com+will%20of%20God)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (read)',
    async function () {
      const discord = new MockDiscord();
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
