import { setup } from "./utils";
import App from "./App.svelte";

setup({
  tablet: "screen and (min-width: 568px)"
});

const app = new App({
  target: document.body,
  props: {}
});

export default app;
