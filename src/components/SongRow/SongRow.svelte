<script>
  import Grid from "../Grid.svelte";
  import UsersReactions from "../UsersReactions/UsersReactions.svelte";

  export let song;
  export let number;
  export let image;
  export let name;

  export let onSelect;

  export let highlight;
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

    grid-column: 4 / span 3;
    align-self: center;

    span {
      display: block;
    }
  }

  .number {
    grid-column: 8 / span 1;
    align-self: center;
  }

  .image {
    grid-column: 11 / span 1;

    img {
      width: 100%;
    }
  }

  .highlight {
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

      align-self: flex-end;

      span {
        display: flex;

        align-items: center;
        justify-content: center;

        width: 36px;
        height: 36px;

        padding-top: 0px;

        border: 5px solid currentColor;

        border-radius: 100%;

        font-size: var(--font-size-small);
        font-weight: bold;
      }
    }

    .title {
      font-size: var(--font-size-x-large);
    }

    .artist {
      font-size: var(--font-size-large);
    }
  }
</style>

<span class="main" class:highlight on:click={onSelect}>
  <Grid margin center>
    <div class="info">
      <span class="title">{song.title}</span>
      <span class="artist">{song.artist}</span>
      {#if highlight}
        <UsersReactions />
      {/if}
    </div>
    <div class="number">
      <span>{number}</span>
    </div>
    <div class="image">
      <img src="/images/{image}" alt={name} />
    </div>
  </Grid>
</span>
