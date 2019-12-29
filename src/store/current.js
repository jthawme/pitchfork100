import { writable, derived, get } from "svelte/store";

export const currentIndex = writable(0);
export const songs = writable([]);
export const playing = writable(false);

export const currentSong = derived(
  [currentIndex, songs],
  ([$currentIndex, $songs]) => {
    return $songs[$currentIndex];
  }
);

export function previousTrack() {
  const idx = get(currentIndex);
  const _songs = get(songs);

  if (idx > 0) {
    currentIndex.set(idx - 1);
  } else {
    currentIndex.set(_songs.length - 1);
  }
}

export function nextTrack() {
  const idx = get(currentIndex);
  const _songs = get(songs);

  if (idx < _songs.length - 2) {
    currentIndex.update(n => n + 1);
  } else {
    currentIndex.set(0);
  }
}

export function togglePlaying(force) {
  playing.update(_playing =>
    typeof force === "undefined" ? !_playing : force
  );
}
