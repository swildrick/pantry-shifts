# Design system drift report

**pantry-shifts** against `@mui/material`, 2026-10-27.
Scope: whole codebase (17 code files, 0 style files).

## Summary

| Alignment score | Gate | Design system adoption | Findings |
| --- | --- | --- | --- |
| 100 / 100 | review | 100% (12 of 12 UI files) | 1 (0 fail, 1 review) |

Compared with 2026-10-27 (`2026-10-27.json`): score 0, 0 new, 0 fixed, 1 unchanged.

The gate is the worst result across dimensions, not the average: one invented component fails the gate even if everything else is clean.

## Interpretation

No change from the 2026-10-27 report: same score, same gate, no new findings and none fixed. That is expected, because the only change since then is documentation.

- The one finding is still control-has-name on the roster search TextField in src/pages/VolunteersPage.tsx. It is a false positive: the field is named 'Search volunteers' through slotProps.htmlInput, and the running app exposes it to assistive tech as a textbox with that name.
- It is now recorded under Known exceptions in src/design-system.md, with the reason and a warning not to move aria-label onto TextField, which would label the wrapper instead of the input.
- Imports, API fidelity and token discipline are clean.

Next steps:
- No code fix is needed.
- The gate can only reach pass if the ds-drift a11y rule learns to read slotProps.htmlInput aria-label. Turning the rule off would also hide real misses, so it is not recommended.

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
