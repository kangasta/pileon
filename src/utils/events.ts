export const onSpecificKey =
  (key: string | string[], fn: () => void) => (e: KeyboardEvent) => {
    const keys = Array.isArray(key) ? key : [key];
    if (keys.includes(e.code)) {
      fn();
    }
  };
