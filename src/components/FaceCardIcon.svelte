<script lang="ts">
  export let rank: string;
  export let flip: boolean = false;

  const images: { [k: string]: string } = {
    J: "M 4 15 L 12 15 A 1 1 0 0 0 12 13 C 11 13 11 12 11 12 C 11 9 9 10 9 7 C 9 6 10 6 10 6 A 0.5 0.5 0 0 0 10 5 L 9 5 A 2 2 0 1 0 7 5 L 6 5 A 0.5 0.5 0 0 0 6 6 C 6 6 7 6 7 7 C 7 10 5 9 5 12 C 5 12 5 13 4 13 A 1 1 0 0 0 4 15",
    Q: "M 4 15 L 12 15 A 1 1 0 0 0 12 13 C 11 13 11 12 11 12 L 11 10 A 0.5 0.5 0 0 0 11 9 C 11 8 11 7 14 3 A 1 1 0 1 0 13 3 L 10.5 6 L 11.25 3 A 1 1 0 1 0 10.25 3 L 9 6 L 8.5 3 A 1 1 0 1 0 7.5 3 L 7 6 L 5.75 3 A 1 1 0 1 0 4.75 3 L 5.5 6 L 3 3 A 1 1 0 1 0 2 3 C 5 7 5 8 5 9 A 0.5 0.5 0 0 0 5 10 L 5 12 C 5 12 5 13 4 13 A 1 1 0 0 0 4 15",
    K: "M 4 15 L 12 15 A 1 1 0 0 0 12 13 C 12 11 13 12 13 9 C 13 9 13 7 11 7 L 10 7 C 9 7 9 6 9 6 L 9 5.5 L 10.5 5.5 L 10.5 4 L 9 4 A 1.75 1.75 0 1 0 7 4 L 5.5 4 L 5.5 5.5 L 7 5.5 L 7 6 C 7 6 7 7 6 7 L 5 7 C 3 7 3 9 3 9 C 3 12 4 11 4 13 A 1 1 0 0 0 4 15 M 8 3.25 A 0.75 0.75 0 0 0 8 1.75 A 0.75 0.75 0 0 0 8 3.25",
  };

  $: d = images[rank];
</script>

<svg class:flip viewBox="0 0 16 16 ">
  <path
    fill-rule="evenodd"
    stroke-linecap="round"
    stroke-linejoin="round"
    stroke-width="0.5"
    {d}
  />
</svg>

<style lang="sass">
  svg
    fill: currentColor
    height: 1em
    stroke: var(--text-black)

    &.flip
      transform: scaleY(-1)
</style>