import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// GitHub Pages serves the app from /pantry-shifts/. The Pages workflow sets PAGES_BASE;
// local dev, preview and Storybook keep the root path.
export default defineConfig({ base: process.env.PAGES_BASE ?? '/', plugins: [react()] });
