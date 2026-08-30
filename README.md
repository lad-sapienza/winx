# WinX

**Women in Intellectual conteXts** — self-promotion and gender interactions in the
eastern Roman Empire. A research project by Ada Caruso.

Built with [s:CMS](https://github.com/lad-sapienza/sCMS) on top of
[Astro](https://astro.build). The framework layer is the
[`@lad-sapienza/scms-core`](https://github.com/lad-sapienza/scms-core) npm
package, pinned at **`0.1.0-alpha.9`** (see [`package.json`](package.json)).

## Data

The site is fully static — there is no database. The three source tables live as
CSV files under [`src/data/`](src/data/) and are read at build time by
[`src/lib/data.ts`](src/lib/data.ts):

| File | Contents |
|---|---|
| `w_persona.csv` | the women |
| `w_luogo_di_interesse.csv` | the places (theatres, odeia, gymnasia, cities) |
| `w_persona_w_luogo_di_interesse.csv` | the person ↔ place relation |

To update the site's content, replace these files with fresh exports and rebuild.

## Pages

- `/` — project presentation
- `/i-luoghi-della-cultura` — interactive map of the places (MapLibre)
- `/le-donne` — sortable/searchable table of the women
- `/record/w_persona/<id>` and `/record/w_luogo_di_interesse/<id>` — per-record
  detail pages, generated at build time from the CSVs

## Commands

| Command | Action |
|---|---|
| `npm install` | Install dependencies (Node 22+) |
| `npm run dev` | Dev server at `localhost:4321` |
| `npm run build` | Type-check + production build to `./dist/` |
| `npm run preview` | Preview the production build locally |

## Deployment

Pushing to `main` builds and publishes to GitHub Pages
(`https://lad-sapienza.github.io/winx/`) via
[`.github/workflows/deploy.yml`](.github/workflows/deploy.yml). The base path
`/winx` is set in [`src/user.config.mjs`](src/user.config.mjs).

## Updating the framework

```bash
npm update @lad-sapienza/scms-core
```
