<script>
  export let tip = "";
  export let delay = 1000;

  let show = false;
  let delayTimer;

  function onMouseEnter() {
    clearTimeout(delayTimer);
    delayTimer = setTimeout(() => {
      show = true;
    }, delay);
  }

  function onMouseLeave() {
    clearTimeout(delayTimer);
    show = false;
  }
</script>

<style lang="scss">
  .wrapper {
    position: relative;
  }

  .tooltip {
    position: absolute;

    bottom: calc(100% + 10px);
    left: 50%;

    z-index: 10;

    color: white;
    background-color: var(--color-dark-blue);

    pointer-events: none;

    padding: 5px;

    transform: translate3d(-50%, 5px, 0);

    transition: {
      duration: 0.15s;
      property: transform, opacity;
    }

    font-size: var(--font-size-small);

    text-align: center;

    opacity: 0;

    white-space: pre;

    .show & {
      opacity: 1;
      transform: translate3d(-50%, 0, 0);
    }
  }
</style>

<span
  class="wrapper"
  class:show
  on:mouseenter={onMouseEnter}
  on:mouseleave={onMouseLeave}>
  <span class="tooltip">{tip}</span>
  <slot />
</span>
