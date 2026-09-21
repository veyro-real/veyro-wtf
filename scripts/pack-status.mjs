// status.veyro.wtf is a second Worker whose asset root is dist/status, so
// root-absolute URLs like /_astro/x.css and /logo.png resolve inside THAT
// directory, not dist/. Without this the page ships with no stylesheet and
// a broken logo -- which is exactly what happened the first time.
import { cp, mkdir } from 'node:fs/promises';

const ROOT = new URL('../dist/', import.meta.url);
const OUT = new URL('../dist/status/', import.meta.url);

await mkdir(OUT, { recursive: true });
await cp(new URL('_astro/', ROOT), new URL('_astro/', OUT), { recursive: true });
for (const f of ['logo.png', 'mark.png', 'icon.svg']) {
  await cp(new URL(f, ROOT), new URL(f, OUT));
}
console.log('packed status assets into dist/status');
