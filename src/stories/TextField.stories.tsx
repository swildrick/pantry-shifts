import { Box, InputAdornment, TextField } from '@mui/material';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaNodes, figmaParameters } from './figma';

const meta = {
  title: 'Atoms/TextField',
  component: TextField,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...figmaParameters(
      figmaNodes.TextField,
      'MUI outlined `TextField`. Every field needs an accessible name: a `label`, or an `aria-label` on the input when there is only a placeholder.',
    ),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 360 }}>
        <Story />
      </Box>
    ),
  ],
  argTypes: {
    size: { control: 'inline-radio', options: ['medium', 'small'] },
    multiline: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
  },
  args: { label: 'Full name', defaultValue: 'Maya Okafor', fullWidth: true },
} satisfies Meta<typeof TextField>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Profile form field with a value. */
export const Medium: Story = {};

/** Roster search: small, no label, search icon, named with aria-label. */
export const SmallSearch: Story = {
  args: {
    size: 'small',
    label: undefined,
    defaultValue: undefined,
    placeholder: 'Search by name or email',
    slotProps: {
      input: {
        startAdornment: (
          <InputAdornment position="start">
            <SearchRoundedIcon fontSize="small" />
          </InputAdornment>
        ),
      },
      htmlInput: { 'aria-label': 'Search volunteers' },
    },
  },
};

/** Note for the coordinator in the sign-up dialog. */
export const Multiline: Story = {
  args: {
    label: 'Note for the coordinator',
    defaultValue: undefined,
    placeholder: 'Allergies, mobility needs, or a friend joining you',
    multiline: true,
    minRows: 3,
  },
};
