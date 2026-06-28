import { fileURLToPath } from "node:url";

import type { Linter } from "eslint";
import astro from "eslint-plugin-astro";
import tw from "eslint-plugin-better-tailwindcss";
import type { Config } from "eslint/config";
import { defineConfig, globalIgnores, includeIgnoreFile } from "eslint/config";
import tseslint from "typescript-eslint";

const allTSRecommendedRules: Config["rules"] = Object.fromEntries(
  tseslint.configs.recommended.reduce(
    (acc, config) => {
      if (config.rules) {
        for (const [ruleName, ruleConfig] of Object.entries(config.rules)) {
          acc.push([ruleName, ruleConfig]);
        }
      }
      return acc;
    },
    [] as Array<[string, Linter.RuleEntry]>,
  ),
);

export default defineConfig(
  includeIgnoreFile(fileURLToPath(new URL(".gitignore", import.meta.url)), {
    gitignoreResolution: true,
  }),

  globalIgnores(["**/*.{js,mjs,jsx,ts,mts,tsx}"]),
  {
    files: ["**/*.astro"],
    extends: [
      astro.configs["flat/recommended"],
      astro.configs["flat/jsx-a11y-strict"],
      tw.configs["recommended-error"],
      {
        name: "typescript-eslint/recommended-rules-only",
        // Prevent overriding languageOptions to parse Astro files properly.
        rules: allTSRecommendedRules,
        plugins: {
          "@typescript-eslint": tseslint.plugin,
        },
      },
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
