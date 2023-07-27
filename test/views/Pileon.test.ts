import { render } from "@testing-library/svelte";
import Pileon from "../../src/views/Pileon.svelte";

it("renders the pileon game", async () => {
  const { container } = render(Pileon);

  const cards = container.getElementsByClassName("card");
  expect(cards).toHaveLength(54); // 52 Cards + 2 Empty cards

  const piles = container.getElementsByClassName("pile");
  expect(piles).toHaveLength(15);
});
