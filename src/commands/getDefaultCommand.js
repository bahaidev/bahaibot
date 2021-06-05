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

      // Removes an initial bot reference and converts other snowflake
      //  sequences to username

      // Trim is necessary to ensure the `offset` can be 0 when matching
      //   snowflake at beginning
      const userInput = message.content.trimStart().replace(
        /<@!?(?<snowflake>\d+)>/gu,
        (__, n1, offset, wholeStr, {snowflake}) => {
          if (snowflake === client.user.id) {
            // Re-add this condition if the intents are ever modified to take
            //   into account "BahaiBot" as part of the text (e.g., so that
            //   "Who is X, BahaiBot" is as good of a match as "Who is X",
            //   and in case, it needs to handle, "Why is Bahaibot ignoring
            //   me?") types of queries
            // && !offset
            return '';
          }
          const {username} = client.users.resolve(snowflake);

          return username;
        }
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
          const [response] = await app.detectIntent(request);
          await router(response, message, client, Discord, _);
          // Allow use as returned value from call by enclosing function
          return response;
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
      //  waits to resolve
      return await dialogflowCall();
    }
  };
};

export default getDefaultCommand;
