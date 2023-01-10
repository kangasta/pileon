import { Deck, Card } from "two-to-seven-triple-draw";
import { CardStringType } from "two-to-seven-triple-draw/dist/card";
import { stackWidthEm } from "./stack";

export const tableWidthEm = (bridge: boolean) =>
  stackWidthEm(4, bridge) * 5 + 0.666 * 10;
export const tableHeightEm = () => 7 * 3 + 0.5 * 6;

type Piles = Card[][];

/** Deal initial pileon solitaire cards: 13 stacks of 4 cards and 2 empty stacks. */
export const deal = (): Piles => {
  const source = new Deck();
  const piles: Piles = [...Array(13)].map(() => source.popN(4));
  return piles.concat([[], []] as Piles);
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

/** Handle moving cards from source stack to target stack.
 *
 * Checks if cards can be dropped to target pile and returns new piles array without modifying the current piles. Throws an error if move is not valid. */
export const drop = (
  piles: Piles,
  source: number,
  target: number,
  cards: Card[]
): Piles => {
  const nextPiles = piles.map((pile) => [...pile]);

  if (!canDropFn(cards, nextPiles[target])) {
    throw new Error(
      `Can not move cards ${cards.map((card) =>
        card.toString(CardStringType.ShortEmoji)
      )} from pile ${source} to pile ${target}`
    );
  }

  nextPiles[source] = nextPiles[source].slice(
    0,
    nextPiles[source].length - cards.length
  );
  nextPiles[target] = [...nextPiles[target], ...cards];

  return nextPiles;
};

const getEqualValues = (stack: Card[]): Card[] => {
  if (stack.length === 1 || haveEqualValues(stack)) {
    return stack;
  }
  return getEqualValues(stack.slice(1));
};

/** Move all cards of equal value from the source stack to a first possible target stack and return the resulting piles. Moves cards to a non-empty pile, if possible. Throws an error if cards cannot be moved to any target stack. */
export const autoMove = (piles: Piles, source: number): Piles => {
  if (piles[source].length === 0) {
    throw new Error("Cannot move cards from an empty pile.");
  }
  if (isDone(piles[source])) {
    throw new Error("Cannot move cards from a completed pile.");
  }

  const cards = getEqualValues(piles[source]);

  const possibleTargets = piles.reduce(
    (targets, pile, i) =>
      i !== source && canDropFn(cards, pile) ? [...targets, i] : targets,
    [] as number[]
  );
  if (possibleTargets.length === 0) {
    throw new Error(`Cannot move cards from pile ${source} to any other pile`);
  }

  const nonEmptyTargets = possibleTargets.filter((i) => piles[i].length > 0);
  const target =
    nonEmptyTargets.length > 0 ? nonEmptyTargets[0] : possibleTargets[0];

  return drop(piles, source, target, cards);
};

const isDone = (pile: Card[]): boolean =>
  pile.length === 4 && haveEqualValues(pile);

/** Determine done piles: pile is done (or ready) when all four cards with the same rank are in the pile. */
export const getDonePiles = (piles: Piles): number[] => {
  return piles.reduce((dones, pile, index) => {
    if (isDone(pile)) {
      return [...dones, index];
    }
    return dones;
  }, [] as number[]);
};