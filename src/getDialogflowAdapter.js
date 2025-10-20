/**
* @callback DoAIProcessing
* @param {object} cfg
* @param {string} cfg.userInput
* @param {string} cfg.sessionId
* @param {string} cfg.languageCode
* @param {string} cfg.keyFilename
* @returns {string}
*/

/**
 * @param {{
 *   doAIProcessing: DoAIProcessing,
 *   projectAgentSessionPath: (projectID: string, sessionID: string) => string
 * }} doAIProcessing
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

      // Reenable when ready to test
      /* c8 ignore next 41 */
      /**
       *
       * @param {object} cfg
       * @param {string} cfg.session
       * @param {object} cfg.queryInput
       * @param {object} cfg.queryInput.text
       * @param {string} cfg.queryInput.text.text
       * @param {string} cfg.queryInput.text.languageCode
       * @returns {Promise<
       *   import('@google-cloud/dialogflow').protos.google.
      *     cloud.dialogflow.v2.IDetectIntentResponse[]
       * >} Resolved value not
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
            fulfillmentMessages: [{
              text: {
                text: [fulfillmentText]
              }
            }]
          }
        }];
      }
    }
  };
  // @ts-expect-error We want a dynamic method, so adding now
  dialogflow.SessionsClient.projectAgentSessionPath = projectAgentSessionPath;

  return dialogflow;
}

export default getDialogflowAdapter;
