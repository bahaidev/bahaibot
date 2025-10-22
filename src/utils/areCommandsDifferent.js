/**
 * @license MIT
 * @see Adapted from {@link https://github.com/notunderctrl/discordjs-v14-series/tree/master/07%20-%20Command%20Handler}
 * @param {import('discord.js').ApplicationCommand<
 *   {guild: import('discord.js').GuildResolvable
 * }>} existingCommand
 * @param {Partial<Pick<import('discord.js').ApplicationCommand<
 *   {guild: import('discord.js').GuildResolvable
 * }>, "description"|"options">>} localCommand
 * @returns {boolean}
 */
const areCommandsDifferent = (existingCommand, localCommand) => {
  /**
   * @param {readonly import('discord.js').
   *   ApplicationCommandOptionChoiceData[]} existingChoices
   * @param {readonly import('discord.js').
   *   ApplicationCommandOptionChoiceData[]} localChoices
   * @returns {boolean}
   */
  const areChoicesDifferent = (existingChoices, localChoices) => {
    for (const localChoice of localChoices) {
      const existingChoice = existingChoices?.find(
        (choice) => choice.name === localChoice.name
      );

      if (!existingChoice) {
        return true;
      }

      if (localChoice.value !== existingChoice.value) {
        return true;
      }
    }
    return false;
  };

  /**
   * @param {import('discord.js').ApplicationCommand<
   *   {guild: import('discord.js').GuildResolvable
   * }>['options']} existingOptions
   * @param {import('discord.js').ApplicationCommand<
   *   {guild: import('discord.js').GuildResolvable
   * }>['options']} localOptions
   * @returns {boolean}
   */
  const areOptionsDifferent = (existingOptions, localOptions) => {
    for (const localOption of localOptions) {
      const existingOption = existingOptions?.find(
        (option) => option.name === localOption.name
      );

      if (!existingOption) {
        return true;
      }

      if (
        localOption.description !== existingOption.description ||
        localOption.type !== existingOption.type ||
        (
          ('required' in localOption && localOption.required) || false) !==
            ('required' in existingOption && existingOption.required) ||
              (('choices' in localOption &&
                localOption.choices?.length) || 0) !==
                  (('choices' in existingOption &&
                    existingOption.choices?.length) || 0) ||
                      areChoicesDifferent(
                        ('choices' in localOption && localOption.choices) || [],
                        ('choices' in existingOption &&
                            existingOption.choices) || []
                      )
      ) {
        return true;
      }
    }
    return false;
  };

  return (
    existingCommand.description !== localCommand.description ||
    existingCommand.options?.length !== (localCommand.options?.length || 0) ||
    areOptionsDifferent(existingCommand.options, localCommand.options || [])
  );
};

export default areCommandsDifferent;
