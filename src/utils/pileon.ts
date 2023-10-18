import { Deck, Card } from "two-to-seven-triple-draw";
import { CardStringType } from "two-to-seven-triple-draw/dist/card";
import { stackWidthEm } from "./stack";
import { getCardDimensionsEm, type ICardSize } from "./card";

const getStacksGrid = (
  mainWidth: number,
  innerHeight: number,
): [number, number] => {
  const aspectRatio = mainWidth / innerHeight;

  if (aspectRatio < 3 / 4) return [3, 5];
  if (aspectRatio < 4 / 3) return [4, 4];
  return [5, 3];
};

export const fillerStacks = (
  mainWidth: number,
  innerHeight: number,
): { length: number } => {
  const [i, j] = getStacksGrid(mainWidth, innerHeight);
  return { length: i * j - 15 };
};

export const calculateFontSize = (
  size: ICardSize,
  mainWidth: number,
  mainHeight: number,
  innerHeight: number,
): number => {
  const [i, j] = getStacksGrid(mainWidth, innerHeight);
  const tableWidthEm =
    stackWidthEm(4, size) * i + (size !== "small" ? 0.666 : 0.333) * 10;
  const fontSizeW = (mainWidth * 0.95) / tableWidthEm;

  const tableHeightEm =
    getCardDimensionsEm(size).height * j + (size !== "small" ? 0.5 : 0.25) * 6;
  const tableHeight = mainHeight > 600 ? mainHeight : innerHeight;
  const fontSizeH = (tableHeight * 0.95) / tableHeightEm;

  return Math.min(fontSizeW, fontSizeH);
};

export type Piles = Card[][];

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
  cards: Card[],
): Piles => {
  const nextPiles = piles.map((pile) => [...pile]);

  if (!canDropFn(cards, nextPiles[target])) {
    throw new Error(
      `Can not move cards ${cards.map((card) =>
        card.toString(CardStringType.ShortEmoji),
      )} from pile ${source} to pile ${target}`,
    );
  }

  nextPiles[source] = nextPiles[source].slice(
    0,
    nextPiles[source].length - cards.length,
  );
  nextPiles[target] = [...nextPiles[target], ...cards];

  return nextPiles;
};

/** Get all cards with equal values from the top of the stack. I.e. cards that can be moved from the stack. */
export const getEqualValues = (stack: Card[]): Card[] => {
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
    [] as number[],
  );
  if (possibleTargets.length === 0) {
    throw new Error(`Cannot move cards from pile ${source} to any other pile`);
  }

  const nonEmptyTargets = possibleTargets.filter((i) => piles[i].length > 0);
  const target =
    nonEmptyTargets.length > 0 ? nonEmptyTargets[0] : possibleTargets[0];

  return drop(piles, source, target, cards);
};

const canMoveCardsFromPileTo = (piles: Piles, source: number): number[] => {
  const cards = piles[source].slice(-1);
  if (cards.length === 0) {
    return [];
  }

  const possibleTargets = piles.reduce(
    (targets, pile, i) =>
      i !== source && canDropFn(cards, pile) ? [...targets, i] : targets,
    [] as number[],
  );
  return possibleTargets;
};

type PossibleMove = [number, number[]];
type PossibleMoves = PossibleMove[];
const getPossibleMoves = (piles: Piles) =>
  piles.reduce((prev, _, i): PossibleMoves => {
    const targets = canMoveCardsFromPileTo(piles, i);
    return targets.length === 0 ? prev : [...prev, [i, targets]];
  }, [] as PossibleMoves);

const hasExactlyOnePossibleMove = (possibleMoves: PossibleMoves) =>
  possibleMoves.length === 1 && possibleMoves[0][1].length === 1;

const isInfiniteLoop = (a: PossibleMove, b: PossibleMove): boolean => {
  if (a[1].length !== 1 || b[1].length !== 1) {
    return false;
  }
  return a[0] === b[1][0] && b[0] === a[1][0];
};

type DeadEndType = "dead-end" | "infinite-loop";
export const isDeadEnd = (piles: Piles): DeadEndType | false => {
  const possibleMoves = getPossibleMoves(piles);

  if (possibleMoves.length === 0) {
    return "dead-end";
  }

  // Check for infinite loop
  if (hasExactlyOnePossibleMove(possibleMoves)) {
    const [source, targets] = possibleMoves[0];

    const nextPiles = drop(piles, source, targets[0], piles[source].slice(-1));
    const nextPossibleMoves = getPossibleMoves(nextPiles);
    if (
      hasExactlyOnePossibleMove(nextPossibleMoves) &&
      isInfiniteLoop(possibleMoves[0], nextPossibleMoves[0])
    ) {
      return "infinite-loop";
    }
  }

  return false;
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
