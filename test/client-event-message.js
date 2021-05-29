/* eslint-disable no-console -- Testing console */
import sinon from 'sinon';

import MockDiscord from './helpers/MockDiscord.js';

import bot from '../src/discordBot.js';

describe('Client event (message)', function () {
  beforeEach(function () {
    this.sinon = sinon.createSandbox();
  });
  afterEach(function () {
    this.sinon.restore();
  });

  it(
    'Ignores message if Bot not mentioned and not matched otherwise',
    async function () {
      const discord = new MockDiscord();

      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();
      // console.log('message', message);
      client.emit('message', message);

      this.sinon.spy(console, 'log');

      // eslint-disable-next-line promise/avoid-new -- Delay test
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(console.log.firstCall).to.equal(null);
          resolve();
        });
      });
    }
  );

  it(
    'Passes message if Bot is messaged and defaulting to use router',
    async function () {
      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: "What is the Baha'i Faith?"
      });

      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      // console.log('message', message);
      client.emit('message', message);

      this.sinon.spy(console, 'log');

      // eslint-disable-next-line promise/avoid-new -- Delay test
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(message.channel.send.firstCall.firstArg).to.have.string(
            "The Bahá'í Faith is an independent world religion"
          );
          expect(console.log.calledWith(
            'Router response:'
          )).to.be.true;
          resolve();
        }, 5000);
      });
    }
  );

  it(
    'Falls back to help message if command not recognized',
    async function () {
      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: 'where am I?'
      });

      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      // console.log('message', message);
      client.emit('message', message);

      this.sinon.spy(console, 'log');

      // eslint-disable-next-line promise/avoid-new -- Delay test
      return new Promise((resolve) => {
        setTimeout(() => {
          expect(message.channel.send.firstCall.firstArg).to.have.string(
            "Sorry I don't understand your question"
          );
          expect(console.log.calledWith(
            'Router response:'
          )).to.be.true;
          resolve();
        }, 5000);
      });
    }
  );

  it(
    'Passes coffee command (`notMentioned` without a check)',
    async function () {
      const discord = new MockDiscord({
        messageContent: '☕'
      });

      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message, 'react');

      // console.log('message', message);
      client.emit('message', message);

      expect(message.react.firstCall.firstArg).to.equal('☕');
    }
  );

  it("Does not continue if a command's check fails", async function () {
    const discord = new MockDiscord({
      messageContent: 'welcome'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message, 'react');

    // console.log('message', message);
    client.emit('message', message);

    expect(message.react.firstCall).to.equal(null);
  });

  it('Reports errors with badly formed message', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true
    });

    const {client} = await bot({client: discord.getClient()});

    const channelSpy = this.sinon.spy();

    const message = {
      content: '',
      author: {
        // No ID
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
    };

    // console.log('message', message);
    client.emit('message', message);

    this.sinon.spy(console, 'error');

    // eslint-disable-next-line promise/avoid-new -- Delay test
    return new Promise((resolve) => {
      setTimeout(() => {
        expect(channelSpy.firstCall.firstArg).to.have.string(
          "<@undefined>, I couldn't process your question at the moment."
        );
        expect(console.error.firstCall.firstArg.message).to.have.string(
          'Wrong response status code'
        );
        resolve();
      }, 5000);
    });
  });
});
