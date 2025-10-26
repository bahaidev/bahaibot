/* eslint-disable no-console -- Testing console */
// eslint-disable-next-line no-shadow -- Ok
import {setTimeout} from 'node:timers/promises';

import {expect} from 'chai';
import {createSandbox} from 'sinon';
import MockDiscord from './helpers/MockDiscord.js';

import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

import spyOnGetterResults from './helpers/spyOnGetterResults.js';

import mockDate from './helpers/mockDate.js';

const sufficientDelay = 800;

describe('ready event', () => {
  const _Date = Date;
  beforeEach(function () {
    this.sinon = createSandbox();
    // @ts-ignore We want to add it
    this.sinon.spyOnGetterResults = spyOnGetterResults;
  });
  afterEach(function () {
    globalThis.Date = _Date;
    this.sinon.restore();
  });

  it('ready event logs', async function () {
    const discord = new MockDiscord();
    const {client} = await bot({client: discord.getClient()});
    this.sinon.spy(console, 'log');
    // @ts-expect-error Bug?
    client.emit('clientReady');

    await setTimeout();
    // @ts-expect-error Sinon
    expect(console.log.calledTwice).to.be.true;
    // @ts-expect-error Sinon
    expect(console.log.calledWith("The Bahá'í Bot Online!")).to.be.true;
    // @ts-expect-error Sinon
    expect(console.log.secondCall.firstArg).to.equal(
      'No application commands found'
    );
  });

  it('ready event registers commands', async function () {
    const discord = new MockDiscord();
    const {client} = await bot({client: discord.getClient()});

    let fetched = false;
    /** @type {string[]} */
    const names = [];
    /** @type {string[]} */
    const editDescriptions = [];
    client.application = {
      commands: {
        // @ts-expect-error Just mocking what we need
        cache: {
          // @ts-expect-error Just mocking what we need
          find (cmd) {
            return cmd({
              name: 'read'
            });
          }
        },
        // @ts-expect-error Just mocking what we need
        create ({name}) {
          names.push(name);
        },
        // @ts-expect-error Just mocking what we need
        edit (id, {description}) {
          editDescriptions.push(description);
        },
        // @ts-expect-error Just mocking what we need
        fetch () {
          fetched = true;
        }
      }
    };

    this.sinon.spy(console, 'log');
    // @ts-expect-error Bug?
    client.emit('clientReady');

    await setTimeout();
    expect(fetched).to.equal(true);
    expect(names).to.deep.contain('users');
    expect(editDescriptions).to.deep.contain(
      "Provide a selection of the Bahá'í Writings by book and chapter"
    );
    // expect(console.log.getCalls().length).to.equal(24);
    // @ts-expect-error Sinon
    expect(console.log.calledWith("The Bahá'í Bot Online!")).to.be.true;
  });

  it('Avoids running checkin functions twice in the hour', async function () {
    const fiftyMinutesInMilliseconds = 50 * 60 * 1000;
    const fortyMinutesInMilliseconds = 40 * 60 * 1000;

    // Allow for one 50 minute offset, then a 40 minute
    let simulatedTimestamp = _Date.parse('2021-04-24T11:24:00.000Z');

    // This item on `global` is not getting logged by sinon, so we
    //  track with our own spy.
    const timeoutSpy = this.sinon.spy();
    const timeout = this.sinon.stub(globalThis, 'setTimeout').value(
      /**
       * @type {(fn: () => void, delay: number) => void}
       */
      (fn, delay) => {
        timeoutSpy(fn, delay);

        simulatedTimestamp += delay;

        if (delay === fiftyMinutesInMilliseconds) {
          timeout.wrappedMethod(fn);
          return;
        }

        // Use a higher timouet to witness the changes
        timeout.wrappedMethod(fn, 0);
      }
    );

    // Uses `Date` (if debugging), so invoke before overwriting Date
    const discord = new MockDiscord({
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_LAB_GUILD_ID,
          name: 'test',
          channels: [
            {
              id: DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID,
              name: 'bot-testing'
            },
            {
              name: 'welcome'
            }
          ],
          emojis: [
            {
              name: 'awesome'
            }
          ]
        },
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: 'test'
        }
      ]
    });

    // @ts-expect-error Just mocking what we need
    globalThis.Date = mockDate({
      /**
       * @returns {import('../src/getWikiTools.js').Integer}
       */
      now: () => simulatedTimestamp
    });

    this.sinon.spy(console, 'log');

    const {client} = await bot({
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });
    // @ts-expect-error Just need a partial mock
    client.user = discord.getUser();
    // @ts-expect-error Bug?
    client.emit('clientReady');

    // eslint-disable-next-line promise/avoid-new -- Impose delay
    return new Promise((resolve) => {
      timeout.wrappedMethod(() => {
        expect(timeoutSpy.firstCall.args[1]).to.equal(
          fiftyMinutesInMilliseconds
        );
        expect(timeoutSpy.secondCall.args[1]).to.equal(
          fortyMinutesInMilliseconds
        );
        expect(timeoutSpy.thirdCall.args[1]).to.equal(
          fiftyMinutesInMilliseconds
        );

        // @ts-expect-error Sinon
        expect(console.log.calledWith(
          "Checking in on Bahá'í Lab."
        )).to.be.true;

        // @ts-expect-error Sinon
        expect(console.log.calledWith(
          "Checking in on Bahá'í.FYI."
        )).to.be.true;

        timeout.restore();
        resolve();
      // Setting this too early causes an error with Date.
      }, sufficientDelay);
    });
  });

  it('Runs checkin functions at appropriate time', async function () {
    const fiftyMinutesInMilliseconds = 50 * 60 * 1000;

    // Allow for one 50 minute offset, then another single one
    let simulatedTimestamp = _Date.parse('2021-04-24T11:55:00.000Z');

    // This item on `global` is not getting logged by sinon, so we
    //  track with our own spy.
    const timeoutSpy = this.sinon.spy();
    const timeout = this.sinon.stub(globalThis, 'setTimeout').value(
      /**
       * @type {(fn: () => void, delay: number) => void}
       */
      (fn, delay) => {
        timeoutSpy(fn, delay);

        simulatedTimestamp += delay;

        timeout.wrappedMethod(fn, 0);
      }
    );

    // Uses `Date` (if debugging), so invoke before overwriting Date
    const discord = new MockDiscord({
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_LAB_GUILD_ID,
          name: 'test',
          channels: [
            {
              id: DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID,
              name: 'bot-testing'
            },
            {
              name: 'welcome'
            }
          ],
          emojis: [
            {
              name: 'awesome'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Just need partial mock
    globalThis.Date = mockDate({
      /**
       * @returns {import('../src/getWikiTools.js').Integer}
       */
      now: () => simulatedTimestamp
    });

    this.sinon.spy(console, 'log');

    const {client} = await bot({
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });

    // @ts-expect-error Just need partial mock
    client.user = discord.getUser();

    // @ts-expect-error Bug?
    client.emit('clientReady');

    // eslint-disable-next-line promise/avoid-new -- Impose delay
    return new Promise((resolve) => {
      timeout.wrappedMethod(() => {
        expect(timeoutSpy.firstCall.args[1]).to.equal(
          fiftyMinutesInMilliseconds
        );
        expect(timeoutSpy.secondCall.args[1]).to.equal(
          fiftyMinutesInMilliseconds
        );
        expect(timeoutSpy.thirdCall.args[1]).to.equal(
          fiftyMinutesInMilliseconds
        );

        // @ts-expect-error Sinon
        expect(console.log.calledWith(
          "Checking in on Bahá'í Lab."
        )).to.be.true;

        timeout.restore();
        resolve();
      // Setting this too early causes an error with Date.
      }, sufficientDelay);
    });
  });
});
