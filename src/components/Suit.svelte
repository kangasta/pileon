<script lang="ts">
  export let suit: string = null;
  export let flip = false;

  const getPath = (suit: string) => {
    switch (suit) {
      case "hearts":
        return "M 8 2 C 9 0 11 0 12 0 C 13 0 16 1 16 6 C 16 8 15.5 10 14 12 L 8 20 L 2 12 C 0.5 10 0 8 0 6 C 0 1 3 0 4 0 C 5 0 7 0 8 2";
      case "spades":
        return "M 8 0 L 13 5 C 16 8 16 10 16 12 C 16 14 14 16 12 16 C 11 16 9 16 8 14 L 12 20 L 4 20 L 8 14 C 7 16 5 16 4 16 C 2 16 0 14 0 12 C 0 10 0 8 3 5 L 8 0";
      case "diamonds":
        return "M 8 0 L 16 10 L 8 20 L 0 10 L 8 0";
      case "clubs":
        return "M 8 0 C 10 0 12 2 12 4 C 12 6 11 8 8 10 C 9 8 10 7 12 7 C 14 7 16 9 16 12 C 16 14 14 16 12 16 C 11 16 9 16 8 14 L 12 20 L 4 20 L 8 14 C 7 16 5 16 4 16 C 2 16 0 14 0 12 C 0 9 2 7 4 7 C 6 7 7 8 8 10 C 5 8 4 6 4 4 C 4 2 6 0 8 0";
      default:
        return null;
    }
  };

  $: path = getPath(suit);
</script>

<svg class:flip viewBox="0 0 16 20">
  <path d={path} fill="CurrentColor" />
</svg>

<style lang="sass">
  svg
    height: 1em

    &.flip
      transform: scaleY(-1)
</style>
