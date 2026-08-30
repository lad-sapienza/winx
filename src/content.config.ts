/**
 * Content Collections
 *
 * The three data tables (people, places, and their relations) are NOT modelled
 * as collections — they are plain CSV files under `src/data/`, read at build
 * time by `src/lib/data.ts`. The only collection here is the navigation menu.
 */

import { defineCollection } from 'astro:content';
import { z } from 'zod';
import { glob } from 'astro/loaders';

// One optional level of nesting — enough for BSNavbar dropdowns, and this
// site's menu is flat anyway.
const leafSchema = z.object({
  href: z.string().optional(),
  label: z.string(),
  match: z.string().optional(),
});
const menuItemSchema = leafSchema.extend({
  children: z.array(leafSchema).optional(),
});

// src/content/data/menu.yaml — a top-level array of menu items, consumed by
// BSNavbar in BaseLayout. hrefs are written base-agnostic (leading "/…") and
// get the site `base` prefixed at render time.
const menu = defineCollection({
  loader: glob({ pattern: 'menu.yaml', base: './src/content/data' }),
  schema: z.array(menuItemSchema),
});

export const collections = { menu };
