<script>
  export let margin = false;
</script>

<style lang="scss">
  div {
    display: grid;

    grid-template-columns: repeat(12, 1fr);
    grid-gap: var(--size-gutter);
    grid-auto-rows: min-content;

    max-width: 1280px;
  }

  .margin {
    margin-bottom: var(--size-padding);
  }
</style>

<div class:margin>
  <slot />
</div>
