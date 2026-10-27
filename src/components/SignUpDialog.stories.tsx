import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';
import { initialShifts } from '../data/seed';
import SignUpDialog from './SignUpDialog';

const [morningSort] = initialShifts;

const meta = {
  title: 'Organisms/SignUpDialog',
  component: SignUpDialog,
  tags: ['autodocs'],
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Confirms a sign-up, with a note for the coordinator and a reminder checkbox. "Not now" (text, primary) closes it; "Confirm sign up" (contained, `color="secondary"`) confirms. Renders nothing when `shift` is null. Not in Figma yet.',
      },
      // The dialog is modal, so render each story in its own iframe on the docs page.
      story: { inline: false, iframeHeight: 480 },
    },
  },
  argTypes: { shift: { control: false } },
  args: { shift: morningSort, onClose: fn(), onConfirm: fn() },
} satisfies Meta<typeof SignUpDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

/** Open for a shift, as after "Sign up" on a shift card. */
export const Open: Story = {};

/** With no shift selected the dialog renders nothing. */
export const Closed: Story = { args: { shift: null } };
