/**
 * @typedef {{name: string, value: string}} BotHelpField
 */

/**
 * @param {object} cfg
 * @param {import('./getCommands.js').BotCommands} cfg.commands
 */
const addHelp = ({commands}) => {
  const help = {
    name: 'help',
    description: 'List available help commands',
    re: /!help\b/iv,
    helpInfo: {
      name: '!help',
      value: 'Displays help text. For more commands, use ' +
                '`!helpextras` and `!helpadmin`'
    },
    /**
     * @param {import('./getCommands.js').InputCommandOrSelectMenu} interaction
     * @returns {Promise<void>}
     */
    async slashCommand (interaction) {
      if (!interaction.inCachedGuild()) {
        return;
      }
      // @ts-expect-error Just passing what we need
      await this.action?.({
        author: interaction.user
      });
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
    name: 'helpextras',
    description: 'Displays help text for rarer commands.',
    re: /!helpextras\b/iv,
    helpInfo: {
      name: '!helpextras',
      value: 'Displays help text for rarer commands.'
    },
    /**
     * @param {import('./getCommands.js').InputCommandOrSelectMenu} interaction
     * @returns {Promise<void>}
     */
    async slashCommand (interaction) {
      if (!interaction.inCachedGuild()) {
        return;
      }
      await this.action?.({
        author: interaction.user,
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
    name: 'helpadmin',
    description: 'List available help commands available only to admins.',
    re: /!helpadmin\b/iv,
    helpInfo: {
      name: '!helpadmin',
      value: 'Displays help text for commands available only to admins.'
    },
    /**
     * @param {import('./getCommands.js').InputCommandOrSelectMenu} interaction
     * @returns {Promise<void>}
     */
    async slashCommand (interaction) {
      if (!interaction.inCachedGuild()) {
        return;
      }
      await this.action?.({
        author: interaction.user,
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

  return commands;
};

export default addHelp;
