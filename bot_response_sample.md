```js
// Format of response
// eslint-disable-next-line no-unused-vars -- Just demoing
const response = {
  id: 'c5c952e5-88b0-4d00-afaf-287671a9cbae-2b95931e',
  lang: 'en',
  sessionId: '309427494778306560',
  timestamp: '2021-02-24T02:20:32.825169Z',
  result: {
    source: 'agent',
    resolvedQuery: '<@!391405681795923968> Are you real?',
    action: '',
    actionIncomplete: false,
    score: 0.6868775,
    parameters: {Bahai: ''},
    contexts: [],
    metadata: {
      intentId: '573c247b-5474-4ba9-8dd9-d2195d03ad78',
      intentName: 'Chatbot',
      webhookUsed: 'false',
      webhookForSlotFillingUsed: 'false',
      isFallbackIntent: 'false'
    },
    fulfillment: {
      speech: 'I am an automated question and answer chatbot here to ' +
        "answer your questions about the Bahá'í Faith.",
      messages: [Array]
    }
  },
  status: {code: 200, errorType: 'success'}
};
```
