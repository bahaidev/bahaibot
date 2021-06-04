import {$, jml, body} from './vendor/jamilih/dist/jml-es.js';

import marked from './vendor/marked/lib/marked.esm.js';

const socket = new WebSocket('ws://localhost:8081');

/**
* @param {PlainObject} cfg
* @param {string} cfg.message
* @returns {void}
*/
function socketJSON ({message}) {
  socket.send(JSON.stringify({
    message,
    user: {
      mentions: ['bot']
    }
  }));
}

// socket.addEventListener('open', function (ev) {
// });

socket.addEventListener('message', function (ev) {
  const response = JSON.parse(ev.data);
  // eslint-disable-next-line no-console -- Debugging
  console.log('Message from server', response);
  const {
    message: {content, embed: {color, description}}
  } = response;
  $('#messages').append(jml('br'), jml('div', {
    style: `padding: 5px; border: 2px solid #${color.toString(16)}`
  }, [
    ['b', [content]],
    ['br', 'br'],
    ['div', {
      innerHTML: marked(description)
    }]
  ]));
});

jml('div', [
  ['div', {
    id: 'messages',
    style: 'border: 1px outset gray; ' +
      'padding: 5px; max-height: 500px; overflow: auto;'
  }],
  ['label', {
    style: 'position: fixed; bottom: 20px; left: 20px;'
  }, [
    'Message: ',
    ['input', {
      autofocus: true,
      size: 100,
      value: '!b9 God',
      $on: {
        /**
        * @param {Event} e
        */
        keypress (e) {
          if (e.key === 'Enter') {
            socketJSON({
              message: e.target.value
            });
          }
        }
      }
    }]
  ]]
], body);
