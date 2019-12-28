<script>
  import IndividualUserReaction from "./IndividualUserReaction.svelte";
  import { COLORS } from "../../constants.js";
</script>

<style lang="scss">
  div {
    display: flex;

    margin-top: 10px;

    > :global(div) {
      margin-right: 10px;
    }
  }
</style>

<div>
  {#each COLORS as color}
    <IndividualUserReaction {color} />
  {/each}
</div>
