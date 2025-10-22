/**
 * @param {object} cfg
 * @param {import('discord.js').Client} cfg.client
 * @param {import('discord.js')} cfg.Discord
 * @returns {import('./getCommands.js').BotCommands}
 */
const getBahaiInfo = ({client, Discord}) => {
  return {
    /*
      question: {
        re: /\b(?:question|q):.*\b/iv,
        action (message) {

        }
      },
    */
    info: {
      re: /!info/iv,
      helpExtra: {
        name: '!info',
        value: 'Provides a link to the support server'
      },
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        // Define the embed features
        const embed = new Discord.EmbedBuilder();

        // Initialize output
        const embedDescription = "Bahá'í Bot for Discord\n";

        // Add data
        embed.setAuthor({
          name: 'BahaiBot',
          /* c8 ignore next --- TS */
          iconURL: client.user?.avatarURL() ?? undefined
        });

        embed.setDescription(embedDescription);

        embed.addFields([
          {
            name: 'Support Server',
            value: '[Invite link](https://discord.gg/NE6dJaw)',
            inline: false
          }
        ]);

        message.channel.send({embeds: [embed]});
      }
    },
    badi: {
      re: /\bbad[íi]\b/iv,
      helpExtra: {
        name: 'badi',
        value: 'Provides a link to the illustrious Bahá\'í youth'
      },
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const star = client.emojis.cache.find((val) => val.name === '9star');
        message.channel.send(
          `OK ${
            message.author.username
          }, here you go. https://bahaipedia.org/Badí‘${star
            ? ` ${star.toString()}`
            : ''}`
        );
      }
    }
  };
};

export default getBahaiInfo;
