<script>
  import { onMount } from "svelte";

  import MusicBar from "./components/MusicBar/MusicBar.svelte";
  import SongRow from "./components/SongRow/SongRow.svelte";
  import { songs, currentIndex, playing } from "./store/current.js";

  import logoSvg from "./svg/logo.svg";

  function getSongs() {
    return fetch("/api/data.json").then(resp => resp.json());
  }

  function setIndex(idx) {
    currentIndex.set(idx);
  }

  onMount(() => {
    getSongs().then(data => {
      songs.set(data);
    });
  });
</script>

<style lang="scss">
  :global(html),
  :global(body) {
    background-color: var(--color-pink);
    font-family: var(--font-family-body);
  }

  .logo {
    position: fixed;

    z-index: 10;

    top: var(--size-padding);
    left: var(--size-padding);

    width: 100px;
    height: 100px;

    color: black;

    &.playing {
      animation: {
        name: SPIN;
        duration: 10s;
        timing-function: linear;
        iteration-count: infinite;
      }
    }
  }

  @keyframes SPIN {
    0% {
      transform: rotate(0deg);
    }

    100% {
      transform: rotate(360deg);
    }
  }

  main {
    position: relative;

    padding: var(--size-padding) var(--size-padding) 140px;

    // &:before {
    //   position: fixed;

    //   top: 0;
    //   left: 0;

    //   width: 100%;
    //   height: 50vh;

    //   content: "";

    //   pointer-events: none;

    //   background: linear-gradient(
    //     to bottom,
    //     var(--color-pink),
    //     transparent 75%
    //   );
    // }
  }
</style>

<span class="logo" class:playing={$playing}>
  {@html logoSvg}
</span>

<main>
  {#each $songs as song, index}
    <SongRow
      onSelect={() => setIndex(index)}
      {...song}
      highlight={index === $currentIndex} />
  {/each}
</main>

<MusicBar />
