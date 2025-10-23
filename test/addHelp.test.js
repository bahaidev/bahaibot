import {expect} from 'chai';
import addHelp from '../src/commands/addHelp.js';

describe('addHelp', function () {
  it('adds help commands and message action sends embeds with fields', function () {
    const commands = {
      foo: {
        helpInfo: {name: '!foo', value: 'foo help'},
        helpExtra: {name: '!fooextra', value: 'foo extra'},
        helpAdmin: {name: '!fooadmin', value: 'foo admin'}
      }
    };

    addHelp({commands});

    let sent;
    const message = {
      author: {username: 'TestUser'},
      channel: {
        send (payload) {
          sent = payload;
        }
      }
    };

    // call the help action which should send with fields
    commands.help.action(message);
    expect(sent).to.be.an('object');
    expect(sent.embeds).to.be.an('array');
    const embed = sent.embeds[0];
    expect(embed.fields).to.be.an('array');
    // Should include the foo helpInfo we supplied
    const names = embed.fields.map((f) => f.name || f.name);
    expect(names.some((n) => String(n).includes('!foo'))).to.equal(true);
  });

  it('helpextras slashCommand replies when in cached guild', async function () {
    const commands = {};
    addHelp({commands});

    let replied;
    const interaction = {
      inCachedGuild () { return true; },
      user: {id: 'u'},
      reply (arg) { replied = arg; }
    };

    await commands.helpextras.slashCommand(interaction);
    expect(replied).to.exist;
  });

  it('helpadmin slashCommand does not reply when not in cached guild', async function () {
    const commands = {};
    addHelp({commands});

    let replied = false;
    const interaction = {
      inCachedGuild () { return false; },
      user: {id: 'u'},
      reply () { replied = true; }
    };

    await commands.helpadmin.slashCommand(interaction);
    expect(replied).to.equal(false);
  });
});
