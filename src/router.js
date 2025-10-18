// These are for the current API; old docs not online
/**
 * @external DiscordModule
 * @see https://discord.js.org/#/docs/main/stable/general/welcome
 */
/**
 * @external DiscordClient
 * @see https://discord.js.org/#/docs/main/stable/class/Client
 */
/**
 * @external DiscordMessage
 * @see https://discord.js.org/#/docs/main/stable/class/Message
 */
/**
 * @external DialogflowResponse
 * @see https://github.com/googleapis/nodejs-dialogflow
 */

/*
  Resource Loader
*/

// import questions from './questions.js';

// Export the router

/**
 * @callback Router
 * @param {DialogflowResponse} response
 * NOTE: response.queryResult.fulfillmentMessages is the array (not used)
 * NOTE: response.queryResult.fulfillmentText a string with default response
 * @param {DiscordMessage} message
 * @param {DiscordClient} client
 * @param {DiscordModule} Discord
 * @param {IntlDom} _
 * @returns {void}
 */

/**
 * @type {Router}
 */
const router = (response, message, client, Discord, _) => {
  // eslint-disable-next-line no-console -- CLI
  console.log(_('routerResponse'), response);
  const speech = response.queryResult.fulfillmentText;
  message.channel.send(speech);
};

export default router;
