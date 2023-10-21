import { Card, CardStringType, Cards } from "two-to-seven-triple-draw";

import { getCardDimensionsEm, type ICardSize } from "./card";

export const stackWidthEm = (capacity: number, size: ICardSize) =>
  getCardDimensionsEm(size).width + (capacity - 1) * 1.125;

const getCardsStr = (
  cards: Cards,
  closed: boolean,
  closedDetail: false | "rank",
): string => {
  if (cards.length === 0) {
    return "empty";
  }
  if (closed) {
    const suffix =
      closedDetail === "rank"
        ? `, ${cards[0].toString(CardStringType.LongValue)}s`
        : "";
    return `closed${suffix}`;
  }
  return cards.toString(CardStringType.Long);
};

export const stackLabel = (
  title: string,
  cards: Card[],
  selected: number,
  closed: boolean,
  closedDetail: false | "rank" = false,
): string => {
  const cardsStr = getCardsStr(new Cards(cards), closed, closedDetail);
  const selectedStr =
    selected > 0
      ? ` ${selected} cards selected: ${new Cards(
          cards.slice(cards.length - selected),
        ).toString(CardStringType.Long)}`
      : "";
  return `${title}: ${cardsStr}.${selectedStr}`;
};

export interface IStackDataTransfer {
  sourceStack: number;
  cards: Card[];
}

export const setStackDataTransfer = (
  e: DragEvent,
  sourceStack: number,
  cards: Card[],
): void => {
  const data: IStackDataTransfer = { sourceStack, cards };
  e.dataTransfer.setData("application/json", JSON.stringify(data));
  e.dataTransfer.effectAllowed = "move";
};

export const getStackDataTransfer = (e: DragEvent): IStackDataTransfer => {
  const { sourceStack, cards: raw_cards } = JSON.parse(
    e.dataTransfer.getData("application/json"),
  );
  return { sourceStack, cards: raw_cards.map(Card.fromJSON) };
};
