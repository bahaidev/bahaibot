import integratedClientServerBot from
  '../dist/integratedClientServerBot.esm.js';

integratedClientServerBot({
  dialogflow: {
    /**
     *
     */
    SessionsClient: class {}
  },
  Discord: {
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
      /**
       * @returns {void}
       */
      login () {
        // eslint-disable-next-line no-console -- Debugging
        console.log('logging in', this);
      }
      /**
       * @param {Event} ev
       * @param {() => void} handler
       * @returns {void}
       */
      on (ev, handler) {
        // eslint-disable-next-line no-console -- Debugging
        console.log('Logging', ev, handler, this);
      }
    }
  }
});
