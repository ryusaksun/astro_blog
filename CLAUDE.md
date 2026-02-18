# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Astro-based personal blog (forked from [astro-theme-typography](https://github.com/moeyua/astro-theme-typography)) with three content types: posts (长文), essays (随笔), and photos (照片). Built with Astro 4, TypeScript, and UnoCSS. Deploys to Vercel as a static site.

## Key Commands

- `pnpm dev` — dev server with `astro check` first
- `pnpm start` — dev server without type checking
- `pnpm build` — production build with `astro check`
- `pnpm preview` — preview production build
- `pnpm new-post` — interactive shell script to scaffold a new blog post

No test suite exists. Validate changes with `pnpm build`.

## Architecture

### Three Content Collections (`src/content/config.ts`)

| Collection | Type | Directory | Schema notes |
|---|---|---|---|
| `posts` | content (Markdown) | `src/content/posts/` | Required: `title`, `pubDate`, `categories` |
| `essays` | content (Markdown) | `src/content/essays/` | `title` is optional; no categories. Short-form microblog entries |
| `photos` | data (JSON) | `src/content/photos/` | `url` (required), `thumbnail` (optional), `date` |

Essays are the most active collection with 100+ entries. Their filenames encode the date and a snippet of the content (e.g. `2026-02-18-刚送完莹-133050-216.md`).

### Content Utilities (`src/utils/index.ts`)

Core functions used across pages:
- `getPosts()` / `getEssays()` — fetch and sort by `pubDate` descending, with in-memory caching
- `getPostDescription()` — strips markdown to plain text, truncates to 400 chars
- `getEssayDisplayTitle()` — uses `title` if present, otherwise first 50 chars of body

### Routing (all static, `src/pages/`)

- `/` — homepage (recent posts)
- `/posts/[slug]` and `/posts/page/[page]` — blog posts with pagination
- `/essays`, `/essays/[slug]`, `/essays/page/[page]` — essays with timeline view
- `/gallery` and `/gallery/page/[page]` — photo grid
- `/atom.xml` — RSS feed (combines both posts and essays)

### Configuration

- **Site config**: `src/theme.config.ts` — title, author, navigation, socials, pagination (`postsPerPage: 5`, `essaysPerPage: 10`)
- **Astro config**: `astro.config.ts` — integrations (UnoCSS, robots.txt, sitemap), Shiki code highlighting with `one-dark-pro` theme
- **Styling**: `uno.config.ts` — UnoCSS with dark theme by default. Custom styles in `src/styles/` (essay timeline, heti Chinese typography, global)

### Layout & Components

Single layout `src/layouts/LayoutDefault.astro` wraps all pages. Path alias `~` maps to `src/`.

Key components: `Header`, `Footer`, `Post`, `EssayCard`, `PhotoGrid`, `Pagination`, `ListItem`, `ListSection`.

### Types

`src/types/index.d.ts` exports `Post`, `Essay`, `Page`, `EssayPage` — all derived from Astro's `CollectionEntry` and `Page` generics.

## Content Frontmatter

**Post** (`src/content/posts/*.md`):
```yaml
title: "Post Title"        # required
pubDate: "2024-01-01 12:00:00"  # required
categories: ["tech"]       # required, array of strings
description: "..."         # optional (auto-generated from body if missing)
banner: ./image.jpg        # optional
```

**Essay** (`src/content/essays/*.md`):
```yaml
title: "Optional Title"    # optional
pubDate: "2024-01-01 12:00:00"  # required
```

**Photo** (`src/content/photos/*.json`):
```json
{ "url": "https://...", "thumbnail": "https://...", "date": "2025-08-07" }
```

## 快捷指令

- 用户发送 **`c`** — 立即提交（git add + commit，自动生成中文 commit message）
- 用户发送 **`cp`** — 立即提交并推送（git add + commit + push）
