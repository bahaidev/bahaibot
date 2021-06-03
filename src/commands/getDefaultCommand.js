/*   eslint-disable max-len -- long */
/**
* @param {PlainObject} cfg
* @param {dialogflow} cfg.app
* @param {Router} cfg.router
* @param {DiscordClient} cfg.client
* @param {Discord} cfg.Discord
* @param {string} cfg.BOT_ID
* @param {external:IntlDom} cfg._
* @param {external:settings} cfg.settings
* @returns {BotCommand}
*/
const getDefaultCommand = ({app, router, client, Discord, BOT_ID, _, settings}) => {
  return {
    re: /[\s\S]*/u, // Should always match
    /**
     * @param {DiscordMessage} message
     * @returns {void}
     */
    action (message) {
      /* BOT DATA */
      // Variables and initial data
      // Replace removes the bot reference

      const regex = /\d+/u;
      const numberMessage = message.content.match(regex);
      const userInput = message.content.replace(
      //  `<@${BOT_ID}>`, ''
        `<@!${numberMessage[0]}>`, '' // remove aribrary number from userInput
      );

      // Creates a new session
      const sessionID = message.author.id; // SJS uses original discord bot defined sessionID
      const sessionPath = app.projectAgentSessionPath(settings.PROJECT_ID, sessionID); // SJS need PROJECT_ID in settings.json file

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
      *
      * @returns {external:Dialogflow-Responses} responses
      */
      async function dialogflowCall () {
      // Send request and log result
        try {
          const responses = await app.detectIntent(request);
          await router(responses[0], message, client, Discord, _);
          return responses; // so that can use as returned value from call by enclosing function
        } catch (error) {
          // Let the user know
          message.channel.send(
            `<@${
              message.author.id
            }>, I couldn't process your question at the moment.`
          );
          // eslint-disable-next-line no-console -- CLI
          console.error(error);
          return error; // SJS not sure this is useful
        }
      }
      const responses = dialogflowCall();

      // Return in case an implementation wants this as a Promise that
      //  waits to resolve (e.g., until it calls the callbacks)
      return responses; // SJS request;
    }
  };
};

export default getDefaultCommand;
