import { writable, get } from "svelte/store";

export const keyBindings = writable({});

let bindingId = 0;

export const addKeyBinding = (key, func, preventDefault = false) => {
  const bindings = { ...get(keyBindings) };
  const keys = Object.keys(bindings);

  if (!keys.includes(key)) {
    bindings[key] = [];
  }

  let id = bindingId;

  bindings[key].push({
    id,
    func,
    preventDefault
  });

  bindingId++;

  keyBindings.set(bindings);

  return id;
};

export const removeKeyBinding = (key, id) => {
  const bindings = { ...$keyBindings };

  if (!bindings[key]) {
    return false;
  }

  const funcIndex = bindings[key].findIndex(v => v.id === id);

  if (funcIndex < 0) {
    return false;
  }

  bindings[key].splice(funcIndex, 1);

  keyBindings.set(bindings);

  return true;
};
