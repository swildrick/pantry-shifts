import type { SvgIconProps } from '@mui/material';
import EventRoundedIcon from '@mui/icons-material/EventRounded';
import PlaceRoundedIcon from '@mui/icons-material/PlaceRounded';
import SearchRoundedIcon from '@mui/icons-material/SearchRounded';
import VolunteerActivismRoundedIcon from '@mui/icons-material/VolunteerActivismRounded';
import type { Meta, StoryObj } from '@storybook/react-vite';
import { figmaNodes, figmaParameters } from './figma';

const meta = {
  title: 'Atoms/Icons',
  component: VolunteerActivismRoundedIcon,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
    ...figmaParameters(
      figmaNodes.VolunteerActivismRounded,
      'The four `@mui/icons-material` icons the app uses, all in the Rounded style. Default size is 24px; `fontSize="small"` is 20px. Icons take the color of the text around them.',
    ),
  },
  argTypes: {
    fontSize: { control: 'inline-radio', options: ['medium', 'small'] },
    color: { control: 'select', options: ['inherit', 'primary', 'action'] },
  },
  args: { fontSize: 'medium' },
} satisfies Meta<SvgIconProps>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Brand mark in the app bar, in primary.main. */
export const VolunteerActivismRounded: Story = {
  args: { color: 'primary' },
  render: (args) => <VolunteerActivismRoundedIcon {...args} />,
};

/** Shift date and time row. */
export const EventRounded: Story = {
  args: { fontSize: 'small' },
  parameters: { design: figmaParameters(figmaNodes.EventRounded).design },
  render: (args) => <EventRoundedIcon {...args} sx={{ color: 'text.secondary' }} />,
};

/** Shift location row. */
export const PlaceRounded: Story = {
  args: { fontSize: 'small' },
  parameters: { design: figmaParameters(figmaNodes.PlaceRounded).design },
  render: (args) => <PlaceRoundedIcon {...args} sx={{ color: 'text.secondary' }} />,
};

/** Start adornment of the roster search. */
export const SearchRounded: Story = {
  args: { fontSize: 'small', color: 'action' },
  parameters: { design: figmaParameters(figmaNodes.SearchRounded).design },
  render: (args) => <SearchRoundedIcon {...args} />,
};
