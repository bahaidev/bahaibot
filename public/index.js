// eslint-disable-next-line import/no-unresolved -- Bug
import postJSON from 'simple-post-json';

import integratedClientServerBot from
  // '../dist/integratedClientServerBot.esm.js';
  '../src/integratedClientServerBot.js';

// import getDialogflowAdapter from 'bahaibot/getDialogflowAdapter';
import getDialogflowAdapter from '../src/getDialogflowAdapter.js';

const system = await (await fetch('/public/settings.json')).json();

/** @type {string} */
let projectId;

/** @type {import('../src/getDialogflowAdapter.js').ProjectAgentSessionPath} */
const projectAgentSessionPath = (projectID, sessionID) => {
  projectId = projectID;
  // This can be shaped differently
  return `${projectID}--${sessionID}`;
};

/** @type {import('../src/getDialogflowAdapter.js').DoAIProcessing} */
async function doAIProcessing ({
  userInput, sessionId,
  // keyFilename
  languageCode
}) {
  // `userInput` is text
  // `sessionId` (don't need to use here?)
  // `keyFilename` is `PROJECT_JSON` value
  // `languageCode` can be `en_US`?

  const json = await postJSON({
    url: 'https://dialogflow.googleapis.com/v2/{session=' +
      `projects/${projectId}/agent/sessions/${sessionId}}:detectIntent`,
    body: {
      queryInput: {
        text: {
          text: userInput,
          languageCode
        }
      }
    },
    headers: {
      'X-goog-api-key': system.production.token,
      'Content-Type': 'application/json; charset=utf-8'
    }
  });

  return json.queryResult.fulfillmentMessages[0].text.text[0];
}

const dialogflow = getDialogflowAdapter({
  doAIProcessing,
  projectAgentSessionPath
});

// eslint-disable-next-line no-unused-vars -- Scaffolding
const {client} = await integratedClientServerBot({
  dialogflow,
  Discord: {
    // Todo: This should be part of an adapter
    GatewayIntentBits: {
      Guilds: null,
      GuildMessages: null,
      MessageContent: null,
      GuildMembers: null,
      GuildPresences: null
    },
    /**
     *
     */
    Client: class {
      user = true; // Todo: Make into a user

      /**
       * @returns {void}
       */
      login () {
        // eslint-disable-next-line no-console -- Debugging
        console.log('logging in', this);
      }

      /* eslint-disable class-methods-use-this -- Part of API */
      /**
       * @returns {void}
       */
      emit () {
        //
      }
      /* eslint-enable class-methods-use-this -- Part of API */

      /**
       * @param {string} ev
       * @param {import('../src/bot.js').MessageListener} handler
       * @returns {Promise<void>}
       */
      async on (ev, handler) {
        switch (ev) {
        case 'messageCreate':
          // eslint-disable-next-line no-console -- Debugging
          console.log('message create');
          await /** @type {import('../src/bot.js').MessageListener} */ (
            handler
          )({
            content: 'test',
            // @ts-expect-error We only need partial for adapting
            author: {
              id: 'test'
            },
            // @ts-expect-error We only need partial for adapting
            mentions: {
              /**
               *
               */
              has () {
                return true;
              }
            }
          });
          break;
        default:
          // eslint-disable-next-line no-console -- Debugging
          console.log('Logging', ev, handler, this);
          break;
        }
      }
    }
  }
});
