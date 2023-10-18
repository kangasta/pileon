import { Cards } from "two-to-seven-triple-draw";
import { isDeadEnd } from "../../src/utils/pileon";

// ♥♠♦♣

describe("isDeadEnd", () => {
  it("returns false if there is an empty pile", () => {
    const piles = [
      new Cards("8♠ 5♦ J♣ 4♥"),
      new Cards("3♠ Q♦ J♠ 4♠"),
      [],
    ];
    expect(isDeadEnd(piles)).toEqual(false);
  });
  it("recognizes dead-end", () => {
    const piles = [new Cards("8♠ 5♦ J♣ 4♥"), new Cards("3♠ Q♦ J♠ 4♠")];
    expect(isDeadEnd(piles)).toEqual("dead-end");
  });
  it("recognizes infinite-loop", () => {
    const piles = [new Cards("K♥ A♣ 7♦"), new Cards("8♠ 5♥ 7♥ 7♠")];
    expect(isDeadEnd(piles)).toEqual("infinite-loop");
  });
});
