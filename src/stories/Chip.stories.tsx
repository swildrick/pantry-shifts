import { Chip } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaNodes, figmaParameters } from './figma';

const meta = {
  title: 'Atoms/Chip',
  component: Chip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...figmaParameters(
      figmaNodes.Chip,
      'MUI `Chip` at `size="small"`, weight 600 from the theme. The filled colors are set with `sx` where the chip is used (role chip in `ShiftCard`, "Full" in `StatusChip`), not with the `color` prop.',
    ),
  },
  args: { size: 'small', label: 'Sorting' },
} satisfies Meta<typeof Chip>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Role chip on a shift card. */
export const FilledPrimary: Story = {
  args: { sx: { bgcolor: 'primary.light', color: 'primary.dark' } },
};

/** "Full" status. */
export const FilledSecondary: Story = {
  args: { label: 'Full', sx: { bgcolor: 'secondary.light', color: 'secondary.main' } },
};

/** Open spots status. */
export const OutlinedPrimary: Story = {
  args: { label: '3 spots left', color: 'primary', variant: 'outlined' },
};
