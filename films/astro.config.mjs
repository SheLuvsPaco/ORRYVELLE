// @ts-check
import { defineConfig } from 'astro/config';

// The case-study films, built as static pages into the website's public folder:
// /films/<locale>/<film>.html, played inside the laptop on each case study.
export default defineConfig({
  base: '/films',
  outDir: '../public/films',
  build: { inlineStylesheets: 'always', format: 'file' },
  devToolbar: { enabled: false },
});
