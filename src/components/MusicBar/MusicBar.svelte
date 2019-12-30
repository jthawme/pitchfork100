<script>
  import Grid from "../Grid.svelte";
  import Tooltip from "../Tooltip.svelte";
  import Icon from "../Icon.svelte";
  import Player from "../Player/Player.svelte";
  import UsersDisplay from "../UsersDisplay/UsersDisplay.svelte";
  import Help from "../Help.svelte";

  import {
    currentSong,
    currentIndex,
    songs,
    playing,
    nextTrack,
    previousTrack,
    togglePlaying
  } from "../../store/current.js";
  import { addUser, users } from "../../store/votes.js";

  let shouldShowHelp = false;

  function toggleHelp(force) {
    shouldShowHelp = typeof force !== "undefined" ? force : !shouldShowHelp;
  }
</script>

<style lang="scss">
  aside {
    position: fixed;
    z-index: 10;

    bottom: 0;
    left: 0;

    width: 100%;

    background-color: white;
  }

  .music,
  .users {
    position: relative;

    padding: calc(var(--size-padding) / 2) var(--size-padding);
  }

  .number {
    grid-column: 1 / 2;
  }

  .info {
    position: relative;

    grid-column: 2 / 12;

    span {
      display: inline-block;

      &:nth-child(1):after {
        content: " – ";
      }
    }

    @media screen and (min-width: 568px) {
      grid-column: 2 / 5;
      span {
        display: block;

        white-space: pre;
        text-overflow: ellipsis;
        overflow: hidden;

        &:nth-child(1):after {
          display: none;
        }
      }
    }
  }

  .player {
    grid-column: 1 / 8;

    @media screen and (min-width: 568px) {
      grid-column: 5 / 10;
    }
  }

  .actions {
    display: flex;

    grid-column: 10 / span 3;

    align-items: center;
    justify-content: flex-end;
  }

  .action {
    padding: 0;
    margin: 0;
    margin-left: 5px;

    border: none;
    background-color: transparent;

    outline: 0;

    color: inherit;
    cursor: pointer;

    &.spacer {
      margin: 0 15px;
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

    button {
      outline: 0;
      background: transparent;
      border: 0;

      cursor: pointer;
    }
  }
</style>

<aside>
  <div class="users">
    <Grid>
      <UsersDisplay />
    </Grid>
    <div class="user-actions">
      <button on:click={addUser} disabled={$users.length >= 3}>
        <Tooltip tip="Add user">
          <Icon name="plus-circle" size="small" />
        </Tooltip>
      </button>
      <button on:click={() => toggleHelp()}>
        <Tooltip tip="Help">
          <Icon name="help-circle" size="small" />
        </Tooltip>
      </button>
    </div>
    <Help onHide={() => toggleHelp(false)} show={shouldShowHelp} />
  </div>
  <div class="music">
    {#if $currentSong}
      <Grid>
        <div class="number">{$currentSong.number}.</div>
        <div class="info">
          <span>{$currentSong.song.title}</span>
          <span>{$currentSong.song.artist}</span>
        </div>
        <div class="player">
          <Player />
        </div>
        <div class="actions">
          <button class="action spacer" on:click={() => togglePlaying()}>
            <Tooltip tip={$playing ? 'Pause' : 'Play'}>
              <Icon name={$playing ? 'pause' : 'play'} />
            </Tooltip>
          </button>
          <a
            target="_blank"
            href="https://youtube.com/watch?v={$currentSong.youtube.id}"
            class="action spacer">
            <Tooltip tip="Open external">
              <Icon name="external-link" />
            </Tooltip>
          </a>
          <button class="action" on:click={previousTrack}>
            <Tooltip tip="Previous">
              <Icon name="skip-back" />
            </Tooltip>
          </button>
          <button class="action" on:click={nextTrack}>
            <Tooltip tip="Next">
              <Icon name="skip-forward" />
            </Tooltip>
          </button>
        </div>
      </Grid>
    {/if}
  </div>
</aside>
