/**
 * Sanitizes user input by removing potentially harmful characters and tags.
 * This is a basic implementation to prevent HTML injection and simple XSS.
 *
 * @param input - The raw string to sanitize.
 * @returns The sanitized and trimmed string.
 */
export const sanitizeInput = (input: string): string => {
  if (!input) {
    return '';
  }

  // Remove HTML-like tags and trim the result
  return input.replace(/<[^>]*>?/gm, '').trim();
};
