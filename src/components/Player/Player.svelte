<script>
  import {
    currentSong,
    currentIndex,
    songs,
    togglePlaying
  } from "../../store/current.js";
  import VideoPlayer from "./VideoPlayer.svelte";

  export let shouldPlay = false;

  /* Reference for container */
  let wrapperRef;

  /* Width of container */
  let width = 0;

  /* Normalised positions of handles */
  let xPos = 0;
  let seekTime = 0;

  let videoTime = 0;

  /* Whether or not handles are being dragged */
  let dragging = false;

  /* The containers x positions to the screen */
  let wrapperOffsetX = 0;

  /* The last mouse X position in the window */
  let lastX = 0;

  /* Whether or not an update is being worked */
  let ticking = false;

  let touch = false;

  const clamp = (num, min, max) => Math.min(Math.max(num, min), max);

  function onMouseMove(e) {
    lastX = e.x;
    requestUpdate();
  }

  function onTouchMove(e) {
    lastX = e.touches[0].clientX;
    requestUpdate();
  }

  function requestUpdate() {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(update);
    }
  }

  function update() {
    let val = clamp((lastX - wrapperOffsetX) / width, 0, 1);

    xPos = val;

    ticking = false;
  }

  function getContainerPosition() {
    wrapperOffsetX = wrapperRef.getBoundingClientRect().x;
  }

  function onHandleDown(e) {
    touch = !!e.touches;

    setDragging(true);
    getContainerPosition();
    registerMouseMove();
  }

  function onHandleUp() {
    seekTime = xPos * videoTime;
    setDragging(false);
    unregisterMouseMove();
  }

  function setDragging(value) {
    dragging = value;

    document.body.classList.toggle("grabbing", dragging);
  }

  function registerMouseMove() {
    if (!touch) {
      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onHandleUp);
    } else {
      window.addEventListener("touchmove", onTouchMove);
      window.addEventListener("touchend", onHandleUp);
      window.addEventListener("touchcancel", onHandleUp);
    }
  }

  function unregisterMouseMove() {
    if (!touch) {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mouseup", onHandleUp);
    } else {
      window.removeEventListener("touchmove", onTouchMove);
      window.removeEventListener("touchend", onHandleUp);
      window.removeEventListener("touchcancel", onHandleUp);
    }
  }

  function onTime(_time) {
    videoTime = _time;
  }

  function onProgress(_time) {
    if (!dragging) {
      xPos = _time / videoTime;
    }
  }

  function onEnd() {
    currentIndex.update(idx => {
      if (idx + 1 < $songs.length - 1) {
        return idx + 1;
      }

      return 0;
    });
  }

  let errorMessage = false;
  let skipTimer;
  function onUnable() {
    errorMessage = "This track can't be played. Skipping";

    clearTimeout(skipTimer);
    skipTimer = setTimeout(() => {
      onEnd();
    }, 5000);
  }

  function onError() {
    errorMessage = "There was an error playing. Pausing";

    togglePlaying(false);
  }

  $: {
    if ($currentIndex) {
      errorMessage = false;
    }
  }

  $: {
    if (errorMessage) {
      const utter = new SpeechSynthesisUtterance(errorMessage);
      speechSynthesis.speak(utter);
    }
  }
</script>

<style lang="scss">
  .player {
    position: relative;

    height: 100%;

    :global(iframe) {
      position: absolute;

      width: 100px;
      height: 100px;

      bottom: 0;
      right: 0;

      opacity: 0;
      pointer-events: none;
    }
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

  .error {
    position: absolute;

    bottom: 100%;
    left: 0;

    width: 100%;

    background-color: var(--color-red);
    color: white;

    padding: calc(var(--size-padding) / 2);

    text-align: center;
  }
</style>

<div class="player" bind:this={wrapperRef} bind:clientWidth={width}>
  <div class="track" />
  <div
    class="handle"
    style="left: {xPos * 100}%"
    on:mousedown={onHandleDown}
    on:touchstart={onHandleDown} />

  {#if errorMessage}
    <div class="error">{errorMessage}</div>
  {/if}

  {#if $currentSong}
    <VideoPlayer
      videoId={$currentSong.youtube.id}
      {onTime}
      {onProgress}
      {onEnd}
      {onUnable}
      {shouldPlay}
      time={seekTime} />
  {/if}
</div>
