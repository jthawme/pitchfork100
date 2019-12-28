<style lang="scss">
  div {
    display: flex;

    padding-right: 50px;

    span {
      margin: 0 5px;
    }
  }

  .name,
  .action {
    font-size: var(--font-size-small);
  }

  .circle {
    display: inline-block;

    width: 12px;
    height: 12px;

    background-color: var(--color-orange);

    border-radius: 100%;
  }

  .action {
    color: var(--color-dark-blue);
  }
</style>

<div>
  <span class="circle" />
  <span class="name">User 1</span>
  <span class="action">(Up / Down to vote)</span>
</div>
