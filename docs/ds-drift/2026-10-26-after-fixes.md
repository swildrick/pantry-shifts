# Design system drift report

**pantry-shifts** against `@mui/material`, 2026-10-26.
Scope: whole codebase (15 code files, 0 style files).

## Summary

| Alignment score | Gate | Design system adoption | Findings |
| --- | --- | --- | --- |
| 100 / 100 | review | 100% (11 of 11 UI files) | 1 (0 fail, 1 review) |

Compared with 2026-10-26 (`2026-10-26.json`): score +2, 0 new, 8 fixed, 1 unchanged.

The gate is the worst result across dimensions, not the average: one invented component fails the gate even if everything else is clean.

## Interpretation

This run follows a cleanup pass. Compared with the earlier scan today, 8 findings were fixed, none are new, and the score went from 98 to 100. Token discipline now passes: every color is a palette path and every spacing value is a theme unit.

- The fixes: the Print roster button is now an MUI Button; ShiftCard uses borderLeftColor primary.main and p 2.5; the Full chip uses secondary.light and secondary.main; the profile helper text uses body2 and text.secondary; InfoTile uses sx instead of style.
- The one remaining finding, control-has-name on the roster search TextField in VolunteersPage, is a limitation of the static check rather than missing markup. The field now passes aria-label "Search volunteers" through slotProps.htmlInput, which is where MUI 7 puts input attributes, and the label is present in the rendered page. The check only reads top-level props, so it cannot see it.
- To clear it in the report, either give the TextField a visible label prop (this changes the design) or accept it as known noise. Adding TextField to placeholderNamed in the config is not recommended, because a placeholder is not a reliable accessible name.

Nothing else needs attention. Re-scan after the next UI change with --since to catch new drift early.

## By dimension

| Dimension | Score | Gate | Findings | Files checked | Change |
| --- | --- | --- | --- | --- | --- |
| Imports | 100 | pass | 0 | 13 | 0 |
| API fidelity | 100 | pass | 0 | 12 | 0 |
| Token discipline | 100 | pass | 0 | 9 | +9 |
| Accessibility (static) | 99 | review | 1 | 11 | 0 |

## What changed since the last report

### Fixed (8)

- Hardcoded color: `src/components/ShiftCard.tsx` (`borderLeft=4px solid #2F6B4F`)
- Hardcoded size: `src/components/ShiftCard.tsx` (`padding=20px`)
- Hardcoded color: `src/components/StatusChip.tsx` (`bgcolor=#FCEFD9`)
- Hardcoded color: `src/components/StatusChip.tsx` (`color=#C9791B`)
- Hardcoded color: `src/pages/SettingsPage.tsx` (`color=#6b6b6b`)
- Hardcoded size: `src/pages/SettingsPage.tsx` (`marginTop=4px`)
- Hardcoded size: `src/pages/VolunteersPage.tsx` (`padding=10px 18px`)
- Hardcoded color: `src/pages/VolunteersPage.tsx` (`background=#2F6B4F`)

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
