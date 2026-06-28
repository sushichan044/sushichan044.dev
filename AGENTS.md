# AGENTS.md

## Script

- `vp run check`: Run formatter, linter, type checker.
- `vp run check:fix`: Run formatter, linter, type checker with auto-fix where possible.
- `vp test`: Run tests.
- `vp run dev` to run the development server. Use with background mode of Bash Tool.

## Coding Guide

- Browser API should be used in `*.browser.ts` files.
- Use `unplugin-icons` for icons.
- Use Temporal, not Date.
- Import `cn()` from `cnfast` for concatenating classes.
- We disabled some builtin tokens of tailwind. See `src/app.css`.
  - ESLint will warn you if you are using any unknown tokens.

### Type Safe Routing

Use `astro-typesafe-routes`. Types for new routes will appear after `vp run typegen` or `vp run dev` is executed.

- Use `import { createRoute } from "astro-typesafe-routes/create-route";` to define dynamic route.
  - `export const Route = createRoute(...);`,
    - Export is required for proper bundling.
  - Then use `const params = Route.getParams(Astro);` to get params with type safety.
  - Then use `Route.createGetStaticPaths<Props>()` to define `getStaticPaths` with type safety.
- Use `import { $path } from "astro-typesafe-routes/path"` to build internal href.
  - e.g. `<Link href={$path({ to: "/posts/[...id]", params: { id: post.id } })}>...</Link>`.
