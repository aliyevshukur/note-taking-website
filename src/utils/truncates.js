/**
 * Truncates a given string to a given maximum length.
 *
 * @param {string} context - The string to be truncated.
 * @param {number} maxLength - The maximum length of the string.
 * @returns {string} A string of maximum length maxLength, with "..." appended
 *  if the string is longer than maxLength.
 */
export const truncated = (context, maxLength) => {
  return maxLength > context.length
    ? context
    : context.substr(0, maxLength) + "...";
};
