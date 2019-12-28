<script>
  import { onMount } from "svelte";

  import MusicBar from "./components/MusicBar/MusicBar.svelte";
  import SongRow from "./components/SongRow/SongRow.svelte";

  import logoSvg from "./svg/logo.svg";

  let songs = [];

  function getSongs() {
    return fetch("/api/data.json").then(resp => resp.json());
  }

  onMount(() => {
    getSongs().then(data => {
      songs = data;
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
  }

  main {
    position: relative;

    padding: var(--size-padding) var(--size-padding) 140px;

    &:before {
      position: fixed;

      top: 0;
      left: 0;

      width: 100%;
      height: 50vh;

      content: "";

      pointer-events: none;

      background: linear-gradient(
        to bottom,
        var(--color-pink),
        transparent 75%
      );
    }
  }
</style>

<span class="logo">
  {@html logoSvg}
</span>

<main>
  {#each songs as song, index}
    <SongRow {...song} highlight={index === 3} />
  {/each}
</main>

<MusicBar />
