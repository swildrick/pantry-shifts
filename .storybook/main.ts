import type { StorybookConfig } from '@storybook/react-vite';

const config: StorybookConfig = {
  stories: ['../src/**/*.mdx', '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
  addons: ['@storybook/addon-docs', '@storybook/addon-mcp', '@storybook/addon-designs'],
  framework: '@storybook/react-vite',
  features: {
    // Required by the Storybook MCP docs tools (docs-list, docs-show).
    componentsManifest: true,
  },
  core: { disableTelemetry: true },
};

export default config;
