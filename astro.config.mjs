// @ts-check
import { defineConfig } from "astro/config";

import alpinejs from "@astrojs/alpinejs";

import tailwindcss from "@tailwindcss/vite";

// https://astro.build/config
export default defineConfig({
  site: "https://smcleaish.github.io",
  base: "/astro-blog",
  integrations: [alpinejs({ entrypoint: "/src/entrypoint" })],

  vite: {
    plugins: [tailwindcss()],
    ssr: {
      noExternal: ['@igor.dvlpr/astro-post-excerpt'],
    },
  },
});
