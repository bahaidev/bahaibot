/**
* @callback DoAIProcessing
* @param {string} userInput
* @param {string} sessionId
* @param {string} languageCode
* @param {string} keyFilename
* @returns {void}
*/

/**
 * @param {DoAIProcessing} doAIProcessing
 * @returns {dialogflow}
 */
function getDialogflowAdapter ({
  doAIProcessing,
  // Reenable when ready to test
  /* c8 ignore next 4 */
  projectAgentSessionPath = (projectID, sessionID) => {
    // This can be shaped differently
    return `${projectID}--${sessionID}`;
  }
}) {
  const dialogflow = {
    /**
     *
     */
    SessionsClient: class {
      /**
       * @param {object} cfg
       * @param {string} cfg.keyFilename
       */
      constructor ({keyFilename}) {
        this.keyFilename = keyFilename;
      }
      /**
      * @param {string} projectID
      * @param {string} sessionID
      * @returns {string}
      */
      [projectAgentSessionPath];

      // Reenable when ready to test
      /* c8 ignore next 34 */
      /**
       *
       * @param {object} cfg
       * @param {string} cfg.session
       * @param {object} cfg.queryInput
       * @param {object} cfg.queryInput.text
       * @param {string} cfg.queryInput.text.text
       * @param {string} cfg.queryInput.text.languageCode
       * @returns {Promise<DialogflowResponse[]>} Resolved value not
       * used internally.
       */
      async detectIntent ({
        session: sessionId,
        queryInput: {
          text: {
            text: userInput,
            languageCode
          }
        }
      }) {
        // May throw and user will be informed of not being able to process
        //  question.
        const fulfillmentText = await doAIProcessing({
          userInput, sessionId, languageCode,
          keyFilename: this.keyFilename
        });

        // Supply a one-item responses array as follows:
        return [{
          queryResult: {
            fulfillmentText
          }
        }];
      }
    }
  };
  return dialogflow;
}

export default getDialogflowAdapter;
