/* eslint-disable jsdoc/imports-as-dependencies -- Bug */
/**
* @param {object} cfg
* @param {import('@google-cloud/dialogflow').SessionsClient} cfg.app
* @param {import('../router.js').Router} cfg.router
* @param {import('discord.js').Client} cfg.client
* @param {import('discord.js')} cfg.Discord
* @param {import('intl-dom').I18NCallback} cfg._
* @param {import('../discordBot.js').Settings} cfg.settings
* @returns {import('./getCommands.js').BotCommand}
*/
const getDefaultCommand = ({
  /* eslint-enable jsdoc/imports-as-dependencies -- Bug */
  app, router, client, Discord, _, settings
}) => {
  return {
    re: /[\s\S]*/u, // Should always match
    /**
     * @param {import('discord.js').Message<true>} message
     * @returns {Promise<void>}
     */
    async action (message) {
      /* BOT DATA */
      // Variables and initial data

      // Removes an initial bot reference and converts other snowflake
      //  sequences to username

      // Trim is necessary to ensure the `offset` can be 0 when matching
      //   snowflake at beginning
      const userInput = message.content.trimStart().replaceAll(
        /<@!?(?<snowflake>\d+)>/gv,
        (__, n1, offset, wholeStr, {snowflake}) => {
          if (snowflake === client.user?.id) {
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
        /** @type {string} */ (settings.PROJECT_ID),
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

      /* eslint-disable jsdoc/imports-as-dependencies -- Bug */
      /**
      * @throws {DialogflowError}
      * @returns {Promise<
      *   import('@google-cloud/dialogflow').protos.google.
      *     cloud.dialogflow.v2.IDetectIntentResponse
      * >} responses
      */
      async function dialogflowCall () {
        /* eslint-enable jsdoc/imports-as-dependencies -- Bug */
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
      // return await dialogflowCall();
      await dialogflowCall();
    }
  };
};

export default getDefaultCommand;
