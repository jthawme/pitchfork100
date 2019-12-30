<script>
  import Icon from "../Icon.svelte";
  import { votes, changeVote } from "../../store/votes.js";
  import { media } from "../../utils";

  export let color;
  export let id;
  export let name = "";
  export let keys;
  export let number;

  let voteNumber = 0;

  function getVotes(_votes, _number, _id) {
    if (!_votes[_number] || !_votes[_number][_id]) {
      return 0;
    }

    return _votes[_number][_id];
  }

  $: {
    voteNumber = getVotes($votes, number, id);
  }
</script>

<style lang="scss">
  button {
    display: flex;

    align-items: center;

    cursor: pointer;

    padding: 0;
    margin: 0;
    margin-right: 8px;

    border: 0;
    outline: 0;

    background-color: transparent;

    transition: {
      duration: 0.15s;
      property: opacity;
    }

    span {
      font-family: var(--font-family-body);
      font-size: var(--font-size-small);

      margin-left: 5px;
      margin-top: 3px;
    }

    &:hover,
    &:focus {
      opacity: 0.75;
    }
  }

  .orange {
    color: var(--color-orange);
  }

  .green {
    color: var(--color-green);
  }

  .purple {
    color: var(--color-purple);
  }
</style>

<button class={color} on:click={() => changeVote(number, id, 1)}>
  <Icon
    name={voteNumber < 0 ? 'thumbs-down' : 'thumbs-up'}
    size={$media.tablet ? 'xsmall' : 'medium'} />
  <span>{voteNumber}</span>
</button>
