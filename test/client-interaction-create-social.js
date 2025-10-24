import {expect} from 'chai';
import MockDiscord from './helpers/MockDiscord.js';
import bot from '../src/discordBot.js';

describe('`interactionCreate` social', function () {
  it(
    '`interactionCreate` finds a ChatInputCommand (seen)',
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
        commandName: 'seen',
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
              value: 'brettz9'
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
          expect(optionName).to.equal('user');
          expect(message).to.equal(
            "I haven't seen <@brettz9> lately."
          );
          resolve();
        });
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (seen) (found idle)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let optionName;

      /** @type {string} */
      let message;

      const user = {
        username: 'brettz9',
        id: '410259427770499072'
      };

      // @ts-expect-error Just mocking what we need
      client.users.cache.find = () => {
        return user;
      };

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'seen',
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
        user,
        guild: {
          channels: {
            fetchActiveThreads () {
              return {
                threads: []
              };
            },
            cache: {
              // @ts-expect-error Mock what we need
              // eslint-disable-next-line @stylistic/max-len -- Long
              // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
              filter (cb) {
                // eslint-disable-next-line @stylistic/max-len -- Long
                // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                cb({
                  isTextBased () {
                    return true;
                  }
                });
                return [
                  {
                    messages: {
                      fetch (/* {limit} */) {
                        const messages = {
                          filter (
                            /* eslint-disable @stylistic/max-len -- Long */
                            // @ts-expect-error Mocking
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback
                          ) {
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback({author: {id: ''}});
                            /* eslint-enable @stylistic/max-len -- Long */
                            return {
                              first () {
                                //
                              }
                            };
                          }
                        };
                        return messages;
                      }
                    }
                  }
                ];
              }
            }
          },
          members: {
            async fetch ({
              // @ts-expect-error Just mocking what we need
              user: usr
            }) {
              return await {
                user: {
                  id: usr.id
                },
                presence: {
                  status: 'idle'
                }
              };
            }
          }
        },
        options: {
          get (optName) {
            optionName = optName;
            return {
              value: 'brettz9'
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
          expect(optionName).to.equal('user');
          expect(message).to.equal(
            "<@brettz9> is now idle; I haven't seen them lately."
          );
          resolve();
        });
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (seen) (found dnd)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let optionName;

      /** @type {string} */
      let message;

      const user = {
        username: 'brettz9',
        id: '410259427770499072'
      };

      // @ts-expect-error Just mocking what we need
      client.users.cache.find = () => {
        return user;
      };

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'seen',
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
        user,
        guild: {
          channels: {
            fetchActiveThreads () {
              return {
                threads: []
              };
            },
            cache: {
              // @ts-expect-error Mock what we need
              // eslint-disable-next-line @stylistic/max-len -- Long
              // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
              filter (cb) {
                // eslint-disable-next-line @stylistic/max-len -- Long
                // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                cb({
                  isTextBased () {
                    return true;
                  }
                });
                return [
                  {
                    messages: {
                      fetch (/* {limit} */) {
                        throw new Error('Will be ignored');
                      }
                    }
                  },
                  {
                    messages: {
                      fetch (/* {limit} */) {
                        const messages = {
                          filter (
                            /* eslint-disable @stylistic/max-len -- Long */
                            // @ts-expect-error Mocking
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback
                          ) {
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback({author: {id: ''}});
                            /* eslint-enable @stylistic/max-len -- Long */
                            return {
                              first () {
                                //
                              }
                            };
                          }
                        };
                        return messages;
                      }
                    }
                  }
                ];
              }
            }
          },
          members: {
            async fetch ({
              // @ts-expect-error Just mocking what we need
              user: usr
            }) {
              return await {
                user: {
                  id: usr.id
                },
                presence: {
                  status: 'dnd'
                }
              };
            }
          }
        },
        options: {
          get (optName) {
            optionName = optName;
            return {
              value: 'brettz9'
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
          expect(optionName).to.equal('user');
          expect(message).to.equal(
            "<@brettz9> is now busy; I haven't seen them lately."
          );
          resolve();
        });
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (seen) (found offline)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let optionName;

      /** @type {string} */
      let message;

      const user = {
        username: 'brettz9',
        id: '410259427770499072'
      };

      // @ts-expect-error Just mocking what we need
      client.users.cache.find = () => {
        return user;
      };

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'seen',
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
        user,
        guild: {
          channels: {
            fetchActiveThreads () {
              return {
                threads: []
              };
            },
            cache: {
              // @ts-expect-error Mock what we need
              // eslint-disable-next-line @stylistic/max-len -- Long
              // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
              filter (cb) {
                // eslint-disable-next-line @stylistic/max-len -- Long
                // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                cb({
                  isTextBased () {
                    return true;
                  }
                });
                return [
                  {
                    messages: {
                      fetch (/* {limit} */) {
                        const messages = {
                          filter (
                            /* eslint-disable @stylistic/max-len -- Long */
                            // @ts-expect-error Mocking
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback
                          ) {
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback({author: {id: ''}});
                            /* eslint-enable @stylistic/max-len -- Long */
                            return {
                              first () {
                                //
                              }
                            };
                          }
                        };
                        return messages;
                      }
                    }
                  }
                ];
              }
            }
          },
          members: {
            async fetch ({
              // @ts-expect-error Just mocking what we need
              user: usr
            }) {
              return await {
                user: {
                  id: usr.id
                },
                presence: {
                  status: 'offline'
                }
              };
            }
          }
        },
        options: {
          get (optName) {
            optionName = optName;
            return {
              value: 'brettz9'
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
          expect(optionName).to.equal('user');
          expect(message).to.equal(
            "I haven't seen <@brettz9> lately."
          );
          resolve();
        });
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (seen) (found ' +
      'dnd with lastMessage)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let optionName;

      /** @type {string} */
      let message;

      const user = {
        username: 'brettz9',
        id: '410259427770499072'
      };

      // @ts-expect-error Just mocking what we need
      client.users.cache.find = () => {
        return user;
      };

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'seen',
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
        user,
        guild: {
          channels: {
            fetchActiveThreads () {
              return {
                threads: []
              };
            },
            cache: {
              // @ts-expect-error Mock what we need
              // eslint-disable-next-line @stylistic/max-len -- Long
              // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
              filter (cb) {
                // eslint-disable-next-line @stylistic/max-len -- Long
                // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                cb({
                  isTextBased () {
                    return true;
                  }
                });
                return [
                  {
                    messages: {
                      fetch (/* {limit} */) {
                        const messages = {
                          filter (
                            /* eslint-disable @stylistic/max-len -- Long */
                            // @ts-expect-error Mocking
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback
                          ) {
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback({author: {id: ''}});
                            /* eslint-enable @stylistic/max-len -- Long */
                            return {
                              first () {
                                return {
                                  createdTimestamp: 100
                                };
                              }
                            };
                          }
                        };
                        return messages;
                      }
                    }
                  },
                  {
                    toString () {
                      return `<#391408369891672064>`;
                    },
                    messages: {
                      fetch (/* {limit} */) {
                        const messages = {
                          filter (
                            /* eslint-disable @stylistic/max-len -- Long */
                            // @ts-expect-error Mocking
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback
                          ) {
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback({author: {id: ''}});
                            /* eslint-enable @stylistic/max-len -- Long */
                            return {
                              first () {
                                return {
                                  createdTimestamp: 150
                                };
                              }
                            };
                          }
                        };
                        return messages;
                      }
                    }
                  }
                ];
              }
            }
          },
          members: {
            async fetch ({
              // @ts-expect-error Just mocking what we need
              user: usr
            }) {
              return await {
                user: {
                  id: usr.id
                },
                presence: {
                  status: 'dnd'
                }
              };
            }
          }
        },
        options: {
          get (optName) {
            optionName = optName;
            return {
              value: 'brettz9'
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
          expect(optionName).to.equal('user');
          expect(message).to.equal(
            '<@brettz9> is now busy, and was last seen in ' +
              '<#391408369891672064> 0s ago.'
          );
          resolve();
        });
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (seen) (found ' +
      'offline with lastMessage)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let optionName;

      /** @type {string} */
      let message;

      const user = {
        username: 'brettz9',
        id: '410259427770499072'
      };

      // @ts-expect-error Just mocking what we need
      client.users.cache.find = () => {
        return user;
      };

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'seen',
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
        user,
        guild: {
          channels: {
            fetchActiveThreads () {
              return {
                threads: []
              };
            },
            cache: {
              // @ts-expect-error Mock what we need
              // eslint-disable-next-line @stylistic/max-len -- Long
              // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
              filter (cb) {
                // eslint-disable-next-line @stylistic/max-len -- Long
                // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                cb({
                  isTextBased () {
                    return true;
                  }
                });
                return [
                  {
                    messages: {
                      fetch (/* {limit} */) {
                        const messages = {
                          filter (
                            /* eslint-disable @stylistic/max-len -- Long */
                            // @ts-expect-error Mocking
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback
                          ) {
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback({author: {id: ''}});
                            /* eslint-enable @stylistic/max-len -- Long */
                            return {
                              first () {
                                return {
                                  createdTimestamp: 100
                                };
                              }
                            };
                          }
                        };
                        return messages;
                      }
                    }
                  },
                  {
                    toString () {
                      return `<#391408369891672064>`;
                    },
                    messages: {
                      fetch (/* {limit} */) {
                        const messages = {
                          filter (
                            /* eslint-disable @stylistic/max-len -- Long */
                            // @ts-expect-error Mocking
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback
                          ) {
                            // eslint-disable-next-line promise/prefer-await-to-callbacks -- API
                            callback({author: {id: ''}});
                            /* eslint-enable @stylistic/max-len -- Long */
                            return {
                              first () {
                                return {
                                  createdTimestamp: 150
                                };
                              }
                            };
                          }
                        };
                        return messages;
                      }
                    }
                  }
                ];
              }
            }
          },
          members: {
            async fetch ({
              // @ts-expect-error Just mocking what we need
              user: usr
            }) {
              return await {
                user: {
                  id: usr.id
                },
                presence: {
                  status: 'offline'
                }
              };
            }
          }
        },
        options: {
          get (optName) {
            optionName = optName;
            return {
              value: 'brettz9'
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
          expect(optionName).to.equal('user');
          expect(message).to.equal(
            '<@brettz9> is now offline, and was last seen in ' +
            '<#391408369891672064> 0s ago.'
          );
          resolve();
        });
      });
    }
  );

  it(
    '`interactionCreate` finds a ChatInputCommand (users)',
    async function () {
      const discord = new MockDiscord();
      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});
      const checkedCommands = [];

      /** @type {string} */
      let message;

      // @ts-expect-error Just mocking what we need
      client.emit('interactionCreate', {
        commandName: 'users',
        guild: discord.guild,
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
          message = /** @type {string} */ (msg);
        }
      });

      // eslint-disable-next-line promise/avoid-new -- Delay test
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(checkedCommands.length).to.equal(5);
          expect(message).to.equal(
            'There are currently 0 users online, ' +
              'including 0 admin/mod/helper(s).'
          );
          resolve();
        });
      });
    }
  );
});
