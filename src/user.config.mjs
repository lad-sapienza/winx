/**
 * User Configuration
 *
 * `userConfig`   — Astro config overrides (merged into astro.config.mjs)
 * `siteMetadata` — SEO / social metadata, consumed by the SEO component
 */

export const userConfig = {
  // Deployed as a GitHub Pages project site: https://lad-sapienza.github.io/winx/
  site: 'https://lad-sapienza.github.io',
  base: '/winx',

  // Extra Astro integrations, merged with scms()'s own
  integrations: [],

  // Custom Vite config, merged with astro.config.mjs
  vite: {},
};

export const siteMetadata = {
  title: 'WinX',
  titleTemplate: '%s | WinX',
  description: 'Women in Intellectual conteXts: self-promotion and gender interactions in the eastern Roman Empire. A project by Ada Caruso.',
  author: 'Julian Bogdani <julian.bogdani@uniroma1.it>',
  siteName: 'WinX — Women in Intellectual conteXts',
  // Absolute-from-host path: the SEO component resolves it against `site`
  // (which has no base), so the `/winx` prefix is spelled out here.
  defaultImage: '/winx/images/winx-logo.png',
};
