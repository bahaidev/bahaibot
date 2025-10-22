/**
 * @param {object} cfg
 * @param {import('./getCommands.js').BotCommands} cfg.commands
 */
const addHelp = ({commands}) => {
  /**
  * @typedef {{name: string, value: string}} BotHelpField
  */

  const help = {
    re: /!help\b/iv,
    helpInfo: {
      name: '!help',
      value: 'Displays help text. For more commands, use ' +
                '`!helpextras` and `!helpadmin`'
    },
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {void}
     */
    action (message) {
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embeds: [{
          color: 8359053,
          description: 'I can respond to well-formed questions about basic ' +
              "Baha'i topics. As well, the following commands can help me " +
              'process your requests. Make sure to mention me when trying ' +
              'to use them, like this: `@BahaiBot !help`',
          fields
        }]
      });
    }
  };

  const helpextras = {
    re: /!helpextras\b/iv,
    helpInfo: {
      name: '!helpextras',
      value: 'Displays help text for rarer commands.'
    },
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {void}
     */
    action (message) {
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embeds: [{
          color: 8359053,
          description: 'The following commands can help me ' +
              'process your requests. Make sure to mention me when trying ' +
              'to use them, like this: `@BahaiBot !helpextras`',
          fields: fieldsExtra
        }]
      });
    }
  };

  const helpadmin = {
    re: /!helpadmin\b/iv,
    helpInfo: {
      name: '!helpadmin',
      value: 'Displays help text for commands available only to admins.'
    },
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {void}
     */
    action (message) {
      message.channel.send({
        content: `Here are the instructions you ` +
                    `need, ${message.author.username}.`,
        embeds: [{
          color: 8359053,
          description: 'The following administrator commands can help me ' +
              'process your requests. Make sure to mention me when trying ' +
              'to use them, like this: `@BahaiBot !helpextras`',
          fields: fieldsAdmin
        }]
      });
    }
  };

  commands.help = help;
  commands.helpextras = helpextras;
  commands.helpadmin = helpadmin;

  /**
   * @type {BotHelpField[]}
   */
  const fields = /** @type {BotHelpField[]} */ (
    Object.values(commands).map(({helpInfo}) => {
      return helpInfo;
    }).filter(Boolean)
  );

  /**
   * @type {BotHelpField[]}
   */
  const fieldsExtra = /** @type {BotHelpField[]} */ (
    Object.values(commands).map(({helpExtra}) => {
      return helpExtra;
    }).filter(Boolean)
  );

  /**
   * @type {BotHelpField[]}
   */
  const fieldsAdmin = /** @type {BotHelpField[]} */ (
    Object.values(commands).map(({helpAdmin}) => {
      return helpAdmin;
    }).filter(Boolean)
  );
};

export default addHelp;
