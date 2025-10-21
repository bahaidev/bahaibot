/**
 * @param {object} cfg
 * @param {import('discord.js').Client} cfg.client
 * @param {string} cfg.BSTAR_EMOJI_ID_LAB
 * @returns {import('./getCommands.js').BotCommands}
 */
const getBahaiSalutations = ({client, BSTAR_EMOJI_ID_LAB}) => {
  /**
   * @param {import('discord.js').Message<true>} message
   * @returns {import('discord.js').GuildEmoji|undefined}
   */
  const reactToStar = (message) => {
    const star = client.emojis.cache.find((val) => val.name === '9star');
    if (star) {
      message.react(star);
    }
    return star;
  };
  return {
    // GREETINGS //
    abha: {
      re: /\b(?:all[aá]h['’´\-]?[uo]?['’´\-]?abh[aá]|abh[aá])/iv,
      /**
       * Alláh-u-Abhá!
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const star = reactToStar(message);

        message.channel.send(
          `Alláh-u-Abhá, ${message.author.username}! ${star
            ? star.toString()
            : ''}`
        );
      },
      notMentioned: {
        /**
         * If welcome AND a user are mentioned.
         * @param {import('discord.js').Message<true>} message
         * @returns {boolean}
         */
        check (message) {
          return Boolean(message.mentions.users?.first());
        },
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          reactToStar(message);
        }
      }
    },
    nawruz: {
      re: /\b(?:(?:happy|joyous)\s?n[ao]w[\- ]?ro?[uú]z|n[ao]w[\- ]?ro?[uú]z\s?(?:m[uo]b[aá]r[aá]k))\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const star = reactToStar(message);
        const sabz = client.emojis.cache.find((val) => val.name === 'sabzi');
        message.channel.send(
          `Happy Naw-Rúz! ${star
            ? star.toString()
            : ''}${sabz
            ? sabz.toString()
            : ''}`
        );
      }
    },
    ridvan: {
      re: /\b(?:(?:happy|joyous)\s?r[ie][ḍdz][vw][aá]n|r[ie][ḍdz][vw][aá]n\s?(?:m[uo]b[aá]r[aá]k))\b/iv,
      /**
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        const star = reactToStar(message);
        message.channel.send(`Happy Ridván! ${star ? star.toString() : ''}`);
      }
    },
    ninePointedStar: {
      re: /\u{1F7D9}/u,
      /**
       * Nine-pointed-star (should be at the end so everything else is
       *   processed first).
       * @param {import('discord.js').Message<true>} message
       * @returns {void}
       */
      action (message) {
        message.channel.send(`<:bstar:${BSTAR_EMOJI_ID_LAB}>`);
      },
      notMentioned: {
        /**
         * @param {import('discord.js').Message<true>} message
         * @returns {void}
         */
        action (message) {
          // message.react('\u{1F7D9}');
          message.react(`<:bstar:${BSTAR_EMOJI_ID_LAB}>`);
        }
      }
    }
  };
};

export default getBahaiSalutations;
