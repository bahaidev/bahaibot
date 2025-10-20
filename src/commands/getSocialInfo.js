import istr from '../utils/istr.js';

/**
* @param {object} cfg
* @param {string[]} cfg.ADMIN_ROLES
* @param {import('discord.js').Client} cfg.client
* @returns {import('./getCommands.js').BotCommands}
*/
const getSocialInfo = ({
  ADMIN_ROLES, client
}) => {
  return {
    users: {
      re: /!users\b/iv,
      // helpInfo: {
      //  name: '!users',
      //  value: 'Displays a count of online users.'
      // }
      /* c8 ignore next 52 -- Reenable when testing again */
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
            user: admin,
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
      re: /!seen\b/iv,
      // helpInfo: {
      //  name: '!seen',
      //  value: 'Displays the last time a user was seen online.'
      // },
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

        // const {guild} = message;
        // const userOnline = guild.members.cache.filter(
        //  (m) => m.presence.status === 'online').size;
        // let userStatus = '';
        const replies = [];

        const user = client.users.cache.find((val) => {
          return val.username === sname;
        });
        if (!user) {
          replies.push(`I haven't seen ${sname} lately.`);
        /* c8 ignore next 41 -- Reenable when testing again */
        } else {
          // userStatus = user.presence.status;

          const member = await message.guild.members.fetch({
            user,
            withPresences: true
          });
          const {channel} = message;
          const messages = await channel.messages.fetch({limit: 100});
          const userMessages = messages.filter(
            (msg) => msg.author.id === user.id
          );
          const lastUserMessage = userMessages.first();

          if (lastUserMessage) {
            const stat = (
              member.presence?.status === 'dnd'
                ? 'busy'
                : member.presence?.status
            );
            const lastseen = new Date(lastUserMessage.createdAt);
            const now = new Date();
            const timedelta = (now > lastseen)
              ? Number(now) - Number(lastseen)
              : 0;
            replies.push(
              `${sname} is now ${stat}, and was last seen in ${
                channel
              } ${istr(timedelta / 1000)} ago.`
            );
          } else {
            const stat = (
              member.presence?.status === 'dnd'
                ? 'busy'
                : member.presence?.status
            );
            replies.push(
              `${sname} is now ${stat}; I haven't seen them lately.`
            );
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
