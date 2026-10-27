import { Box, Stack, ThemeProvider, Typography } from '@mui/material';
import type { ReactNode } from 'react';
import { theme, tokens } from '../theme';

// Everything here is read from src/theme.ts, so this page stays in sync with the code.

/** Palette paths set in theme.ts, in the order of the token table. */
const paletteMap: Record<string, string> = {
  'primary.main': theme.palette.primary.main,
  'primary.dark': theme.palette.primary.dark,
  'primary.light': theme.palette.primary.light,
  'secondary.main': theme.palette.secondary.main,
  'secondary.light': theme.palette.secondary.light,
  'text.primary': theme.palette.text.primary,
  'text.secondary': theme.palette.text.secondary,
  divider: theme.palette.divider,
  'background.default': theme.palette.background.default,
  'background.paper': theme.palette.background.paper,
};

/** Spacing steps used in the code (see src/design-system.md). */
const spacingSteps = [0.5, 0.75, 1, 1.5, 2, 2.5, 3, 5];

const variants = ['h1', 'h2', 'h3', 'body1', 'body2', 'caption', 'button'] as const;

// Docs pages are not wrapped by the preview decorator, so provide the theme here.
function Themed({ children }: { children: ReactNode }) {
  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}

const th = { textAlign: 'left', fontWeight: 600, py: 1, pr: 2, borderBottom: 1, borderColor: 'divider' } as const;
const td = { py: 1.25, pr: 2, borderBottom: 1, borderColor: 'divider', verticalAlign: 'middle' } as const;
const code = { fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace', fontSize: 13 } as const;

export function ColorTokens() {
  return (
    <Themed>
      <Box component="table" sx={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {['', 'Token', 'Value', 'Use in code', 'Figma variable'].map((h) => (
              <Box component="th" key={h} sx={th}>{h}</Box>
            ))}
          </tr>
        </thead>
        <tbody>
          {Object.entries(tokens).map(([name, hex]) => {
            const paths = Object.entries(paletteMap).filter(([, v]) => v === hex).map(([p]) => p);
            return (
              <tr key={name}>
                <Box component="td" sx={td}>
                  <Box sx={{ width: 40, height: 40, borderRadius: 1, bgcolor: hex, border: 1, borderColor: 'divider' }} />
                </Box>
                <Box component="td" sx={{ ...td, ...code }}>{name}</Box>
                <Box component="td" sx={{ ...td, ...code }}>{hex}</Box>
                <Box component="td" sx={{ ...td, ...code }}>{paths.map((p) => `'${p}'`).join(', ')}</Box>
                <Box component="td" sx={{ ...td, ...code }}>
                  {[`tokens/${name}`, ...paths.map((p) => `palette/${p.replace('.', '/')}`)].join(', ')}
                </Box>
              </tr>
            );
          })}
        </tbody>
      </Box>
    </Themed>
  );
}

export function SpacingTokens() {
  return (
    <Themed>
      <Stack spacing={1.5}>
        {spacingSteps.map((s) => (
          <Stack key={s} direction="row" spacing={2} alignItems="center">
            <Box sx={{ ...code, width: 160 }}>{`sx={{ p: ${s} }}`}</Box>
            <Box sx={{ ...code, width: 56, color: 'text.secondary' }}>{theme.spacing(s)}</Box>
            <Box sx={{ width: theme.spacing(s), height: 16, bgcolor: 'primary.main', borderRadius: 0.5 }} />
            <Box sx={{ ...code, color: 'text.secondary' }}>{`spacing/${String(s).replace('.', '_')}`}</Box>
          </Stack>
        ))}
      </Stack>
    </Themed>
  );
}

export function ShapeTokens() {
  const button = theme.components?.MuiButton?.styleOverrides?.root as { borderRadius: number; paddingInline: number };
  const rows = [
    ['shape.borderRadius', theme.shape.borderRadius, 'shape/borderRadius', 'Cards, text fields, toggle buttons'],
    ['MuiButton borderRadius', button.borderRadius, 'shape/MuiButton/borderRadius', 'All buttons'],
    ['MuiButton paddingInline', button.paddingInline, 'shape/MuiButton/paddingInline', 'All buttons'],
  ] as const;
  return (
    <Themed>
      <Stack spacing={2}>
        {rows.map(([name, value, figma, use]) => (
          <Stack key={name} direction="row" spacing={2} alignItems="center">
            <Box sx={{ width: 72, height: 48, bgcolor: 'primary.light', border: 1, borderColor: 'primary.main', borderRadius: `${name.includes('Radius') ? value : 0}px` }} />
            <Box>
              <Box sx={code}>{`${name}: ${value}px`}</Box>
              <Typography variant="body2" color="text.secondary">{use} · Figma <Box component="span" sx={code}>{figma}</Box></Typography>
            </Box>
          </Stack>
        ))}
      </Stack>
    </Themed>
  );
}

export function TypographyTokens() {
  return (
    <Themed>
      <Stack spacing={2.5}>
        {variants.map((v) => {
          const t = theme.typography[v];
          return (
            <Stack key={v} direction="row" spacing={3} alignItems="baseline">
              <Box sx={{ ...code, width: 220, flexShrink: 0, color: 'text.secondary' }}>
                {`${v} · ${t.fontSize} · ${t.fontWeight}`}
              </Box>
              <Typography variant={v}>Every hour helps a neighbor eat</Typography>
            </Stack>
          );
        })}
        <Typography variant="body2" color="text.secondary">
          Font family: <Box component="span" sx={code}>{theme.typography.fontFamily}</Box>
        </Typography>
      </Stack>
    </Themed>
  );
}
