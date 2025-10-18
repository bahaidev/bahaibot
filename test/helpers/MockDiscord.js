/* eslint-disable camelcase -- Actual API */
/**
 * @see https://github.com/discordjs/discord.js/issues/3576#issuecomment-589673184
 */

import Discord from 'discord.js';

/**
 *
 */
class MockDiscord {
  /**
   * @param {DiscordClient} client
   * @param {string} guildName
   * @param {string} guildID
   * @param {DiscordRole} role
   * @returns {DiscordGuild}
   */
  static createGuild (client, guildName, guildID, role) {
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
   * @param {DiscordGuild} guild
   * @param {string} name
   * @param {boolean} guildChannels
   * @param {string} type
   * @param {string} [channelID]
   * @param {boolean} [clear]
   * @returns {DiscordGuildChannel}
   */
  static createGuildChannel (
    discord, guild, name, guildChannels, type, channelID, clear = true
  ) {
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
      }
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
        guild.channels.add(rawChannel);
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
  * @typedef {NameID} Channel
  */

  /**
  * @typedef {NameID} Emoji
  */

  /**
  * @typedef {NameID} Guild
  * @property {Channel[]} channels
  * @property {Emoji[]} emojis
  */

  /**
   * @param {object} opts
   * @param {Guild[]} [opts.guilds]
   * @param {boolean} [opts.guildChannels]
   * @param {boolean} [opts.mentionEveryone]
   * @param {boolean} [opts.messageContent]
   * @param {string} [opts.userID]
   * @param {string} [opts.userName]
   * @param {string} [opts.clientName]
   * @param {DiscordUser} [opts.messageUser]
   * @param {boolean} [opts.addClientUser]
   */
  constructor (opts = {}) {
    const {client, role, clientGuilds, guildChannels} = this.mockClient({
      name: opts.clientName,
      guilds: opts.guilds,
      roleID: opts.roleID
    });
    this.client = client;
    this.role = role;
    this.clientGuilds = clientGuilds;
    this.clientGuild = clientGuilds[0];
    this.guildChannels = guildChannels;

    guildChannels.forEach((guildChannel) => {
      client.channels.cache.set(guildChannel.id, guildChannel);
    });

    this.guild = this.mockGuild(
      opts.guilds?.[0]?.id, opts.guilds?.[0]?.name, role
    );
    this.channel = this.mockChannel(opts.guilds?.[0]?.channels?.[0]?.id);
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
    this.guild.addMember(this.user, {accessToken: 'mockAccessToken'});
    this.message = this.mockMessage({
      user: opts.messageUser,
      content: opts.messageContent,
      mentionEveryone: opts.mentionEveryone
    });
  }

  /**
   * @returns {DiscordClient}
   */
  getClient () {
    return this.client;
  }
  /**
   * @returns {DiscordGuild}
   */
  getGuild () {
    return this.guild;
  }
  /**
   * @returns {DiscordChannel}
   */
  getChannel () {
    return this.channel;
  }
  /**
   * @returns {DiscordGuildChannel}
   */
  getGuildChannel () {
    return this.guildChannel;
  }
  /**
   * @returns {DiscordTextChannel}
   */
  getTextChannel () {
    return this.textChannel;
  }
  /**
   * @returns {DiscordUser}
   */
  getUser () {
    return this.user;
  }
  /**
   * @returns {DiscordGuildMember}
   */
  getGuildMember () {
    return this.guildMember;
  }
  /**
   * @returns {DiscordMessage}
   */
  getMessage () {
    return this.message;
  }
  /**
   * @param {object} cfg
   * @param {string} cfg.name
   * @param {Guild[]} cfg.guilds
   * @param {string} cfg.roleID
   * @returns {{client: Client, role: Role}}
   */
  mockClient ({name, guilds, roleID}) {
    const client = new Discord.Client();

    const role = this.mockRole({client, name, roleID});

    // Don't actually login
    client.login = () => {
      // Empty
    };

    if (!guilds) {
      return {client, role, clientGuilds: [], guildChannels: []};
    }

    const guildChannels = [];
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
          const guildEmoji = new Discord.GuildEmoji(client, {
            id,
            name
          }, guild);
          guild.emojis.cache.set(id, guildEmoji);
        });
      }

      client.guilds.cache.set(guildID, guild);

      if (channels) {
        channels.forEach(({id, name}, idx) => {
          const channel = MockDiscord.createGuildChannel(
            this, guild, name, true, 'text', id, idx === 0
          );
          guildChannels.push(channel);
          // console.log('channel2', channel, channelName);
          guild.channels.cache.set(id, channel);
        });
      }

      // console.log('guild.channels.cache', guild.channels.cache.array());
      return guild;
    });

    return {client, role, clientGuilds, guildChannels};
  }

  /* eslint-disable class-methods-use-this -- Consistent */
  /**
  * @param {object} cfg
  * @param {DiscordClient} cfg.client
  * @param {string} cfg.roleID
  * @param {string} cfg.name
  * @returns {DiscordRole}
  */
  mockRole ({client, roleID, name}) {
    return new Discord.Role(client, {
      id: roleID,
      name
    });
  }
  /* eslint-enable class-methods-use-this -- Consistent */

  /**
   * @param {string} guildID
   * @param {string} guildName
   * @param {Role} role
   * @returns {MockGuild}
   */
  mockGuild (guildID, guildName, role) {
    return MockDiscord.createGuild(
      this.client, guildName, guildID, role
    );
  }
  /**
   * @param {string} id
   * @returns {Channel}
   */
  mockChannel (id) {
    return new Discord.Channel(this.client, {
      id: id || 'channel-id'
    });
  }
  /**
   * @param {string} name
   * @param {boolean} guildChannels
   * @param {string} type
   * @returns {void}
   */
  mockGuildChannel (name, guildChannels, type) {
    this.guildChannel = MockDiscord.createGuildChannel(
      this, this.guild, name, guildChannels, type
    );
  }
  /**
   * @returns {TextChannel}
   */
  mockTextChannel () {
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
      }
    );
  }

  /**
   * @param {object} cfg
   * @param {DiscordUser} cfg.user
   * @param {string} cfg.status
   * @returns {DiscordPresence}
   */
  mockPresence ({user, status}) {
    return new Discord.Presence(this.client, {
      user,
      status
    });
  }

  /**
   * @param {object} cfg
   * @param {string} cfg.userID
   * @param {string} cfg.userName
   * @param {DiscordGuild} cfg.guild
   * @param {string} cfg.status
   * @param {DiscordRole[]} cfg.roles
   * @param {boolean} cfg.hideUserStatus
   * @param {DiscordClient} cfg.client
   * @returns {ClientUser}
   */
  mockUser ({
    userID, userName, guild, status, roles, hideUserStatus, client = this.client
  } = {}) {
    const user = new Discord.ClientUser(this.client, {
      id: userID || 'user-id',
      username: userName || 'user username',
      discriminator: 'user#0000',
      avatar: 'user-avatar-url',
      bot: false
    });

    if (guild && status) {
      guild.presences.add({
        guild,
        user,
        // activities: []
        // client_status: {web, mobile, desktop}
        status
      });
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
   * @param {object} cfg
   * @param {DiscordUser} cfg.user
   * @param {DiscordRole[]} cfg.roles
   * @returns {DiscordGuildMember}
   */
  mockGuildMember ({user, roles} = {}) {
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
   * @param {string} cfg.content
   * @param {boolean} cfg.mentionEveryone
   * @param {DiscordUser} cfg.user
   * @param {DiscordMessageMentions[]} cfg.mentions
   * @returns {DiscordMessage}
   */
  mockMessage ({content, mentionEveryone, user, mentions}) {
    return new Discord.Message(this.client, {
      id: 'message-id',
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
    }, this.textChannel);
    // this.message.guild.members.add(this.guildMember);
  }

  /* eslint-disable class-methods-use-this -- Consistent */
  /**
   * @param {object} cfg
   * @param {DiscordMessage} cfg.message
   * @param {DiscordCollection<Snowflake,DiscordUser>} cfg.users
   * @param {DiscordCollection<Snowflake,DiscordRole>} cfg.roles
   * @param {boolean} cfg.everyone
   * @param {DiscordCollection<Snowflake,
   *  DiscordCrosspostedChannel
   * >} cfg.crosspostedChannels
   * @returns {DiscordMessageMentions}
   */
  mockMessageMentions ({
    message, users, roles, everyone, crosspostedChannels
  }) {
    /* eslint-enable class-methods-use-this -- Consistent */
    return new Discord.MessageMentions(
      message, users, roles, everyone, crosspostedChannels
    );
  }
}

export default MockDiscord;
