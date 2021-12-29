/* eslint-disable no-console -- Testing console */
import * as fs from 'fs/promises';

import {createSandbox} from 'sinon';

import MockDiscord from './helpers/MockDiscord.js';
import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

import spyOnGetterResults from './helpers/spyOnGetterResults.js';

const discordOptions = {
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
};

describe('guildCheckin (Lab)', function () {
  beforeEach(function () {
    this.sinon = createSandbox();
    this.sinon.spyOnGetterResults = spyOnGetterResults;
  });
  afterEach(function () {
    // Restore the default sandbox here
    this.sinon.restore();
  });

  it('silently fails if guild ID not available', async function () {
    const discord = new MockDiscord({
      guildChannels: true,
      guilds: [
        {
          name: "Bahá'í Lab",
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
              name: 'awesome',
              id: DiscordConstants.AWESOME_EMOJI_ID_FYI
            }
          ]
        }
      ]
    });
    const {
      guildCheckin
    } = await bot({
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });

    this.sinon.spy(console, 'log');

    await guildCheckin();

    expect(console.log.calledWith(
      "Checking in on Bahá'í Lab #bot-testing."
    )).to.be.false;
  });

  it('silently fails if no testing channel', async function () {
    const discord = new MockDiscord({
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_LAB_GUILD_ID,
          channels: [
            {
              id: 'some-other-id',
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

    const client = discord.getClient();

    const clientGuildsCacheGetSpy = this.sinon.spy(
      client.guilds.cache, 'get'
    );

    const guild = discord.clientGuild;

    const guildChannelsCache = this.sinon.spyOnGetterResults(
      guild, 'channels.cache', {
        get: {
          simpleSpy: true
        }
      }
    );

    const {guildCheckin} = await bot({
      checkins: true,
      exitNoThrow: true,
      client
    });
    await guildCheckin();

    const {
      get: {
        simpleSpy: guildChannelsGetterSpy
      }
    } = guildChannelsCache;

    expect(
      clientGuildsCacheGetSpy.firstCall.firstArg
    ).to.equal(DiscordConstants.BAHAI_LAB_GUILD_ID);

    expect(guildChannelsGetterSpy.firstCall.firstArg).to.equal(
      DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID
    );

    // This returns a `TextChannel` and `toString` gives:
    expect(guildChannelsGetterSpy.returnValues[0]).to.be.undefined;
  });

  it('logs if log file is present', async function () {
    await fs.writeFile('greet.guild.txt', '');

    const discord = new MockDiscord(discordOptions);

    const client = discord.getClient();
    const {guildCheckin} = await bot({
      checkins: true,
      exitNoThrow: true,
      client
    });

    this.sinon.spy(console, 'log');
    await guildCheckin();

    expect(console.log.secondCall.firstArg).to.have.string(
      'Last greeting to #bot-testing'
    );
  });

  it('recovers if logging file is not present', async function () {
    try {
      await fs.unlink('greet.guild.txt');
    } catch (err) {}

    const discord = new MockDiscord(discordOptions);

    const client = discord.getClient();
    const {guildCheckin} = await bot({
      checkins: true,
      exitNoThrow: true,
      client
    });

    this.sinon.spy(console, 'log');
    await guildCheckin();

    expect(console.log.secondCall.firstArg).to.equal(
      'First greet for #bot-testing'
    );
  });

  it('Sends checking in message', async function () {
    const discord = new MockDiscord(discordOptions);

    const client = discord.getClient();

    const clientGuildsCacheGetSpy = this.sinon.spy(
      client.guilds.cache, 'get'
    );

    const guild = discord.clientGuild;

    const guildChannelsCache = this.sinon.spyOnGetterResults(
      guild, 'channels.cache', {
        get: {
          simpleSpy: true,
          childSpies: ['send']
        }
      }
    );

    this.sinon.spy(console, 'log');

    const {guildCheckin} = await bot({
      checkins: true,
      exitNoThrow: true,
      client
    });
    await guildCheckin();

    const {
      get: {
        simpleSpy: guildChannelsGetterSpy,
        childSpies: [guildChannelsGetResultSendSpy]
      }
    } = guildChannelsCache;

    expect(
      clientGuildsCacheGetSpy.firstCall.firstArg
    ).to.equal(DiscordConstants.BAHAI_LAB_GUILD_ID);

    expect(guildChannelsGetResultSendSpy.firstCall.firstArg).to.match(
      /just checking in/u
    );

    expect(console.log.calledWith(
      'Greeting sent to #bot-testing.'
    )).to.be.true;

    expect(guildChannelsGetterSpy.firstCall.firstArg).to.equal(
      DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID
    );

    const botTesting = `<#${
      DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID
    }>`; // Shows as `#bot-testing`

    // This returns a `TextChannel` and `toString` gives:
    expect(guildChannelsGetterSpy.returnValues[0].toString()).to.equal(
      botTesting
    );
  });

  it(
    'Reports error if write file fails',
    async function () {
      const discord = new MockDiscord(discordOptions);

      const client = discord.getClient();

      const clientGuildsCacheGetSpy = this.sinon.spy(
        client.guilds.cache, 'get'
      );

      const guild = discord.clientGuild;

      const guildChannelsCache = this.sinon.spyOnGetterResults(
        guild, 'channels.cache', {
          get: {
            simpleSpy: true,
            childSpies: ['send']
          }
        }
      );

      this.sinon.spy(console, 'log');
      this.sinon.spy(console, 'error');

      // Since Sinon can't stub ESM, we err with the `toString()` to trigger
      //   coverage of the catch block
      this.sinon.stub(Number.prototype, 'toString').value(() => {
        throw new Error('Simulated problem writing');
      });

      const {guildCheckin} = await bot({
        checkins: true,
        exitNoThrow: true,
        client
      });
      await guildCheckin();

      const {
        get: {
          simpleSpy: guildChannelsGetterSpy,
          childSpies: [guildChannelsGetResultSendSpy]
        }
      } = guildChannelsCache;

      expect(
        clientGuildsCacheGetSpy.firstCall.firstArg
      ).to.equal(DiscordConstants.BAHAI_LAB_GUILD_ID);

      expect(guildChannelsGetResultSendSpy.firstCall.firstArg).to.match(
        /just checking in/u
      );

      expect(console.log.calledWith(
        'Greeting sent to #bot-testing.'
      )).to.be.false;
      expect(console.error.calledWith(
        'Error writing greet.guild.txt file'
      )).to.be.true;

      expect(guildChannelsGetterSpy.firstCall.firstArg).to.equal(
        DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID
      );

      const botTesting = `<#${
        DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID
      }>`; // Shows as `#bot-testing`

      // This returns a `TextChannel` and `toString` gives:
      expect(guildChannelsGetterSpy.returnValues[0].toString()).to.equal(
        botTesting
      );
    }
  );

  it('logs', async function () {
    const discord = new MockDiscord(discordOptions);
    const {
      guildCheckin
    } = await bot({
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });

    this.sinon.spy(console, 'log');

    await guildCheckin();

    console.log('console.log', console.log.getCalls());

    expect(console.log.calledWith(
      "Checking in on Bahá'í Lab."
    )).to.be.true;
  });
});
