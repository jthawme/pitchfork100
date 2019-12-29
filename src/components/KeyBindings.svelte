<script>
  import { onMount, onDestroy } from "svelte";
  import {
    currentIndex,
    songs,
    playing,
    nextTrack,
    previousTrack,
    togglePlaying
  } from "../store/current.js";
  import { keyBindings, addKeyBinding } from "../store/keys.js";

  function onKeyUp(e) {
    if ($keyBindings[e.key]) {
      e.preventDefault();
      $keyBindings[e.key].forEach(({ id, func, preventDefault }) => {
        func();
      });
    } else {
      console.log(e.key);
    }
  }

  function setEventListeners() {
    window.addEventListener("keyup", onKeyUp, false);

    window.addEventListener("keydown", function(e) {
      if (e.keyCode == 32 && e.target == document.body) {
        e.preventDefault();
      }
    });
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
