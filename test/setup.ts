import { beforeAll } from "vitest";

beforeAll(() => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  global.ResizeObserver = class ResizeObserver {
    observe() {
      /* do nothing */
    }
    unobserve() {
      /* do nothing */
    }
    disconnect() {
      /* do nothing */
    }
  };
});
