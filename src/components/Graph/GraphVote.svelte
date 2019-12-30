<script>
  import { COLORS } from "../../constants";
  import { currentIndex } from "../../store/current.js";

  export let vote;
  export let number;
  export let max;

  function getPos(num, _max, reverse) {
    if (!reverse) {
      return (Math.abs(num) / _max) * 45 + 50;
    } else {
      return 50 - (Math.abs(num) / _max) * 45;
    }
  }
</script>

<style lang="scss">
  div {
    position: absolute;

    top: 50%;
    left: 50%;

    z-index: 2;

    font-size: var(--font-size-small);

    width: 36px;
    height: 36px;

    border: 2px solid currentColor;

    display: flex;

    align-items: center;
    justify-content: center;

    border-radius: 100%;

    transform: translate3d(-50%, -50%, 0);

    background-color: var(--color-pink);

    cursor: pointer;

    &:hover {
      z-index: 50;

      color: white;
    }
  }

  .orange {
    color: var(--color-orange);

    &:hover {
      background-color: var(--color-orange);
    }
  }

  .purple {
    color: var(--color-purple);

    &:hover {
      background-color: var(--color-purple);
    }
  }

  .green {
    color: var(--color-green);

    &:hover {
      background-color: var(--color-green);
    }
  }
</style>

{#each Object.keys(vote) as user}
  <div
    on:click={() => currentIndex.set(100 - number)}
    class={COLORS[user]}
    style="left: {getPos(vote[user], max, vote[user] < 0)}%">
    {number}
  </div>
{/each}
