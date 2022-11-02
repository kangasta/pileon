<script lang="ts">
  import { Card } from "two-to-seven-triple-draw";
  import { getCardAppearance } from "../utils/card";
  import ScreenReaderOnly from "./ScreenReaderOnly.svelte";
  import Suit from "./Suit.svelte";

  const cardAppearance = getCardAppearance();
  $: bridge = $cardAppearance.bridge
  $: fourColor = $cardAppearance.fourColor

  export let card: Card = null;
  export let empty: boolean = false;
  export let shadow: boolean = false;
  export let stack: "left" = undefined;

  const labels = ["top", "bottom"];

  $: hidden = card === null && !shadow;
  $: visible = !(empty || hidden || shadow);

  $: rank =
    visible && card.toString(Card.StringType.ShortValue).replace("T", "10");
  $: suit = visible && card.toString(Card.StringType.LongSuit);
  $: face = visible && card.num % 13 > 9;
  $: text = visible && card.toString(Card.StringType.Long);
</script>

<div
  class="card {suit} stack-{stack}"
  class:bridge
  class:fourColor
  class:empty
  class:hidden
  class:shadow
  class:visible
>
  {#if visible}
    <ScreenReaderOnly>{text}</ScreenReaderOnly>
  {/if}
  {#each labels as label}
    <div aria-hidden="true" class="{label} label">
      <div class="rank rank-{rank}">{rank}</div>
      <div class="suit"><Suit {suit} /></div>
    </div>
    <div class="center" class:face />
  {/each}
</div>

<style lang="sass">
  $borderWidth: 0.2em

  .card
    border-radius: 0.25em
    box-sizing: border-box
    display: inline-block
    font-family: sans-serif
    position: relative
    user-select: none
    transition: width 250ms

    width: 5em
    height: 7em

    &.stack-left
      box-shadow: -3px 0 2.5px rgba(47, 79, 79, 0.666)

    &.bridge
      width: 4.5em

    &.visible
      border-width: 0
      background-color: var(--background-card)

    &.hidden:not(.visible)
      border: $borderWidth white solid
      background: repeating-linear-gradient(60deg, transparent, transparent 0.35em, white 0.05em, white 0.4em), repeating-linear-gradient(-60deg, orangered, orangered 0.35em, white 0.05em, white 0.4em)

    &.empty:not(.visible)
      border: var(--text-primary) $borderWidth solid
      background: transparent

    &.shadow:not(.visible)
      background: var(--text-primary)

    &.spades
      color: var(--text-black)

    &.clubs
      color: var(--text-black)

      &.fourColor
        color: var(--text-green)

    &.hearts
      color: var(--text-red)

    &.diamonds
      color: var(--text-red)

      &.fourColor
        color: var(--text-blue)

  .label
    visibility: hidden

  .visible .label
    align-items: center
    display: flex
    flex-direction: column
    padding: 0.2em 0.1em
    position: absolute
    row-gap: 0.3em
    visibility: visible
    width: 1em

    &.bottom
      bottom: 0
      right: 0
      transform: rotate(180deg)

    &.top
      left: 0
      top: 0

    .rank.rank-10
      letter-spacing: -0.15em
      padding-right: 0.25em

    .suit
      font-size: 0.8em

  .center.face
    background: var(--background-highlight)
    border-radius: 0.25em
    position: absolute
    padding: 0.1em
    height: 5.5em
    left: 50%
    top: 50%
    transform: translate(-50%,-50%)
    width: 2em

    .card.bridge &
      width: 1.7em
</style>
