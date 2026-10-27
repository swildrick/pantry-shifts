import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import InfoTile from './InfoTile';

const meta = {
  title: 'Molecules/InfoTile',
  component: InfoTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'A labelled text value in an outlined card, as in "Hours this season" on the My profile page. Not in Figma yet.',
      },
    },
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 368 }}>
        <Story />
      </Box>
    ),
  ],
  args: { title: 'Hours this season', text: '42 hours' },
} satisfies Meta<typeof InfoTile>;

export default meta;
type Story = StoryObj<typeof meta>;

/** As on the My profile page. */
export const HoursThisSeason: Story = {};
