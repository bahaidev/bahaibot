import {expect} from 'chai';
import {registerCommands} from '../src/bot.js';

describe('registerCommands', function () {
  it('handles missing application commands gracefully', async function () {
    const client = {application: undefined};
    const res = await registerCommands(client, {});
    expect(res).to.equal(undefined);
  });

  it('creates new command when not existing and not deleted', async function () {
    const created = [];
    const application = {
      commands: {
        fetch: async () => {},
        cache: {find: () => undefined},
        create: async (cmd) => created.push(cmd)
      }
    };
  const client = {application: {commands: application.commands}};
    const localCommands = {
      test: {name: 'test', description: 'd', options: []}
    };
    await registerCommands(client, localCommands);
    expect(created.length).to.equal(1);
    expect(created[0].name).to.equal('test');
  });

  it('skips creating deleted command', async function () {
    const created = [];
    const application = {
      commands: {
        fetch: async () => {},
        cache: {find: () => undefined},
        create: async (cmd) => created.push(cmd)
      }
    };
  const client = {application: {commands: application.commands}};
    const localCommands = {
      test: {name: 'test', description: 'd', options: [], deleted: true}
    };
    await registerCommands(client, localCommands);
    expect(created.length).to.equal(0);
  });

  it('edits existing command when different', async function () {
    const edits = [];
    const existing = {id: '1', name: 'test', description: 'old', options: []};
    const application = {
      commands: {
        fetch: async () => {},
        cache: {find: () => existing},
        edit: async (id, payload) => edits.push({id, payload}),
        delete: async () => { throw new Error('should not delete'); }
      }
    };
  const client = {application: {commands: application.commands}};
    const localCommands = {
      test: {name: 'test', description: 'new', options: []}
    };
    await registerCommands(client, localCommands);
    expect(edits.length).to.equal(1);
    expect(edits[0].payload.description).to.equal('new');
  });

  it('deletes existing command when local deleted', async function () {
    const deletes = [];
    const existing = {id: '1', name: 'test', description: 'old', options: []};
    const application = {
      commands: {
        fetch: async () => {},
        cache: {find: () => existing},
        edit: async () => { throw new Error('should not edit'); },
        delete: async (id) => deletes.push(id)
      }
    };
  const client = {application: {commands: application.commands}};
    const localCommands = {
      test: {name: 'test', description: 'old', options: [], deleted: true}
    };
    await registerCommands(client, localCommands);
    expect(deletes.length).to.equal(1);
    expect(deletes[0]).to.equal('1');
  });
});
