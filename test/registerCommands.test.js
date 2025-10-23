import {expect} from 'chai';
import {registerCommands} from '../src/bot.js';

describe('registerCommands', function () {
  it('handles missing application commands gracefully', async function () {
    const client = {application: undefined};
    const res = await registerCommands(
      // @ts-expect-error Deliberately bad argument
      client,
      {}
    );
    expect(res).to.equal(undefined);
  });

  it(
    'creates new command when not existing and not deleted',
    async function () {
      /** @type {import('discord.js').ApplicationCommandData[]} */
      const created = [];
      const application = {
        commands: {
          async fetch () {
            //
          },
          cache: {find: () => undefined},
          /* eslint-disable require-await -- Testing */
          /**
           * @param {import('discord.js').ApplicationCommandData} cmd
           */
          async create (cmd) {
            /* eslint-enable require-await -- Testing */
            return created.push(cmd);
          }
        }
      };
      const client = {application: {commands: application.commands}};
      const localCommands = {
        test: {name: 'test', description: 'd', options: []}
      };
      await registerCommands(
        // @ts-expect-error Just mocking what we need
        client,
        localCommands
      );
      expect(created.length).to.equal(1);
      expect(created[0].name).to.equal('test');
    }
  );

  it('skips creating deleted command', async function () {
    /** @type {import('discord.js').ApplicationCommandDataResolvable[]} */
    const created = [];
    const application = {
      commands: {
        async fetch () {
          //
        },
        cache: {find: () => undefined},
        /**
         * @param {import('discord.js').ApplicationCommandDataResolvable} cmd
         */
        async create (cmd) {
          await created.push(cmd);
        }
      }
    };
    const client = {application: {commands: application.commands}};
    const localCommands = {
      test: {name: 'test', description: 'd', options: [], deleted: true}
    };
    await registerCommands(
      // @ts-expect-error Just mocking what we need
      client,
      localCommands
    );
    expect(created.length).to.equal(0);
  });

  it('edits existing command when different', async function () {
    /**
     * @type {{
     *   id: import('discord.js').ApplicationCommandResolvable,
     *   payload: Partial<import('discord.js').
     *     RESTPostAPIChatInputApplicationCommandsJSONBody>
     * }[]}
     */
    const edits = [];
    const existing = {id: '1', name: 'test', description: 'old', options: []};
    const application = {
      commands: {
        async fetch () {
          //
        },
        cache: {find: () => existing},
        /* eslint-disable require-await -- Testing */
        /**
         * @param {import('discord.js').ApplicationCommandResolvable} id
         * @param {Partial<import('discord.js').
         *   RESTPostAPIChatInputApplicationCommandsJSONBody>} payload
         */
        async edit (id, payload) {
          /* eslint-enable require-await -- Testing */
          edits.push({id, payload});
        },
        /* eslint-disable require-await -- Testing */
        /**
         *
         */
        async delete () {
          /* eslint-enable require-await -- Testing */
          throw new Error('should not delete');
        }
      }
    };
    const client = {application: {commands: application.commands}};
    const localCommands = {
      test: {name: 'test', description: 'new', options: []}
    };
    await registerCommands(
      // @ts-expect-error Just mocking what we need
      client,
      localCommands
    );
    expect(edits.length).to.equal(1);
    expect(edits[0].payload.description).to.equal('new');
  });

  it('deletes existing command when local deleted', async function () {
    /** @type {string[]} */
    const deletes = [];
    const existing = {id: '1', name: 'test', description: 'old', options: []};
    const application = {
      commands: {
        /**
         *
         */
        async fetch () {
          //
        },
        cache: {find: () => existing},
        /* eslint-disable require-await -- Testing */
        /**
         *
         */
        async edit () {
          /* eslint-enable require-await -- Testing */
          throw new Error('should not edit');
        },
        /* eslint-disable require-await -- Testing */
        /**
         * @param {string} id
         */
        async delete (id) {
          /* eslint-enable require-await -- Testing */
          deletes.push(id);
        }
      }
    };
    const client = {application: {commands: application.commands}};
    const localCommands = {
      test: {name: 'test', description: 'old', options: [], deleted: true}
    };
    await registerCommands(
      // @ts-expect-error Just mocking what we need
      client,
      localCommands
    );
    expect(deletes.length).to.equal(1);
    expect(deletes[0]).to.equal('1');
  });
});
