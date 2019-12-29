<script>
  import { onMount, beforeUpdate } from "svelte";
  import { playing, togglePlaying } from "../../store/current.js";

  export let videoId;
  export let time;
  export let onTime;
  export let onProgress;
  export let onEnd;
  export let onUnable;
  export let onError;

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
      onTime(player.getDuration());
      updateTime();

      if (!$playing) {
        togglePlaying(true);
      }
    }
    // if (event.data == YT.PlayerState.PAUSED) {
    //   if ($playing) {
    //     togglePlaying(false);
    //   }
    // }

    if (event.data == YT.PlayerState.ENDED) {
      onEnd();
    }
  }

  function onPlayerError(event) {
    if (event.data === 101 || event.data === 150) {
      onUnable();
    } else {
      onError();
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
          playerVars: {
            modestbranding: 0,
            rel: 0,
            showinfo: 0,
            disablekb: 1
          },
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
      const check = times => {
        if (times > 10) {
          console.error("Error loading youtube api");

          return;
        }
        if (typeof YT === "undefined" || !YT.Player) {
          setTimeout(() => check(times + 1), 100);
        } else {
          resolve();
        }
      };
      check(0);
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

  playing.subscribe(_playing => {
    if (player && ready) {
      if (_playing) {
        player.playVideo();
      } else {
        player.pauseVideo();
      }
    }
  });
</script>

<div bind:this={videoRef} />
