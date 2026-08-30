import { defineConfig } from 'astro/config';
import { fileURLToPath } from 'node:url';
import { userConfig } from './src/user.config.mjs';
import { scms } from '@lad-sapienza/scms-core/scms';

// `src/`-relative path aliases — same convention as the s:CMS reference site.
// The framework itself is always a plain package import (`@lad-sapienza/scms-core`),
// never an alias.
const alias = {
  '@user': fileURLToPath(new URL('./src', import.meta.url)),
  '@components': fileURLToPath(new URL('./src/components', import.meta.url)),
  '@layouts': fileURLToPath(new URL('./src/layouts', import.meta.url)),
  '@content': fileURLToPath(new URL('./src/content', import.meta.url)),
  '@lib': fileURLToPath(new URL('./src/lib', import.meta.url)),
  '@data': fileURLToPath(new URL('./src/data', import.meta.url)),
};

export default defineConfig({
  site: userConfig.site,
  base: userConfig.base,
  output: 'static',

  integrations: [
    ...scms(),
    ...(userConfig.integrations || []),
  ],

  vite: {
    ...(userConfig.vite || {}),
    resolve: {
      ...(userConfig.vite?.resolve || {}),
      alias: {
        ...alias,
        ...(userConfig.vite?.resolve?.alias || {}),
      },
    },
  },
});
