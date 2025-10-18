/**
 * @param {object} cfg
 * @param {DiscordClient} cfg.client
 * @param {Discord} cfg.Discord
 * @returns {BotCommands}
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
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        // Define the embed features
        const embed = new Discord.MessageEmbed();

        // Initialize output
        const embedDescription = "Bahá'í Bot for Discord\n";

        // Add data
        embed.setAuthor('BahaiBot', client.user.avatarURL());

        embed.setDescription(embedDescription);

        embed.addField(
          'Support Server', '[Invite link](https://discord.gg/NE6dJaw)'
        );

        message.channel.send(embed);
      }
    },
    badi: {
      re: /\bbad[íi]\b/iv,
      /**
       * @param {DiscordMessage} message
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
