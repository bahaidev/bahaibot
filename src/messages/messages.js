const greets = {
  debugCheckin: [
    'Hi', 'Hi', 'Hi there', 'Hello', 'Hello', 'Hello there',
    'Hey', "What's up", "What's new"
  ],
  fyiCheckin: {
    general: [
      'Hi, everyone.', 'Hi, everybody.', 'Hi, everyone.',
      'Hi there, everyone!', 'Hello, everyone.',
      'Hello there, everyone.', 'Alláh-u-Abhá!',
      'Alláh’u’abhá, everyone.', 'Alláh-u-Abhá, everyone.',
      "What's cooking, everybody?", "Hey all, what's cooking?",
      "What's up, everyone?", "What's good, everyone?",
      "Hey everyone, what's new?", "Hey everybody, what's up?",
      "Hey, what's up everyone?", "Hi everybody, what's up?"
    ]
  },
  guildMemberAdd: [
    'Hi', 'Hi', 'Hi there', 'Hello', 'Hello', 'Hello there',
    'Hey', "What's up", "What's new"
  ]
};

const happies = {
  /**
   * @param {string} awesome
   * @returns {string[]}
   */
  guildMemberAdd: (awesome) => [
    'Happy to have you with us!', 'Pleased to have you with us!',
    'Great to have you with us!', "It's great to have you with us!",
    "It's a pleasure to have you with us!",
    'Pleased to have you with us! :smile:',
    "It's a pleasure to have you with us! :smile:",
    'Happy to have you with us! :smile:',
    'Great to have you with us! :smile:',
    `Happy to have you with us! ${awesome}`,
    'Glad you could join us! :smile:',
    `Glad you could join us! ${awesome}`,
    'Happy to have you with us today!',
    'Pleased to have you with us today!',
    'Great to have you with us today!',
    "It's great to have you with us today!",
    "It's a pleasure to have you with us today!",
    'Pleased to have you with us today! :smile:',
    "It's a pleasure to have you with us today! :smile:",
    'Happy to have you with us today! :smile:',
    'Great to have you with us today! :smile:',
    `Happy to have you with us today! ${awesome}`,
    'Glad you could join us today! :smile:',
    `Glad you could join us today! ${awesome}`
  ]
};

export {
  greets,
  happies
};
