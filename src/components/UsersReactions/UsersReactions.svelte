<script>
  import IndividualUserReaction from "./IndividualUserReaction.svelte";
  import { users } from "../../store/votes";
  import { media } from "../../utils";

  export let number;
</script>

<style lang="scss">
  div {
    display: flex;

    flex-wrap: wrap;

    margin-top: 10px;

    > :global(div) {
      margin-right: 10px;
    }
  }

  .message {
    display: block;

    width: 100%;

    font-size: var(--font-size-small);
    font-family: var(--font-family-body);

    opacity: 0.5;

    margin-top: 10px;
  }
</style>

<div>
  {#each $users as user}
    <IndividualUserReaction {number} {...user} />
  {/each}
  {#if !$media.tablet}
    <span class="message">Tap thumbs to vote</span>
  {/if}
</div>
