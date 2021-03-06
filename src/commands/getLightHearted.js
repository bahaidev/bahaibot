/**
* @returns {BotCommands}
*/
const getLightHearted = () => {
  return {
    /* OTHER CHIT-CHAT */
    coffee: {
      re: /\u{2615}/u,
      /**
       * Coffee (should be at the end so everything else is processed first).
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':coffee:');
      },
      notMentioned: {
        /**
         * @param {DiscordMessage} message
         * @returns {void}
         */
        action (message) {
          message.react('☕');
        }
      }
    },
    tea: {
      re: /\u{1F375}/u,
      /**
       * Tea (should be at the end so everything else is processed first).
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':tea:');
      },
      notMentioned: {
        /**
         * @param {DiscordMessage} message
         * @returns {void}
         */
        action (message) {
          message.react('🍵');
        }
      }
    },
    popcorn: {
      re: /\u{1F37F}/u,
      /**
       * Popcorn (should be at the end so everything else is processed first).
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(':popcorn:');
      },
      notMentioned: {
        /**
         * @param {DiscordMessage} message
         * @returns {void}
         */
        action (message) {
          message.react('🍿');
        }
      }
    },
    // Lulz (should be at the end so everything else is processed first).
    unladen: {
      re: /\bunladen\sswallow\b/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(
          'What do you mean, an African, or European swallow?'
        );
      }
    },
    bruh: {
      re: /\bbruh\b/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send('Bruh.');
      }
    },
    goodbot: {
      re: /\bgood\s?bot\b/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.react('😊');
        message.channel.send('Thanks!');
      }
    },
    badbot: {
      re: /\bbad\s?bot\b/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.react('☹️');
        message.channel.send('Sorry.');
      }
    },
    repeating: {
      re: /\brepeating yourself\b/iu,
      /**
       * Repeating.
       * @param {DiscordMessage} message
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
      re: /\b(?:my|santa['’´]?s)\scat\b/iu,
      /**
       * @param {DiscordMessage} message
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
      re: /\bping\b/iu,
      /**
       * Ping message.
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        message.channel.send('Pong :ping_pong:');
      }
    }
  };
};

export default getLightHearted;
