import "@testing-library/jest-dom";
import { render, screen, waitFor } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import Deck from "../../src/views/Deck.svelte";

it("renders the deck", async () => {
  render(Deck);
  await screen.findByLabelText("Draw a card");
});

it("cycles through the deck", async () => {
  render(Deck);
  const deck = await screen.findByLabelText("Draw a card");

  // Wait for shuffle animation to finish
  await waitFor(
    () => expect(deck).not.toHaveAttribute("aria-disabled", "true"),
    { timeout: 1500 },
  );

  let aceOfSpadesN = 0;
  for (let i = 0; i < 53; i++) {
    await userEvent.click(deck);

    if (screen.queryByText("ace of spades")) {
      aceOfSpadesN++;
    }
  }

  expect(aceOfSpadesN).toEqual(1);
  await screen.findByLabelText("Shuffle the deck");
  await userEvent.click(deck);
  await screen.findByLabelText("Draw a card");
});
