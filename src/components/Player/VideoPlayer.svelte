<script>
  import { onMount, beforeUpdate } from "svelte";
  import { playing } from "../../store/current.js";

  export let videoId;
  export let time;
  export let onTime;
  export let onProgress;
  export let onEnd;
  export let onUnable;
  export let shouldPlay;

  let videoRef;
  let player;
  let loaded = false;
  let ready = false;

  function onPlayerReady(event) {
    // player = event.target;
    ready = true;
  }

  function onPlayerStateChange(event) {
    if (event.data == YT.PlayerState.PLAYING) {
      playing.set(true);
      onTime(player.getDuration());
      updateTime();
    }
    if (event.data == YT.PlayerState.PAUSED) {
      playing.set(false);
    }
    if (event.data == YT.PlayerState.ENDED) {
      onEnd();
    }
  }

  function onPlayerError(event) {
    if (event.data === 101 || event.data === 150) {
      onUnable();
    }
  }

  function updateTime() {
    onProgress(player.getCurrentTime());
    setTimeout(() => updateTime(), 250);
  }

  function loadPlayer(id) {
    if (!player) {
      ensureLoaded().then(() => {
        player = new YT.Player(videoRef, {
          height: "390",
          width: "640",
          videoId: id,
          events: {
            onReady: onPlayerReady,
            onStateChange: onPlayerStateChange,
            onError: onPlayerError
          }
        });
      });
    } else {
      player.loadVideoById(id);
    }
  }

  function ensureLoaded() {
    return new Promise((resolve, reject) => {
      const check = () => {
        if (!YT.Player) {
          setTimeout(() => check(), 100);
        } else {
          resolve();
        }
      };
      check();
    });
  }

  $: {
    if (videoId) {
      loadPlayer(videoId);
    }
  }

  $: {
    if (ready && time !== 0) {
      player.seekTo(time);
    }
  }

  $: {
    if (player && ready) {
      if (shouldPlay) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  }
</script>

<div bind:this={videoRef} />
