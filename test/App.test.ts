import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import App from "../src/App.svelte";
import {
  checkDeckHasAceOfSpades,
  createFocusTrapMock,
  waitShuffleAnimation,
} from "./utils";
import * as focusTrap from "focus-trap";

vi.spyOn(focusTrap, "createFocusTrap").mockImplementation(createFocusTrapMock);

it("displays shuffle and undo buttons", async () => {
  const { container } = render(App);

  const cards = container.getElementsByClassName("card");
  expect(cards).toHaveLength(54); // 52 Cards + 2 Empty cards

  await screen.findByLabelText("Shuffle");
  await screen.findByLabelText("Undo");
});

it("has an help dialog for pileon", async () => {
  render(App);

  const helpButton = await screen.findByLabelText("Help");

  const helpTitle = "Pileon solitaire";
  expect(screen.queryByText(helpTitle)).not.toBeInTheDocument();

  await userEvent.click(helpButton);
  await screen.findByText(helpTitle);
});

it("allows shuffling the deck", async () => {
  render(App);

  // Change game to deck
  await userEvent.click(await screen.findByLabelText("Settings"));
  await userEvent.click(await screen.findByRole("button", { name: "deck" }));
  await userEvent.click(await screen.findByLabelText("Close"));

  const deck = await waitShuffleAnimation();

  for (let i = 0; i < 10; i++) {
    await userEvent.click(deck);
  }

  await screen.findByLabelText("Draw a card");
  expect(screen.queryByText("Shuffle the deck")).not.toBeInTheDocument();

  const shuffleButton = await screen.findByLabelText("Shuffle");
  await userEvent.click(shuffleButton);
  await waitShuffleAnimation();

  await checkDeckHasAceOfSpades(deck);
  await screen.findByLabelText("Shuffle the deck");
}, 10e3);
