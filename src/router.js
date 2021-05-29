/* eslint-disable no-use-extend-native/no-use-extend-native,
  node/file-extension-in-import -- Polyfill */
import 'object.hasown/auto';

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
 * @external APIAIResponse
 * @see https://github.com/api-ai/apiai-nodejs-client
 */

/*
  Resource Loader
*/

// import questions from './questions.js';

// Export the router

/**
 * @callback Router
 * @param {external:APIAIResponse} response Note that
 * `response.result.fulfillment.messages` is an array.
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
  // eslint-disable-next-line no-console -- CLI
  console.log(_('routerResponse'), response);

  // Output default answer
  const {messages} = response.result.fulfillment;

  const content = messages.find((obj) => {
    return !Object.hasOwn(obj, 'platform');
  });

  const {speech} = content;

  message.channel.send(speech);
};

export default router;
