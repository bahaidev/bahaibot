/**
 * @param {object} cfg
 * @param {BotCommands} cfg.commands
 */
const addHelp = ({commands}) => {
  /**
  * @typedef {{name: string, value: string}} BotHelpField
  */

  const help = {
    re: /!help\b/iv,
    helpInfo: {
      name: '!help',
      value: 'Displays help text.'
    },
    /**
     * @param {DiscordMessage} message
     * @returns {void}
     */
    action (message) {
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embed: {
          color: 8359053,
          description: 'I can respond to well-formed questions about basic ' +
              "Baha'i topics. As well, the following commands can help me " +
              'process your requests. Make sure to mention me when trying ' +
              'to use them, like this: `@BahaiBot !help`',
          fields
        }
      });
    }
  };

  commands.help = help;

  /**
   * @type {BotHelpField[]}
   */
  const fields = Object.values(commands).map(({helpInfo}) => {
    return helpInfo;
  }).filter(Boolean);
};

export default addHelp;
