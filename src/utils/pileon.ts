import { Deck, Card } from "two-to-seven-triple-draw";

/** Deal initial pileon solitaire cards: 13 stacks of 4 cards and 2 empty stacks. */
export const deal = (): Card[][] => {
  const source = new Deck();
  const piles: Card[][] = [...Array(13)].map(() => source.popN(4));
  return piles.concat([[], []] as Card[][]);
};

const haveEqualValues = (cards: Card[]): boolean => {
  const [first, ...rest] = cards;
  return rest.every((i) => i.value === first.value);
};

/** Determine if a given sub-stack is draggable: player can move multiple cards if they all are of the same rank. */
export const isDraggableFn = (cards: Card[]): boolean => {
  if (cards.length === 0) {
    return false;
  }

  if (cards.length === 1) {
    return true;
  }

  return haveEqualValues(cards);
};

/** Determine if given cards can be added to a stack: player can add cards to a stack
 *  - where rank of the top card is equal to the rank of cards to be added or the stack is empty, and
 *  - when the number of cards in the stack does not exceed four after adding the cards. */
export const canDropFn = (cards: Card[], stack: Card[]): boolean => {
  if (cards.length + stack.length > 4) {
    return false;
  }

  if (stack.length === 0 || stack[stack.length - 1].value === cards[0].value) {
    return true;
  }

  return false;
};

/** Determine done piles: pile is done (or ready) when all four cards with the same rank are in the pile. */
export const getDonePiles = (piles: Card[][]): number[] => {
  return piles.reduce((dones, pile, index) => {
    if (pile.length === 4 && haveEqualValues(pile)) {
      return [...dones, index];
    }
    return dones;
  }, [] as number[]);
};
