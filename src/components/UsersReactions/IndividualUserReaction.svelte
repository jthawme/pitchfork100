<script>
  import Icon from "../Icon.svelte";

  export let color;
</script>

<style lang="scss">
  div {
    display: flex;

    align-items: center;

    span {
      font-family: var(--font-family-body);
      font-size: var(--font-size-small);

      margin-left: 5px;
      margin-top: 3px;
    }
  }

  .orange {
    color: var(--color-orange);
  }

  .green {
    color: var(--color-green);
  }
</style>

<div class={color}>
  <Icon name="thumbs-up" size="xsmall" />
  <span>50</span>
</div>
