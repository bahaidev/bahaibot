/**
* @returns {import('./getCommands.js').BotCommands}
*/
const getLightHearted = () => {
  return {
    /* OTHER CHIT-CHAT */
    coffee: {
      re: /\u{2615}/u,
      helpExtra: {
        name: '\u{2615}',
        value: 'Sends a coffee cup emoji'
      },
      /**
       * Coffee (should be at the end so everything else is processed first).
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':coffee:');
      },
      notMentioned: {
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          message.react('☕');
        }
      }
    },
    tea: {
      re: /\u{1F375}/u,
      helpExtra: {
        name: '\u{1F375}',
        value: 'Sends a tea emoji'
      },
      /**
       * Tea (should be at the end so everything else is processed first).
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':tea:');
      },
      notMentioned: {
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          message.react('🍵');
        }
      }
    },
    popcorn: {
      re: /\u{1F37F}/u,
      helpExtra: {
        name: '\u{1F37F}',
        value: 'Sends a popcorn emoji'
      },
      /**
       * Popcorn (should be at the end so everything else is processed first).
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':popcorn:');
      },
      notMentioned: {
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          message.react('🍿');
        }
      }
    },
    // Lulz (should be at the end so everything else is processed first).
    unladen: {
      re: /\bunladen\sswallow\b/iv,
      helpExtra: {
        name: 'unladen swallow',
        value: 'Prompt for a Monty Python response'
      },
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          'What do you mean, an African, or European swallow?'
        );
      }
    },
    bruh: {
      re: /\b(bruh|bro)\b/iv,
      helpExtra: {
        name: 'bruh',
        value: 'Sends a Bruh'
      },
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send('Bruh.');
      }
    },
    goodbot: {
      re: /\bgood\s?bot\b/iv,
      helpExtra: {
        name: 'good bot',
        value: 'Praises the bot'
      },
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.react('😊');
        message.channel.send('Thanks!');
      }
    },
    badbot: {
      re: /\bbad\s?bot\b/iv,
      helpExtra: {
        name: 'bad bot',
        value: 'Criticizes the bot'
      },
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.react('☹️');
        message.channel.send('Sorry.');
      }
    },
    repeating: {
      re: /\brepeating yourself\b/iv,
      helpExtra: {
        name: 'repeating yourself',
        value: 'Indicate the bot is repeating itself'
      },
      /**
       * Repeating.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const srs = [
          'Oops, sorry...', 'Oops, sorry!', 'Sorry!', 'Oops!', 'Sorry...',
          'Sorry... :sweat_smile:', 'Oops, sorry... :sweat_smile:'
        ];
        const sr = srs[
          Math.floor(Math.random() * srs.length)
        ]; // Pick a random greeting
        const excs = [
          "I tend to do that, don't I?",
          "I guess I tend to do that, don't I?",
          "I suppose I tend to do that, don't I?",
          "I'm just a chatbot, after all.",
          'I am a chatbot, after all.', 'I *am* a chatbot, after all.',
          "That does happen a lot, doesn't it."
        ];
        const exc = excs[
          Math.floor(Math.random() * excs.length)
        ]; // Pick a random greeting
        message.channel.send(`${sr} ${exc}`);
      }
    },
    santacat: {
      re: /\b(?:my|santa['’´]?s)\scat\b/iv,
      helpExtra: {
        name: 'santa cat',
        value: 'Makes reference to a Santa cat'
      },
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const cats = [
          'Not telling.', "That's a secret to everybody.",
          "Didn't somebody make a meme out of it?",
          'Which one? This one? :cat2:', "Wouldn't you like to know.",
          'Who do you think I am? Schrödinger?'
        ];
        const cat = cats[
          Math.floor(Math.random() * cats.length)
        ]; // Pick a random greeting
        message.channel.send(cat);
      }
    },
    ping: {
      re: /\bping\b/iv,
      helpExtra: {
        name: 'ping',
        value: 'Pings the bot'
      },
      /**
       * Ping message.
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send('Pong :ping_pong:');
      }
    }
  };
};

export default getLightHearted;
