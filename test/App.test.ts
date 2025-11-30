import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/svelte";
import userEvent from "@testing-library/user-event";
import * as focusTrap from "focus-trap"; // eslint-disable-line import/namespace

import App from "../src/App.svelte";

import {
  checkDeckHasAceOfSpades,
  createFocusTrapMock,
  waitShuffleAnimation,
} from "./utils";

vi.mock('focus-trap', { spy: true })
vi.mocked(focusTrap.createFocusTrap).mockImplementation(createFocusTrapMock)

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

  const helpTitle = "How to play?";
  expect(screen.queryByText(helpTitle)).not.toBeInTheDocument();

  await userEvent.click(helpButton);
  await screen.findByText(helpTitle);

  // Check dialog role and label
  expect(await screen.findByRole("dialog")).toHaveAccessibleName(helpTitle);
});

it("clears selected cards on undo in pileon", async () => {
  render(App);

  // Move card(s) from stack 1 to stack 14
  const stack1 = await screen.findByLabelText(/Stack 1:.*/);
  await userEvent.click(stack1);
  await screen.findByLabelText(/Stack 1:.*[1-4] cards selected.*/);
  const stack14 = await screen.findByLabelText(/Stack 14:.*/);
  await userEvent.click(stack14);
  expect(
    screen.queryByLabelText(/Stack 1.*cards selected.*/),
  ).not.toBeInTheDocument();

  // Select cards from stack 2
  const stack2 = await screen.findByLabelText(/Stack 2:.*/);
  await userEvent.click(stack2);
  await screen.findByLabelText(/Stack 2:.*[1-4] cards selected.*/);

  // Undo first move
  const undoButton = await screen.findByLabelText("Undo");
  await userEvent.click(undoButton);
  await screen.findByLabelText(/Stack 14: empty.*/);

  // No cards should be selected
  expect(screen.queryByLabelText(/.*cards selected.*/)).not.toBeInTheDocument();
});

it("clears selected cards on shuffle in pileon", async () => {
  render(App);

  // Select card(s) from stack 1
  const stack1 = await screen.findByLabelText(/Stack 1:.*/);
  await userEvent.click(stack1);
  await screen.findByLabelText(/Stack 1:.*[1-4] cards selected.*/);

  // Shuffle the cards
  const shuffleButton = await screen.findByLabelText("Shuffle");
  await userEvent.click(shuffleButton);

  // No cards should be selected
  expect(screen.queryByLabelText(/.*cards selected.*/)).not.toBeInTheDocument();
});

it("allows shuffling the deck", async () => {
  render(App);

  // Change game to deck
  await userEvent.click(await screen.findByLabelText("Menu"));
  await userEvent.click(
    await screen.findByRole("button", { name: "Deck of cards" }),
  );
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
