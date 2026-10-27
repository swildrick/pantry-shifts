import { Box } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { initialShifts } from '../data/seed';
import { figmaNodes, figmaParameters } from '../stories/figma';
import ShiftCard from './ShiftCard';

const [morningSort, groceryBoxes, seniorDeliveries, , , eveningRestock] = initialShifts;

const meta = {
  title: 'Organisms/ShiftCard',
  component: ShiftCard,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...figmaParameters(
      figmaNodes.ShiftCard,
      'One shift: role, status, date and time, location, how full it is, and a sign-up or cancel button. A shift is full when no spots are left; "Sign up" is then disabled.',
    ),
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 368 }}>
        <Story />
      </Box>
    ),
  ],
  args: { shift: morningSort, signedUp: false, onSignUp: fn(), onCancel: fn() },
} satisfies Meta<typeof ShiftCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Open: Story = {};
export const Full: Story = { args: { shift: seniorDeliveries } };
export const SignedUp: Story = { args: { shift: groceryBoxes, signedUp: true } };
export const SignedUpFull: Story = { args: { shift: seniorDeliveries, signedUp: true } };
export const NoVolunteersYet: Story = { args: { shift: eveningRestock } };
