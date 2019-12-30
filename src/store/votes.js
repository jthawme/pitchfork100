import { writable, get } from "svelte/store";
import { COLORS } from "../constants";

export const votingKeys = [
  ["ArrowUp", "ArrowDown"],
  ["=", "-"],
  ["2", "1"]
];

export const users = writable([
  {
    id: 0,
    name: "User 1",
    keys: votingKeys[0],
    color: COLORS[0]
  }
]);

export const votes = writable({});

export const addUser = () => {
  const _users = get(users);

  _users.push({
    id: _users.length,
    name: `User ${_users.length + 1}`,
    keys: votingKeys[_users.length],
    color: COLORS[_users.length]
  });

  users.set(_users);
};

export const changeVote = (songIndex, user, mod = 1) => {
  const _votes = get(votes);

  if (!_votes[songIndex]) {
    _votes[songIndex] = {};
  }

  if (!_votes[songIndex][user]) {
    _votes[songIndex][user] = 0;
  }

  _votes[songIndex][user] += mod;

  votes.set(_votes);
};
