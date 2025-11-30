/// <reference types="vitest" />
import { svelte } from "@sveltejs/vite-plugin-svelte";
import { defineConfig } from "vitest/config";

export default defineConfig({
  plugins: [svelte()],
  resolve: { conditions: ["browser"] },
  test: { globals: true, environment: "jsdom", setupFiles: ["test/setup.ts"] },
});
