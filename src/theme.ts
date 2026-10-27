import { createTheme } from '@mui/material/styles';

// Design tokens for Pantry Shifts. Components should read from the theme
// (palette, spacing, shape) instead of hardcoding values.
export const tokens = {
  green: '#2F6B4F',
  greenDark: '#1F4A36',
  greenLight: '#E4F0E9',
  amber: '#9D5E15',
  amberLight: '#FCEFD9',
  ink: '#1D2521',
  muted: '#5B6761',
  line: '#DCE3DF',
  surface: '#FFFFFF',
  canvas: '#F5F7F5',
};

export const theme = createTheme({
  palette: {
    primary: { main: tokens.green, dark: tokens.greenDark, light: tokens.greenLight, contrastText: '#FFFFFF' },
    secondary: { main: tokens.amber, light: tokens.amberLight, contrastText: '#FFFFFF' },
    text: { primary: tokens.ink, secondary: tokens.muted },
    divider: tokens.line,
    background: { default: tokens.canvas, paper: tokens.surface },
  },
  shape: { borderRadius: 12 },
  spacing: 8,
  typography: {
    fontFamily: '"Inter", "Helvetica Neue", Arial, sans-serif',
    h1: { fontSize: '2rem', fontWeight: 700, letterSpacing: '-0.02em' },
    h2: { fontSize: '1.5rem', fontWeight: 700 },
    h3: { fontSize: '1.125rem', fontWeight: 600 },
    button: { textTransform: 'none', fontWeight: 600 },
  },
  components: {
    MuiButton: {
      defaultProps: { disableElevation: true },
      styleOverrides: { root: { borderRadius: 10, paddingInline: 20 } },
    },
    MuiCard: {
      defaultProps: { variant: 'outlined' },
      styleOverrides: { root: { borderColor: tokens.line } },
    },
    MuiChip: { styleOverrides: { root: { fontWeight: 600 } } },
    MuiAppBar: { defaultProps: { elevation: 0, color: 'inherit' } },
  },
});
