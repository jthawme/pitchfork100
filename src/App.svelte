<script>
  import { onMount } from "svelte";

  import MusicBar from "./components/MusicBar/MusicBar.svelte";
  import Graph from "./components/Graph/Graph.svelte";
  import SongRow, { scrollToRow } from "./components/SongRow/SongRow.svelte";
  import KeyBindings from "./components/KeyBindings.svelte";

  import { songs, currentIndex, playing } from "./store/current.js";
  import { hydrate } from "./store/persist.js";

  import logoSvg from "./svg/logo.svg";

  function getSongs() {
    return fetch("/api/data.json").then(resp => resp.json());
  }

  function setIndex(idx) {
    currentIndex.set(idx);
  }

  let idleTimer;

  function idleChecker(e) {
    clearTimeout(idleTimer);
    idleTimer = setTimeout(() => {
      scrollToRow(document.querySelector(".highlight"));
    }, 10000);
  }

  function addIdleListener() {
    document.addEventListener("mousemove", idleChecker);
    document.addEventListener("scroll", idleChecker);
  }

  onMount(() => {
    hydrate();

    getSongs().then(data => {
      songs.set(data);
    });

    addIdleListener();
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

    top: calc(var(--size-padding) / 2);
    left: calc(var(--size-padding) / 2);

    width: 40px;
    height: 40px;

    color: black;

    &.playing {
      animation: {
        name: SPIN;
        duration: 10s;
        timing-function: linear;
        iteration-count: infinite;
      }
    }

    @media screen and (min-width: 568px) {
      top: var(--size-padding);
      left: var(--size-padding);

      width: 100px;
      height: 100px;
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

  section {
    padding: var(--size-padding) var(--size-padding) 40vh;
  }
</style>

<span class="logo" class:playing={$playing}>
  {@html logoSvg}
</span>

<KeyBindings />

<main>
  {#each $songs as song, index}
    <SongRow
      onSelect={() => setIndex(index)}
      {...song}
      highlight={index === $currentIndex} />
  {/each}
</main>

<section>
  <Graph />
</section>

<MusicBar />
