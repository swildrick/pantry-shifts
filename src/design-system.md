# Pantry Shifts design system

The design system is the MUI 7 theme in [theme.ts](theme.ts), applied app-wide by `ThemeProvider` and `CssBaseline` in [main.tsx](main.tsx). Read this before changing any UI, styling, or component.

## Rules

1. **No raw colors.** Never write a hex value in a component. Use a palette path from the table below (`'primary.main'`, `'text.secondary'`, `'divider'`).
2. **No raw pixel spacing.** Use theme spacing units in `sx` (`p: 2.5`, `mt: 0.5`, `gap: 2`). One unit is 8px.
3. **Style with `sx`, not `style`.** `sx` resolves palette paths and spacing units; `style` does not.
4. **Use MUI components, not native elements.** A `<Button>`, not a `<button>`; `<Typography>`, not a bare `<p>`.
5. **Reuse the shared components** in `src/components/` before building a new one.
6. **Every form control has an accessible name.** Give `TextField` a `label` (or `aria-label`), wrap `Switch` and `Checkbox` in `FormControlLabel`, and give button groups and tab lists an `aria-label`.
7. **Change the look in the theme, not per component.** New colors, radii, or component defaults go in `theme.ts`.

Use palette paths rather than importing `tokens` into components. `tokens` is exported from `theme.ts`, but no component imports it; every component reads colors through the theme.

## Color tokens

| Token | Value | Use in code | Used for |
| --- | --- | --- | --- |
| `green` | `#2F6B4F` | `primary.main` | Primary buttons, progress bars, brand icon, outlined "spots left" chip |
| `greenDark` | `#1F4A36` | `primary.dark` | Text on `primary.light` (role chips, avatars) |
| `greenLight` | `#E4F0E9` | `primary.light` | Background of role chips and avatars |
| `amber` | `#C9791B` | `secondary.main` | Text of the "Full" status chip |
| `amberLight` | `#FCEFD9` | `secondary.light` | Background of the "Full" status chip |
| `ink` | `#1D2521` | `text.primary` | Body text and headings |
| `muted` | `#5B6761` | `text.secondary` | Subtitles, labels, meta rows, captions |
| `line` | `#DCE3DF` | `divider` | Dividers, AppBar bottom border, card borders |
| `surface` | `#FFFFFF` | `background.paper` | Cards, AppBar, dialogs |
| `canvas` | `#F5F7F5` | `background.default` | Page background |

`primary.contrastText` is `#FFFFFF`. The theme defines no `secondary.dark`, and does not customize `error`, `warning`, `info`, or `success`; those fall back to MUI defaults.

## Spacing

`spacing: 8`, so `1` = 8px. Values in use: `0.5` (4px), `0.75` (6px), `1` (8px), `1.5` (12px), `2` (16px), `2.5` (20px), `3` (24px), `5` (40px).

Common choices in the code:

- Page container: `Container maxWidth="lg"` with `py: 5`.
- Grid gaps: `spacing={3}`.
- Card padding: `p: 2.5` for tiles, `p: 3` for form cards.
- Below a page header: `mb: 3`.
- Heading to subtitle: `mt: 0.5`.

## Shape

- Default radius: `shape.borderRadius: 12` (cards, text fields, toggle buttons). Chips keep MUI's own pill shape.
- Buttons: radius `10`, `paddingInline: 20` (theme override).
- Progress bars: `height: 8`, `borderRadius: 4`.

## Typography

Font: Inter, loaded from Google Fonts in `index.html` (weights 400, 500, 600, 700), with `"Helvetica Neue", Arial, sans-serif` as fallbacks.

| Variant | Theme setting | How it is used |
| --- | --- | --- |
| `h1` | 2rem, 700, -0.02em | Page title (via `PageHeader`) |
| `h2` | 1.5rem, 700 | Big numbers in tiles, rendered as `component="p"` |
| `h3` | 1.125rem, 600 | Card titles (`component="h2"`), section headings, app name in the AppBar |
| `body1` | MUI default | Page subtitles, body text |
| `body2` | MUI default | Shift date and location, tile labels |
| `caption` | MUI default | Helper lines such as "3 of 6 volunteers" |
| `button` | no uppercase, 600 | All buttons |

Pick the visual variant with `variant` and the semantic element with `component`, so the heading order stays correct (for example `variant="h3" component="h2"` for a card title).

## Component defaults from the theme

| Component | Default |
| --- | --- |
| `MuiButton` | `disableElevation`; radius 10; inline padding 20 |
| `MuiCard` | `variant="outlined"`; border color `line` |
| `MuiChip` | font weight 600 |
| `MuiAppBar` | `elevation={0}`, `color="inherit"` |

Do not repeat these per instance.

## Shared components

| Component | Props | Use for |
| --- | --- | --- |
| `PageHeader` | `title`, `subtitle?`, `action?: ReactNode` | The top of every page. Renders the `h1`, an optional subtitle, and an optional action aligned right (filters, page buttons). |
| `ShiftCard` | `shift`, `signedUp`, `onSignUp`, `onCancel` | One shift in the grid: role chip, status chip, title, date and time, location, fill progress, and a sign-up or cancel button. |
| `StatusChip` | `spotsLeft` | Capacity status. "Full" (amber) at 0, otherwise an outlined primary chip "N spot(s) left". |
| `SignUpDialog` | `shift \| null`, `onClose`, `onConfirm` | Confirming a sign-up, with a note field and a reminder checkbox. Renders nothing when `shift` is null. |
| `SummaryTile` | `label`, `value: string \| number` | A labelled number, as in the Volunteers summary row. |
| `InfoTile` | `title`, `text` | A labelled text value, as in "Hours this season" on the profile page. |

## Patterns

- **Tinted chip or avatar:** `bgcolor: 'primary.light', color: 'primary.dark'`.
- **Status chip:** `size="small"`; `color="primary" variant="outlined"` for open shifts.
- **Icon with text:** a `Rounded` icon at `fontSize="small"` beside `body2` text, in a row `Stack` with `spacing={1}` and `color="text.secondary"`.
- **Responsive card grid:** `Grid container spacing={3}` with items `size={{ xs: 12, sm: 6, lg: 4 }}` (three columns, then two, then one). Summary tiles use `size={{ xs: 12, sm: 4 }}`.
- **Filters:** an exclusive, `size="small"` `ToggleButtonGroup` with an `aria-label`, passed as the `PageHeader` `action`.
- **Buttons:** `variant="contained"` for the main action, `variant="outlined"` for undoing it (cancel my spot), plain text for dismissing (dialog "Not now").
- **Dialogs:** `fullWidth maxWidth="xs"`; `DialogActions` with `sx={{ px: 3, pb: 2 }}`.
- **Feedback:** a `Snackbar` after an action. Use `message` for plain text, or a filled `Alert` inside it for a success state.
- **Forms:** inside a `Card` with `p: 3`, a `Stack spacing={2.5}`, `fullWidth` text fields, and a `Switch` or `Checkbox` inside `FormControlLabel`.

## Known exceptions

If code has to break one of the rules above, or a check flags code that is correct, list the file and the reason here so it is not copied or "fixed".

- `src/pages/VolunteersPage.tsx` (roster search `TextField`): ds-drift reports `control-has-name`, but this is a false positive. The field is named by `slotProps={{ htmlInput: { 'aria-label': 'Search volunteers' } }}`, which puts the label on the inner `<input>`; the static check only looks for `label` or `aria-label` on `TextField` itself. Do not move `aria-label` onto `TextField`: that labels the wrapper, not the input. Use this pattern for any field with a placeholder and no visible label.
