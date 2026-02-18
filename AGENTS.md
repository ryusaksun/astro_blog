# Repository Guidelines

## Project Structure & Module Organization
This repository is an Astro blog built with TypeScript and UnoCSS.

- `src/pages/`: route files (`index.astro`, `posts/[...slug].astro`, paginated routes).
- `src/components/`: reusable UI pieces (`Header.astro`, `Post.astro`, `Pagination.astro`).
- `src/content/`: content collections defined in `src/content/config.ts`:
  - `posts/` for long-form posts (`.md`)
  - `essays/` for short entries (`.md`)
  - `photos/` for gallery metadata (`.json`)
- `src/styles/`: global and feature CSS.
- `public/`: static assets served as-is.
- `scripts/`: helper scripts such as `new-post.sh` and `update-theme.sh`.

## Build, Test, and Development Commands
Use `pnpm` (lockfile is `pnpm-lock.yaml`).

- `pnpm dev`: run `astro check` then start local dev server.
- `pnpm start`: start Astro dev server without the check step.
- `pnpm build`: run type/content checks and build production output.
- `pnpm preview`: preview the built site locally.
- `pnpm new-post`: create a new post file in `src/content/posts/`.
- `pnpm update-theme`: fetch and merge updates from the upstream theme template.

## Coding Style & Naming Conventions
- Follow existing Astro + TypeScript style and keep imports grouped at file top.
- Use 2-space indentation in `.astro`, `.ts`, and CSS files.
- Keep route/component names in PascalCase for components (`PhotoGrid.astro`) and lowercase for routes.
- Prefer the `~/*` path alias for imports from `src/*`.
- Content filenames should be descriptive and stable:
  - posts: lowercase kebab-case (for example `my-trip-note.md`)
  - essays: timestamp-first filenames (for example `2026-02-18-103533-595.md`)

## Testing Guidelines
There is no separate unit-test framework configured in this repository. Validation is done through Astro checks and build output.

- Required before PR: `pnpm build`
- For UI/content changes: run `pnpm dev` and verify affected pages, pagination, and feed output.
- If adding non-trivial logic, include a reproducible verification note in the PR.

## Commit & Pull Request Guidelines
Recent history uses short, imperative commit subjects such as `Add ...`, `Update ...`, and `Delete ...`. Keep this pattern.

- Commit format examples:
  - `Add post: spring-festival-recap`
  - `Update gallery: fix thumbnail order`
  - `Delete essay: 2026-02-17-test-043143.md`
- PRs should include:
  - concise summary of what changed
  - impacted paths (for example `src/pages/gallery`, `src/content/posts`)
  - local verification steps and results
  - screenshots for visible UI/layout changes
