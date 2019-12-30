import { derived, get } from "svelte/store";
import { users, votes } from "./votes";
import { currentIndex } from "./current";

const SITE_PERSIST_KEY = "pitchfork-100";

// Stops the derived state from overwriting the stored state
// before its had a chance to hydrate
let hydrated = false;

const global = derived(
  [currentIndex, users, votes],
  ([$currentIndex, $users, $votes]) => {
    return {
      currentIndex: $currentIndex,
      users: $users,
      votes: $votes
    };
  }
);

// Subscribe to the derived state simply to store the important
// stuff in local storage
global.subscribe(value => {
  if (hydrated) {
    localStorage.setItem(SITE_PERSIST_KEY, JSON.stringify(value));
  }
});

// This method checks local storage and hydrates the stores
// if data exists already
export const hydrate = () => {
  const obj = localStorage.getItem(SITE_PERSIST_KEY);

  if (!obj) {
    hydrated = true;
    return;
  }

  const json = JSON.parse(obj);

  requestAnimationFrame(() => {
    requestAnimationFrame(() => {
      users.set(json.users);
      currentIndex.set(json.currentIndex);
      votes.set(json.votes);
      hydrated = true;
    });
  });
};

export const reset = () => {
  const _users = get(users);
  _users.splice(1, 2);

  users.set(_users);
  votes.set({});
};
