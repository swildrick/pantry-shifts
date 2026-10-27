# CLAUDE.md

This file gives Claude Code guidance for working in this repository.

## Design system (read first for UI work)

Before any design system task (UI, styling, the theme, tokens, components, stories, or Figma), read both [src/design-system.md](src/design-system.md) and [src/design-system.map.json](src/design-system.map.json) first, before changing code. The doc gives the rules; the map links each Figma component to its code, Storybook stories, variants, props and tokens, and lists known mismatches. When you add or change a component, story or Figma node, update the map in the same change (and `src/stories/figma.ts` if a node ID changes).

The components are documented in Storybook. When Storybook is running (`npm run storybook`), use the `pantry-shifts-storybook` MCP server: call `docs-list` and `docs-show` to look up a component's props and stories before using or changing it, and add or update its story (`src/components/*.stories.tsx`, or `src/stories/` for MUI components) when you change it. Each story links to its Figma component through `src/stories/figma.ts`.

On every push to `main` that changes `src/`, the `Storybook sync` GitHub Actions workflow ([.github/workflows/storybook-sync.yml](.github/workflows/storybook-sync.yml)) runs Claude Code headless (`claude -p`, authenticated by the `ANTHROPIC_API_KEY` Actions secret) with [.github/prompts/storybook-sync.md](.github/prompts/storybook-sync.md) to update the stories and the map, and opens a pull request with the result. It cannot see Figma, so it lists needed Figma updates in the pull request instead.

## Project overview

Pantry Shifts is a volunteer shift scheduler for a neighborhood food pantry. Volunteers browse upcoming shifts, sign up or cancel, see the volunteer roster, and edit their profile.

- React 19, TypeScript (strict), Vite 5, MUI 7 (`@mui/material`, `@mui/icons-material`, Emotion).
- Runs entirely in the browser. There is no backend, no API, no router, and no login.
- Node.js 18 or newer.

## Commands

```bash
npm install        # install dependencies
npm run dev        # dev server with hot reload at http://localhost:5173
npm run build      # type-check (tsc --noEmit), then build to dist/
npm run preview    # serve the production build
npm run storybook        # Storybook at http://localhost:6006 (also serves the MCP at /mcp)
npm run build-storybook  # static Storybook build to storybook-static/
```

There are no test or lint scripts. `npm run build` is the only automated check, so run it after changes.

## Architecture

```
src/
  main.tsx            entry; wraps <App /> in ThemeProvider + CssBaseline
  App.tsx             sticky AppBar with Tabs; switches pages via local state
  theme.ts            design tokens and the MUI theme
  design-system.md    design system rules (read first for UI work)
  design-system.map.json  Figma component -> code, stories, variants, props, tokens
  useLocalStorage.ts  useState that syncs to localStorage
  data/seed.ts        Shift and Volunteer types, sample data, CURRENT_VOLUNTEER_ID
  utils/time.ts       formatTime / formatTimeRange (24h -> 12h display)
  components/         shared UI: PageHeader, ShiftCard, StatusChip, SignUpDialog, SummaryTile, InfoTile
  pages/              ShiftsPage, VolunteersPage, SettingsPage
  stories/            Storybook: stories for the MUI atoms, Tokens.mdx, Figma links (figma.ts)
.storybook/           Storybook config; preview.tsx wraps stories in the app theme
```

- **Navigation.** `App.tsx` holds the active tab in `useState`. The initial tab can be set with the `?tab=` query param (0 Shifts, 1 Volunteers, 2 My profile). Changing tabs does not update the URL.
- **Current user.** There is no auth. The volunteer whose id is `CURRENT_VOLUNTEER_ID` (`'v1'`, Maya Okafor) is treated as the signed-in user.
- **Data and persistence.** `ShiftsPage` keeps the shift list in `useLocalStorage` under the key `pantry-shifts`, seeded from `initialShifts`. Signing up or cancelling edits a shift's `volunteerIds`. Volunteers are read straight from `seed.ts` and never change. The profile form on `SettingsPage` is local state only; "Save changes" shows a snackbar but does not persist anything.
- **Time.** Shift times are stored as 24-hour `HH:mm` strings and dates as ISO `YYYY-MM-DD`. Format for display with `formatTime` / `formatTimeRange` from `utils/time.ts`; keep stored values in 24-hour form.

## Conventions

- Function components, one per file, exported as `default`. Props are a local type named `Props`.
- Import MUI components from the `@mui/material` barrel. Import icons one per file from `@mui/icons-material/<Name>Rounded` (the Rounded variant is used throughout).
- Use `import type` for type-only imports (for example `import type { Shift } from '../data/seed'`).
- Style with the `sx` prop and theme values. See the design system doc for the rules.
- Single quotes, semicolons, trailing commas, 2-space indent.
- To reset local data in the browser: `localStorage.removeItem('pantry-shifts')`, then reload.
