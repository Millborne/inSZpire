/**
 * Capitalizes only the first letter of a string while keeping the rest unchanged
 * This is used for display purposes only, not for backend data
 * @param text - The text to capitalize the first letter of
 * @returns The text with only the first letter capitalized
 */
export const capitalizeFirst = (text: string | null | undefined): string => {
  if (!text || typeof text !== "string") {
    return "";
  }

  if (text.length === 0) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
};
