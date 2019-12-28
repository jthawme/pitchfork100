<style lang="scss">
  .player {
    position: relative;

    height: 100%;
  }

  .track {
    position: absolute;

    width: 100%;
    height: 2px;

    top: 50%;
    left: 0;

    transform: translateY(-50%);

    background-color: var(--color-dark-blue);
  }

  .handle {
    position: absolute;

    top: 50%;
    left: 40%;

    transform: translate3d(-50%, -50%, 0);

    width: 28px;
    height: 28px;

    border-radius: 100%;
    border: 2px solid var(--color-dark-blue);

    background-color: var(--color-light-blue);

    cursor: pointer;

    transition: {
      property: border-width;
      duration: 0.15s;
    }

    &:hover,
    &:focus {
      border-width: 4px;
    }
  }
</style>

<div class="player">
  <div class="track" />
  <div class="handle" />
</div>
