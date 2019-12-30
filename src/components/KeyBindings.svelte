<script>
  import { onMount, onDestroy } from "svelte";
  import {
    currentIndex,
    currentSong,
    songs,
    playing,
    nextTrack,
    previousTrack,
    togglePlaying
  } from "../store/current.js";
  import { keyBindings, addKeyBinding } from "../store/keys.js";
  import { users, changeVote } from "../store/votes.js";

  function onKeyUp(e) {
    if ($keyBindings[e.key]) {
      e.preventDefault();
      $keyBindings[e.key].forEach(({ id, func, preventDefault }) => {
        func();
      });
    } else {
      $users.forEach(({ keys, id }) => {
        if (keys.includes(e.key)) {
          e.preventDefault();
          const idx = keys.indexOf(e.key);

          changeVote($currentSong.number, id, idx === 0 ? 1 : -1);
        }
      });
    }
  }

  function setEventListeners() {
    window.addEventListener("keydown", onKeyUp, false);
  }

  function unsetEventListeners() {
    window.removeEventListener("keyup", onKeyUp);
  }

  onMount(() => {
    setEventListeners();

    addKeyBinding("ArrowRight", () => nextTrack());
    addKeyBinding("ArrowLeft", () => previousTrack());
    addKeyBinding(" ", () => togglePlaying(), true);
  });

  onDestroy(() => {
    unsetEventListeners();
  });
</script>
