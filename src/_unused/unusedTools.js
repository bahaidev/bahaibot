/* eslint-disable import/unambiguous, unicorn/no-empty-file -- Just
    comments here */
/*
// Return DB based on the reference r
db (r) {
  return firebase.database().ref(r);
},
*/

/**
 * Name generator for puzzles or vote.
 * @param {Integer} n Length of string
 * @returns {string}
 */
/*
randomStringGenerator (n) {
  const len = n;
  const chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  let result = '';
  for (let i = len; i > 0; --i) {
    result += chars[Math.round(Math.random() * (chars.length - 1))];
  }
  return result;
},
*/

/**
 * Find ID system.
 * @param {string} id
 * @param {FirebaseDatabase} db
 * @returns {Promise<false|Dataset>}
 */
/*
async findID (id, db) {
  // Create promise for firebase
  let s;
  try {
    s = await db.once('value');
  } catch (err) {
    // eslint-disable-next-line no-console -- CLI
    console.error('Error in `findID`, calling `db.once()`', err);
    return false;
  }
  if (s.hasChild(id)) {
    // Collect dataset
    let dataset = s.val();
    dataset = dataset[id];
    // eslint-disable-next-line no-console -- CLI
    console.log('ID successfully found');
    return dataset;
  }

  return false;
},
*/
/**
 * @param {DiscordMessage} message
 * @returns {void}
 */
/*
helpCmd (message) {
  // Help Message
  message.channel.send({
    embed: {
      color: 8359053,
      title: `Here are the instructions you need, ${
        message.author.username
      }`,
      description: 'The following commands will help me process ' +
        'your requests.',
      fields: [
        {
          name: 'read - Readings from the Bahá’í Writings',
          value: 'For a list of available resources, say: ' +
            '`@BahaiBot read list`'
        }, {
          name: 'question - A tool for answering some basic questions',
          value: 'To ask a question, start with the word question ' +
            'followed by a colon. For example: `@BahaiBot Question: What ' +
            "does the Bahá'í Faith say about education?`"
        }
      ]
    }
  });
}
*/
