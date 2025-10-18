/* eslint-disable no-console -- Testing console */
import * as fs from 'fs/promises';
import {expect} from 'chai';
import {createSandbox} from 'sinon';

import MockDiscord from './helpers/MockDiscord.js';
import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

import spyOnGetterResults from './helpers/spyOnGetterResults.js';
import jsonClone from './helpers/jsonClone.js';

const discordOptions = {
  guildChannels: true,
  guilds: [
    {
      id: DiscordConstants.BAHAI_FYI_GUILD_ID,
      channels: [
        {
          id: DiscordConstants.BAHAI_FYI_GENERAL_CHANNEL_ID,
          name: 'general'
        },
        {
          id: DiscordConstants.BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID,
          name: 'irc-bridge'
        },
        {
          id: DiscordConstants.BAHAI_FYI_STUDY_HALL_CHANNEL_ID,
          name: 'study-hall'
        }
      ],
      emojis: [
        {
          name: 'awesome'
        },
        {
          id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
          name: 'bstar'
        }
      ]
    }
  ]
};

describe('guildCheckin (FYI)', function () {
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
          name: "Bahá'í FYI",
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
              emojiID: DiscordConstants.AWESOME_EMOJI_ID_FYI
            }
          ]
        }
      ]
    });
    const {guildCheckin} = await bot({
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });

    this.sinon.spy(console, 'log');

    await guildCheckin();

    expect(console.log.calledWith(
      "Checking in on Bahá'í.FYI."
    )).to.be.false;
  });

  it('silently fails if no testing channel', async function () {
    await fs.writeFile('greet.guild.txt', '');
    const opts = jsonClone(discordOptions);

    // Remove #general, #irc-bridge, #study-hall
    opts.guilds[0].channels = [];

    const discord = new MockDiscord(opts);

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

    expect(
      clientGuildsCacheGetSpy.secondCall.firstArg
    ).to.equal(DiscordConstants.BAHAI_FYI_GUILD_ID);

    expect(guildChannelsGetterSpy.firstCall.firstArg).to.equal(
      DiscordConstants.BAHAI_FYI_GENERAL_CHANNEL_ID
    );

    expect(guildChannelsGetterSpy.secondCall.firstArg).to.equal(
      DiscordConstants.BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID
    );

    expect(guildChannelsGetterSpy.thirdCall.firstArg).to.equal(
      DiscordConstants.BAHAI_FYI_STUDY_HALL_CHANNEL_ID
    );

    // This returns a `TextChannel` and `toString` gives:
    expect(guildChannelsGetterSpy.returnValues[0]).to.be.undefined;
    expect(guildChannelsGetterSpy.returnValues[1]).to.be.undefined;
    expect(guildChannelsGetterSpy.returnValues[2]).to.be.undefined;
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

    expect(console.log.firstCall.firstArg).to.have.string(
      "Checking in on Bahá'í.FYI."
    );
    expect(console.log.secondCall.firstArg).to.have.string(
      'Last greeting to #general, #irc-bridge, and #study-hall'
    );

    expect(console.log.thirdCall.firstArg).to.have.string(
      "Bahá'í.FYI #general found"
    );
    expect(console.log.getCall(3).firstArg).to.have.string(
      "Bahá'í.FYI #irc-bridge found"
    );
    expect(console.log.getCall(4).firstArg).to.have.string(
      "Bahá'í.FYI #study-hall found"
    );

    expect(console.log.getCall(5).firstArg).to.have.string(
      'Query completed, posting Today in History.'
    );

    expect(console.log.getCall(6).firstArg).to.have.string(
      'Greeting sent to #general, #irc-bridge, and #study-hall.'
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
      'First greet for #general, #irc-bridge, and #study-hall'
    );

    expect(console.log.thirdCall.firstArg).to.have.string(
      "Bahá'í.FYI #general found"
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
        childSpies: [
          guildChannelsGetResultSendSpy, guildChannelsGetResultSendSpy2,
          guildChannelsGetResultSendSpy3
        ]
      }
    } = guildChannelsCache;

    expect(
      clientGuildsCacheGetSpy.firstCall.firstArg
    ).to.equal(DiscordConstants.BAHAI_LAB_GUILD_ID);

    expect(
      clientGuildsCacheGetSpy.secondCall.firstArg
    ).to.equal(DiscordConstants.BAHAI_FYI_GUILD_ID);

    [
      'BAHAI_FYI_GENERAL_CHANNEL_ID',
      'BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID',
      'BAHAI_FYI_STUDY_HALL_CHANNEL_ID'
    ].forEach((constant, idx) => {
      /* eslint-disable import/namespace -- Safe */
      expect(guildChannelsGetterSpy.getCall(idx).firstArg).to.equal(
        DiscordConstants[constant]
      );

      const channelStringified = `<#${
        DiscordConstants[constant]
      }>`; // Shows, e.g., as `#general`
      /* eslint-enable import/namespace -- Safe */

      // This returns a `TextChannel` and `toString` gives:
      expect(guildChannelsGetterSpy.returnValues[idx].toString()).to.equal(
        channelStringified
      );
    });

    expect(guildChannelsGetResultSendSpy.firstCall.firstArg).to.match(
      /everyone|everybody|Alláh|cooking/v
    );

    expect(guildChannelsGetResultSendSpy2.firstCall.firstArg).to.match(
      /Hello|everyone|everybody|Alláh|cooking/v
    );

    expect(guildChannelsGetResultSendSpy3.firstCall.firstArg.content).to.equal(
      'Here is the result of your query.'
    );

    expect(
      guildChannelsGetResultSendSpy3.firstCall.firstArg.embed.description
    ).to.have.string(
      "Here's Bahaipedia's Today in History entry for"
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );

    expect(console.log.calledWith(
      'Greeting sent to #general, #irc-bridge, and #study-hall.'
    )).to.be.true;
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
            simpleSpy: true
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
          simpleSpy: guildChannelsGetterSpy
        }
      } = guildChannelsCache;

      expect(
        clientGuildsCacheGetSpy.firstCall.firstArg
      ).to.equal(DiscordConstants.BAHAI_LAB_GUILD_ID);

      expect(
        clientGuildsCacheGetSpy.secondCall.firstArg
      ).to.equal(DiscordConstants.BAHAI_FYI_GUILD_ID);

      expect(console.log.calledWith(
        'Greeting sent to #general, #irc-bridge, #study-hall.'
      )).to.be.false;

      expect(console.error.calledWith(
        'Error writing greet.guild.txt file'
      )).to.be.true;

      [
        'BAHAI_FYI_GENERAL_CHANNEL_ID',
        'BAHAI_FYI_IRC_BRIDGE_CHANNEL_ID',
        'BAHAI_FYI_STUDY_HALL_CHANNEL_ID'
      ].forEach((constant, idx) => {
        /* eslint-disable import/namespace -- Safe */
        expect(guildChannelsGetterSpy.getCall(idx).firstArg).to.equal(
          DiscordConstants[constant]
        );

        const channelStringified = `<#${
          DiscordConstants[constant]
        }>`; // Shows, e.g., as `#general`
        /* eslint-enable import/namespace -- Safe */

        // This returns a `TextChannel` and `toString` gives:
        expect(guildChannelsGetterSpy.returnValues[idx].toString()).to.equal(
          channelStringified
        );
      });
    }
  );

  it('logs', async function () {
    const discord = new MockDiscord({
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          channels: [
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
    const {guildCheckin} = await bot({
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });

    this.sinon.spy(console, 'log');

    await guildCheckin();

    expect(console.log.calledWith(
      "Checking in on Bahá'í.FYI."
    )).to.be.true;
  });
});
