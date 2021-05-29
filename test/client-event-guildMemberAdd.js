import sinon from 'sinon';
import MockDiscord from './helpers/MockDiscord.js';

import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

import spyOnGetterResults from './helpers/spyOnGetterResults.js';

describe('guildMemberAdd event', function () {
  const _random = Math.random;
  beforeEach(function () {
    this.sinon = sinon.createSandbox();
    this.sinon.spyOnGetterResults = spyOnGetterResults;
  });
  afterEach(function () {
    global.Math.random = _random;
    this.sinon.restore();
  });
  it('guildMemberAdd event (non-existing channel)', async function () {
    const discord = new MockDiscord();
    const {client} = await bot({client: discord.getClient()});
    const channelsCacheFindSpy = this.sinon.spy(
      discord.getGuild().channels.cache, 'find'
    );

    client.emit('guildMemberAdd', discord.getGuildMember());
    expect(channelsCacheFindSpy.returnValues[0]).to.equal(undefined);
  });

  it('guildMemberAdd event (existing channel)', async function () {
    const discord = new MockDiscord({
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
          channels: [
            {
              id: DiscordConstants.BAHAI_FYI_RULES_CHANNEL_ID,
              name: 'rules'
            }, {
              id: DiscordConstants.BAHAI_FYI_WELCOME_CHANNEL_ID,
              name: 'welcome'
            }
          ],
          emojis: [
            {
              id: DiscordConstants.AWESOME_EMOJI_ID_FYI,
              name: 'awesome'
            }
          ]
        }
      ]
    });

    // Force calculation leading to 19th item in array being chosen
    //   which has `toString` call; apparently being called elsewhere too.
    //   (also causes 7th index in the greets array);
    //   we are not currently requiring this, but if we refactor
    //   to prevent `awesome.toString` always being called, this should
    //   be hard-coded
    /**
     * @returns {Float}
     */
    global.Math.random = () => 0.3;

    const client = discord.getClient();

    // This spy and stubbing code is necessary because spying directly on
    //   `client.emojis.cache.find` doesn't work (what we wrap here
    //   apparently becomes irrelevant as a new `cache`, if not `emojis`
    //   getter gets applied). So we instead stub `emojis` but, it is a
    //   pretty transparent stub whereby we grab the `find` result using
    //   the original `find` function. With this approach, we can spy on
    //   the value that is passed to `find` (and its return value), and
    //   also spy on the `toString` return value of the emoji result.
    const clientEmojisCache = this.sinon.spyOnGetterResults(
      client, 'emojis.cache', {
        find: {
          argSpies: [true],
          childSpies: ['toString']
        }
      }
    );

    const guild = discord.clientGuild;

    const guildChannelsCache = this.sinon.spyOnGetterResults(
      guild, 'channels.cache', {
        get: {
          simpleSpy: true,
          childSpies: ['toString']
        },
        find: {
          argSpies: [true],
          childSpies: ['send']
        }
      }
    );

    await bot({client});
    client.emit('guildMemberAdd', discord.getGuildMember());

    const {
      get: {
        simpleSpy: channelsCacheGetSpy,
        childSpies: [guildChannelsGetResultToStringSpy]
      },
      find: {
        argSpies: [[guildChannelsFinderSpy]],
        childSpies: [guildChannelsFindResultSendSpy]
      }
    } = guildChannelsCache;

    const {
      find: {
        argSpies: [[emojisFinderSpy]],
        childSpies: [emojisFindResultToStringSpy]
      }
    } = clientEmojisCache;

    // console.log('finderSpy.firstCall', finderSpy.firstCall);

    expect(emojisFinderSpy.firstCall.firstArg.name).to.equal('awesome');
    expect(emojisFinderSpy.firstCall.returnValue).to.equal(true);

    expect(emojisFindResultToStringSpy.returnValues[0]).to.equal(
      // Note that this might be AWESOME_EMOJI_ID_LAB as far as
      //   we know, but since our test supplies the ID, it should
      //   really just be important that the same one is returned
      // The full string representation for the ':awesome:' emoji,
      //   as distinct from the `:awesome:` text typed by users; can
      //   be found by pasting the emoji into backticks while in Discord
      //   or with a backslash preceding it.
      `<:awesome:${DiscordConstants.AWESOME_EMOJI_ID_FYI}>`
    );

    const hashRules = `<#${
      DiscordConstants.BAHAI_FYI_RULES_CHANNEL_ID
    }>`; // Shows as `#rules`

    expect(guildChannelsFinderSpy.secondCall.firstArg.name).to.equal(
      'welcome'
    );
    expect(guildChannelsFinderSpy.secondCall.returnValue).to.equal(true);

    expect(
      guildChannelsGetResultToStringSpy.firstCall.returnValue
    ).to.equal(
      hashRules
    );

    expect(guildChannelsFindResultSendSpy.firstCall.firstArg).to.match(
      // happy
      /(?:have you with us|could join us)/u
    ).and.to.match(
      // greet
      /(?:Hello|Hi|Hey|What's)/u
    ).and.to.have.string(
      'user-id'
    ).and.to.have.string(
      'To gain access to all channels'
    ).and.to.have.string(
      hashRules
    );

    expect(
      channelsCacheGetSpy.firstCall.firstArg
    ).to.equal(DiscordConstants.BAHAI_FYI_RULES_CHANNEL_ID);

    // This returns a `TextChannel` and `toString` gives:
    expect(channelsCacheGetSpy.returnValues[0].toString()).to.equal(
      hashRules
    );
  });

  it('guildMemberAdd event (existing channel, no emoji)', async function () {
    const discord = new MockDiscord({
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
          channels: [
            {
              id: DiscordConstants.BAHAI_FYI_RULES_CHANNEL_ID,
              name: 'rules'
            }, {
              id: DiscordConstants.BAHAI_FYI_WELCOME_CHANNEL_ID,
              name: 'welcome'
            }
          ],
          emojis: [
          ]
        }
      ]
    });

    // Force calculation leading to 19th item in array being chosen
    //   which has `toString` call; apparently being called elsewhere too.
    //   (also causes 7th index in the greets array);
    //   we are not currently requiring this, but if we refactor
    //   to prevent `awesome.toString` always being called, this should
    //   be hard-coded
    /**
     * @returns {Float}
     */
    global.Math.random = () => 0.3;

    const client = discord.getClient();

    const guild = discord.clientGuild;

    const guildChannelsCache = this.sinon.spyOnGetterResults(
      guild, 'channels.cache', {
        get: {
          simpleSpy: true,
          childSpies: ['toString']
        },
        find: {
          argSpies: [true],
          childSpies: ['send']
        }
      }
    );

    await bot({client});
    client.emit('guildMemberAdd', discord.getGuildMember());

    const {
      get: {
        simpleSpy: channelsCacheGetSpy,
        childSpies: [guildChannelsGetResultToStringSpy]
      },
      find: {
        argSpies: [[guildChannelsFinderSpy]],
        childSpies: [guildChannelsFindResultSendSpy]
      }
    } = guildChannelsCache;

    // console.log('finderSpy.firstCall', finderSpy.firstCall);

    const hashRules = `<#${
      DiscordConstants.BAHAI_FYI_RULES_CHANNEL_ID
    }>`; // Shows as `#rules`

    expect(guildChannelsFinderSpy.secondCall.firstArg.name).to.equal(
      'welcome'
    );
    expect(guildChannelsFinderSpy.secondCall.returnValue).to.equal(true);

    expect(
      guildChannelsGetResultToStringSpy.firstCall.returnValue
    ).to.equal(
      hashRules
    );

    expect(guildChannelsFindResultSendSpy.firstCall.firstArg).to.match(
      // happy
      /(?:have you with us|could join us)/u
    ).and.to.match(
      // greet
      /(?:Hello|Hi|Hey|What's)/u
    ).and.to.have.string(
      'user-id'
    ).and.to.have.string(
      'To gain access to all channels'
    ).and.to.have.string(
      hashRules
    ).and.to.have.string(
      ':smile:'
    );

    expect(
      channelsCacheGetSpy.firstCall.firstArg
    ).to.equal(DiscordConstants.BAHAI_FYI_RULES_CHANNEL_ID);

    // This returns a `TextChannel` and `toString` gives:
    expect(channelsCacheGetSpy.returnValues[0].toString()).to.equal(
      hashRules
    );
  });
});
