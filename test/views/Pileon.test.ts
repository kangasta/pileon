import { render, screen } from "@testing-library/svelte";
import * as focusTrap from "focus-trap"; // eslint-disable-line import/namespace
import { Cards } from "two-to-seven-triple-draw";

import Pileon from "../../src/views/Pileon";
import DeadEndModal from "../../src/views/Pileon/DeadEndModal.svelte";
import { createFocusTrapMock } from "../utils";

vi.spyOn(focusTrap, "createFocusTrap").mockImplementation(createFocusTrapMock);

it("renders the pileon game", async () => {
  const { container } = render(Pileon);

  const cards = container.getElementsByClassName("card");
  expect(cards).toHaveLength(54); // 52 Cards + 2 Empty cards

  const piles = container.getElementsByClassName("pile");
  expect(piles).toHaveLength(15);
});

it("has related cards in infinite loop alert", async () => {
  const piles = [
    new Cards("J♠ Q♠ 7♥ 7♦"),
    new Cards("K♥ 4♣ 7♠"),
    new Cards("J♥ J♦ Q♦ Q♣"),
    new Cards("4♦ K♠ Q♥"),
  ];
  render(DeadEndModal, { piles });
  await screen.findByText(
    /Seven of diamonds and queen of clubs can be moved back and forth between two piles\..*/,
  );
});
