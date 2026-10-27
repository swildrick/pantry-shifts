import { Button, ToggleButton, ToggleButtonGroup } from '@mui/material';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaNodes, figmaParameters } from '../stories/figma';
import PageHeader from './PageHeader';

const meta = {
  title: 'Molecules/PageHeader',
  component: PageHeader,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    ...figmaParameters(figmaNodes.PageHeader, 'The top of every page: the `h1` title, an optional subtitle, and an optional action aligned right.'),
  },
  argTypes: { action: { control: false } },
  args: { title: 'My profile', subtitle: 'How the coordinators reach you.' },
} satisfies Meta<typeof PageHeader>;

export default meta;
type Story = StoryObj<typeof meta>;

/** As on the My profile page. */
export const TitleAndSubtitle: Story = {};

/** As on the Volunteers page. */
export const WithButtonAction: Story = {
  args: {
    title: 'Volunteers',
    subtitle: 'Everyone who has helped this season.',
    action: (
      <Button variant="contained" onClick={() => window.print()}>
        Print roster
      </Button>
    ),
  },
};

/** As on the Shifts page. */
export const WithFilterAction: Story = {
  args: {
    title: 'Upcoming shifts',
    subtitle: 'Pick a shift that fits your week. Every hour helps a neighbor eat.',
    action: (
      <ToggleButtonGroup exclusive size="small" value="all" aria-label="Filter shifts">
        <ToggleButton value="all">All</ToggleButton>
        <ToggleButton value="open">Open spots</ToggleButton>
        <ToggleButton value="mine">My shifts</ToggleButton>
      </ToggleButtonGroup>
    ),
  },
};

/** `subtitle` is optional. */
export const TitleOnly: Story = { args: { subtitle: undefined } };
