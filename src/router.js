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
 * @param {external:DialogflowResponse} response
 * NOTE: response.queryResult.fulfillmentMessages is the array (not used)
 * NOTE: response.queryResult.fulfillmentText a string with default response
 * @param {external:DiscordMessage} message
 * @param {external:DiscordClient} client
 * @param {external:DiscordModule} Discord
 * @param {external:IntlDom} _
 * @returns {void}
 */

/**
 * @type {Router}
 */
const router = (response, message, client, Discord, _) => {
  const speech = response.queryResult.fulfillmentText;
  message.channel.send(speech);
};

export default router;
