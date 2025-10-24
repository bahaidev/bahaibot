import istr from '../utils/istr.js';

/* c8 ignore next 57 -- Todo: Reenable when testing again */
/**
 * Finds the last message sent by a user, including threads, in a specific
 *   guild.
 * @param {import('discord.js').Guild} guild The guild to search.
 * @param {import('discord.js').User} user The user to find the last
 *   message for.
 * @param {number} limit
 * @returns {Promise<{
 *   lastMessage: import('discord.js').Message|null,
 *   lastChannel: import('discord.js').Channel|null
 * }>} The last message,
 *   or null if not found.
 */
async function getLastUserMessage (guild, user, limit = 100) {
  /** @type {import('discord.js').Message|null} */
  let lastMessage = null;
  /** @type {import('discord.js').Channel|null} */
  let lastChannel = null;

  // Get all text and news channels.
  const textChannels = guild.channels.cache.filter((c) => c.isTextBased());

  // Create an array of all channels and threads to check.
  const channelsAndThreads = [...textChannels.values()];

  // Fetch all active threads in the guild and add them to the array.
  const activeThreads = await guild.channels.fetchActiveThreads();
  channelsAndThreads.push(...activeThreads.threads.values());

  // Now, iterate through all channels and threads.
  await Promise.all(channelsAndThreads.map(async (channel) => {
    let messages;
    try {
      // Fetch the last (default 100) messages in the channel or thread.
      messages = await channel.messages.fetch({limit});
    } catch (err) {
      // Ignore moderator-only channels
      return;
    }

    // Find the most recent message by the target user in this batch.
    const userMessage = messages.filter(
      (m) => m.author.id === user.id
    ).first();

    // Compare it to the current latest message found.
    if (userMessage &&
      (!lastMessage ||
        userMessage.createdTimestamp > lastMessage.createdTimestamp)
    ) {
      lastMessage = userMessage;
      lastChannel = channel;
    }
  }));

  return {lastMessage, lastChannel};
}

/**
* @param {object} cfg
* @param {string[]} cfg.ADMIN_ROLES
* @param {import('discord.js').Client} cfg.client
* @param {import('discord.js')} cfg.Discord
* @returns {import('./getCommands.js').BotCommands}
*/
const getSocialInfo = ({
  ADMIN_ROLES, client, Discord
}) => {
  return {
    users: {
      name: 'users',
      description: 'Displays a count of online users',
      re: /!users\b/iv,
      helpExtra: {
        name: '!users',
        value: 'Displays a count of online users.'
      },
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (!interaction.inCachedGuild()) {
          return;
        }
        await this.action?.({
          author: interaction.user,
          guild: interaction.guild,
          channel: {
            /**
             * @param {string} reply
             */
            // @ts-expect-error Just mocking what we need
            send (reply) {
              interaction.reply(reply);
            }
          }
        });
      },
      /**
       * Users gives the number of online users.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        const {guild} = message;
        const onlineCount = guild?.members.cache.filter(
          (m) => m.presence?.status !== 'offline'
        ).size;

        /* c8 ignore next 33 -- Todo: complete with testing */
        const allAdmins = guild?.members.cache.filter((m) => {
          return (
            m.roles.cache.some((r) => {
              return ADMIN_ROLES.includes(r.name);
            })
          );
          // console.log(m.roles)
        });

        let adminCount = 0;
        for (const admin of allAdmins) {
          // eslint-disable-next-line no-await-in-loop -- Convenient
          const member = await guild.members.fetch({
            user: admin[1].user,
            withPresences: true
          });

          if (
            member && 'presence' in member &&
            member.presence &&
            typeof member.presence === 'object' &&
            'status' in member.presence &&
            member.presence.status !== 'offline'
          ) {
            adminCount++;
          }
        }

        message.channel.send(
          `There ${
            (onlineCount === 1) ? 'is' : 'are'
          } currently ${onlineCount} user${
            (onlineCount === 1) ? '' : 's'
          } online, including ${
            adminCount
          } admin/mod/helper(s).`
        );

        // eslint-disable-next-line no-console -- CLI
        console.log(`Users command issued by ${message.author.username}.`);
      }
    },
    seen: {
      name: 'seen',
      description: 'Displays the last time a user was seen online.',
      options: [
        {
          name: 'user',
          description: 'The user to check',
          type: Discord.ApplicationCommandOptionType.User,
          required: true
        }
      ],
      re: /!seen\b/iv,
      helpExtra: {
        name: '!seen',
        value: 'Displays the last time a user was seen online.'
      },
      /**
       * @param {import('./getCommands.js').
       *   InputCommandOrSelectMenu} interaction
       * @returns {Promise<void>}
       */
      async slashCommand (interaction) {
        /* c8 ignore next 3 -- TS guard */
        if (!interaction.inCachedGuild() || interaction.isStringSelectMenu()) {
          return;
        }
        await this.action?.({
          author: interaction.user,
          content: String(interaction.options.get('user')?.value),
          guild: interaction.guild,
          channel: {
            /**
             * @param {string} reply
             */
            // @ts-expect-error Just mocking what we need
            send (reply) {
              interaction.reply(reply);
            }
          }
        });
      },
      /**
       * Seen returns the last time a user sent a message.
       * @param {import('discord.js').Message<true>} message
       * @returns {Promise<void>}
       */
      async action (message) {
        const sname = message.content.split(' ').filter(
          (word) => !(word.includes('391405681795923968') ||
            word.includes('847456996738334730') || word === '!seen')
        ).join(' ');

        const replies = [];

        const user = client.users.cache.find((val) => {
          return val.username === sname;
        });

        const haventSeen = () => {
          replies.push(`I haven't seen ${sname
            ? sname.split(' ').map((name) => {
              return `@${name}`;
            }).join(' ')
            : ''
          } lately.`);
        };

        if (!user) {
          haventSeen();
        /* c8 ignore next 50 -- Todo: Reenable when testing again */
        } else {
          const member = await message.guild.members.fetch({
            user,
            withPresences: true
          });

          const {
            lastMessage,
            lastChannel
          } = await getLastUserMessage(message.guild, user);
          if (lastMessage) {
            const stat = (
              member.presence?.status === 'dnd'
                ? 'busy'
                // c8 ignore next -- Inconsistent? */
                : member.presence?.status ?? 'offline'
            );
            if (stat === 'offline') {
              // User is invisible, so don't leak presence to channel
              haventSeen();
            } else {
              const lastseen = new Date(lastMessage.createdAt);
              const now = new Date();
              const timedelta = (now > lastseen)
                ? Number(now) - Number(lastseen)
                : 0;
              replies.push(
                `${sname} is now ${stat}, and was last seen in ${
                  lastChannel
                } ${istr(timedelta / 1000)} ago.`
              );
            }
          } else {
            const stat = (
              member.presence?.status === 'dnd'
                ? 'busy'
                // c8 ignore next -- Inconsistent? */
                : member.presence?.status ?? 'offline'
            );
            if (stat === 'offline') {
              // User is invisible, so don't leak presence to channel
              haventSeen();
            } else {
              replies.push(
                `${sname} is now ${stat}; I haven't seen them lately.`
              );
            }
          }
        }

        message.channel.send(replies.join('\n'));

        // eslint-disable-next-line no-console -- CLI
        console.log(`Seen command issued by ${message.author.username}.`);
      }
    }
  };
};

export default getSocialInfo;
