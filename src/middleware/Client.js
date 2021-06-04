// Todo: Support message.guild.members.cache.filter for `users`/`seen` commands
// Todo: Support message.guild.channels.cache.find for `puppet`
// Todo: Support message.member.permissions.has for `puppet` when reenabled
// Todo: Support message.member.voice.channelID for `speak`
// Todo: Support message.mentions.members.first() for `notMentioned`
//        salutations

// Todo: Finish non-message APIs (including apiai -> dialogflow, client, etc.)

import http from 'http';

import WebSocket from 'ws';
import statik from '@brettz9/node-static';

import User from './User.js';

/**
 * @callback SocketJSON
 * @param {JSON} obj
 * @returns {void}
 */

/**
* @typedef {"ready"|"guildMemberAdd"|"message"} ClientEvent
*/

/**
* @typedef {PlainObject} ChannelSendMessage
* @property {string} content
* @property {{color: number, description: string}} embed
*/

/**
* @typedef {ChannelSendMessage} ChannelSendMessageWithFields
* @property {{
*   color: number,
*   description: string,
*   fields: {
*     name: string,
*     value: string
*   }[]
* }} embed
*/

/**
* @typedef {ChannelSendMessage} ChannelSendMessageWithImage
* @property {{
*   color: number,
*   description: string,
*   image: {
*     url: string
*   }[]
* }} embed
*/

/**
 * @todo An external consumer should call
 * `client.emit('guildMemberAdd', discordGuildMember);` when adding a member
 * as that is not performed here despite our adding the listener.
 */
class Client {
  constructor () {
    this.listeners = {};
    this.httpPort = 8000;
    this.websocketPort = 8081;
    this.user = new User({
      id: 'bot',
      username: 'Bot'
    });
    // Discord iterates over guilds to get these
    this.emojis = {
      cache: {
        _emojis: [],
        /**
         * @param {PlainObject} cfg
         * @param {string} cfg.name
         * @returns {boolean}
         */
        find ({name}) {
          return this._emojis.find(({name: nm}) => {
            return name === nm;
          });
        }
      }
    };
  }
  /**
  * @param {ClientEvent} ev
  * @param {ReadyListneer|MessageListener|GuildMemberAddListener} listener
  * @returns {void}
  */
  on (ev, listener) {
    this.listeners[ev] = listener;
  }

  /**
   * This is not currently used internal to bahaibot, but is provided for
   * convenience.
   * @param {ClientEvent} ev
   * @param {external:DiscordMessage|DiscordGuildMember|void} info
   * @returns {void}
   */
  emit (ev, info) {
    this.listeners[ev](info);
  }

  /**
   * @returns {void}
   */
  login (/* token */) {
    const file = new statik.Server(
      new URL('./client', import.meta.url).pathname
    );

    const server = http.createServer((request, response) => {
      request.addListener('end', () => {
        file.serve(request, response);
      }).resume();
    }).listen(this.httpPort);

    const wss = new WebSocket.Server({
      server,
      port: this.websocketPort
    });

    wss.on('connection', (ws) => {
      /**
      * @type {SocketJSON}
      */
      const socketJSON = (obj) => {
        ws.send(JSON.stringify(obj));
      };

      this.listeners?.ready();

      ws.on('message', (messageObj) => {
        // Todo: A production server would need to validate the user ID!

        // Todo: Add way to allow plain messaging to be delivered irrespective
        //        of bot.
        let message,
          id,
          username,
          avatarURL,
          mentions; // Array of user IDs
        try {
          ({message, user: {
            id,
            username,
            avatarURL,
            mentions
          }} = JSON.parse(messageObj));
        } catch (err) {
          // eslint-disable-next-line no-console -- Debug
          console.log('Bad message', messageObj);
          return;
        }
        // eslint-disable-next-line no-console -- Debugging
        console.log('received:', message);
        this.listeners?.message({
          author: new User({
            socketJSON,
            id,
            username,
            avatarURL
          }),
          content: message,
          mentions: {
            /**
             * @param {User} user
             * @returns {boolean}
             */
            has (user) {
              return mentions.includes(user?.id);
            }
          },
          /**
          * @param {string} reaction
          */
          react (reaction) {
            socketJSON({
              reaction
            });
          },
          channel: {
            /**
             * @param {
             *   string|
             *   ChannelSendMessage|
             *   ChannelSendMessageWithFields|
             *   ChannelSendMessageWithImage
             * } msg
             * @returns {void}
             */
            send (msg) {
              socketJSON({
                message: msg
              });
            }
          }
        });
      });
    });
  }
}

export default Client;
