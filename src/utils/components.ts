/** Return random, about seven chraracters long, string. */
export const randomString = (): string =>
  (Math.random() + 1).toString(36).substring(5);
