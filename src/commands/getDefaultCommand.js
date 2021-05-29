/**
* @param {PlainObject} cfg
* @param {ApiaiApp} cfg.app
* @param {Router} cfg.router
* @param {DiscordClient} cfg.client
* @param {Discord} cfg.Discord
* @param {string} cfg.BOT_ID
* @param {external:IntlDom} cfg._
* @returns {BotCommand}
*/
const getDefaultCommand = ({app, router, client, Discord, BOT_ID, _}) => {
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
      const userInput = message.content.replace(
        `<@${BOT_ID}>`, ''
      );

      // Options to specify that this is from Discord
      const options = {
        sessionId: message.author.id,
        contexts: [
          {
            name: 'ecosystem',
            parameters: {
              platform: 'discord'
            }
          }
        ]
      };

      // To send a request, you should issue the question AND a
      //   unique session ID.
      // In this case, the session ID is the author ID from Discord
      const request = app.textRequest(userInput, options);

      /**
       * Once the robot responds, reply to user :) .
       * @param {external:APIAIResponse} response Note that
       * `response.result.fulfillment.messages` is an array.
       * @returns {void}
       */
      request.on('response', async function (response) {
        // Process action based on promise
        await router(response, message, client, Discord, _);
      });

      // If error, console log
      /**
       * @param {external:APIAIError} error
       * @returns {void}
       */
      request.on('error', function (error) {
        // Let the user know
        message.channel.send(
          `<@${
            message.author.id
          }>, I couldn't process your question at the moment.`
        );
        // eslint-disable-next-line no-console -- CLI
        console.error(error);
      });

      // End the request process
      request?.end();

      // Return in case an implementation wants this as a Promise that
      //  waits to resolve (e.g., until it calls the callbacks)
      return request;
    }
  };
};

export default getDefaultCommand;
