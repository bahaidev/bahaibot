/**
* @param {PlainObject} cfg
* @param {DialogflowApp} cfg.app
* @param {Router} cfg.router
* @param {DiscordClient} cfg.client
* @param {Discord} cfg.Discord
* @param {external:IntlDom} cfg._
* @param {external:settings} cfg.settings
* @returns {BotCommand}
*/
const getDefaultCommand = ({
  app, router, client, Discord, _, settings
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

      const userInput = message.content.replace(
        `<@!${client.user.id}>`, '' // remove aribrary number from userInput
      );

      // Creates a new session, using original Discord-bot-defined sessionID
      const sessionID = message.author.id;
      const sessionPath = app.projectAgentSessionPath(
        settings.PROJECT_ID,
        sessionID
      );

      // The text query request
      const request = {
        session: sessionPath,
        queryInput: {
          text: {
            // The query to send to the dialogflow agent
            text: userInput, // was message,
            // The language used by the client
            languageCode: _.resolvedLocale
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
