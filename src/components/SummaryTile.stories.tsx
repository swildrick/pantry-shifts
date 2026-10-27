import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaNodes, figmaParameters } from '../stories/figma';
import SummaryTile from './SummaryTile';

const meta = {
  title: 'Molecules/SummaryTile',
  component: SummaryTile,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...figmaParameters(figmaNodes.SummaryTile, 'A labelled number in an outlined card, as in the Volunteers summary row.'),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 368 }}>
        <Story />
      </Box>
    ),
  ],
  args: { label: 'Hours given', value: 499 },
} satisfies Meta<typeof SummaryTile>;

export default meta;
type Story = StoryObj<typeof meta>;

export const HoursGiven: Story = {};
export const ActiveVolunteers: Story = { args: { label: 'Active volunteers', value: 7 } };
export const AveragePerPerson: Story = { args: { label: 'Average per person', value: 71 } };
