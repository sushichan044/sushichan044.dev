import { fileURLToPath } from "node:url";

import astro from "eslint-plugin-astro";
import tw from "eslint-plugin-better-tailwindcss";
import { defineConfig, globalIgnores, includeIgnoreFile } from "eslint/config";
import tseslint from "typescript-eslint";

export default defineConfig(
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url)), {
    gitignoreResolution: true,
  }),

  globalIgnores(["**/*.{js,mjs,jsx,ts,mts,tsx}"]),
  {
    files: ["**/*.astro"],
    extends: [
      tseslint.configs.recommendedTypeChecked,
      astro.configs["flat/recommended"],
      astro.configs["flat/jsx-a11y-strict"],
      tw.configs["recommended-error"],
    ],
    languageOptions: {
      parserOptions: {
        project: "./tsconfig.json",
      },
    },
    settings: {
      "better-tailwindcss": {
        entryPoint: "./src/app.css",
      },
    },
    rules: {
      "better-tailwindcss/enforce-consistent-line-wrapping": "off",
    },
  },
);
