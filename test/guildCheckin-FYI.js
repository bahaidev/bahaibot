/* eslint-disable no-console -- Testing console */
import * as fs from 'fs/promises';
import {expect} from 'chai';
import {createSandbox} from 'sinon';

import MockDiscord from './helpers/MockDiscord.js';
import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

import spyOnGetterResults from './helpers/spyOnGetterResults.js';
import jsonClone from './helpers/jsonClone.js';
import {greets} from '../src/messages/messages.js';

import {i18n, setFetch} from 'intl-dom';
import fileFetch from 'file-fetch'; // For `intl-dom`
// Needed by intl-dom
setFetch(fileFetch);

const _ = await i18n({
  localesBasePath: 'src',
  locales: ['en_US']
});
/** @type {import('../src/discordBot.js').Settings} */
const settings = {
  PROJECT_JSON: ''
};

/**
 * @type {import('../src/bot.js').GetLocalizedSetting}
 */
const getLocalizedSetting = (key, {defaultValue} = {}) => {
  /* c8 ignore next --- Not used? */
  return settings?.locales?.[_.resolvedLocale][key] ||
    defaultValue || _(key);
};

/** @type {import('../src/discordBot.js').Settings['checkinGuilds']} */
const checkinGuilds = [
  {
    guildID: DiscordConstants.BAHAI_LAB_GUILD_ID,
    guildName: /** @type {string} */ (getLocalizedSetting('labServerName')),
    guildChannels: [
      {
        id: DiscordConstants.BAHAI_LAB_BOT_TESTING_CHANNEL_ID,
        greetings: /** @type {string} */ (getLocalizedSetting('debugCheckin', {
          defaultValue: greets.debugCheckin
        })),
        reportUptime: true
      }
    ]
  },
  {
    guildID: DiscordConstants.BAHAI_FYI_GUILD_ID,
    guildName: /** @type {string} */ (getLocalizedSetting('serverName')),
    guildChannels: [
      {
        id: DiscordConstants.BAHAI_FYI_GENERAL_CHANNEL_ID,
        greetings: /** @type {string} */ (
          getLocalizedSetting('fyiCheckin-general', {
            defaultValue: greets.fyiCheckin.general
          })
        )
      },
      {
        id: DiscordConstants.BAHAI_FYI_STUDY_HALL_CHANNEL_ID,
        bpToday: true
      }
    ]
  },
  {
    guildID: DiscordConstants.BAHAI_WIKIS_GUILD_ID,
    guildName: "Bahá'í Wikis",
    guildChannels: [
      {
        id: DiscordConstants.BAHAI_WIKIS_GENERAL_CHANNEL_ID,
        greetings: /** @type {string} */ (
          getLocalizedSetting('bahaiWikisCheckin-general', {
            defaultValue: greets.fyiCheckin.general
          })
        )
      }
    ]
  }
];
settings.checkinGuilds = checkinGuilds;

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

describe('guildCheckin (FYI)', () => {
  beforeEach(function () {
    this.sinon = createSandbox();
    // @ts-ignore We want it here
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
        // @ts-expect-error Deliberately missing ID
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
      getSettings: () => settings,
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });

    this.sinon.spy(console, 'log');

    await guildCheckin();

    // @ts-expect-error Sinon
    expect(console.log.calledWith(
      "Checking in on Bahá'í.FYI."
    )).to.be.false;
  });

  it('silently fails if no testing channel', async function () {
    await fs.writeFile('greet.guild.txt', '');
    const opts = /** @type {discordOptions} */ (jsonClone(discordOptions));

    // Remove #general (FYI) and #study-hall
    opts.guilds[0].channels = [];

    const discord = new MockDiscord(
      /** @type {import('./helpers/MockDiscord.js').MockDiscordOptions} */ (
        opts
      )
    );

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
      getSettings: () => settings,
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
      DiscordConstants.BAHAI_FYI_STUDY_HALL_CHANNEL_ID
    );

    // This returns a `TextChannel` and `toString` gives:
    expect(guildChannelsGetterSpy.returnValues[0]).to.be.undefined;
    expect(guildChannelsGetterSpy.returnValues[1]).to.be.undefined;
    expect(guildChannelsGetterSpy.returnValues[2]).to.be.undefined;
  });

  it('logs if log file is present', async function () {
    await fs.writeFile('greet.guild.txt', '');
    const discord = new MockDiscord(
      /** @type {import('./helpers/MockDiscord.js').MockDiscordOptions} */ (
        discordOptions
      )
    );

    const client = discord.getClient();

    const {guildCheckin} = await bot({
      getSettings: () => settings,
      checkins: true,
      exitNoThrow: true,
      client
    });

    this.sinon.spy(console, 'log');
    await guildCheckin();

    // @ts-expect-error Sinon
    expect(console.log.firstCall.firstArg).to.have.string(
      "Checking in on Bahá'í.FYI."
    );
    // @ts-expect-error Sinon
    expect(console.log.secondCall.firstArg).to.have.string(
      'Last greeting to #general and #study-hall'
    );

    // @ts-expect-error Sinon
    expect(console.log.thirdCall.firstArg).to.have.string(
      "Bahá'í.FYI #general found"
    );
    // @ts-expect-error Sinon
    expect(console.log.getCall(3).firstArg).to.have.string(
      "Bahá'í.FYI #study-hall found"
    );

    // @ts-expect-error Sinon
    expect(console.log.getCall(4).firstArg).to.have.string(
      'Query completed, posting Today in History.'
    );

    // @ts-expect-error Sinon
    expect(console.log.getCall(5).firstArg).to.have.string(
      'Greeting sent to #general and #study-hall.'
    );
  });

  it('recovers if logging file is not present', async function () {
    try {
      await fs.unlink('greet.guild.txt');
    } catch (err) {}

    const discord = new MockDiscord(
      /** @type {import('./helpers/MockDiscord.js').MockDiscordOptions} */ (
        discordOptions
      )
    );

    const client = discord.getClient();

    const {guildCheckin} = await bot({
      getSettings: () => settings,
      checkins: true,
      exitNoThrow: true,
      client
    });

    this.sinon.spy(console, 'log');
    await guildCheckin();

    // @ts-expect-error Sinon
    expect(console.log.secondCall.firstArg).to.equal(
      'First greet for #general and #study-hall'
    );

    // @ts-expect-error Sinon
    expect(console.log.thirdCall.firstArg).to.have.string(
      "Bahá'í.FYI #general found"
    );
  });

  it('Sends checking in message', async function () {
    const discord = new MockDiscord(
      /** @type {import('./helpers/MockDiscord.js').MockDiscordOptions} */ (
        discordOptions
      )
    );

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
      getSettings: () => settings,
      checkins: true,
      exitNoThrow: true,
      client
    });
    await guildCheckin();

    const {
      get: {
        simpleSpy: guildChannelsGetterSpy,
        childSpies: [
          guildChannelsGetResultSendSpy, guildChannelsGetResultSendSpy2
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
      'BAHAI_FYI_STUDY_HALL_CHANNEL_ID'
    ].forEach((constant, idx) => {
      /* eslint-disable import/namespace -- Safe */
      expect(guildChannelsGetterSpy.getCall(idx).firstArg).to.equal(
        DiscordConstants[/** @type {keyof DiscordConstants} */ (constant)]
      );

      const channelStringified = `<#${
        DiscordConstants[/** @type {keyof DiscordConstants} */ (constant)]
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

    expect(guildChannelsGetResultSendSpy2.firstCall.firstArg.content).to.equal(
      'Here is the result of your query.'
    );

    expect(
      guildChannelsGetResultSendSpy2.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      "Here's Bahaipedia's Today in History entry for"
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );

    // @ts-expect-error Sinon
    expect(console.log.calledWith(
      'Greeting sent to #general and #study-hall.'
    )).to.be.true;
  });

  it(
    'Reports error if write file fails',
    async function () {
      const discord = new MockDiscord(
        /** @type {import('./helpers/MockDiscord.js').MockDiscordOptions} */ (
          discordOptions
        )
      );

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
      // this.sinon.stub(Number.prototype, 'toString').value(() => {
      //   throw new Error('Simulated problem writing');
      // });
      const {toString: toStr} = Number.prototype;
      // eslint-disable-next-line no-extend-native -- Needed to spy
      Number.prototype.toString = function () {
        if (!new Error('error').stack?.includes('file-fetch')) {
          // eslint-disable-next-line @stylistic/max-len -- Long
          // eslint-disable-next-line no-extend-native -- Needed to finish spying
          Number.prototype.toString = toStr;
          throw new Error('Simulated problem writing');
        }
        return toStr.call(this);
      };

      const {guildCheckin} = await bot({
        getSettings: () => settings,
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

      // @ts-expect-error Sinon
      expect(console.log.calledWith(
        'Greeting sent to #general, #irc-bridge, #study-hall.'
      )).to.be.false;

      // @ts-expect-error Sinon
      expect(console.error.calledWith(
        'Error writing greet.guild.txt file'
      )).to.be.true;

      [
        'BAHAI_FYI_GENERAL_CHANNEL_ID',
        'BAHAI_FYI_STUDY_HALL_CHANNEL_ID'
      ].forEach((constant, idx) => {
        /* eslint-disable import/namespace -- Safe */
        expect(guildChannelsGetterSpy.getCall(idx).firstArg).to.equal(
          DiscordConstants[/** @type {keyof DiscordConstants} */ (constant)]
        );

        const channelStringified = `<#${
          DiscordConstants[/** @type {keyof DiscordConstants} */ (constant)]
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
          name: 'test',
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
      getSettings: () => settings,
      checkins: true,
      exitNoThrow: true,
      client: discord.getClient()
    });

    this.sinon.spy(console, 'log');

    await guildCheckin();

    // @ts-expect-error Sinon
    expect(console.log.calledWith(
      "Checking in on Bahá'í.FYI."
    )).to.be.true;
  });
});
