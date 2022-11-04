<script lang="ts">
  import FaceCardIcon from "./FaceCardIcon.svelte";
  import Suit from "./Suit.svelte";

  export let suit: string;
  export let rank: string;

  const patterns: { [k: string]: string[] } = {
    A: ["U"],
    2: ["U", "D"],
    3: ["U", "U", "D"],
    4: ["UU", "DD"],
    5: ["UU", "U", "DD"],
    6: ["UU", "UU", "DD"],
    7: ["UU", "u", "UU", "DD"],
    8: ["UU", "UU", "DD", "DD"],
    9: ["UU", "u", "UU", "DD", "DD"],
    10: ["UU", "u", "UU", "DD", "d", "DD"],
  };
  const getPattern = (rank: string): string[] => patterns[rank] ?? [];

  const grow = (line: string) => (line.toUpperCase() === line ? "grow" : "");

  $: face = ["J", "Q", "K"].includes(rank);
</script>

<div class="center-pattern" class:face>
  {#if Object.keys(patterns).includes(rank)}
    {#each getPattern(rank) as line}
      <div class="row {grow(line)}">
        {#each line.split("") as char}
          <span><Suit {suit} flip={char.toLowerCase() === "d"} /></span>
        {/each}
      </div>
    {/each}
  {:else}
    <div class="row grow">
      <span><FaceCardIcon {rank} /></span>
    </div>
    <div class="row grow">
      <span><FaceCardIcon flip {rank} /></span>
    </div>
  {/if}
</div>

<style lang="sass">
  .center-pattern
    box-sizing: border-box
    display: flex
    flex-direction: column
    font-size: 0.5em
    height: 100%
    padding: 0 0.25em
    width: 100%

  .face .row
    font-size: 2.25em

  .row
    align-items: center
    display: flex
    justify-content: space-between

    &.grow
      flex-grow: 1

    &:only-child
      margin: auto 0

    span:only-child
        margin: 0 auto
</style>
