/* eslint-disable no-console -- Testing console */

// eslint-disable-next-line no-shadow -- Ok
import {setTimeout} from 'node:timers/promises';
import {expect} from 'chai';
import {createSandbox} from 'sinon';

import MockDiscord from './helpers/MockDiscord.js';
import commandFinished from './helpers/commandFinished.js';

import bot from '../src/discordBot.js';

import * as DiscordConstants from '../src/messages/DiscordConstants.js';

describe('Client event (message)', function () {
  beforeEach(function () {
    this.sinon = createSandbox();
  });
  afterEach(function () {
    this.sinon.restore();
  });

  it(
    'Ignores message if Bot not mentioned and not matched otherwise',
    async function () {
      const discord = new MockDiscord();

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();
      // console.log('message', message);
      client.emit('messageCreate', message);

      this.sinon.spy(console, 'log');

      // @ts-expect-error Sinon
      expect(console.log.firstCall).to.equal(null);
    }
  );

  it(
    'Passes message if Bot is messaged and defaulting to use router',
    async function () {
      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: "What is the Baha'i Faith?"
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      // console.log('message', message);
      client.emit('messageCreate', message);

      this.sinon.spy(console, 'log');

      await commandFinished(client);

      // @ts-expect-error Sinon
      expect(message.channel.send.firstCall.firstArg).to.have.string(
        "The Bahá'í Faith is an independent world religion"
      );
      // @ts-expect-error Sinon
      expect(console.log.calledWith(
        'Router response:'
      )).to.be.true;
    }
  );

  it(
    'Passes message if Bot is messaged, stripping initial Bot ID, and ' +
    'defaulting to use router',
    async function () {
      const discord = new MockDiscord({
        userID: DiscordConstants.BAHAI_DEV_BOT_ID,
        mentionEveryone: true,
        messageContent: `<@${DiscordConstants.BAHAI_DEV_BOT_ID}> What ` +
          "is the Baha'i Faith?"
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      // console.log('message', message);
      client.emit('messageCreate', message);

      this.sinon.spy(console, 'log');

      await commandFinished(client);
      // @ts-expect-error Sinon
      expect(message.channel.send.firstCall.firstArg).to.have.string(
        "The Bahá'í Faith is an independent world religion"
      );
      // @ts-expect-error Sinon
      expect(console.log.calledWith(
        'Router response:'
      )).to.be.true;
    }
  );

  it(
    'Passes message if Bot is messaged, converting initial user who is ' +
    'not the current Bot to name, and defaulting to use router',
    async function () {
      const discord = new MockDiscord({
        userID: DiscordConstants.BAHAI_DEV_BOT_ID,
        mentionEveryone: true,
        messageContent: `<@${DiscordConstants.BAHAI_BOT_ID}> Who am I?`
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      const user = {
        id: DiscordConstants.BAHAI_BOT_ID,
        username: 'Other BahaiBot'
      };

      // @ts-expect-error Only a few properties needed
      client.users.cache.set(user.id, user);

      // console.log('message', message);
      client.emit('messageCreate', message);

      this.sinon.spy(console, 'log');

      await commandFinished(client);

      // @ts-expect-error Sinon
      expect(message.channel.send.firstCall.firstArg).to.match(
        /understand your question|know enough to answer/v
      );
      // @ts-expect-error Sinon
      expect(console.log.calledWith(
        'Router response:'
      )).to.be.true;
    }
  );

  it(
    'Passes message if Bot is messaged, converting non-initial user to ' +
    'name, and defaulting to use router',
    async function () {
      const discord = new MockDiscord({
        userID: DiscordConstants.BAHAI_DEV_BOT_ID,
        mentionEveryone: true,
        messageContent: `<@${DiscordConstants.BAHAI_DEV_BOT_ID}> Who is ` +
          `<@!${DiscordConstants.BAHAI_BOT_ID}>?`
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      const user = {
        id: DiscordConstants.BAHAI_BOT_ID,
        username: 'Other BahaiBot'
      };

      // @ts-expect-error Only a few properties needed
      client.users.cache.set(user.id, user);

      // console.log('message', message);
      client.emit('messageCreate', message);

      this.sinon.spy(console, 'log');

      await commandFinished(client);
      // @ts-expect-error Sinon
      expect(message.channel.send.firstCall.firstArg).to.match(
        /understand your question|know enough to answer/v
      );
      // @ts-expect-error Sinon
      expect(console.log.calledWith(
        'Router response:'
      )).to.be.true;
    }
  );

  it(
    'Falls back to help message if command not recognized',
    async function () {
      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: 'where am I?'
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      // console.log('message', message);
      client.emit('messageCreate', message);

      this.sinon.spy(console, 'log');

      await commandFinished(client);

      // @ts-expect-error Sinon
      expect(message.channel.send.firstCall.firstArg).to.match(
        /understand your question|know enough to answer/v
      );
      // @ts-expect-error Sinon
      expect(console.log.calledWith(
        'Router response:'
      )).to.be.true;
    }
  );

  it(
    'Passes coffee command (`notMentioned` without a check)',
    async function () {
      const discord = new MockDiscord({
        messageContent: '☕'
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message, 'react');

      // console.log('message', message);
      client.emit('messageCreate', message);

      // @ts-expect-error Sinon
      expect(message.react.firstCall.firstArg).to.equal('☕');
    }
  );

  it.skip(
    'Passes bracketed syntax command (`notMentioned` without a check)',
    async function () {
      const discord = new MockDiscord({
        messageContent: 'Here is a bracketed link: [[God]].'
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message, 'react');

      // console.log('message', message);
      client.emit('messageCreate', message);

      await setTimeout();
      // @ts-expect-error Sinon
      expect(message.react.firstCall.firstArg).to.equal('☕');
    }
  );

  it("Does not continue if a command's check fails", async function () {
    const discord = new MockDiscord({
      messageContent: 'welcome'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message, 'react');

    // console.log('message', message);
    client.emit('messageCreate', message);

    // @ts-expect-error Sinon
    expect(message.react.firstCall).to.equal(null);
  });

  it('Reports errors with badly formed message', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const channelSpy = this.sinon.spy();

    const message = /** @type {import('discord.js').Message<true>} */ (
      /** @type {unknown} */ ({
        content: '',
        author: {
          id: 'abc'
        },
        mentions: {
          /**
           * @returns {boolean}
           */
          has () {
            return true;
          }
        },
        channel: {
          send: channelSpy
        }
      })
    );

    // console.log('message', message);
    client.emit('messageCreate', message);

    this.sinon.spy(console, 'error');

    await commandFinished(client);
    expect(channelSpy.firstCall.firstArg).to.have.string(
      "<@abc>, I couldn't process your question at the moment."
    );
    // @ts-expect-error Sinon
    expect(console.error.firstCall.firstArg).to.equal(
      'Error executing command with message'
    );
    // @ts-expect-error Sinon
    expect(console.error.secondCall.lastArg.message).to.have.string(
      'Input text not set'
    );
  });
});
