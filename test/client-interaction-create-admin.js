/* eslint-disable no-console -- Testing console */
// eslint-disable-next-line no-shadow -- Ok
import {setTimeout} from 'node:timers/promises';
import {expect} from 'chai';
import {createSandbox} from 'sinon';
import MockDiscord from './helpers/MockDiscord.js';
import bot from '../src/discordBot.js';

describe('`interactionCreate` admin', function () {
  beforeEach(function () {
    this.sinon = createSandbox();
  });
  afterEach(function () {
    // Restore the default sandbox here
    this.sinon.restore();
  });
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

      await setTimeout();
      expect(checkedCommands.length).to.equal(4);
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
      let message = '';

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

      await setTimeout();
      expect(checkedCommands.length).to.equal(6);
      expect(optionNames).to.deep.equal(['channel', 'message']);
      expect(message).to.equal(
        'Channel bot-testing does not exist or is not text-based!'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (speak by admin with error)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({
        client: discord.getClient(),
        DiscordVoice: {
          // @ts-expect-error Don't need a full mock
          joinVoiceChannel () {
            return {
              subscribe () {
                //
              }
            };
          },
          // @ts-expect-error Don't need a full mock
          createAudioResource () {
            //
          },
          // @ts-expect-error Don't need a full mock
          createAudioPlayer () {
            return {
              /* eslint-disable promise/prefer-await-to-callbacks -- API */
              /**
               * @param {string} ev
               * @param {(ev: string, info: {}) => void} cb
               */
              async on (ev, cb) {
                await setTimeout();

                // eslint-disable-next-line n/no-callback-literal -- API
                cb('error', {
                  resource: {
                    metadata: {
                      title: ''
                    }
                  }
                });
                /* eslint-enable promise/prefer-await-to-callbacks -- API */
              },

              play () {
                //
              }
            };
          }
        }
      });
      const checkedCommands = [];

      /** @type {string} */
      let message = '';

      this.sinon.spy(console, 'log');

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'speak',
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
        member: {
          voice: {
            channel: {
              id: 'someid',
              guild: {
                id: 'guildid',
                voiceAdapterCreator () {
                  //
                }
              }
            }
          }
        },
        user: {
          username: 'brettz9',
          id: '410259427770499072'
        },
        options: {
          getString () {
            return 'some words';
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await setTimeout();
      expect(checkedCommands.length).to.equal(6);
      // @ts-expect-error Sinon
      expect(console.log.firstCall.firstArg).to.have.string(
        'Speaking has begun.'
      );
      expect(message).to.equal(
        '(Was not able to speak)'
      );
    }
  );


  it(
    '`interactionCreate` finds a ChatInputCommand (speak by admin)',
    async function () {
      const discord = new MockDiscord();
      const {client} = await bot({
        client: discord.getClient(),
        DiscordVoice: {
          // @ts-expect-error Don't need a full mock
          joinVoiceChannel () {
            return {
              subscribe () {
                //
              }
            };
          },
          // @ts-expect-error Don't need a full mock
          createAudioResource () {
            //
          },
          // @ts-expect-error Don't need a full mock
          createAudioPlayer () {
            return {
              /* eslint-disable promise/prefer-await-to-callbacks -- API */
              /**
               * @param {string} ev
               * @param {(ev: string, info: {}) => void} cb
               */
              async on (ev, cb) {
                await setTimeout();

                // eslint-disable-next-line n/no-callback-literal -- API
                cb('idle', {});
                /* eslint-enable promise/prefer-await-to-callbacks -- API */
              },

              play () {
                //
              }
            };
          }
        }
      });
      const checkedCommands = [];

      /** @type {string} */
      let message = '';

      this.sinon.spy(console, 'log');

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'speak',
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
        member: {
          voice: {
            channel: {
              id: 'someid',
              guild: {
                id: 'guildid',
                voiceAdapterCreator () {
                  //
                }
              }
            }
          }
        },
        user: {
          username: 'brettz9',
          id: '410259427770499072'
        },
        options: {
          getString () {
            return 'some words';
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await setTimeout();
      expect(checkedCommands.length).to.equal(6);
      // @ts-expect-error Sinon
      expect(console.log.firstCall.firstArg).to.have.string(
        'Speaking has begun.'
      );
      expect(message).to.equal(
        '(Was not able to speak)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (speak attempt non-voice)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let message = '';

      this.sinon.spy(console, 'log');

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'speak',
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
          getString () {
            return 'some words';
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await setTimeout();
      expect(checkedCommands.length).to.equal(6);
      // @ts-expect-error Sinon
      expect(console.log.firstCall.firstArg).to.have.string(
        'Message member not in a voice channel with `channel`'
      );
      expect(message).to.equal(
        '(Was not able to speak)'
      );
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (speak attempt non-admin)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let message = '';

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'speak',
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
          username: 'somebody',
          id: '1234567890'
        },
        options: {
          getString () {
            return 'some words';
          }
        },
        reply (msg) {
          message = /** @type {string} */ (msg);
        }
      });

      await setTimeout();
      expect(checkedCommands.length).to.equal(6);
      expect(message).to.equal(
        '(Was not able to speak)'
      );
    }
  );
});
