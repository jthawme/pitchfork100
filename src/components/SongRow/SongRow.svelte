<script context="module">
  import scrollTo from "scroll-to";
  export function scrollToRow(el) {
    let currScroll = document.documentElement.scrollTop;
    let hei = window.innerHeight;

    const { y, height } = el.getBoundingClientRect();

    const yOffset = (hei - height) / 2 - 20;
    const scrollY = currScroll + y;

    scrollTo(0, scrollY - yOffset, {
      ease: "out-cube",
      duration: 500
    });
  }
</script>

<script>
  import Grid from "../Grid.svelte";
  import LazyImage from "../LazyImage.svelte";
  import UsersReactions from "../UsersReactions/UsersReactions.svelte";

  export let imageUrl = "";
  export let youtube = {};

  export let song;
  export let number;
  export let image;
  export let name;

  export let onSelect;

  export let highlight;

  let elRef;

  $: {
    if (highlight && elRef) {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          scrollToRow(elRef);
        });
      });
    }
  }
</script>

<style lang="scss">
  .main:not(.highlight) > :global(div) {
    cursor: pointer;

    transition: {
      property: opacity;
      duration: 0.15s;
    }

    &:hover,
    &:focus {
      opacity: 0.5;
    }
  }

  .info {
    font-family: var(--font-family-headline);

    grid-column: 2 / span 7;
    align-self: center;

    span {
      display: block;
    }

    @media screen and (min-width: 568px) {
      grid-column: 4 / span 3;
    }
  }

  .number {
    grid-column: 9 / span 1;
    align-self: center;

    @media screen and (min-width: 568px) {
      grid-column: 8 / span 1;
    }
  }

  .image {
    grid-column: 11 / span 2;

    :global(img) {
      width: 100%;
    }

    @media screen and (min-width: 568px) {
      grid-column: 11 / span 1;
    }
  }

  .highlight {
    .info {
      grid-row: 2;
      grid-column: 1 / span 7;

      align-self: flex-start;
    }

    .image {
      grid-row: 1 / span 2;
      grid-column: 8 / span 5;
    }

    .number {
      grid-row: 1;
      grid-column: 1;

      align-self: flex-end;

      span {
        display: flex;

        align-items: center;
        justify-content: center;

        width: 36px;
        height: 36px;

        padding-top: 0px;

        border: 3px solid currentColor;

        border-radius: 100%;

        font-size: var(--font-size-small);
        font-weight: bold;
      }
    }

    .title {
      font-size: var(--font-size-large);
    }

    .artist {
      font-size: var(--font-size-regular);
    }

    @media screen and (min-width: 568px) {
      .info {
        grid-row: 2;
        grid-column: 2 / span 6;

        align-self: flex-start;
      }

      .image {
        grid-row: 1 / span 2;
        grid-column: 8 / span 4;
      }

      .number {
        grid-row: 1;
        grid-column: 2;
      }

      .title {
        font-size: var(--font-size-x-large);
      }

      .artist {
        font-size: var(--font-size-large);
      }
    }
  }
</style>

<span class="main" class:highlight on:click={onSelect} bind:this={elRef}>
  <Grid margin>
    <div class="info">
      <span class="title">{song.title}</span>
      <span class="artist">{song.artist}</span>
      {#if highlight}
        <UsersReactions {number} />
      {/if}
    </div>
    <div class="number">
      <span>{number}</span>
    </div>
    <div class="image">
      <LazyImage src="/images/{image}" alt={name} />
    </div>
  </Grid>
</span>
