# Storybook sync

You are running in GitHub Actions after a push to `main`. Your job is to keep Storybook and the design system map in step with the components. A later workflow step opens a pull request with whatever you change, so do not commit, push or open a pull request yourself.

This run is automatic. Nobody can answer a question, so never ask one and never stop to wait for input. When something is unclear, make the decision yourself using the rule below, carry on, and record the decision in the pull request body under "Decisions".

**The code is the source of truth.** Stories and the map describe the code as it is now. When the code disagrees with Figma or with `src/design-system.md`, follow the code in the stories and the map, and list the difference in the pull request body. Do not change the code to match Figma or the doc.

## Read first

1. `CLAUDE.md`
2. `src/design-system.md` (the documented rules)
3. `src/design-system.map.json` (Figma component -> code, stories, variants, props, tokens)

## 1. Find what changed

The workflow gives you `BEFORE` and `AFTER` commit SHAs. List the changed files with `git diff --name-only BEFORE AFTER`. If `BEFORE` is all zeros, use `git diff --name-only AFTER~1 AFTER`.

Only these changes need a sync:

- `src/components/*.tsx` (not `*.stories.tsx`)
- `src/pages/*.tsx` and `src/App.tsx`, where they change how a mapped MUI component is used (variant, color, size, props)
- `src/theme.ts`

Read the diff of each relevant file (`git diff BEFORE AFTER -- <file>`) before changing anything.

## 2. Update stories

Match the existing stories exactly: CSF3 with `satisfies Meta<...>`, `tags: ['autodocs']`, `figmaParameters(...)` from `src/stories/figma.ts`, `fn()` from `storybook/test` for handlers, one export per variant or state, and a short `/** ... */` comment on each story. Follow the code conventions in `CLAUDE.md`.

- **Changed component in `src/components/`:** update its `*.stories.tsx` so every prop and visible state is covered. Add stories for new props or states, remove stories for removed ones, and update args that no longer match.
- **New component in `src/components/`:** add `<Name>.stories.tsx` next to it in the same style. If it has no Figma component in the map, leave out `figmaParameters` and give it `parameters.docs.description.component` instead.
- **Changed use of a MUI component** (Button, TextField, Chip, ToggleButtonGroup, icons): update the matching story in `src/stories/` so it shows the component the way the app now uses it.
- **`src/theme.ts`:** the Tokens page reads the theme directly, so it needs no edit. Update the token values in the map instead.

Do not edit component source, pages, `src/theme.ts`, `src/design-system.md` or `src/stories/figma.ts`.

## 3. Update the map

In `src/design-system.map.json`, update what the change affects: story IDs (`<kebab title>--<kebab export name>`), each variant's `code` props and `stories`, `props`, `usedIn`, token `value` and `source`, and `mismatches`. Keep the existing structure and key order. Do not add Figma node IDs; you cannot see Figma from here.

## 4. Check

Run `npm run build` and `npm run build-storybook`. Both must pass. If one fails because of a story you wrote, fix it. If it still fails, keep your changes, still write the pull request body, and explain the failure under "Checks".

## 5. Pull request body

If you changed nothing, write nothing and finish with the line `No Storybook changes needed.`

Otherwise write `storybook-sync-pr.md` at the repository root with these sections, in plain sentences:

- **What changed in the code:** the files and the change, with the commit range.
- **Stories:** each story file you added or changed, and why.
- **Design system map:** what you updated.
- **Figma differences:** every way Figma differs from the code, so a designer can update Figma. This run cannot open Figma, so use the Figma facts recorded in the map (node IDs, variants, properties, token values) and each component's `mismatches`, plus anything this push introduces (new props, variants, colors or components). One line each, naming the Figma component and node ID and saying what the code does. Write "Nothing" if there is none.
- **Out of step with design-system.md:** any code change that contradicts `src/design-system.md`. The code wins; describe the difference so the doc can be updated. Write "Nothing" if there is none.
- **Decisions:** each judgment call you made without asking, and why. Write "None" if there were none.
- **Checks:** the result of both builds.
