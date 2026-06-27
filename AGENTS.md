# AGENTS.md

## Script

- `vp run check`: Run formatter, linter, type checker.
- `vp run check:fix`: Run formatter, linter, type checker with auto-fix where possible.
- `vp test`: Run tests.
- `vp run dev --background` to run the development server. Use with background mode of Bash Tool.

## Coding Guide

- Import `cn()` from `cnfast` for concatenating classes.
- We disabled some builtin tokens of tailwind. See `src/app.css`.
  - ESLint will warn you if you are using any unknown tokens.
