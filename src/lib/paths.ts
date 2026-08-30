/**
 * Internal-link helper.
 *
 * The site is served under a base path (`/winx`), which Astro does NOT prefix
 * onto plain `href` strings automatically. Every internal link is built through
 * `withBase()` so the base lives in exactly one place.
 *
 * `import.meta.env.BASE_URL` may or may not carry a trailing slash depending on
 * Astro's `trailingSlash` setting, so it is normalised here before joining.
 */

const BASE = import.meta.env.BASE_URL.replace(/\/+$/, ''); // "" for a root site, else "/winx"

// Only ever receives root-relative internal paths (never a full "scheme://…" URL),
// so collapsing every "//" to "/" is safe.
export function withBase(path: string): string {
  return `${BASE}/${String(path).replace(/^\/+/, '')}`.replace(/\/{2,}/g, '/');
}

interface LinkLike {
  href?: string;
  match?: string;
  children?: LinkLike[];
}

/** Prefix the site base onto every href/match in a (possibly nested) menu tree. */
export function menuWithBase<T extends LinkLike>(items: T[]): T[] {
  return items.map((item) => ({
    ...item,
    href: item.href ? withBase(item.href) : item.href,
    match: item.match ? withBase(item.match) : item.match,
    children: item.children ? menuWithBase(item.children) : undefined,
  }));
}
