// Global variables
// const colorBorder = settings.embedColor;
// const MAX_TEXT_LIMIT = settings.embedTextLimit;

const questions = {
  /**
   * @param {external:DiscordMessage} message
   * @param {string} avatar
   * @param {external:DiscordModule} Discord
   * @param {DialogflowApp} app
   * @returns {void}
   */
  answer (message, avatar, Discord, app) {
    // Variables and initial data
    const questionRegex = /\b(?:question|q):\s*(?<question>\S.+)\b/iu;
    const userInput = message.content;

    // Retrieve the value
    const {question} = userInput.match(questionRegex).groups;

    // Options
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

    // To send a request, you should issue the question AND a unique session ID
    // In this case, the session ID is the author ID from Discord
    const request = app.textRequest(question, options);

    /**
     * Once the robot responds, reply to user :) .
     * @param {external:DialogflowResponse} response Note that
     * `response.result.fulfillment.messages` is an array.
     * @returns {void}
     */
    request.on('response', function (response) {
      // eslint-disable-next-line no-console -- CLI
      console.log(response);

      /**
      * @typedef {PlainObject} Fulfillment
      * @property {string} platform
      */

      /**
       * @param {Fulfillment} fulfillment
       * @returns {boolean}
       */
      function hasFBfulfillment (fulfillment) {
        return fulfillment.platform === 'facebook';
      }

      // Collect information - use FB formatting if possible
      const content = response.result.fulfillment.messages
        ? response.result.fulfillment.messages.find(
          (f) => hasFBfulfillment(f)
        ).speech
        : response.result.fulfillment.speech;

      // Output message
      message.channel.send(`<@${message.author.id}>: ${content}`);
    });

    // If error, console log
    request.on('error', function (error) {
      // Let the user know
      message.channel.send(
        `<@${message.author.id}>, I couldn't process your ` +
        `question at the moment.`
      );

      // eslint-disable-next-line no-console -- CLI
      console.error('Answer request error', error);
    });

    // End the request process
    request.end();
  }
};

export default questions;
