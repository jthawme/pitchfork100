<script>
  import Grid from "../Grid.svelte";
  import Icon from "../Icon.svelte";
  import Player from "../Player/Player.svelte";
  import UsersDisplay from "../UsersDisplay/UsersDisplay.svelte";
</script>

<style lang="scss">
  aside {
    position: fixed;

    bottom: 0;
    left: 0;

    width: 100%;

    background-color: white;
  }

  .music,
  .users {
    padding: calc(var(--size-padding) / 2) var(--size-padding);
  }

  .number {
    grid-column: 1 / 2;
  }

  .info {
    position: relative;

    grid-column: 2 / 5;

    span {
      display: block;

      white-space: pre;
      text-overflow: ellipsis;
      overflow: hidden;
    }
  }

  .player {
    grid-column: 5 / 11;
  }

  .actions {
    display: flex;

    grid-column: 11 / span 2;

    align-items: center;
    justify-content: flex-end;

    :global(span) {
      margin-left: 10px;

      &:nth-child(1) {
        margin-right: 20px;
      }
    }
  }

  .users {
    position: relative;

    background-color: var(--color-light-blue);
  }

  .user-actions {
    position: absolute;

    right: var(--size-padding);
    top: 50%;

    transform: translateY(-50%);
  }
</style>

<aside>
  <div class="users">
    <Grid>
      <UsersDisplay />
    </Grid>
    <div class="user-actions">
      <Icon name="plus-circle" size="small" />
      <Icon name="help-circle" size="small" />
    </div>
  </div>
  <div class="music">
    <Grid>
      <div class="number">14.</div>
      <div class="info">
        <span>Your Graduation</span>
        <span>Modern Baseball</span>
      </div>
      <div class="player">
        <Player />
      </div>
      <div class="actions">
        <Icon name="external-link" />
        <Icon name="skip-back" />
        <Icon name="skip-forward" />
      </div>
    </Grid>
  </div>
</aside>
