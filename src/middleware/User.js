/**
*
*/
class User {
  /**
  * @param {PlainObject} cfg
  * @param {string} cfg.id
  * @param {string} cfg.username
  * @param {string} cfg.avatarURL
  * @param {SocketJSON} cfg.socketJSON
  */
  constructor ({
    id = 'defaultID', username = 'user', avatarURL,
    socketJSON
  }) {
    this.id = id;
    this.username = username;
    this.avatarURL = avatarURL;

    this._socketJSON = socketJSON;
  }

  /**
  * @returns {string}
  */
  avatarURL () {
    return this.avatarURL;
  }

  /**
  * @typedef {PlainObject} PresenceObject
  * @property {{name: string, type: string}} activity
  */

  /**
   * @param {PresenceObject} presenceObj
   * @returns {void}
   */
  setPresence (presenceObj) {
    this._socketJSON({
      presence: presenceObj
    });
  }
}

export default User;
