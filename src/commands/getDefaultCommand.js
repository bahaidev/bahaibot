/**
* @param {PlainObject} cfg
* @param {DialogflowApp} cfg.app
* @param {Router} cfg.router
* @param {DiscordClient} cfg.client
* @param {Discord} cfg.Discord
* @param {string} cfg.BOT_ID
* @param {external:IntlDom} cfg._
* @param {external:settings} cfg.settings
* @returns {BotCommand}
*/
const getDefaultCommand = ({
  app, router, client, Discord, BOT_ID, _, settings
}) => {
  return {
    re: /[\s\S]*/u, // Should always match
    /**
     * @param {DiscordMessage} message
     * @returns {void}
     */
    async action (message) {
      /* BOT DATA */
      // Variables and initial data
      // Replace removes the bot reference

      const regex = /\d+/u;
      const numberMessage = message.content.match(regex);
      const userInput = message.content.replace(
      //  `<@${BOT_ID}>`, ''
        `<@!${numberMessage[0]}>`, '' // remove aribrary number from userInput
      );

      // Creates a new session, using original discord bot defined sessionID
      const sessionID = message.author.id;
      const sessionPath = app.projectAgentSessionPath(
        settings.PROJECT_ID,
        sessionID
      );

      // The text query request.
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: userInput, // was message,
            // The language used by the client (en-US)
            languageCode: 'en-US'
          }
        }
      };

      /**
      * @throws {DialogflowError}
      * @returns {Promise<external:DialogflowResponse[]>} responses
      */
      async function dialogflowCall () {
        // Send request and log result
        try {
          const responses = await app.detectIntent(request);
          await router(responses[0], message, client, Discord, _);
          // Allow use as returned value from call by enclosing function
          return responses;
        } catch (error) {
          // Let the user know
          message.channel.send(
            `<@${
              message.author.id
            }>, I couldn't process your question at the moment.`
          );

          // Allow a consuming await chain to catch this as a proper error (and
          //   log there)
          throw error;
        }
      }

      // Return in case an implementation wants this as a Promise that
      //  waits to resolve (e.g., until it calls the callbacks)
      return await dialogflowCall();
    }
  };
};

export default getDefaultCommand;
