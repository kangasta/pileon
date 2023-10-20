import { CardStringType, type Card } from "two-to-seven-triple-draw";

export const cardsToPrettyString = (
  cards: Card[],
  stringType = CardStringType.Long,
): string => {
  const arr = cards.map((i) => i.toString(stringType));
  const str = [arr.slice(0, -1).join(", "), ...arr.slice(-1)]
    .filter((i) => i)
    .join(" and ");
  return str.charAt(0).toUpperCase() + str.slice(1);
};
