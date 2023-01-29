interface Options {
  preventDefault?: boolean;
}

export const onSpecificKey =
  (key: string | string[], fn?: () => void, options: Options = {}) =>
  (e: KeyboardEvent) => {
    const keys = Array.isArray(key) ? key : [key];
    if (keys.includes(e.code) && fn !== undefined) {
      if (options.preventDefault) {
        e.preventDefault();
      }
      fn();
    }
  };
