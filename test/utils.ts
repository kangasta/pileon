import "@testing-library/jest-dom";
import { screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

export const waitShuffleAnimation = async () => {
  const deck = await screen.findByLabelText("Draw a card");
  expect(deck).toHaveAttribute("aria-disabled", "true");

  await waitFor(
    () => expect(deck).not.toHaveAttribute("aria-disabled", "true"),
    { timeout: 1500 },
  );
  return deck;
};

export const checkDeckHasAceOfSpades = async (deck: HTMLElement) => {
  let aceOfSpadesN = 0;
  for (let i = 0; i < 53; i++) {
    await userEvent.click(deck);

    if (screen.queryByText("ace of spades")) {
      aceOfSpadesN++;
    }
  }

  expect(aceOfSpadesN).toEqual(1);
};

export const createFocusTrapMock: any = () => ({
  activate: () => {},
  deactivate: () => {},
});
