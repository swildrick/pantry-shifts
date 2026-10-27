# Design system drift report

**pantry-shifts** against `@mui/material`, 2026-10-27.
Scope: whole codebase (17 code files, 0 style files).

## Summary

| Alignment score | Gate | Design system adoption | Findings |
| --- | --- | --- | --- |
| 100 / 100 | review | 100% (12 of 12 UI files) | 1 (0 fail, 1 review) |

Compared with 2026-10-27-after-exception (`2026-10-27-after-exception.json`): score 0, 0 new, 0 fixed, 1 unchanged.

The gate is the worst result across dimensions, not the average: one invented component fails the gate even if everything else is clean.

## Interpretation

No change from the previous report: same score, same gate, no new findings and none fixed. This run follows the switch of contained buttons to amber: the amber token is now #9D5E15, the theme sets secondary.contrastText, and the four contained buttons pass color="secondary".

- The change did not add drift. color="secondary" is a real Button prop, the new color lives in src/theme.ts, and no component hardcodes a hex value.
- The one finding is unchanged: control-has-name on the roster search TextField in src/pages/VolunteersPage.tsx. It is a known false positive, listed under Known exceptions in src/design-system.md; the field is named through slotProps.htmlInput.
- The scan does not measure color contrast. The new pairs were checked in the running app: white on amber 5.19:1, white on the hover color 8.7:1, and the "Full" chip 4.57:1, all above 4.5:1.

Next steps:
- None needed for drift.
- Keep color="secondary" on any new contained button. The scan will not flag a contained button that forgets it, so rely on the Buttons pattern in src/design-system.md and on review.

## By dimension

| Dimension | Score | Gate | Findings | Files checked | Change |
| --- | --- | --- | --- | --- | --- |
| Imports | 100 | pass | 0 | 15 | 0 |
| API fidelity | 100 | pass | 0 | 13 | 0 |
| Token discipline | 100 | pass | 0 | 9 | 0 |
| Accessibility (static) | 99 | review | 1 | 12 | 0 |

## Hotspots

| File | Findings |
| --- | --- |
| `src/pages/VolunteersPage.tsx` | 1 |

## Findings

### Control without an accessible name (1, review)

Screen readers cannot announce it. Add a label or aria-label.

| Where | Detail | Suggested fix |
| --- | --- | --- |
| `src/pages/VolunteersPage.tsx:40` | `TextField` | Associate a <label htmlFor> / aria-label, or put the control inside FormField. |

## How this was measured

Static checks only, no model calls: imports, API fidelity (components and props against the real exports of the design system package), token discipline (hardcoded colors and sizes) and static accessibility. Checks are adapted from [open-design-system-bench](https://github.com/christophhdesign/open-design-system-bench) (MIT). A dimension that could not be measured shows n/a and is left out of the score, never counted as a pass.
