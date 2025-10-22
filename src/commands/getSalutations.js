/**
 * @returns {import('./getCommands.js').BotCommands}
 */
const getSalutations = () => {
  return {
    sup: {
      re: /\b(?:su+p|wh[au]+[sz]+[au]+p|(?:(?:what|wut)['’´]?s (?:up|new|good|gud|cookin[g'’´])))\b/iv,
      helpExtra: {
        name: 'sup',
        value: "Sends the greeting 'What's up'"
      },
      /**
       * What's up?
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const nms = ['Not much', 'Not too much', 'Not a lot', 'Not very much'];
        const nm = nms[
          Math.floor(Math.random() * nms.length)
        ]; // Pick a random greeting
        const happies = [
          'Just glad to be here.', 'Just happy to be here.',
          'Same as usual.', 'Same old, same old.', 'Just like usual.',
          'Just waiting to be of service.',
          'Just waiting to be of service to somebody.',
          'Just waiting to be of service to someone.',
          'Just waiting for questions to answer.',
          'Just waiting for questions I can help answer.'
        ];
        const happy = happies[
          Math.floor(Math.random() * happies.length)
        ]; // Pick a random greeting
        message.channel.send(
          `${nm}, ${message.author.username}. ${happy}`
        );
      }
    },
    morning: {
      re: /\bgood morning\b/iv,
      helpExtra: {
        name: 'good morning',
        value: "Sends the greeting 'Good morning'"
      },
      /**
       * Good morning.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          `Good morning ${message.author.username}! :coffee:`
        );
      }
    },
    afternoon: {
      re: /\bgood afternoon\b/iv,
      helpExtra: {
        name: 'good afternoon',
        value: "Sends the greeting 'Good afternoon'"
      },
      /**
       * Good afternoon.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`Good afternoon ${message.author.username}!`);
      }
    },
    evening: {
      re: /\bgood evening\b/iv,
      helpExtra: {
        name: 'good evening',
        value: "Sends the greeting 'Good evening'"
      },
      /**
       * Good evening.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`Good evening ${message.author.username}!`);
      }
    },
    hello: {
      re: /\b(?:h[uea]llo|hi|hi there|howdy|yo|heya|sal[aá]{1,2}m)\b/iv,
      helpExtra: {
        name: 'hello',
        value: "Sends the greeting 'Hello'"
      },
      /**
       * Hello.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`Hello ${message.author.username}!`);
      }
    },
    welcome: {
      re: /^(?:everyone|everybody)?\W*(?:please|pleez|pls|plz)?\W*(?:\W*welcome|.*>+\W*welcome\b|.*\bwb\b)/iv,
      helpExtra: {
        name: 'welcome',
        value: "Sends the greeting 'Welcome'"
      },
      /**
       * Welcome.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          `Thanks, ${message.author.username}! :wave:`
        );
      },
      notMentioned: {
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {boolean}
         */
        check (message) {
          return Boolean(message.mentions.users.first());
        },
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          message.react('👋');
        }
      }
    }
  };
};

export default getSalutations;
