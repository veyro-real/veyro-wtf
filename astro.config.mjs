// @ts-check
import { defineConfig } from 'astro/config';

// Static output: every page is prerendered to HTML and uploaded to Cloudflare
// as assets. No adapter, no server, nothing to cold-start -- the same thing
// the hand-written files did, with layouts and a shared stylesheet on top.
export default defineConfig({
  site: 'https://veyro.wtf',
  output: 'static',
  build: { format: 'directory' },
  devToolbar: { enabled: false },
});
