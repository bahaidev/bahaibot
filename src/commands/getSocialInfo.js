import istr from '../utils/istr.js';

/**
* @param {PlainObject} cfg
* @param {string[]} cfg.ADMIN_ROLES
* @param {DiscordClient} cfg.client
* @returns {BotCommands}
*/
const getSocialInfo = ({
  ADMIN_ROLES, client
}) => {
  return {
    users: {
      re: /!users\b/iu,
      // helpInfo: {
      //  name: '!users',
      //  value: 'Displays a count of online users.'
      // }
      /**
       * Users gives the number of online users.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        const {guild} = message;
        const onlineCount = guild.members.cache.filter(
          (m) => m.presence.status !== 'offline'
        ).size;

        const admins = guild.members.cache.filter((m) => {
          if (
            m.roles.cache.some((r) => {
              return ADMIN_ROLES.includes(r.name);
            })
          ) {
            return m.presence.status !== 'offline';
          }
          return false;

          // console.log(m.roles)
        });

        message.channel.send(
          `There ${
            (onlineCount === 1) ? 'is' : 'are'
          } currently ${onlineCount} user${
            (onlineCount === 1) ? '' : 's'
          } online, including ${
            admins.size
          } admin/mod/helper(s).`
        );

        // eslint-disable-next-line no-console -- CLI
        console.log(`Users command issued by ${message.author.username}.`);
      }
    },
    seen: {
      re: /!seen\b/iu,
      // helpInfo: {
      //  name: '!seen',
      //  value: 'Displays the last time a user was seen online.'
      // },
      /**
       * Seen returns the last time a user sent a message.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        const words = message.content.split(' ').slice(1);

        // const {guild} = message;
        // const userOnline = guild.members.cache.filter(
        //  (m) => m.presence.status === 'online').size;
        // let userStatus = '';
        const replies = [];

        words.forEach(function (item, index, array) {
          const user = client.users.cache.find((val) => {
            return val.username === item;
          });
          if (!user) {
            replies.push(`I haven't seen ${item} lately.`);
            return;
          }
          // userStatus = user.presence.status;

          // Todo: Stop ignoring this once test in place.
          /* c8 ignore next 13 */
          if (user.lastMessage) {
            const lastchan = user.lastMessage.channel;
            const stat = (
              user.presence.status === 'dnd' ? 'busy' : user.presence.status
            );
            const lastseen = new Date(user.lastMessage.createdAt);
            const now = new Date();
            const timedelta = now - lastseen;
            replies.push(
              `${item} is now ${stat}, and was last seen in ${
                lastchan
              } ${istr(timedelta / 1000)} ago.`
            );
          } else {
            const stat = (
              user.presence.status === 'dnd' ? 'busy' : user.presence.status
            );
            replies.push(
              `${item} is now ${stat}; I haven't seen them lately.`
            );
          }
        });

        message.channel.send(replies.join('\n'));

        // eslint-disable-next-line no-console -- CLI
        console.log(`Seen command issued by ${message.author.username}.`);
      }
    }
  };
};

export default getSocialInfo;
