import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaNodes, figmaParameters } from '../stories/figma';
import StatusChip from './StatusChip';

const meta = {
  title: 'Molecules/StatusChip',
  component: StatusChip,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...figmaParameters(figmaNodes.StatusChip, 'Capacity status for a shift: "Full" at 0 spots left, otherwise "N spot(s) left".'),
  },
  argTypes: { spotsLeft: { control: { type: 'number', min: 0 } } },
  args: { spotsLeft: 3 },
} satisfies Meta<typeof StatusChip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const OneSpotLeft: Story = { args: { spotsLeft: 1 } };
export const Full: Story = { args: { spotsLeft: 0 } };
