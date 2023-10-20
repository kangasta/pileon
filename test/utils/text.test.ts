import { CardStringType, Cards } from "two-to-seven-triple-draw"
import { cardsToPrettyString } from "../../src/utils/text"

it.each([
    ["J♠, Q♠, 7♥ and 7♦", "J♠ Q♠ 7♥ 7♦"],
    ["J♠, Q♠ and 7♥", "J♠ Q♠ 7♥"],
    ["J♠ and Q♠", "J♠ Q♠"],
    ["J♠", "J♠"],
])("outputs expected string (%s)", (expected, cards) => {
    expect(cardsToPrettyString(new Cards(cards), CardStringType.ShortEmoji)).toEqual(expected)
});

it('capitalizes first letter', () => {
    expect(cardsToPrettyString(new Cards('J♠'))).toEqual("Jack of spades")
});
