<script lang="ts">
  import Suit from "$lib/components/Suit.svelte";

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
</script>

<div class="center-pattern">
  {#each getPattern(rank) as line}
    <div class="row {grow(line)}">
      {#each line.split("") as char}
        <span><Suit {suit} flip={char.toLowerCase() === "d"} /></span>
      {/each}
    </div>
  {/each}
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
