/**
 * @param {DiscordClient} client
 * @returns {Promise<void>}
 */
function commandFinished (client) {
  // eslint-disable-next-line promise/avoid-new -- Our own API
  return new Promise((resolve) => {
    client.on('bahaibot:command-finished', () => {
      resolve();
    });
  });
}

export default commandFinished;
