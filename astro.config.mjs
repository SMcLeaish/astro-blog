// @ts-check
import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";

import preact from "@astrojs/preact";

// https://astro.build/config
export default defineConfig({
  site: "https://seanmcleaish.com",
  integrations: [alpinejs({ entrypoint: "/src/entrypoint" }), preact()],
});

