<script lang="ts">
  import Modal from "../../components/Modal.svelte";
</script>

<Modal on:close title="How to play?">
  <p>
    The goal of the pileon solitaire is to rearrange a deck of cards into piles
    of equal ranks from thirteen random piles of four using fifteen piles.
  </p>
  <h3>Rules</h3>
  <ul>
    <li>Each pile can contain up to four cards.</li>
    <li>
      Cards can be moved from top of the pile into a pile where the top card is
      of the same rank as the card that is moved.
    </li>
    <li>Cards of any rank can be moved into an empty pile.</li>
    <li>Multiple cards with the same rank can be moved at once.</li>
    <li>
      Pile is complete when it contains all four cards with the same rank.
    </li>
  </ul>
  <h3>Moving cards</h3>
  <ol>
    <li>
      Select the source pile by clicking a pile. Cards to be moved are
      highlighted. Click the source pile again to reduce the amount of selected
      cards.
    </li>
    <li>
      Move cards by clicking the target pile. If the move is valid, the cards
      are moved from the source pile into the target pile.
    </li>
  </ol>
  <p>
    If your device supports drag-and-drop, you can also drag the cards you want
    to move from the source pile into the target pile. Double-clicking the
    source pile automatically moves cards from the pile to an available target
    pile.
  </p>
</Modal>
