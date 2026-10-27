import { ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { figmaNodes, figmaParameters } from './figma';

type Filter = 'all' | 'open' | 'mine';

/** The shift filter from ShiftsPage, as rendered there. */
function ShiftFilter({ value }: { value: Filter }) {
  const [filter, setFilter] = useState<Filter>(value);
  return (
    <ToggleButtonGroup
      exclusive
      size="small"
      value={filter}
      onChange={(_, v: Filter | null) => v && setFilter(v)}
      aria-label="Filter shifts"
    >
      <ToggleButton value="all">All</ToggleButton>
      <ToggleButton value="open">Open spots</ToggleButton>
      <ToggleButton value="mine">My shifts</ToggleButton>
    </ToggleButtonGroup>
  );
}

const meta = {
  title: 'Molecules/ToggleButtonGroup',
  component: ShiftFilter,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...figmaParameters(
      figmaNodes.ToggleButtonGroup,
      'MUI `ToggleButtonGroup` (exclusive, small) used inline in `ShiftsPage` as the `PageHeader` action. It is not a shared component in `src/components/`.',
    ),
  },
  argTypes: { value: { control: 'inline-radio', options: ['all', 'open', 'mine'] } },
  args: { value: 'all' },
  render: (args) => <ShiftFilter key={args.value} {...args} />,
} satisfies Meta<typeof ShiftFilter>;

export default meta;
type Story = StoryObj<typeof meta>;

export const All: Story = {};
export const OpenSpots: Story = { args: { value: 'open' } };
export const MyShifts: Story = { args: { value: 'mine' } };
