<script lang="ts">
  import Card from "./Card.svelte";

  export let bridge = false;
  export let numCards = 52;
  export let numDecks = 1;
  export let topCard = null;
  export let fourColor = false;
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
      : isShuffling
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
  $: isShuffling = shuffleAnimationStep > 0;
  $: if (
    topCard === null &&
    numCards === 52 * numDecks &&
    shuffleAnimationSteps > 0
  ) {
    // Number of steps plus start and end frames
    shuffleAnimationStep = shuffleAnimationSteps + 2;
    handleShuffleStep();
  }
</script>

<div class="deck" on:click={onClick}>
  {#if !isShuffling}
    <Card card={topCard} {bridge} {fourColor} />
  {/if}
  {#each shadows as { card, shadow, transform }}
    <div class="shadow-container" style="transform: {transform}">
      <Card {card} {shadow} {bridge} />
    </div>
  {/each}
</div>

<style lang="sass">
	.deck
		position: relative
		width: 5em
		height: 7em
		margin: 0.5em
		margin-bottom: 1em
	
	.shadow-container
		z-index: -10
		left: 0
		top: 0
		position: absolute
		transition: transform 250ms
</style>
