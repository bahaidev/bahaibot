/**
 * Simplified version of Discord.MessageEmbed() as needed by bahaibot.
 */
class MessageEmbed {
  /**
   * @param {string} name
   * @param {string} [iconURL]
   * @param {string} [url]
   * @returns {void}
   */
  setAuthor (name, iconURL, url) {
    this.author = {
      name, iconURL, url
    };
  }
  /**
   * @param {string} description
   * @returns {void}
   */
  setDescription (description) {
    this.description = description;
  }
  /**
   * @param {string} name
   * @param {string} value
   * @returns {void}
   */
  addField (name, value) {
    if (!this.fields) {
      this.fields = [];
    }
    this.fields.push({
      name, value
    });
  }
  /**
   * @param {number} numberForColorBorder
   * @returns {void}
   */
  setColor (numberForColorBorder) {
    this.color = numberForColorBorder;
  }
}

export default MessageEmbed;
