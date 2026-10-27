// Links stories to their components in the Pantry Shifts Figma file.
const FILE_URL = 'https://www.figma.com/design/ZJMiZk0z3IHq6Q7LWP4q4g/Pantry-Shifts';

/** "2:22" -> the Figma URL for that node. */
export function figmaUrl(nodeId: string): string {
  return `${FILE_URL}?node-id=${nodeId.replace(':', '-')}`;
}

/** Story parameters for @storybook/addon-designs plus a "View in Figma" link in the docs page. */
export function figmaParameters(nodeId: string, description = '') {
  const url = figmaUrl(nodeId);
  return {
    design: { type: 'figma', url },
    docs: { description: { component: `${description}\n\n[View in Figma](${url})`.trim() } },
  };
}

export const figmaNodes = {
  Button: '2:22',
  TextField: '2:44',
  Chip: '2:51',
  VolunteerActivismRounded: '2:2',
  EventRounded: '2:5',
  PlaceRounded: '2:8',
  SearchRounded: '2:11',
  StatusChip: '3:43',
  ToggleButtonGroup: '3:65',
  PageHeader: '3:66',
  SummaryTile: '3:72',
  ShiftCard: '4:112',
} as const;
