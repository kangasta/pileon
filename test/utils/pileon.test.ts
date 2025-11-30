import { Cards } from "two-to-seven-triple-draw";

import { isDeadEnd } from "../../src/utils/pileon";

// ♥♠♦♣

describe("isDeadEnd", () => {
  it("returns false if there is an empty pile", () => {
    const piles = [new Cards("8♠ 5♦ J♣ 4♥"), new Cards("3♠ Q♦ J♠ 4♠"), []];
    const [t, c] = isDeadEnd(piles);
    expect(t).toEqual(false);
    expect(c).toHaveLength(0);
  });
  it.each([[["2♣ 3♥ 10♣ 10♦", "8♣ 10♥"]], [["A♦", "5♦ A♠ A♥ A♣"]]])(
    "returns false if there is no infinite loop %s",
    (piles: string[]) => {
      const [t, c] = isDeadEnd(piles.map((i) => new Cards(i)));
      expect(t).toEqual(false);
      expect(c).toHaveLength(0);
    },
  );
  it("recognizes dead end", () => {
    const piles = [new Cards("8♠ 5♦ J♣ 4♥"), new Cards("3♠ Q♦ J♠ 4♠")];
    const [t, c] = isDeadEnd(piles);
    expect(t).toEqual("dead-end");
    expect(c).toHaveLength(0);
  });
  it.each([[["K♥ A♣ 7♦", "8♠ 5♥ 7♥ 7♠"]], [["K♥ A♣ 7♦ 7♠", "7♣ 5♥ 7♥"]]])(
    "recognizes infinite loop %s",
    (piles: string[]) => {
      const [t, c] = isDeadEnd(piles.map((i) => new Cards(i)));
      expect(t).toEqual("infinite-loop");
      expect(c).toEqual(new Cards("7♠"));
    },
  );
  it("recognizes multiple infinite loops", () => {
    const piles = [
      new Cards("J♠ Q♠ 7♥ 7♦"),
      new Cards("K♥ 4♣ 7♠"),
      new Cards("J♥ J♦ Q♦ Q♣"),
      new Cards("4♦ K♠ Q♥"),
    ];
    const [t, c] = isDeadEnd(piles);
    expect(t).toEqual("infinite-loop");
    expect(c).toEqual(new Cards("7♦ Q♣"));
  });
  it.each([[["J♠ 7♥ 7♦ 7♠", "K♥ 7♣"]], [["J♠ 7♥ 7♦", "K♥ 7♣ 7♠"]]])(
    "recognizes multi-card infinite loops %s",
    (piles: string[]) => {
      const [t, c] = isDeadEnd(piles.map((i) => new Cards(i)));
      expect(t).toEqual("infinite-loop");
      expect(c.sort()).toEqual(new Cards("7♦ 7♠").sort());
    },
  );
});
