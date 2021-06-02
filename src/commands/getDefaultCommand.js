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
      // eslint-disable-next-line no-console -- temp
      console.log('message>>', message);
      // eslint-disable-next-line no-console -- temp
      console.log('BOT_ID=', BOT_ID);
      const regex = /\d+/u;
      const numberMessage = message.content.match(regex);
      // eslint-disable-next-line no-console -- temp
      console.log('numberMessage[0]', numberMessage[0]);
      const userInput = message.content.replace(
      //  `<@${BOT_ID}>`, ''
        `<@!${numberMessage[0]}>`, '' // remove aribrary number from userInput
      );
      /* SJS
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
*/

      /* SJS BEGIN... from nodebahaiqna2servergit/server.js  modified with original getDefaultCommand.js info */

      // Creates a new session
      const sessionID = message.author.id; // SJS uses original discord bot defined sessionID
      //     const sessionClient = new dialogflow.SessionsClient({
      //       keyFilename: path.join(__dirname, settings.PROJECT_JSON) // SJS  need PROJECT_JSON filename in settings.json file
      //     }); // move to bot and call app?
      //   const sessionPath = sessionClient.projectAgentSessionPath(settings.PROJECT_ID, sessionID); // SJS need PROJECT_ID in settings.json file
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
        } /*,
        queryParams: {
          contexts: [
            {
              name: 'ecosystem', // NOTE: every call to dialogflow from the bot has the context named ecosystem
              //                     but only a few intents have a the ecosystem context defined for it (in V1)
              parameters: {
                platform: 'discord'
              }
            }
          ]
        } */
      };
      // eslint-disable-next-line no-console -- long
      console.error('request', request);

      /**
      *
      * @returns {external:Dialogflow-Responses} responses
      */
      async function dialogflowCall () {
      // Send request and log result
        try {
        //          const responses = await sessionClient.detectIntent(request);
          const responses = await app.detectIntent(request);
          await router(responses[0], message, client, Discord, _); // return res.status(200).json(responses[0]);
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
          // console.log(e);
          // res.status(422).send({ e });
        }
      }
      const responses = dialogflowCall();
      /* SJS END... from nodebahaiqna2servergit/server.js  modified with original getDefaultCommand.js info */

      /* SJS
      // To send a request, you should issue the question AND a
      //   unique session ID.
      // In this case, the session ID is the author ID from Discord
      const request = app.textRequest(userInput, options);
      */

      /**
       * Once the robot responds, reply to user :) .
       * @param {external:APIAIResponse} response Note that
       * `response.result.fulfillment.messages` is an array.
       * @returns {void}
       */

      /* SJS
      request.on('response', async function (response) {
        // Process action based on promise
        await router(response, message, client, Discord, _);
      });
      */

      // If error, console log
      /**
       * @param {external:APIAIError} error
       * @returns {void}
       */

      /* SJS
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
      */
      // End the request process
      // SJS needed     request?.end();

      // Return in case an implementation wants this as a Promise that
      //  waits to resolve (e.g., until it calls the callbacks)
      return responses; // SJS request;
    }
  };
};

export default getDefaultCommand;
