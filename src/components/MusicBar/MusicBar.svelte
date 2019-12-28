<script>
  import Grid from "../Grid.svelte";
  import Icon from "../Icon.svelte";
  import Player from "../Player/Player.svelte";
  import UsersDisplay from "../UsersDisplay/UsersDisplay.svelte";

  import {
    currentSong,
    currentIndex,
    songs,
    playing
  } from "../../store/current.js";

  let shouldPlay = false;

  function previousTrack() {
    if ($currentIndex > 0) {
      currentIndex.set($currentIndex - 1);
    } else {
      currentIndex.set($songs.length - 1);
    }
  }

  function nextTrack() {
    if ($currentIndex < $songs.length - 2) {
      currentIndex.update(n => n + 1);
    } else {
      currentIndex.set(0);
    }
  }

  function togglePlay() {
    shouldPlay = !shouldPlay;
  }
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
    {#if $currentSong}
      <Grid>
        <div class="number">{$currentSong.number}.</div>
        <div class="info">
          <span>{$currentSong.song.title}</span>
          <span>{$currentSong.song.artist}</span>
        </div>
        <div class="player">
          <Player {shouldPlay} />
        </div>
        <div class="actions">
          <button class="action spacer" on:click={togglePlay}>
            <Icon name={$playing ? 'pause' : 'play'} />
          </button>
          <a
            target="_blank"
            href="https://youtube.com/watch?v={$currentSong.youtube.id}"
            class="action spacer">
            <Icon name="external-link" />
          </a>
          <button class="action" on:click={previousTrack}>
            <Icon name="skip-back" />
          </button>
          <button class="action" on:click={nextTrack}>
            <Icon name="skip-forward" />
          </button>
        </div>
      </Grid>
    {/if}
  </div>
</aside>
