/**
 * @param {PlainObject} cfg
 * @param {DiscordClient} cfg.client
 * @returns {BotCommands}
 */
const getBahaiSalutations = ({client}) => {
  /**
   * @param {DiscordMessage} message
   * @returns {DiscordEmoji}
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
      re: /\b(?:all[aá]h['’´-]?[uo]?['’´-]?abh[aá]|abh[aá])/iu,
      /**
       * Alláh-u-Abhá!
       * @param {DiscordMessage} message
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
         * @param {DiscordMessage} message
         * @returns {void}
         */
        check (message) {
          return Boolean(message.mentions.members.first());
        },
        /**
         * @param {DiscordMessage} message
         * @returns {void}
         */
        action (message) {
          reactToStar(message);
        }
      }
    },
    nawruz: {
      re: /\b(?:(?:happy|joyous)\s?n[ao]w[- ]?ro?[uú]z|n[ao]w[- ]?ro?[uú]z\s?(?:m[uo]b[aá]r[aá]k))\b/iu,
      /**
       * @param {DiscordMessage} message
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
      re: /\b(?:(?:happy|joyous)\s?r[ie][ḍdz][vw][aá]n|r[ie][ḍdz][vw][aá]n\s?(?:m[uo]b[aá]r[aá]k))\b/iu,
      /**
       * @param {DiscordMessage} message
       * @returns {void}
       */
      action (message) {
        const star = reactToStar(message);
        message.channel.send(`Happy Ridván! ${star ? star.toString() : ''}`);
      }
    }
  };
};

export default getBahaiSalutations;
