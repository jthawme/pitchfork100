<script>
  import { votes } from "../../store/votes.js";
  import Grid from "../Grid.svelte";
  import GraphVote from "./GraphVote.svelte";

  function getMax(_votes) {
    return Math.max(
      ...Object.values(_votes)
        .map(v => Object.values(v).map(_v => Math.abs(_v)))
        .flat()
    );
  }

  $: max = getMax($votes);
</script>

<style lang="scss">
  .title {
    grid-column-start: 1;
    grid-column-end: span 6;

    font-size: var(--font-size-xx-large);
    font-family: var(--font-family-headline);
    font-weight: bold;

    &:nth-child(2) {
      grid-column-start: 7;
      text-align: right;
    }
  }

  .line {
    position: relative;

    grid-column: 1 / span 12;
    height: 2px;
    background-color: var(--color-dark-blue);

    margin-bottom: 20px;

    &:before,
    &:after {
      position: absolute;

      top: 50%;
      left: 0;

      content: "";

      height: 16px;
      width: 2px;
      background-color: var(--color-dark-blue);

      transform: translateY(-50%);
    }

    &:after {
      right: 0;
      left: auto;
    }
  }
</style>

<Grid>
  <div class="line">
    {#each Object.keys($votes) as voteKey}
      <GraphVote number={voteKey} vote={$votes[voteKey]} {max} />
    {/each}
  </div>
</Grid>
<Grid>
  <div class="title">Hate</div>
  <div class="title">Love</div>
</Grid>
