/* eslint-disable no-console -- Testing console */
import {createSandbox} from 'sinon';
import MockDiscord from './helpers/MockDiscord.js';

import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

import spyOnGetterResults from './helpers/spyOnGetterResults.js';

import mockDate from './helpers/mockDate.js';

const sufficientDelay = 800;

describe('ready event', function () {
  const _Date = Date;
  beforeEach(function () {
    this.sinon = createSandbox();
    this.sinon.spyOnGetterResults = spyOnGetterResults;
  });
  afterEach(function () {
    global.Date = _Date;
    this.sinon.restore();
  });

  it('ready event logs', async function () {
    const discord = new MockDiscord();
    const {client} = await bot({client: discord.getClient()});
    this.sinon.spy(console, 'log');
    client.emit('ready');
    expect(console.log.calledOnce).to.be.true;
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
    const timeout = this.sinon.stub(global, 'setTimeout').value(
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
          id: DiscordConstants.BAHAI_FYI_GUILD_ID
        }
      ]
    });

    global.Date = mockDate({
      /**
       * @returns {Integer}
       */
      now: () => simulatedTimestamp
    });

    this.sinon.spy(console, 'log');

    const {client} = await bot({
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });
    client.user = discord.getUser();
    client.emit('ready');

    // eslint-disable-next-line promise/avoid-new -- Impose delay
    return new Promise((resolve, reject) => {
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

        expect(console.log.calledWith(
          "Checking in on Bahá'í Lab."
        )).to.be.true;

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
    const timeout = this.sinon.stub(global, 'setTimeout').value(
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

    global.Date = mockDate({
      /**
       * @returns {Integer}
       */
      now: () => simulatedTimestamp
    });

    this.sinon.spy(console, 'log');

    const {client} = await bot({
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });
    client.user = discord.getUser();
    client.emit('ready');

    // eslint-disable-next-line promise/avoid-new -- Impose delay
    return new Promise((resolve, reject) => {
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
