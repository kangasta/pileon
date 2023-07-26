<script lang="ts">
  import { getCardAppearance } from "../utils/card";
  import { onSpecificKey } from "../utils/events";
  import Card from "./Card.svelte";

  const cardAppearance = getCardAppearance();
  $: bridge = $cardAppearance.size === "bridge";
  $: small = $cardAppearance.size === "small";

  export let numCards = 52;
  export let numDecks = 1;
  export let topCard = null;
  export let numShadows = 10;
  export let shuffleAnimationSteps = 4;
  export let shuffleAnimationMaxDistanceEm = 0.8;
  export let shuffleAnimationMaxRotateDeg = 7;
  export let onClick = () => undefined;

  let shuffleAnimationStep = 0;

  function getShadowTranslate(
    iShadow: number,
    numCards: number,
    numDecks: number,
    numShadows: number
  ) {
    const i = (iShadow / numShadows) * numCards;
    const x = (0.5 * i) / (numDecks * 52);
    const y = (1.0 * i) / (numDecks * 52);

    return `translate(${x}em , ${y}em)`;
  }

  function getShuffleTranslate(i: number, numSteps: number) {
    // Return random distance, if not first or last step
    const randD = (max: number) =>
      [1, numSteps + 2].includes(i) ? 0 : (Math.random() * 2 - 1) * max;

    const x = randD(shuffleAnimationMaxDistanceEm);
    const y = randD(shuffleAnimationMaxDistanceEm);
    const rotate = randD(shuffleAnimationMaxRotateDeg);

    return `translate(${x}em, ${y}em) rotate(${rotate}deg)`;
  }

  function handleShuffleStep() {
    if (shuffleAnimationStep > 0) {
      setTimeout(() => {
        shuffleAnimationStep -= 1;
        handleShuffleStep();
      }, 250);
    }
  }

  $: shadows =
    topCard === undefined
      ? []
      : shuffling
      ? [...Array(numShadows)].map((_, i) => ({
          card: null,
          shadow: false,
          transform: getShuffleTranslate(
            shuffleAnimationStep,
            shuffleAnimationSteps
          ),
        }))
      : [...Array(numShadows)].map((_, i) => ({
          card: undefined,
          shadow: true,
          transform: getShadowTranslate(i, numCards, numDecks, numShadows),
        }));
  $: shuffling = shuffleAnimationStep > 0;
  $: if (
    topCard === null &&
    numCards === 52 * numDecks &&
    shuffleAnimationSteps > 0
  ) {
    // Number of steps plus start and end frames
    shuffleAnimationStep = shuffleAnimationSteps + 2;
    handleShuffleStep();
  }

  $: deckLabel = topCard === undefined ? "Shuffle the deck" : "Draw a card";
</script>

<div
  aria-label={deckLabel}
  class="deck"
  class:bridge
  class:small
  class:shuffling
  role="button"
  on:keydown={onSpecificKey(["Space", "Enter"], onClick, {
    preventDefault: true,
  })}
  on:click={onClick}
  tabindex="0"
>
  <div aria-atomic="true" aria-live="polite">
    {#if !shuffling}
      <Card card={topCard} empty={topCard === undefined} />
    {/if}
    {#each shadows as { card, shadow, transform }}
      <div class="shadow-container" style="transform: {transform}">
        <Card {card} {shadow} />
      </div>
    {/each}
  </div>
</div>

<style lang="sass">
  .deck
    cursor: pointer
    position: relative
    width: 5em
    height: 7em
    margin: 0.5em
    margin-bottom: 1em

    // Disable blue tap-highlight on mobile chrome
    -webkit-tap-highlight-color: transparent

    &.shuffling
      cursor: default

    &.bridge
      width: 4.5em

    &.small
      height: 5em
      width: 3em

  .deck:focus-visible
    border-radius: 0.25em
    outline: 4px solid black
    outline-offset: 4px
    transition: outline 125ms

    &.shuffling
      outline-color: rgba(0, 0, 0, 0.25)

  .shadow-container
    z-index: -10
    left: 0
    top: 0
    position: absolute
    transition: transform 250ms
</style>
