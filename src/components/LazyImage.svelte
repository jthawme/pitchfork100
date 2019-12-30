<script>
  export let src;
  export let alt = "";

  let loadedSrc = "";
  let el;

  function loadImage(_src) {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve();
      img.src = _src;
    });
  }

  $: {
    loadImage(src).then(() => {
      loadedSrc = src;
    });
  }
</script>

<style lang="scss">
  img {
    opacity: 0;

    transition: {
      duration: 0.25s;
      property: opacity;
    }
  }

  .loaded {
    opacity: 1;
  }
</style>

<img bind:this={el} class:loaded={loadedSrc} src={loadedSrc} {alt} />
