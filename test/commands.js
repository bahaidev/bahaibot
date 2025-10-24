/* eslint-disable no-console -- Testing console */
/* eslint-disable camelcase -- API */
import {createSandbox} from 'sinon';
import {expect} from 'chai';
import MockDiscord from './helpers/MockDiscord.js';
import commandFinished from './helpers/commandFinished.js';

import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

import spyOnGetterResults from './helpers/spyOnGetterResults.js';

describe('Commands', () => {
  beforeEach(function () {
    this.sinon = createSandbox();
    // @ts-ignore We want to add it
    this.sinon.spyOnGetterResults = spyOnGetterResults;
    this.sinon.spy(console, 'log');
  });
  afterEach(function () {
    this.sinon.restore();
  });

  it('Executes help (default rate limit)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!help'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    // console.log('message', message);
    Array.from({length: 10}).forEach(() => {
      client.emit('messageCreate', message);
    });

    await commandFinished(client);
    // @ts-expect-error Sinon
    expect(message.channel.send.firstCall.firstArg.content).to.have.string(
      'Here are the instructions you need, user username.'
    );
  });

  // eslint-disable-next-line @stylistic/max-len -- Long
  // eslint-disable-next-line mocha/no-pending-tests -- Test is fine if run alone
  it.skip('Executes help (custom rate limit)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!help'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      commandInterval: 1,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);

    // eslint-disable-next-line promise/avoid-new -- Delay test
    return new Promise((resolve) => {
      client.emit('messageCreate', message);
      setTimeout(() => {
        expect(
          // @ts-expect-error Sinon
          message.channel.send.firstCall.firstArg.content
        ).to.have.string(
          'Here are the instructions you need, user username.'
        );
        expect(
          // @ts-expect-error Sinon
          message.channel.send.secondCall.firstArg.content
        ).to.have.string(
          'Here are the instructions you need, user username.'
        );
        resolve();
      });
    });
  });

  it('Executes helpextras', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!helpextras'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    // console.log('message', message);
    Array.from({length: 10}).forEach(() => {
      client.emit('messageCreate', message);
    });

    await commandFinished(client);
    // @ts-expect-error Sinon
    expect(message.channel.send.firstCall.firstArg.content).to.have.string(
      'Here are the instructions you need, user username.'
    );
  });

  it('Executes helpadmin', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!helpadmin'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    // console.log('message', message);
    Array.from({length: 10}).forEach(() => {
      client.emit('messageCreate', message);
    });

    await commandFinished(client);
    // @ts-expect-error Sinon
    expect(message.channel.send.firstCall.firstArg.content).to.have.string(
      'Here are the instructions you need, user username.'
    );
  });

  it(
    "Doesn't execute a command if disabled",
    async function () {
      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: 'good evening'
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({
        client: discord.getClient(),
        /**
         * @param {import('../src/discordBot.js').SettingsFile} system
         * @returns {import('../src/discordBot.js').Settings}
         */
        getSettings (system) {
          const {development} = system;
          return {
            ...development,
            disabledCommandGroups: ['salutations']
          };
        }
      });

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      client.emit('messageCreate', message);

      expect(
        // @ts-expect-error Sinon
        message.channel.send.firstCall
      ).to.be.null;
    }
  );

  it(
    "Doesn't execute a command if not enabled",
    async function () {
      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: 'good evening'
      });

      // @ts-expect-error Just need to mock some properties
      const {client} = await bot({
        client: discord.getClient(),
        /**
         * @param {import('../src/discordBot.js').SettingsFile} system
         * @returns {import('../src/discordBot.js').Settings}
         */
        getSettings (system) {
          const {development} = system;
          return {
            ...development,
            enabledCommandGroups: ['socialInfo']
          };
        }
      });

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      client.emit('messageCreate', message);

      expect(
        // @ts-expect-error Sinon
        message.channel.send.firstCall
      ).to.be.null;
    }
  );

  it('Executes info', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!info'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].data
    ).to.deep.include({
      description: "Bahá'í Bot for Discord\n",
      fields: [
        {
          name: 'Support Server',
          value: '[Invite link](https://discord.gg/NE6dJaw)',
          inline: false
        }
      ],
      author: {
        name: 'BahaiBot',
        icon_url: 'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp',
        url: undefined
      }
    });
  });

  it('Executes puppet', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!puppet bot-testing | hello',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
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
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    const guild = discord.clientGuild;
    const guildChannelsCache = this.sinon.spyOnGetterResults(
      guild, 'channels.cache', {
        find: {
          argSpies: [true],
          childSpies: ['send']
        }
      }
    );

    const channelSpy = this.sinon.spy();
    Object.defineProperty(message, 'channel', {
      value: {
        guild,
        send: channelSpy
      }
    });

    client.emit('messageCreate', message);

    await commandFinished(client);
    const {
      find: {
        argSpies: [[guildChannelsFinderSpy]],
        childSpies: [guildChannelsFindResultSendSpy]
      }
    } = guildChannelsCache;
    expect(guildChannelsFinderSpy.firstCall.firstArg.name).to.equal(
      'bot-testing'
    );
    expect(guildChannelsFinderSpy.firstCall.returnValue).to.equal(true);
    expect(guildChannelsFindResultSendSpy.firstCall.firstArg).to.equal(
      'hello'
    );

    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Puppet command issued by AB.')
    ).to.be.true;
    expect(channelSpy.firstCall).to.be.null;
  });

  it('Executes puppet with bad name', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!puppet bad-name | hello',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
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
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    const guild = discord.clientGuild;
    const guildChannelsCache = this.sinon.spyOnGetterResults(
      guild, 'channels.cache', {
        find: {
          argSpies: [true]
        }
      }
    );

    const channelSpy = this.sinon.spy();
    Object.defineProperty(message, 'channel', {
      value: {
        guild,
        send: channelSpy
      }
    });

    client.emit('messageCreate', message);

    await commandFinished(client);

    expect(channelSpy.firstCall.firstArg).to.have.string(
      'Channel bad-name does not exist or is not text-based!'
    );
    const {
      find: {
        argSpies: [[guildChannelsFinderSpy]]
      }
    } = guildChannelsCache;
    expect(guildChannelsFinderSpy.firstCall.firstArg.name).to.equal(
      'bot-testing'
    );
    expect(guildChannelsFinderSpy.firstCall.returnValue).to.equal(false);

    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Puppet command issued by AB.')
    ).to.be.true;
  });

  [
    'Executes users (single)',

    // Commenting out for now until figure out why showing second user as
    //  admin (seems our spy seems not to be executing the second `filter` call)

    'Executes users (multiple)'
  ].forEach((testMessage) => {
    const testMultiple = testMessage.includes('multiple');

    it(testMessage, async function () {
      const discord = new MockDiscord({
        clientName: DiscordConstants.ADMIN_ROLES[0],
        roleID: DiscordConstants.ADMIN_ROLE_ID,
        mentionEveryone: true,
        messageContent: '!users',
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
            ]
          }
        ]
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({
        client: discord.getClient()
      });

      const message = discord.getMessage();

      const guild = discord.clientGuild;

      // This is not being set, so as `@everyone` role is needed in
      //  `GuildMemberRoleManager`, we set it here
      guild.roles.cache.set(
        guild.id,
        discord.mockRole({
          client, roleID: '222222222222222222', name: 'everyone'
        })
      );

      discord.mockUser({
        userID: DiscordConstants.USER_AB,
        userName: 'AB',
        guild,
        status: 'online',
        roles: [
          DiscordConstants.ADMIN_ROLE_ID
        ]
      });

      if (testMultiple) {
        discord.mockUser({
          userID: 'online-nonadmin',
          userName: 'OnlineNonAdmin',
          guild,
          status: 'online'
        });

        discord.mockUser({
          userID: 'offline-nonadmin',
          userName: 'OfflineNonAdmin',
          guild,
          status: 'offline'
        });
      }

      const channelSpy = this.sinon.spy();
      Object.defineProperty(message, 'channel', {
        value: {
          guild,
          send: channelSpy
        }
      });

      const {filter} = guild.members.cache;

      // @ts-expect-error Just mocking what we need
      guild.members.cache.filter = (...args) => {
        if (args[0].toString().includes('offline')) {
          return {
            size: testMultiple ? 2 : 1
          };
        }
        // @ts-expect-error Ok
        return filter.call(guild.members.cache, ...args);
      };

      // @ts-expect-error Just mocking what we need
      message.guild.members.fetch = async ({
        // @ts-expect-error Not sure why this is erring
        user:
          usr
      }) => {
        return await {
          user: {
            id: usr.id
          },
          presence: {
            status: 'online'
          }
        };
      };

      client.emit('messageCreate', message);

      await commandFinished(client);

      expect(
        // @ts-expect-error Sinon
        message.channel.send.firstCall.firstArg
      ).to.equal(
        testMultiple
          ? 'There are currently 2 users online, ' +
            'including 1 admin/mod/helper(s).'
          : 'There is currently 1 user online, ' +
            'including 1 admin/mod/helper(s).'
      );

      expect(
        // @ts-expect-error Sinon
        console.log.calledWith('Users command issued by user username.')
      ).to.be.true;
    });
  });

  it('Executes seen (no arguments)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!seen'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    // @ts-expect-error Sinon
    expect(message.channel.send.firstCall.firstArg).to.equal(
      `I haven't seen  lately.`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Seen command issued by user username.')
    ).to.be.true;
  });

  /** @type {[string, string[]][]} */ ([
    ['Executes seen for one unseen user', ['AB']],
    ['Executes seen for two unseen users', ['AB', 'OfflineNonAdmin']]
  ]).forEach(([testMessage, users]) => {
    it(testMessage, async function () {
      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: `!seen ${users.join(' ')}`
      });

      // @ts-expect-error Don't need a full mock
      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      client.emit('messageCreate', message);

      await commandFinished(client);
      // @ts-expect-error Sinon
      expect(message.channel.send.firstCall.firstArg).to.equal(
        `I haven't seen ${users.map((usr) => {
          return `@${usr}`;
        }).join(' ')} lately.`
      );
      expect(
        // @ts-expect-error Sinon
        console.log.calledWith('Seen command issued by user username.')
      ).to.be.true;
    });
  });

  it('read (missing arguments)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string("I couldn't understand your request");
  });

  it('read (bad arguments)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read oops 2'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.notCalled
    ).to.be.true;
  });

  it('read with reference and index', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read hwa 2'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].data
    ).to.deep.include({
      author: {
        name: 'The Arabic Hidden Words by Bahá’u’lláh',
        icon_url: 'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp',
        url: undefined
      }
    });
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].data.description
    ).to.have.string(
      'The best beloved of all things in My sight is Justice'
    );
  });

  it('read with reference and index (hwp)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read hwp 1'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].data
    ).to.deep.include({
      author: {
        name: 'The Persian Hidden Words by Bahá’u’lláh',
        icon_url: 'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp',
        url: undefined
      }
    });
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].data.description
    ).to.have.string(
      'Abide not but in the rose-garden of the spirit.'
    );
  });

  it('read list', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read list'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      content: `The following texts are available in my ` +
                      `library, user username.`,
      embeds: [{
        color: 8359053,
        description: '\nTo read from one of these texts, mention the ' +
            "book name and the section you're interested in. For " +
            'example, to read the 12th Arabic Hidden Word, say: ' +
            '`!read HWA 12`.',
        fields: [
          {
            name: 'Available Texts',
            value: '\n**HWA**: The Arabic Hidden Words (Bahá’u’lláh)\n' +
              '**HWP**: The Persian Hidden Words (Bahá’u’lláh)\n'
          }
        ]
      }]
    });
  });

  it('read random', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read random'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].data.author.icon_url
    ).to.equal(
      'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp'
    );
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].data.author.url
    ).to.be.undefined;
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].data.author.name
    ).to.be.a('string');
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].data.description
    ).to.be.a('string');
  });

  it('b9 (random)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!b9 -rand',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Query completed.')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your query.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      'Bahai9 has returned the following random page, AB:\n\n **'
    ).and.to.have.string(
      '(https://bahai9.com/wiki/'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('BP command issued by AB.')
    ).to.be.true;
  });

  it('bw (random)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!bw -rand',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Query completed.')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your query.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      'Bahaiworks has returned the following random page, AB:\n\n **'
    ).and.to.have.string(
      '(https://bahai.works/'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('BP command issued by AB.')
    ).to.be.true;
  });

  it('bahaimedia (random)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!media -rand',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Query completed.')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your query.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      'Bahaimedia has returned the following random page, AB:\n\n **'
    ).and.to.have.string(
      '(https://bahai.media/File%3A'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('BP command issued by AB.')
    ).to.be.true;
  });

  it('b9 (random) with network problem', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!b9 -rand',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      // eslint-disable-next-line require-await -- Check throwing async
      async fetch () {
        throw new Error('Simulated network error');
      },
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.error.calledWith('Error retrieving random wiki URL')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      content: `Here is the result of your query.`,
      embeds: [{
        color: 3447003,
        description: `<:bstar:327468698032013312> Bahai9 did not ` +
          `return any results for your query, AB. ` +
          `There may have been a network problem. If you think ` +
          `you're getting this message in error, you may want to ` +
          `try again later.`
      }]
    });
  });

  it('b9 (search)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!b9 God',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Search completed: God => God')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      'has returned the following page as the top result ' +
        'for your search, AB:\n\n **[God](https://bahai9.com/wiki/God)**\n\n'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('BP command issued by AB.')
    ).to.be.true;
  });

  it('bahaimedia (search)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!media ‘Abdu’l-Bahá',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith(
        'Search completed: ‘Abdu’l-Bahá => File:Abdul-Baha, taken ' +
          'in Paris.jpg'
      )
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      'has returned the following page as the top result ' +
      'for your search, AB:\n\n **[File:Abdul-Baha, taken in ' +
      'Paris.jpg](https://bahai.media/File%3AAbdul-Baha%2C%20taken%20in%20Paris.jpg)**\n\n'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('BP command issued by AB.')
    ).to.be.true;
  });

  it('bahaipedia (search)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!bp God',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Search completed: God => God')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      'has returned the following page as the top result ' +
        'for your search, AB:\n\n **[God](https://bahaipedia.org/God)**\n\n'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('BP command issued by AB.')
    ).to.be.true;
  });

  it("bahaipedia (search) (no Bahá'í star)", async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!bp God',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Search completed: God => God')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      'has returned the following page as the top result ' +
        'for your search, AB:\n\n **[God](https://bahaipedia.org/God)**\n\n'
    ).and.to.not.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('BP command issued by AB.')
    ).to.be.true;
  });

  it('bahaipedia (search) with word removal', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!bp God is great -2',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith(
        'Search completed: God is great -2 => Manifestation of God'
      )
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      'has returned the following page as the top result ' +
        'for your search, AB:\n\n **[Manifestation of God](https://bahaipedia.org/Manifestation%20of%20God)**\n\n'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('BP command issued by AB.')
    ).to.be.true;
  });

  it('bahaipedia (search) - no results', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!bp zoasfssafjklwerworieewio',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.firstCall.firstArg
    ).to.equal('Result:');

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      'did not return any results for your search, AB. ' +
        `Did you spell your search terms correctly?\n\n` +
        `There may also have been a network problem. ` +
        `If you think you're getting this message in ` +
        `error, you may want to try again later.`
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('BP command issued by AB.')
    ).to.be.true;
  });

  it('b9 (search) with network problem', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!b9 God',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      // eslint-disable-next-line require-await -- Check throwing async
      async fetch () {
        throw new Error('Simulated network error');
      },
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.error.calledWith('Error retrieving wiki search URL')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      content: `Here is the result of your search.`,
      embeds: [{
        color: 3447003,
        description: `<:bstar:327468698032013312> Bahai9 did not ` +
          `return any results for your search, AB. ` +
          `Did you spell your search terms correctly?\n\n` +
            `There may also have been a network problem. ` +
            `If you think you're getting this message in ` +
            `error, you may want to try again later.`
      }]
    });
  });

  it('bahaipedia (today in history) with network problem', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!bp -tih',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      // eslint-disable-next-line require-await -- Check throwing async
      async fetch () {
        throw new Error('Simulated network error');
      },
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);

    expect(
      // @ts-expect-error Sinon
      console.error.calledWith('Error retrieving JSON for today URL')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      content: `Here is the result of your query.`,
      embeds: [{
        color: 3447003,
        description: `<:bstar:327468698032013312> Bahaipedia did not ` +
          `return any results for your query, AB. ` +
          `There may have been a network problem. If you think ` +
            `you're getting this message in error, you may want to ` +
            `try again later.`
      }]
    });
  });

  it('today', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!today',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
              id: DiscordConstants.BSTAR_EMOJI_ID_LAB,
              name: 'bstar'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Query completed.')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your query.'
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg.embeds[0].description
    ).to.have.string(
      "Here's Bahaipedia's Today in History entry for"
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
  });

  it('echo (non-admin attempt)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!echo'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall
    ).to.be.null;
    expect(
      // @ts-expect-error Sinon
      console.log.notCalled
    ).to.be.true;
  });

  it('echo (admin user)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!echo Hello',
      userID: DiscordConstants.USER_AB,
      userName: 'AB'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string("Here's what you said, AB:").and.to.have.string(
      '!echo Hello'
    );
  });

  it('checkin (non-admin attempt)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!checkin'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall
    ).to.be.null;
    expect(
      // @ts-expect-error Sinon
      console.log.notCalled
    ).to.be.true;
  });

  it('checkin (admin user)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!checkin',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Checkin command issued by AB.')
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      console.log.calledWith("Checking in on Bahá'í.FYI.")
    ).to.be.true;

    expect(
      // @ts-expect-error Sinon
      console.error.notCalled
    ).to.be.true;
  });

  it('checkin (admin user) 2', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!checkin',
      userID: DiscordConstants.USER_AB,
      userName: 'AB',
      guildChannels: true,
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
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
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith('Checkin command issued by AB.')
    ).to.be.true;
    expect(
      // @ts-expect-error Sinon
      console.log.calledWith("Checking in on Bahá'í.FYI.")
    ).to.be.true;
  });

  it('ping', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'ping'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Pong');
  });

  it('sup', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'sup'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.satisfy(
      /**
       * @param {string} val
       * @returns {boolean}
       */
      (val) => {
        return val.includes('Just waiting') ||
          val.includes('Same as') ||
          val.includes('Same old') ||
          val.includes('like usual') ||
          val.includes('to be here');
      }
    ).and.to.have.string(
      'user username'
    );
  });

  it('abha', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'allahuabha',
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
              id: DiscordConstants._9STAR_EMOJI_ID_FYI,
              name: '9star'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    // Save copy to restore later (overcoming limits on our spy utility)
    const resolveIdentifier = client.emojis.resolveIdentifier.bind(
      client.emojis
    );

    const clientEmojisCache = this.sinon.spyOnGetterResults(
      client, 'emojis.cache', {
        find: {
          argSpies: [true],
          childSpies: ['toString']
        }
      }
    );

    // Restore this function which Discord needs for `react`
    client.emojis.resolveIdentifier = resolveIdentifier;

    client.emit('messageCreate', message);

    await commandFinished(client);
    const {
      find: {
        argSpies: [[emojisFinderSpy]],
        childSpies: [emojisFindResultToStringSpy]
      }
    } = clientEmojisCache;

    expect(emojisFinderSpy.firstCall.firstArg.name).to.equal('9star');
    expect(emojisFinderSpy.firstCall.returnValue).to.equal(true);

    expect(emojisFindResultToStringSpy.returnValues[0]).to.equal(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Alláh-u-Abhá').and.to.have.string(
      'user username'
    ).and.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg.name
    ).to.equal('9star');
  });

  it('abha (no 9star)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'allahuabha',
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

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    // Save copy to restore later (overcoming limits on our spy utility)
    const resolveIdentifier = client.emojis.resolveIdentifier.bind(
      client.emojis
    );

    // Restore this function which Discord needs for `react`
    client.emojis.resolveIdentifier = resolveIdentifier;

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Alláh-u-Abhá').and.to.have.string(
      'user username'
    ).and.not.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall
    ).to.be.null;
  });

  it('abha (not mentioned)', async function () {
    const discord = new MockDiscord({
      // mentionEveryone: true,
      addClientUser: false,
      messageContent: 'allahuabha',
      guilds: [
        {
          id: DiscordConstants.BAHAI_FYI_GUILD_ID,
          name: "Bahá'í FYI",
          userID: DiscordConstants.USER_AB,
          userName: 'AB',
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
              id: DiscordConstants._9STAR_EMOJI_ID_FYI,
              name: '9star'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const guild = discord.clientGuild;

    const user = discord.mockUser({
      guild
    });

    const message = discord.mockMessage({
      // guild,
      content: 'allahuabha, @AB',
      user,
      mentions: [
        {...discord.user, member: discord.guildMember}
      ]
    });

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    // Save copy to restore later (overcoming limits on our spy utility)
    const resolveIdentifier = client.emojis.resolveIdentifier.bind(
      client.emojis
    );

    const clientEmojisCache = this.sinon.spyOnGetterResults(
      client, 'emojis.cache', {
        find: {
          argSpies: [true]
        }
      }
    );

    // Restore this function which Discord needs for `react`
    client.emojis.resolveIdentifier = resolveIdentifier;

    client.emit('messageCreate', message);

    await commandFinished(client);
    const {
      find: {
        argSpies: [[emojisFinderSpy]]
      }
    } = clientEmojisCache;

    expect(emojisFinderSpy.firstCall.firstArg.name).to.equal('9star');
    expect(emojisFinderSpy.firstCall.returnValue).to.equal(true);

    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg.name
    ).to.equal('9star');
  });

  it('badi', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'badi',
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
              id: DiscordConstants._9STAR_EMOJI_ID_FYI,
              name: '9star'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    const clientEmojisCache = this.sinon.spyOnGetterResults(
      client, 'emojis.cache', {
        find: {
          argSpies: [true],
          childSpies: ['toString']
        }
      }
    );

    client.emit('messageCreate', message);

    await commandFinished(client);
    const {
      find: {
        argSpies: [[emojisFinderSpy]],
        childSpies: [emojisFindResultToStringSpy]
      }
    } = clientEmojisCache;

    expect(emojisFinderSpy.firstCall.firstArg.name).to.equal('9star');
    expect(emojisFinderSpy.firstCall.returnValue).to.equal(true);

    expect(emojisFindResultToStringSpy.returnValues[0]).to.equal(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string(
      'OK'
    ).and.to.have.string(
      'here you go. https://bahaipedia.org/Badí‘'
    ).and.to.have.string(
      'user username'
    ).and.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
  });

  it('badi (no 9-pointed star)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'badi',
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

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string(
      'OK'
    ).and.to.have.string(
      'here you go. https://bahaipedia.org/Badí‘'
    ).and.to.have.string(
      'user username'
    ).and.to.not.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
  });

  it('nawruz', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'happy Naw Ruz',
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
              id: DiscordConstants._9STAR_EMOJI_ID_FYI,
              name: '9star'
            },
            {
              id: DiscordConstants.SABZI_EMOJI_ID_FYI,
              name: 'sabzi'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    // Save copy to restore later (overcoming limits on our spy utility)
    const resolveIdentifier = client.emojis.resolveIdentifier.bind(
      client.emojis
    );

    const clientEmojisCache = this.sinon.spyOnGetterResults(
      client, 'emojis.cache', {
        find: {
          argSpies: [true],
          childSpies: ['toString']
        }
      }
    );

    // Restore this function which Discord needs for `react`
    client.emojis.resolveIdentifier = resolveIdentifier;

    client.emit('messageCreate', message);

    await commandFinished(client);
    const {
      find: {
        argSpies: [[emojisFinderSpy], [emojisFinderSpy2]],
        childSpies: [
          emojisFindResultToStringSpy, emojisFindResultToStringSpy2
        ]
      }
    } = clientEmojisCache;

    expect(emojisFinderSpy.firstCall.firstArg.name).to.equal('9star');
    expect(emojisFinderSpy.firstCall.returnValue).to.equal(true);

    expect(emojisFinderSpy2.lastCall.firstArg.name).to.equal('sabzi');
    expect(emojisFinderSpy2.lastCall.returnValue).to.equal(true);

    expect(emojisFindResultToStringSpy.returnValues[0]).to.equal(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );

    expect(emojisFindResultToStringSpy2.returnValues[0]).to.equal(
      `<:sabzi:${DiscordConstants.SABZI_EMOJI_ID_FYI}>`
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Naw-Rúz!').and.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    ).and.to.have.string(
      `<:sabzi:${DiscordConstants.SABZI_EMOJI_ID_FYI}>`
    );
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg.name
    ).to.equal('9star');
  });

  it('nawruz (no 9star)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'happy Naw Ruz',
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
              id: DiscordConstants.SABZI_EMOJI_ID_FYI,
              name: 'sabzi'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    // Save copy to restore later (overcoming limits on our spy utility)
    const resolveIdentifier = client.emojis.resolveIdentifier.bind(
      client.emojis
    );

    // Restore this function which Discord needs for `react`
    client.emojis.resolveIdentifier = resolveIdentifier;

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Naw-Rúz!').and.to.have.string(
      `<:sabzi:${DiscordConstants.SABZI_EMOJI_ID_FYI}>`
    ).and.to.not.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall
    ).to.be.null;
  });

  it('nawruz (no sabzi)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'happy Naw Ruz',
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
              id: DiscordConstants._9STAR_EMOJI_ID_FYI,
              name: '9star'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    // Save copy to restore later (overcoming limits on our spy utility)
    const resolveIdentifier = client.emojis.resolveIdentifier.bind(
      client.emojis
    );

    const clientEmojisCache = this.sinon.spyOnGetterResults(
      client, 'emojis.cache', {
        find: {
          argSpies: [true],
          childSpies: ['toString']
        }
      }
    );

    // Restore this function which Discord needs for `react`
    client.emojis.resolveIdentifier = resolveIdentifier;

    client.emit('messageCreate', message);

    await commandFinished(client);
    const {
      find: {
        argSpies: [[emojisFinderSpy], [emojisFinderSpy2]],
        childSpies: [
          emojisFindResultToStringSpy, emojisFindResultToStringSpy2
        ]
      }
    } = clientEmojisCache;

    expect(emojisFinderSpy.firstCall.firstArg.name).to.equal('9star');
    expect(emojisFinderSpy.firstCall.returnValue).to.equal(true);

    expect(emojisFinderSpy2.secondCall).to.equal(null);

    expect(emojisFindResultToStringSpy.returnValues[0]).to.equal(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );

    expect(emojisFindResultToStringSpy2).to.be.undefined;

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Naw-Rúz!').and.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    ).and.to.not.have.string(
      `<:sabzi:${DiscordConstants.SABZI_EMOJI_ID_FYI}>`
    );
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg.name
    ).to.equal('9star');
  });

  it('ridvan', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'happy Ridvan',
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
              id: DiscordConstants._9STAR_EMOJI_ID_FYI,
              name: '9star'
            }
          ]
        }
      ]
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    // Save copy to restore later (overcoming limits on our spy utility)
    const resolveIdentifier = client.emojis.resolveIdentifier.bind(
      client.emojis
    );

    const clientEmojisCache = this.sinon.spyOnGetterResults(
      client, 'emojis.cache', {
        find: {
          argSpies: [true],
          childSpies: ['toString']
        }
      }
    );

    // Restore this function which Discord needs for `react`
    client.emojis.resolveIdentifier = resolveIdentifier;

    client.emit('messageCreate', message);

    await commandFinished(client);
    const {
      find: {
        argSpies: [[emojisFinderSpy]],
        childSpies: [emojisFindResultToStringSpy]
      }
    } = clientEmojisCache;

    expect(emojisFinderSpy.firstCall.firstArg.name).to.equal('9star');
    expect(emojisFinderSpy.firstCall.returnValue).to.equal(true);

    expect(emojisFindResultToStringSpy.returnValues[0]).to.equal(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Ridván!').and.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg.name
    ).to.equal('9star');
  });

  it('ridvan 2', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'happy Ridvan',
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

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    // Save copy to restore later (overcoming limits on our spy utility)
    const resolveIdentifier = client.emojis.resolveIdentifier.bind(
      client.emojis
    );

    // Restore this function which Discord needs for `react`
    client.emojis.resolveIdentifier = resolveIdentifier;

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Ridván!').and.to.not.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall
    ).to.be.null;
  });

  it('morning', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'good morning'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Good morning').and.to.have.string(
      'user username'
    );
  });

  it('afternoon', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'good afternoon'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Good afternoon').and.to.have.string(
      'user username'
    );
  });

  it('evening', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'good evening'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Good evening').and.to.have.string(
      'user username'
    );
  });

  it('hello', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'howdy'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Hello').and.to.have.string(
      'user username'
    );
  });

  it('welcome', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'Welcome'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('Thanks').and.to.have.string(
      'user username'
    );
  });

  it('welcome (not mentioned)', async function () {
    const discord = new MockDiscord({
      // mentionEveryone: true,
      addClientUser: false,
      messageContent: 'welcome'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const guild = discord.clientGuild;

    const user = discord.mockUser({
      guild
    });

    const message = discord.mockMessage({
      // guild,
      content: 'welcome',
      user,
      mentions: [
        {...discord.user, member: discord.guildMember}
      ]
    });

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    client.emit('messageCreate', message);

    await commandFinished(client);
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg
    ).to.equal('👋');
  });

  it(
    "welcome (not mentioned) doesn't work with `disableNotMentioned`",
    async function () {
      const discord = new MockDiscord({
        // mentionEveryone: true,
        addClientUser: false,
        messageContent: 'welcome'
      });

      // @ts-expect-error Just need some mock properties
      const {client} = await bot({
        client: discord.getClient(),
        /**
         * @param {import('../src/discordBot.js').SettingsFile} system
         * @returns {import('../src/discordBot.js').Settings}
         */
        getSettings (system) {
          const {development} = system;
          return {
            ...development,
            disableNotMentioned: true
          };
        }
      });

      const guild = discord.clientGuild;

      const user = discord.mockUser({
        guild
      });

      const message = discord.mockMessage({
        // guild,
        content: 'welcome',
        user,
        mentions: [
          {...discord.user, member: discord.guildMember}
        ]
      });

      this.sinon.spy(message.channel, 'send');
      this.sinon.spy(message, 'react');

      client.emit('messageCreate', message);

      expect(
        // @ts-expect-error Sinon
        message.react.firstCall
      ).to.be.null;
    }
  );

  it('ninePointedStar', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '\u{1F7D9}'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string(`<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`);
  });

  it('ninePointedStar (not mentioned)', async function () {
    const discord = new MockDiscord({
      messageContent: '\u{1F7D9}'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message, 'react');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg
    ).to.equal(`<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`);
  });

  it('coffee', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '\u{2615}'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string(':coffee:');
  });

  it('tea', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '\u{1F375}'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string(':tea:');
  });

  it('tea (not mentioned)', async function () {
    const discord = new MockDiscord({
      messageContent: '\u{1F375}'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message, 'react');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg
    ).to.equal('🍵');
  });

  it('popcorn', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '\u{1F37F}'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string(':popcorn:');
  });

  it('popcorn (not mentioned)', async function () {
    const discord = new MockDiscord({
      messageContent: '\u{1F37F}'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message, 'react');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg
    ).to.equal('🍿');
  });

  it('unladen', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'unladen swallow'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.have.string('European swallow');
  });

  it('bruh', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'bruh'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.equal('Bruh.');
  });

  it('goodbot', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'good bot'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.equal('Thanks!');
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg
    ).to.equal('😊');
  });

  it('badbot', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'badbot'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.equal('Sorry.');
    expect(
      // @ts-expect-error Sinon
      message.react.firstCall.firstArg
    ).to.equal('☹️');
  });

  it('repeating yourself', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'repeating yourself'
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.satisfy(
      /**
       * @param {string} val
       * @returns {boolean}
       */
      (val) => {
        return (/sorry|oops/v).test(val) ||
          val.includes('chatbot') ||
          val.includes('happen a lot') ||
          val.includes('tend to do that');
      }
    );
  });

  it('santacat', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: "santa's cat"
    });

    // @ts-expect-error Don't need a full mock
    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('messageCreate', message);

    expect(
      // @ts-expect-error Sinon
      message.channel.send.firstCall.firstArg
    ).to.satisfy(
      /**
       * @param {string} val
       * @returns {boolean}
       */
      (val) => {
        return val.includes('Not telling') ||
          val.includes('secret to everybody') ||
          val.includes('make a meme') ||
          val.includes('This one?') ||
          val.includes('like to know') ||
          val.includes('Who do you think');
      }
    );
  });
});
