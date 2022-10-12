<script lang="ts">
  import Card from "./Card.svelte";

  export let bridge = false;
  export let numCards = 52;
  export let numDecks = 1;
  export let topCard = null;
  export let fourColor = false;
  export let numShadows = 10;
  export let onClick = () => undefined;

  $: shadows = topCard === undefined ? [] : Array(numShadows).fill("shadow");

  function getTranslate(i) {
    return (
      "translate(" +
      (0.5 * i) / (numDecks * 52) +
      "em , " +
      (1.0 * i) / (numDecks * 52) +
      "em)"
    );
  }
</script>

<div class="deck" on:click={onClick}>
  <Card card={topCard} {bridge} {fourColor} />
  {#each shadows as _, i}
    <div
      class="shadow-container"
      style="transform: {getTranslate((i / numShadows) * numCards)}"
    >
      <Card shadow />
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
