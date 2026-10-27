import { Button } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaNodes, figmaParameters } from './figma';

const meta = {
  title: 'Atoms/Button',
  component: Button,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...figmaParameters(
      figmaNodes.Button,
      'MUI `Button` with the theme overrides from `src/theme.ts`: no elevation, radius 10, inline padding 20, no uppercase. Use `contained` with `color="secondary"` (amber) for the main action, `outlined` (primary) to undo it, and `text` (primary) to dismiss.',
    ),
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['contained', 'outlined', 'text'] },
    color: { control: 'inline-radio', options: ['primary', 'secondary'] },
    disabled: { control: 'boolean' },
    children: { control: 'text', name: 'label' },
  },
  args: { variant: 'contained', color: 'secondary', disabled: false, children: 'Sign up' },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Main action, e.g. "Sign up" on a shift card. */
export const Contained: Story = {};

/** "Sign up" on a shift that is full. */
export const ContainedDisabled: Story = { args: { disabled: true } };

/** Undoing the main action: "Cancel my spot". */
export const Outlined: Story = { args: { variant: 'outlined', color: 'primary', children: 'Cancel my spot' } };

/** Dismissing, e.g. "Not now" in the sign-up dialog. */
export const Text: Story = { args: { variant: 'text', color: 'primary', children: 'Not now' } };
