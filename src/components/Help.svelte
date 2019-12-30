<script>
  import { fly, slide } from "svelte/transition";
  import { quintOut } from "svelte/easing";
  import { reset } from "../store/persist.js";

  import Icon from "./Icon.svelte";

  export let show;
  export let onHide;
</script>

<style lang="scss">
  div {
    position: absolute;

    bottom: 100%;
    right: 0;

    width: 100%;
    max-width: 350px;
    max-height: 80vh;

    overflow: auto;

    color: white;

    padding: calc(var(--size-padding) * 2) var(--size-padding)
      var(--size-padding);

    background-color: var(--color-dark-blue);
  }

  p {
    margin: 0 0 var(--size-gutter);
    line-height: 1.3;

    &:last-of-type {
      margin-top: var(--size-padding);
      margin-bottom: 0;
    }
  }

  a {
    color: var(--color-orange);
    text-decoration: none;
  }

  .hide {
    position: absolute;

    right: calc(var(--size-padding) / 2);
    top: calc(var(--size-padding) * 0.75);

    display: flex;

    align-items: center;

    font-size: var(--font-size-small);

    border: 0;
    outline: 0;
    background-color: transparent;

    color: white;

    span {
      margin-right: 5px;
    }
  }

  a,
  button {
    cursor: pointer;

    &:hover,
    &:focus {
      opacity: 0.75;
    }
  }

  .reset {
    margin: 10px 0 0;
    padding: 0;

    border: 0;
    background-color: transparent;

    font-size: var(--font-size-small);

    color: var(--color-red);
  }
</style>

{#if show}
  <div transition:slide={{ duration: 500 }}>
    <button class="hide" on:click={onHide}>
      <span>Hide</span>
      <Icon name="x" size="xsmall" />
    </button>
    <p>
      This list is populated froms
      <a
        href="https://pitchfork.com/features/lists-and-guides/best-songs-2019/"
        target="_blank"
        rel="noreferrer noopener">
        Pitchfork’s top 100 songs
      </a>
      from 2019.
    </p>
    <p>
      You can keep track of songs you like by upvoting them (feel free to upvote
      them by more than 1 if you really like it)
    </p>

    <p>
      Add more than 1 user if you want to individually keep track of the songs
      you like between friends.
    </p>

    <p>
      Made by
      <a href="https://jthaw.me" target="_blank" rel="noreferrer noopener">
        jthaw.me
      </a>
      <br />
      (because I do this every year)
    </p>
    <button class="reset" on:click={reset}>Reset all my stats</button>
  </div>
{/if}
