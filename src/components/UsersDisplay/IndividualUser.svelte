<script>
  import { media } from "../../utils";
  export let name;
  export let keys;
  export let color;
</script>

<style lang="scss">
  div {
    display: flex;

    padding-right: 10px;

    span {
      margin: 0 5px;
    }
  }

  .name,
  .action {
    font-size: var(--font-size-small);
  }

  .circle {
    display: inline-block;

    width: 12px;
    height: 12px;

    border-radius: 100%;

    &.orange {
      background-color: var(--color-orange);
    }

    &.green {
      background-color: var(--color-green);
    }

    &.purple {
      background-color: var(--color-purple);
    }
  }

  .action {
    color: var(--color-dark-blue);
  }
</style>

<div>
  <span class="circle {color}" />
  <span class="name">{name}</span>
  {#if $media.tablet}
    <span class="action">({keys[0]} / {keys[1]} to vote)</span>
  {/if}
</div>
