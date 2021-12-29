/* eslint-disable no-console -- Testing console */
import {createSandbox} from 'sinon';

import MockDiscord from './helpers/MockDiscord.js';
import commandFinished from './helpers/commandFinished.js';

import bot from '../src/discordBot.js';
import * as DiscordConstants from '../src/messages/DiscordConstants.js';

import spyOnGetterResults from './helpers/spyOnGetterResults.js';

describe('Commands', function () {
  beforeEach(function () {
    this.sinon = createSandbox();
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

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    // console.log('message', message);
    Array.from({length: 10}).forEach(() => {
      client.emit('message', message);
    });

    await commandFinished(client);
    expect(message.channel.send.firstCall.firstArg.content).to.have.string(
      'Here are the instructions you need, user username.'
    );
  });

  it('Executes help (custom rate limit)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!help'
    });

    const {client} = await bot({
      commandInterval: 1,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);

    // eslint-disable-next-line promise/avoid-new -- Delay test
    return new Promise((resolve) => {
      client.emit('message', message);
      setTimeout(() => {
        expect(
          message.channel.send.firstCall.firstArg.content
        ).to.have.string(
          'Here are the instructions you need, user username.'
        );
        expect(
          message.channel.send.secondCall.firstArg.content
        ).to.have.string(
          'Here are the instructions you need, user username.'
        );
        resolve();
      });
    });
  });

  it(
    "Doesn't execute a command if disabled",
    async function () {
      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: 'good evening'
      });

      const {client} = await bot({
        client: discord.getClient(),
        /**
         * @param {Settings} system
         * @returns {Settings}
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

      client.emit('message', message);

      expect(
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

      const {client} = await bot({
        client: discord.getClient(),
        /**
         * @param {Settings} system
         * @returns {Settings}
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

      client.emit('message', message);

      expect(
        message.channel.send.firstCall
      ).to.be.null;
    }
  );

  it('Executes info', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!info'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      type: 'rich',
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
        iconURL: 'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp',
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
    message.channel = {
      guild,
      send: channelSpy
    };

    client.emit('message', message);

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
    message.channel = {
      guild,
      send: channelSpy
    };

    client.emit('message', message);

    await commandFinished(client);

    expect(channelSpy.firstCall.firstArg).to.have.string(
      'Channel bad-name does not exist!'
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

      const guildMembersCache = this.sinon.spyOnGetterResults(
        guild, 'members.cache', {
          filter: {
            argSpies: [true],
            childAccessorSpies: [
              ['size', ['get']]
            ]
          }
        }
      );

      const channelSpy = this.sinon.spy();
      message.channel = {
        guild,
        send: channelSpy
      };

      client.emit('message', message);

      await commandFinished(client);
      const {
        filter: {
          argSpies: [
            [guildMembersOnlineFilterSpy],
            [guildMembersAdminsFilterSpy]
          ],
          childAccessorSpies: [
            guildMembersFilterResultSizeSpy
          ]
        }
      } = guildMembersCache;

      // We should really have spying on the second filter call also,
      //   but as per to-do in spyOnGetterResults file, we need to
      //   refactor there and we can at least introspect on the
      //   expected result.

      expect(
        guildMembersOnlineFilterSpy.firstCall.firstArg.presence.status
      ).to.equal(
        'online'
      );
      expect(
        guildMembersOnlineFilterSpy.firstCall.returnValue
      ).to.equal(true);

      expect(
        guildMembersAdminsFilterSpy.firstCall.firstArg.presence.status
      ).to.equal(
        'online'
      );
      expect(
        guildMembersAdminsFilterSpy.firstCall.returnValue
      ).to.equal(true);

      if (testMultiple) {
        expect(
          guildMembersOnlineFilterSpy.secondCall.firstArg.presence.status
        ).to.equal(
          'online'
        );
        expect(
          guildMembersOnlineFilterSpy.secondCall.returnValue
        ).to.equal(true);

        expect(
          guildMembersOnlineFilterSpy.thirdCall.firstArg.presence.status
        ).to.equal(
          'offline'
        );
        expect(
          guildMembersOnlineFilterSpy.thirdCall.returnValue
        ).to.equal(false);
      }

      expect(
        guildMembersFilterResultSizeSpy.get.firstCall.returnValue
      ).to.equal(testMultiple ? 2 : 1);

      expect(
        message.channel.send.firstCall.firstArg
      ).to.equal(
        testMultiple
          ? 'There are currently 2 users online, ' +
            'including 1 admin/mod/helper(s).'
          : 'There is currently 1 user online, ' +
            'including 1 admin/mod/helper(s).'
      );

      expect(
        console.log.calledWith('Users command issued by user username.')
      ).to.be.true;
    });
  });

  it('Executes seen (no arguments)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!seen'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(message.channel.send.firstCall.firstArg).to.equal('');
    expect(
      console.log.calledWith('Seen command issued by user username.')
    ).to.be.true;
  });

  [
    ['Executes seen for one unseen user', ['AB']],
    ['Executes seen for two unseen users', ['AB', 'OfflineNonAdmin']]
  ].forEach(([testMessage, users]) => {
    it(testMessage, async function () {
      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: `!seen ${users.join(' ')}`
      });

      const {client} = await bot({client: discord.getClient()});

      const message = discord.getMessage();

      this.sinon.spy(message.channel, 'send');

      client.emit('message', message);

      await commandFinished(client);
      expect(message.channel.send.firstCall.firstArg).to.equal(
        users.map((user) => {
          return `I haven't seen ${user} lately.`;
        }).join('\n')
      );
      expect(
        console.log.calledWith('Seen command issued by user username.')
      ).to.be.true;
    });
  });

  [
    ['Executes seen for one unseen user (dnd)', {
      users: ['AB'],
      counts: [2],
      stat: 'dnd'
    }],
    ['Executes seen for two unseen users (dnd and offline)', {
      users: ['AB', 'OfflineNonAdmin'],
      counts: [2, 4],
      stat: 'dnd'
    }],
    ['Executes seen for one unseen user (idle)', {
      users: ['AB'],
      counts: [2],
      stat: 'idle'
    }],
    ['Executes seen for two unseen users (idle and offline)', {
      users: ['AB', 'OfflineNonAdmin'],
      counts: [2, 4],
      stat: 'idle'
    }]
  ].forEach(([testMessage, {users, stat: statAB, counts: [
    countFirst, countSecond
  ]}]) => {
    it(testMessage, async function () {
      const expectedStatAB = statAB === 'dnd' ? 'busy' : statAB;

      const discord = new MockDiscord({
        mentionEveryone: true,
        messageContent: `!seen ${users.join(' ')}`,
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
            ]
          }
        ]
      });

      const {client} = await bot({client: discord.getClient()});
      const message = discord.getMessage();

      const guild = discord.clientGuild;

      discord.mockUser({
        hideUserStatus: true, // Treated as online otherwise
        userID: DiscordConstants.USER_AB,
        userName: 'AB',
        guild,
        status: statAB,
        roles: [
          DiscordConstants.ADMIN_ROLE_ID
        ]
      });

      discord.mockUser({
        userID: 'online-nonadmin',
        userName: 'OnlineNonAdmin',
        guild,
        status: 'online'
      });

      discord.mockUser({
        hideUserStatus: true, // Treated as online otherwise
        userID: 'offline-nonadmin',
        userName: 'OfflineNonAdmin',
        guild,
        status: 'offline'
      });

      this.sinon.spy(message.channel, 'send');

      const clientUsersCache = this.sinon.spyOnGetterResults(
        client, 'users.cache', {
          find: {
            argSpies: [true, true],
            childAccessorSpies: [
              ['presence', ['get']],
              ['lastMessage', ['get']]
            ]
          }
        }
      );

      client.emit('message', message);

      await commandFinished(client);
      const {
        find: {
          argSpies,
          childAccessorSpies
        }
      } = clientUsersCache;

      let clientUsersFinderSpy, clientUsersFinderSpy2ndCall;
      let clientUsersFindResultPresenceSpy,
        clientUsersFindResultPresenceSpy2;
      let clientUsersFindResultLastMessageSpy,
        clientUsersFindResultLastMessageSpy2;
      if (countSecond) {
        [
          [clientUsersFinderSpy],
          [clientUsersFinderSpy2ndCall]
        ] = argSpies;
        [
          clientUsersFindResultPresenceSpy,
          clientUsersFindResultLastMessageSpy,
          clientUsersFindResultPresenceSpy2,
          clientUsersFindResultLastMessageSpy2
        ] = childAccessorSpies;
      } else {
        [[clientUsersFinderSpy]] = argSpies;
        [
          clientUsersFindResultPresenceSpy,
          clientUsersFindResultLastMessageSpy
        ] = childAccessorSpies;
      }

      expect(
        clientUsersFinderSpy.firstCall.firstArg.id
      ).to.equal('user-id');
      expect(
        clientUsersFinderSpy.callCount
      ).to.equal(countFirst);

      expect(
        clientUsersFindResultLastMessageSpy.get.firstCall.returnValue
      ).to.equal(null);
      expect(
        clientUsersFindResultPresenceSpy.get.firstCall.returnValue.status
      ).to.equal(statAB);

      if (clientUsersFinderSpy2ndCall) {
        expect(
          clientUsersFinderSpy2ndCall.firstCall.firstArg.id
        ).to.equal('user-id');
        expect(
          clientUsersFinderSpy2ndCall.callCount
        ).to.equal(countSecond);

        expect(
          clientUsersFindResultLastMessageSpy2.get.firstCall.returnValue
        ).to.equal(null);
        expect(
          clientUsersFindResultPresenceSpy2.get.firstCall.returnValue.status
        ).to.equal('offline');

        if (statAB !== 'dnd') {
          expect(
            clientUsersFindResultPresenceSpy2
              .get.secondCall.returnValue.status
          ).to.equal('offline');
        }
      }

      expect(message.channel.send.firstCall.firstArg).to.equal(
        users.map((user, idx) => {
          return `${user} is now ${
            idx === 1 ? 'offline' : expectedStatAB
          }; I haven't seen them lately.`;
        }).join('\n')
      );
      expect(
        console.log.calledWith('Seen command issued by user username.')
      ).to.be.true;
    });
  });

  it('read (missing arguments)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.firstCall.firstArg
    ).to.have.string("I couldn't understand your request");
  });

  it('read (bad arguments)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read oops 2'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.notCalled
    ).to.be.true;
  });

  it('read with reference and index', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read hwa 2'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      type: 'rich',
      author: {
        name: 'The Arabic Hidden Words by Bahá’u’lláh',
        iconURL: 'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp',
        url: undefined
      }
    });
    expect(
      message.channel.send.firstCall.firstArg.description
    ).to.have.string(
      'The best beloved of all things in My sight is Justice'
    );
  });

  it('read with reference and index (hwp)', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read hwp 1'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      type: 'rich',
      author: {
        name: 'The Persian Hidden Words by Bahá’u’lláh',
        iconURL: 'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp',
        url: undefined
      }
    });
    expect(
      message.channel.send.firstCall.firstArg.description
    ).to.have.string(
      'Abide not but in the rose-garden of the spirit.'
    );
  });

  it('read list', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read list'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      content: `The following texts are available in my ` +
                      `library, user username.`,
      embed: {
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
      }
    });
  });

  it('read random', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '!read random'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      type: 'rich'
    });

    expect(
      message.channel.send.firstCall.firstArg.author.iconURL
    ).to.equal(
      'https://cdn.discordapp.com/avatars/user-id/user-avatar-url.webp'
    );
    expect(
      message.channel.send.firstCall.firstArg.author.url
    ).to.be.undefined;
    expect(
      message.channel.send.firstCall.firstArg.author.name
    ).to.be.a.string;
    expect(
      message.channel.send.firstCall.firstArg.description
    ).to.be.a.string;
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.calledWith('Query completed.')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your query.'
    );

    expect(
      message.channel.send.firstCall.firstArg.embed.description
    ).to.have.string(
      'Bahai9 has returned the following random page, AB:\n\n **'
    ).and.to.have.string(
      '(https://bahai9.com/wiki/'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.calledWith('Query completed.')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your query.'
    );

    expect(
      message.channel.send.firstCall.firstArg.embed.description
    ).to.have.string(
      'Bahaimedia has returned the following random page, AB:\n\n **'
    ).and.to.have.string(
      '(https://bahai.media/File%3A'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
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

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.error.calledWith('Error retrieving random wiki URL')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      content: `Here is the result of your query.`,
      embed: {
        color: 3447003,
        description: `<:bstar:327468698032013312> Bahai9 did not ` +
          `return any results for your query, AB. ` +
          `There may have been a network problem. If you think ` +
          `you're getting this message in error, you may want to ` +
          `try again later.`
      }
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.calledWith('Search completed: God => God')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      message.channel.send.firstCall.firstArg.embed.description
    ).to.have.string(
      'has returned the following page as the top result ' +
        'for your search, AB:\n\n **[God](https://bahai9.com/wiki/God)**\n\n'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.calledWith(
        'Search completed: ‘Abdu’l-Bahá => File:‘Abdu’l-Bahá ' +
          'at Berkeley.jpg'
      )
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      message.channel.send.firstCall.firstArg.embed.description
    ).to.have.string(
      'has returned the following page as the top result ' +
        'for your search, AB:\n\n **[File:‘Abdu’l-Bahá at ' +
        'Berkeley.jpg](https://bahai.media/File%3A%E2%80%98Abdu%E2%80%99l-Bah%C3%A1%20at%20Berkeley.jpg)**\n\n'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.calledWith('Search completed: God => God')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      message.channel.send.firstCall.firstArg.embed.description
    ).to.have.string(
      'has returned the following page as the top result ' +
        'for your search, AB:\n\n **[God](https://bahaipedia.org/God)**\n\n'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.calledWith('Search completed: God => God')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      message.channel.send.firstCall.firstArg.embed.description
    ).to.have.string(
      'has returned the following page as the top result ' +
        'for your search, AB:\n\n **[God](https://bahaipedia.org/God)**\n\n'
    ).and.to.not.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.calledWith('Search completed: God is great -2 => Nabíl-i-A‘ẓam')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      message.channel.send.firstCall.firstArg.embed.description
    ).to.have.string(
      'has returned the following page as the top result ' +
        'for your search, AB:\n\n **[Canada](https://bahaipedia.org/Canada)**\n\n'
    ).and.to.have.string(
      `<:bstar:${DiscordConstants.BSTAR_EMOJI_ID_LAB}>`
    );
    expect(
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.firstCall.firstArg
    ).to.equal('Result:');

    expect(
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your search.'
    );

    expect(
      message.channel.send.firstCall.firstArg.embed.description
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

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.error.calledWith('Error retrieving wiki search URL')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      content: `Here is the result of your search.`,
      embed: {
        color: 3447003,
        description: `<:bstar:327468698032013312> Bahai9 did not ` +
          `return any results for your search, AB. ` +
          `Did you spell your search terms correctly?\n\n` +
            `There may also have been a network problem. ` +
            `If you think you're getting this message in ` +
            `error, you may want to try again later.`
      }
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

    client.emit('message', message);

    await commandFinished(client);

    expect(
      console.error.calledWith('Error retrieving JSON for today URL')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg
    ).to.deep.include({
      content: `Here is the result of your query.`,
      embed: {
        color: 3447003,
        description: `<:bstar:327468698032013312> Bahaipedia did not ` +
          `return any results for your query, AB. ` +
          `There may have been a network problem. If you think ` +
            `you're getting this message in error, you may want to ` +
            `try again later.`
      }
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.calledWith('Query completed.')
    ).to.be.true;

    expect(
      message.channel.send.firstCall.firstArg.content
    ).to.equal(
      'Here is the result of your query.'
    );

    expect(
      message.channel.send.firstCall.firstArg.embed.description
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

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);
    expect(
      message.channel.send.firstCall
    ).to.be.null;
    expect(
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

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
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

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);
    expect(
      message.channel.send.firstCall
    ).to.be.null;
    expect(
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');

    client.emit('message', message);

    expect(
      console.log.calledWith('Checkin command issued by AB.')
    ).to.be.true;

    expect(
      console.log.calledWith("Checking in on Bahá'í.FYI.")
    ).to.be.true;

    expect(
      console.error.notCalled
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

    const {client} = await bot({
      checkins: true,
      client: discord.getClient()
    });

    const message = discord.getMessage();

    this.sinon.spy(console, 'error');
    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
      console.log.calledWith('Checkin command issued by AB.')
    ).to.be.true;
    expect(
      console.log.calledWith("Checking in on Bahá'í.FYI.")
    ).to.be.true;
  });

  it('ping', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'ping'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.have.string('Pong');
  });

  it('sup', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'sup'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.satisfy((val) => {
      return val.includes('Just waiting') ||
        val.includes('Same as') ||
        val.includes('Same old') ||
        val.includes('like usual') ||
        val.includes('to be here');
    }).and.to.have.string(
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

    client.emit('message', message);

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
      message.channel.send.firstCall.firstArg
    ).to.have.string('Alláh-u-Abhá').and.to.have.string(
      'user username'
    ).and.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
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

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.firstCall.firstArg
    ).to.have.string('Alláh-u-Abhá').and.to.have.string(
      'user username'
    ).and.not.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
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

    const {client} = await bot({client: discord.getClient()});

    const guild = discord.clientGuild;

    const user = discord.mockUser({
      guild
    });

    const message = discord.mockMessage({
      guild,
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

    client.emit('message', message);

    await commandFinished(client);
    const {
      find: {
        argSpies: [[emojisFinderSpy]]
      }
    } = clientEmojisCache;

    expect(emojisFinderSpy.firstCall.firstArg.name).to.equal('9star');
    expect(emojisFinderSpy.firstCall.returnValue).to.equal(true);

    expect(
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

    client.emit('message', message);

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

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    await commandFinished(client);
    expect(
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

    client.emit('message', message);

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
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Naw-Rúz!').and.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    ).and.to.have.string(
      `<:sabzi:${DiscordConstants.SABZI_EMOJI_ID_FYI}>`
    );
    expect(
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

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Naw-Rúz!').and.to.have.string(
      `<:sabzi:${DiscordConstants.SABZI_EMOJI_ID_FYI}>`
    ).and.to.not.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
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

    client.emit('message', message);

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
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Naw-Rúz!').and.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    ).and.to.not.have.string(
      `<:sabzi:${DiscordConstants.SABZI_EMOJI_ID_FYI}>`
    );
    expect(
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

    client.emit('message', message);

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
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Ridván!').and.to.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
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
          ]
        }
      ]
    });

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

    client.emit('message', message);

    await commandFinished(client);
    expect(
      message.channel.send.firstCall.firstArg
    ).to.have.string('Happy Ridván!').and.to.not.have.string(
      `<:9star:${DiscordConstants._9STAR_EMOJI_ID_FYI}>`
    );
    expect(
      message.react.firstCall
    ).to.be.null;
  });

  it('morning', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'good morning'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
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

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
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

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
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

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
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

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
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

    const {client} = await bot({client: discord.getClient()});

    const guild = discord.clientGuild;

    const user = discord.mockUser({
      guild
    });

    const message = discord.mockMessage({
      guild,
      content: 'welcome',
      user,
      mentions: [
        {...discord.user, member: discord.guildMember}
      ]
    });

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    client.emit('message', message);

    await commandFinished(client);
    expect(
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

      const {client} = await bot({
        client: discord.getClient(),
        /**
         * @param {Settings} system
         * @returns {Settings}
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
        guild,
        content: 'welcome',
        user,
        mentions: [
          {...discord.user, member: discord.guildMember}
        ]
      });

      this.sinon.spy(message.channel, 'send');
      this.sinon.spy(message, 'react');

      client.emit('message', message);

      expect(
        message.react.firstCall
      ).to.be.null;
    }
  );

  it('coffee', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '\u{2615}'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.have.string(':coffee:');
  });

  it('tea', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '\u{1F375}'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.have.string(':tea:');
  });

  it('tea (not mentioned)', async function () {
    const discord = new MockDiscord({
      messageContent: '\u{1F375}'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message, 'react');

    client.emit('message', message);

    expect(
      message.react.firstCall.firstArg
    ).to.equal('🍵');
  });

  it('popcorn', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: '\u{1F37F}'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.have.string(':popcorn:');
  });

  it('popcorn (not mentioned)', async function () {
    const discord = new MockDiscord({
      messageContent: '\u{1F37F}'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message, 'react');

    client.emit('message', message);

    expect(
      message.react.firstCall.firstArg
    ).to.equal('🍿');
  });

  it('unladen', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'unladen swallow'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.have.string('European swallow');
  });

  it('bruh', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'bruh'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.equal('Bruh.');
  });

  it('goodbot', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'good bot'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.equal('Thanks!');
    expect(
      message.react.firstCall.firstArg
    ).to.equal('😊');
  });

  it('badbot', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'badbot'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');
    this.sinon.spy(message, 'react');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.equal('Sorry.');
    expect(
      message.react.firstCall.firstArg
    ).to.equal('☹️');
  });

  it('repeating yourself', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: 'repeating yourself'
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.satisfy((val) => {
      return (/sorry|oops/u).test(val) ||
        val.includes('chatbot') ||
        val.includes('happen a lot') ||
        val.includes('tend to do that');
    });
  });

  it('santacat', async function () {
    const discord = new MockDiscord({
      mentionEveryone: true,
      messageContent: "santa's cat"
    });

    const {client} = await bot({client: discord.getClient()});

    const message = discord.getMessage();

    this.sinon.spy(message.channel, 'send');

    client.emit('message', message);

    expect(
      message.channel.send.firstCall.firstArg
    ).to.satisfy((val) => {
      return val.includes('Not telling') ||
        val.includes('secret to everybody') ||
        val.includes('make a meme') ||
        val.includes('This one?') ||
        val.includes('like to know') ||
        val.includes('Who do you think');
    });
  });
});
