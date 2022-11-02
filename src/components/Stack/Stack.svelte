<script lang="ts">
  import type { Card as ICard } from "two-to-seven-triple-draw";
  import Card from '../Card.svelte'
  import {settings} from '../../stores'

  export let cards: ICard[] = [];
  export let capacity = 4;

  $: widthEm = ($settings.size === "poker" ? 5 : 4.5) + capacity * 1.125
</script>

<div class="stack" style="width: {widthEm}em">
  {#if cards.length === 0}
    <Card empty/>
  {:else}
    <Card card={cards[0]} stack="left"/>
  {/if}
  {#if cards.length > 1}
    <div class="nested">
      <svelte:self cards={cards.slice(1)}/>
    </div>
  {/if}
</div>

<style lang="sass">
  .stack
    position: relative

  .nested
    position: absolute
    left: 1.125em
    top: 0
</style>
