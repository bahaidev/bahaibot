/* eslint-disable camelcase -- Actual API */
/**
 * @see https://github.com/discordjs/discord.js/issues/3576#issuecomment-589673184
 */

import * as Discord from 'discord.js';

/**
 * @typedef {object} MockDiscordOptions
 * @property {Guild[]} [guilds]
 * @property {boolean} [guildChannels]
 * @property {boolean} [mentionEveryone]
 * @property {string} [messageContent]
 * @property {string} [userID]
 * @property {string} [roleID]
 * @property {string} [userName]
 * @property {string} [clientName]
 * @property {boolean} [hideUserStatus]
 * @property {import('discord.js').User} [messageUser]
 * @property {boolean} [addClientUser]
 */

/**
 *
 */
class MockDiscord {
  /**
   * @param {import('discord.js').Client} client
   * @param {string} guildName
   * @param {string} guildID
   * @param {import('discord.js').Role} role
   * @returns {import('discord.js').Guild}
   */
  static createGuild (client, guildName, guildID, role) {
    // @ts-expect-error We need it for mocking
    const guild = new Discord.Guild(client, {
      unavailable: false,
      id: guildID || 'guild-id',
      name: guildName || 'mocked discord.js guild',
      icon: 'mocked guild icon url',
      splash: 'mocked guild splash url',
      region: 'eu-west',
      member_count: 42,
      large: false,
      features: [],
      application_id: 'application-id',
      afkTimeout: 1000,
      afk_channel_id: 'afk-channel-id',
      system_channel_id: 'system-channel-id',
      embed_enabled: true,
      verification_level: 2,
      explicit_content_filter: 3,
      mfa_level: 8,
      joined_at: new Date('2018-01-01').getTime(),
      owner_id: 'owner-id',
      channels: [],
      roles: [],
      presences: [],
      voice_states: [],
      emojis: []
    });

    if (role) {
      role.guild = guild;

      guild.roles.cache.set(role.id, role);
    }

    return guild;
  }

  /**
   * @param {MockDiscord} discord
   * @param {import('discord.js').Guild} guild
   * @param {string} name
   * @param {boolean} guildChannels
   * @param {string} type
   * @param {import('discord.js').Client} client
   * @param {string} [channelID]
   * @param {boolean} [clear]
   * @returns {import('discord.js').GuildChannel|
   *   import('discord.js').TextChannel}
   */
  static createGuildChannel (
    discord, guild, name, guildChannels, type, client, channelID, clear = true
  ) {
    // @ts-expect-error We need it for mocking
    const guildChannel = new Discord[
      type === 'text' ? 'TextChannel' : 'GuildChannel'
    ](
      guild,
      {
        ...discord.channel,
        id: channelID,
        name,
        position: 1,
        parent_id: '123456789',
        permission_overwrites: [],
        ...(type === 'text' ? {messages: []} : {})
      },
      client
    );

    // This is part of Guild, but wait until guild channel available to add
    const channels = [
      guildChannel
    ];
    if (guildChannels) {
      if (clear) {
        guild.channels.cache.clear();
      }
      for (const rawChannel of channels) {
        guild.channels.create(rawChannel);
      }
    }

    return guildChannel;
  }

  /**
  * @typedef {object} NameID
  * @property {string} id
  * @property {string} name
  */

  /**
   * @typedef {object} Channel
   * @property {string} [id]
   * @property {string} name
   */

  /**
   * @typedef {object} Emoji
   * @property {string} [id]
   * @property {string} [emojiID]
   * @property {string} name
   */

  /**
  * @typedef {NameID & {
  *   userID?: string,
  *   userName?: string,
  *   channels?: Channel[],
  *   emojis?: Emoji[]
  * }} Guild
  */

  /**
   * @param {MockDiscordOptions} opts
   */
  constructor (opts = {}) {
    const {client, role, clientGuilds, textChannels} = this.mockClient({
      name: opts.clientName,
      guilds: opts.guilds,
      roleID: opts.roleID
    });
    this.client = client;
    this.role = role;
    this.clientGuilds = clientGuilds;
    this.clientGuild = clientGuilds[0];

    textChannels.forEach((textChannel) => {
      client.channels.cache.set(textChannel.id, textChannel);
    });

    this.guild = this.mockGuild(
      opts.guilds?.[0]?.id ?? '', opts.guilds?.[0]?.name ?? '', role
    );
    this.channel = this.mockChannel(opts.guilds?.[0]?.channels?.[0]?.id ?? '');
    this.textChannel = this.mockTextChannel();
    this.user = this.mockUser({
      userID: opts.userID,
      userName: opts.userName,
      hideUserStatus: opts.hideUserStatus
    });
    if (opts.addClientUser !== false) {
      // Client logged in as:
      this.client.user = this.user;
    }

    this.guildMember = this.mockGuildMember();

    client.emit('guildMemberAdd', this.guildMember);

    this.message = this.mockMessage({
      user: opts.messageUser,
      content: opts.messageContent,
      mentionEveryone: opts.mentionEveryone
    });
  }

  /**
   * @returns {import('discord.js').Client}
   */
  getClient () {
    return this.client;
  }
  /**
   * @returns {import('discord.js').Guild}
   */
  getGuild () {
    return this.guild;
  }
  /**
   * @returns {import('discord.js').GuildChannel}
   */
  getChannel () {
    return this.channel;
  }
  /**
   * @returns {import('discord.js').GuildChannel}
   */
  getGuildChannel () {
    return /** @type {import('discord.js').GuildChannel} */ (this.guildChannel);
  }
  /**
   * @returns {import('discord.js').TextChannel}
   */
  getTextChannel () {
    return this.textChannel;
  }
  /**
   * @returns {import('discord.js').User}
   */
  getUser () {
    return this.user;
  }
  /**
   * @returns {import('discord.js').GuildMember}
   */
  getGuildMember () {
    return this.guildMember;
  }
  /**
   * @returns {import('discord.js').Message<true>}
   */
  getMessage () {
    return this.message;
  }
  /**
   * @param {object} cfg
   * @param {string} [cfg.name]
   * @param {Guild[]} [cfg.guilds]
   * @param {string} [cfg.roleID]
   * @returns {{
   *   client: import('discord.js').Client,
   *   role: import('discord.js').Role,
   *   clientGuilds: import('discord.js').Guild[],
   *   textChannels: import('discord.js').TextChannel[]
   * }}
   */
  mockClient ({name, guilds, roleID}) {
    const client = new Discord.Client({
      intents: [
        Discord.GatewayIntentBits.Guilds,
        Discord.GatewayIntentBits.GuildMessages,
        Discord.GatewayIntentBits.MessageContent,
        Discord.GatewayIntentBits.GuildMembers,
        Discord.GatewayIntentBits.GuildPresences
      ]
    });

    const role = this.mockRole({client, name, roleID});

    // Don't actually login
    // @ts-expect-error Just for mocking
    client.login = () => {
      // Empty
    };

    if (!guilds) {
      return {client, role, clientGuilds: [], textChannels: []};
    }

    /** @type {import('discord.js').TextChannel[]} */
    const textChannels = [];
    const clientGuilds = guilds.map(({
      id: guildID,
      name: guildName,
      channels,
      emojis
    }) => {
      // `client.emojis` reads from `client.guilds.cache`, so we add to it
      //   instead of anything on the readonly `client.emojis`
      const guild = MockDiscord.createGuild(
        client, guildName, guildID, role
      );

      if (emojis) {
        emojis.forEach(({id, name}) => {
          // @ts-expect-error We need it for mocking
          const guildEmoji = new Discord.GuildEmoji(client, {
            id,
            name
          }, guild);
          guild.emojis.cache.set(/** @type {string} */ (id), guildEmoji);
        });
      }

      client.guilds.cache.set(guildID, guild);

      if (channels) {
        channels.forEach(({id, name}, idx) => {
          const channel = MockDiscord.createGuildChannel(
            this, guild, name, true, 'text', client, id, idx === 0
          );
          textChannels.push(
            /** @type {import('discord.js').TextChannel} */ (channel)
          );
          // console.log('channel2', channel, channelName);
          guild.channels.cache.set(
            /** @type {string} */ (id),
            /** @type {import('discord.js').TextChannel} */ (channel)
          );
        });
      }

      // console.log('guild.channels.cache', guild.channels.cache.array());
      return guild;
    });

    return {client, role, clientGuilds, textChannels};
  }

  /* eslint-disable class-methods-use-this -- Consistent */
  /**
  * @param {object} cfg
  * @param {import('discord.js').Client} cfg.client
  * @param {string} [cfg.roleID]
  * @param {string} [cfg.name]
  * @returns {import('discord.js').Role}
  */
  mockRole ({client, roleID, name}) {
    // @ts-expect-error We need it for mocking
    return new Discord.Role(client, {
      id: roleID,
      name
    });
  }
  /* eslint-enable class-methods-use-this -- Consistent */

  /**
   * @param {string} guildID
   * @param {string} guildName
   * @param {import('discord.js').Role} role
   * @returns {import('discord.js').Guild}
   */
  mockGuild (guildID, guildName, role) {
    return MockDiscord.createGuild(
      this.client, guildName, guildID, role
    );
  }
  /**
   * @param {string} [id]
   * @returns {import('discord.js').GuildChannel}
   */
  mockChannel (id) {
    // @ts-expect-error We need it for mocking
    return new Discord.GuildChannel(this.guild, {
      id: id || 'channel-id'
    }, this.client);
  }
  /**
   * @param {string} name
   * @param {boolean} guildChannels
   * @param {string} type
   * @returns {void}
   */
  mockGuildChannel (name, guildChannels, type) {
    this.guildChannel = MockDiscord.createGuildChannel(
      this, this.guild, name, guildChannels, type, this.client
    );
  }
  /**
   * @returns {import('discord.js').TextChannel}
   */
  mockTextChannel () {
    // @ts-expect-error We need it for mocking
    return new Discord.TextChannel(
      this.guild,
      {
        ...this.guildChannel,
        topic: 'topic',
        nsfw: false,
        last_message_id: '123456789',
        lastPinTimestamp: new Date('2019-01-01').getTime(),
        rate_limit_per_user: 0,
        messages: []
      },
      this.client
    );
  }

  /**
   * @param {object} cfg
   * @param {import('discord.js').User} cfg.user
   * @param {string} cfg.status
   * @returns {import('discord.js').Presence}
   */
  mockPresence ({user, status}) {
    // @ts-expect-error We need it for mocking
    return new Discord.Presence(this.client, {
      user,
      status
    });
  }

  /**
   * @param {object} [cfg]
   * @param {string} [cfg.userID]
   * @param {string} [cfg.userName]
   * @param {import('discord.js').Guild} [cfg.guild]
   * @param {string} [cfg.status]
   * @param {string[]} [cfg.roles]
   * @param {boolean} [cfg.hideUserStatus]
   * @param {import('discord.js').Client} [cfg.client]
   * @returns {import('discord.js').ClientUser}
   */
  mockUser ({
    userID, userName, guild, status, roles,
    hideUserStatus, client = this.client
  } = {}) {
    // @ts-expect-error We need it for mocking
    const user = new Discord.ClientUser(this.client, {
      id: userID || 'user-id',
      username: userName || 'user username',
      discriminator: 'user#0000',
      avatar: 'user-avatar-url',
      bot: false
    });

    if (guild && status) {
      // // @ts-expect-error We need it for mocking
      // const mockMember = new Discord.GuildMember(
      //   this.client,
      //   {
      //     user,
      //     guild
      //   }
      // );
      const mockMember = this.mockGuildMember({user});

      client.emit('guildMemberAdd', mockMember);

      const oldPresence = null;
      // @ts-expect-error We need it for mocking
      const newPresence = new Discord.Presence(
        this.client, {status, user}
      );
      client.emit('presenceUpdate', oldPresence, newPresence);
      /*
      // Above code is untested; this is the previous code (for the old API)
      guild.presences.add({
        guild,
        user,
        // activities: []
        // client_status: {web, mobile, desktop}
        status
      });
      */
    }
    if (guild) {
      const guildMember = this.mockGuildMember({
        user,
        roles
      });

      // Sets as non-array giving problems for `GuildMember`
      // GuildMemberRoleManager.js (_roles getter):
      //   this.member._roles.includes is not a function
      // ...so use `.cache.set()` as below instead
      // guild.members.add(guildMember);
      guild.members.cache.set(user.id, guildMember);

      client.guilds.cache.set(guild.id, guild);
    }

    if (!hideUserStatus) {
      client.users.cache.set(user.id, user);
    }

    return user;
  }

  /**
   * @param {object} [cfg]
   * @param {import('discord.js').User} [cfg.user]
   * @param {string[]} [cfg.roles]
   * @returns {import('discord.js').GuildMember}
   */
  mockGuildMember ({user, roles} = {}) {
    // @ts-expect-error We need it for mocking
    return new Discord.GuildMember(this.client, {
      deaf: false,
      mute: false,
      self_mute: false,
      self_deaf: false,
      session_id: 'session-id',
      channel_id: 'channel-id',
      nick: 'nick',
      joined_at: new Date('2020-01-01').getTime(),
      user: user || this.user,
      roles: roles || []
    }, this.clientGuild || this.guild);
  }
  /**
   * @param {object} cfg
   * @param {string} [cfg.content]
   * @param {boolean} [cfg.mentionEveryone]
   * @param {import('discord.js').User} [cfg.user]
   * @param {{
   *   member: import('discord.js').GuildMember
   * }[]} [cfg.mentions]
   * @returns {import('discord.js').Message<true>}
   */
  mockMessage ({content, mentionEveryone, user, mentions}) {
    // @ts-expect-error We need it for mocking
    const msg = new Discord.Message(this.client, {
      id: 100000n, // 'message-id',
      type: 'DEFAULT',
      content: content || 'this is the message content',
      author: user || this.user,
      webhook_id: null,
      // Tried to add for sake of `puppet` permissions test, but caused problems
      //   with Discord not accepting `member` of `Message` with its `roles`
      //   being different than that expected; see also commented out portion
      //   just below.
      // member: this.guildMember,
      pinned: false,
      tts: false,
      nonce: 'nonce',
      embeds: [],
      attachments: [],
      edited_timestamp: null,
      reactions: [],
      mentions,
      mention_roles: [],
      mention_everyone: Boolean(mentionEveryone),
      hit: false
    });

    // Is otherwise readonly
    Object.defineProperty(msg, 'channel', {
      configurable: true,
      value: this.textChannel
    });

    return msg;
    // this.message.guild.members.add(this.guildMember);
  }

  /* eslint-disable class-methods-use-this -- Consistent */
  /**
   * @param {object} cfg
   * @param {import('discord.js').Message<true>} cfg.message
   * @param {import('discord.js').Collection<import('discord.js').Snowflake,
   *   import('discord.js').User>} cfg.users
   * @param {import('discord.js').Collection<import('discord.js').Snowflake,
   *   import('discord.js').Role>} cfg.roles
   * @param {boolean} cfg.everyone
   * @param {import('discord.js').Collection<import('discord.js').Snowflake,
   *  import('discord.js').CrosspostedChannel
   * >} cfg.crosspostedChannels
   * @returns {import('discord.js').MessageMentions}
   */
  mockMessageMentions ({
    message, users, roles, everyone, crosspostedChannels
  }) {
    /* eslint-enable class-methods-use-this -- Consistent */
    // @ts-expect-error We need it for mocking
    return new Discord.MessageMentions(
      message, users, roles, everyone, crosspostedChannels
    );
  }
}

export default MockDiscord;
