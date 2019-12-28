import { writable, derived } from "svelte/store";

export const currentIndex = writable(0);
export const songs = writable([]);
export const playing = writable(false);

export const currentSong = derived(
  [currentIndex, songs],
  ([$currentIndex, $songs]) => {
    return $songs[$currentIndex];
  }
);
