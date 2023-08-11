import { inspect } from 'util';

/**
 * Safely traverse some content (object, array, etc) and stringify it
 * @param content
 */

export const dump = (content: any): string => {
  return inspect(content, { depth: 5 });
};
