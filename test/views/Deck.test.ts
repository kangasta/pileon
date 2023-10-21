import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";

import Deck from "../../src/views/Deck.svelte";
import { checkDeckHasAceOfSpades, waitShuffleAnimation } from "../utils";

it("renders the deck", async () => {
  render(Deck);
  await screen.findByLabelText("Draw a card");
});

it("cycles through the deck", async () => {
  render(Deck);
  const deck = await waitShuffleAnimation();

  await checkDeckHasAceOfSpades(deck);
  await screen.findByLabelText("Shuffle the deck");
  await userEvent.click(deck);
  await screen.findByLabelText("Draw a card");
});
