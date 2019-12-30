<script>
  import IndividualUser from "./IndividualUser.svelte";
  import { users } from "../../store/votes";
</script>

<style lang="scss">
  div {
    display: flex;

    grid-column: 1 / span 12;
  }
</style>

<div>
  {#each $users as user}
    <IndividualUser {...user} />
  {/each}
</div>
