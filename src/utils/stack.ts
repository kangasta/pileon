import { Card } from "two-to-seven-triple-draw";
import { bridgeCardWidthEm, pokerCardWidthEm } from "./card";

export const stackWidthEm = (capacity: number, bridge: boolean) =>
  (bridge ? bridgeCardWidthEm : pokerCardWidthEm) + (capacity - 1) * 1.125;

export interface IStackDataTransfer {
  sourceStack: number;
  cards: Card[];
}

export const setStackDataTransfer = (
  e: DragEvent,
  sourceStack: number,
  cards: Card[]
): void => {
  const data: IStackDataTransfer = { sourceStack, cards };
  e.dataTransfer.setData("application/json", JSON.stringify(data));
  e.dataTransfer.effectAllowed = "move";
};

export const getStackDataTransfer = (e: DragEvent): IStackDataTransfer => {
  const { sourceStack, cards: raw_cards } = JSON.parse(
    e.dataTransfer.getData("application/json")
  );
  return { sourceStack, cards: raw_cards.map(Card.fromJSON) };
};
