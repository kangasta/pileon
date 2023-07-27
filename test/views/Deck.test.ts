import { render, screen } from "@testing-library/svelte";
import Deck from "../../src/views/Deck.svelte";

it("renders the deck", async () => {
  render(Deck);
  await screen.findByLabelText("Draw a card");
});
