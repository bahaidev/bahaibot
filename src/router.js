/*
  Resource Loader
*/

// import questions from './questions.js';

// Export the router

/* eslint-disable jsdoc/imports-as-dependencies -- Bug */
/**
 * @callback Router
 * @param {import('@google-cloud/dialogflow').protos.google.
 *     cloud.dialogflow.v2.IDetectIntentResponse} response
 * NOTE: response.queryResult.fulfillmentMessages is the array (not used)
 * NOTE: response.queryResult.fulfillmentText a string with default response
 * @param {import('discord.js').Message<true>} message
 * @param {import('discord.js').Client} client
 * @param {import('discord.js')} Discord
 * @param {import('intl-dom').I18NCallback} _
 * @returns {void}
 */
/* eslint-enable jsdoc/imports-as-dependencies -- Bug */

/**
 * @type {Router}
 */
const router = (response, message, client, Discord, _) => {
  // eslint-disable-next-line no-console -- CLI
  console.log(_('routerResponse'), response);
  const speech = response.queryResult?.fulfillmentText;
  message.channel.send(/** @type {string} */ (speech));
};

export default router;
