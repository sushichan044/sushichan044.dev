import { defineConfig } from "vite-plus";

export default defineConfig({
  fmt: {
    ignorePatterns: ["pnpm-lock.yaml", "CHANGELOG.md"],
    jsdoc: {
      commentLineStrategy: "multiline",
    },
    sortImports: true,
  },
  run: {
    tasks: {
      check: {
        command: [
          "vp run fmt:check",
          "vp lint",
          "eslint",

          "tsc --noEmit",
          "astro check",
        ],
        dependsOn: ["typegen"],
      },
      "check:fix": {
        command: [
          // Checks may change the code
          "vp lint --fix",
          "eslint --fix",

          // fmt
          "vp run fmt",

          "tsc --noEmit",
          "astro check",
        ],
        dependsOn: ["typegen"],
      },
      fmt: {
        command: ["vp fmt", "vp run fmt:astro"],
      },
      "fmt:check": {
        command: ["vp fmt --check", "vp run fmt:astro:check"],
      },
      "fmt:astro": {
        command: "prettier --write src/**/*.astro",
        input: ["src/**/*.astro"],
        output: ["src/**/*.astro"],
      },
      "fmt:astro:check": {
        command: "prettier --check src/**/*.astro",
        input: ["src/**/*.astro"],
        output: ["src/**/*.astro"],
      },
      typegen: {
        command: ["astro sync", "wrangler types", "vp fmt worker-configuration.d.ts"],
      },
    },
  },
  lint: {
    jsPlugins: ["vite-plus/oxlint-plugin"],
    categories: {
      correctness: "error",
      nursery: "error",
      perf: "error",
    },
    env: {
      node: true,
    },
    options: {
      typeAware: true,
      typeCheck: true,
    },
    rules: {
      "import/consistent-type-specifier-style": "error",
      "typescript/array-type": ["error", { default: "array-simple" }],
      "typescript/ban-ts-comment": "error",
      "typescript/consistent-type-assertions": "error",
      "typescript/consistent-type-imports": "error",
      "typescript/no-misused-promises": "error",
      "typescript/no-explicit-any": "error",
      "typescript/no-unnecessary-type-assertion": "error",
      "typescript/no-unnecessary-type-conversion": "error",
      "typescript/no-unsafe-call": "error",
      "typescript/non-nullable-type-assertion-style": "error",
      "node/no-path-concat": "error",
      "unicorn/custom-error-definition": "error",
      "unicorn/switch-case-braces": "error",
      "typescript/switch-exhaustiveness-check": "error",
      "oxc/branches-sharing-code": "error",
      "unicorn/consistent-assert": "error",
      "typescript/no-confusing-void-expression": "error",
      "unicorn/prefer-date-now": "error",
      "vite-plus/prefer-vite-plus-imports": "error",
    },
    overrides: [
      {
        files: ["**/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
        rules: {
          // Vitest fixtures require an object-destructuring first parameter; allow `({}, use) => {}`.
          "no-empty-pattern": ["error", { allowObjectPatternsAsParameters: true }],
        },
      },
      {
        files: ["**/*.astro"],
        globals: {
          Astro: "readonly",
        },
      },
    ],
  },
  test: {
    benchmark: {
      include: ["**/*.{bench,benchmark}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}"],
    },
    passWithNoTests: true,
    typecheck: {
      enabled: true,
    },
  },
});
