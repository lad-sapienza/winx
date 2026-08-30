/**
 * Build-time data layer.
 *
 * The site used to read three Directus collections; it now reads the same data
 * from three static CSV files exported into `src/data/`. Everything here runs at
 * build time (Node) inside `.astro` frontmatter / `getStaticPaths` — nothing is
 * fetched in the browser.
 *
 *   w_persona.csv                     — the women
 *   w_luogo_di_interesse.csv          — the places (odeia, theatres, gymnasia, cities)
 *   w_persona_w_luogo_di_interesse.csv — the person ↔ place relation (junction table)
 */

import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import Papa from 'papaparse';

// Resolved from the project root, not from `import.meta.url`: this module gets
// bundled into `dist/.prerender/chunks/` for `getStaticPaths`, where a
// URL-relative path would point at the wrong place. `astro build` / `astro dev`
// both run with the project root as cwd.
const DATA_DIR = resolve(process.cwd(), 'src/data');

type Raw = Record<string, unknown>;

const _csvCache = new Map<string, Raw[]>();

function readCsv(file: string): Raw[] {
  const cached = _csvCache.get(file);
  if (cached) return cached;
  const text = readFileSync(resolve(DATA_DIR, file), 'utf8');
  const { data } = Papa.parse<Raw>(text, {
    header: true,
    skipEmptyLines: true,
    dynamicTyping: true,
  });
  _csvCache.set(file, data);
  return data;
}

/** "" | null | undefined -> null; strings get trimmed. */
function clean<T>(value: T): T | string | null {
  if (value === undefined || value === null) return null;
  if (typeof value === 'string') {
    const t = value.trim();
    return t === '' ? null : t;
  }
  return value;
}

function num(value: unknown): number | null {
  const c = clean(value);
  if (c === null) return null;
  const n = Number(c);
  return Number.isFinite(n) ? n : null;
}

function str(value: unknown): string | null {
  const c = clean(value);
  return c === null ? null : String(c);
}

// ─── Persona ────────────────────────────────────────────────────────────────

export interface Persona {
  id: number;
  nome: string;
  soprannome: string | null;
  famiglia_gens: string | null;
  genere: string | null;
  provenienza: string | null;
  anno_nascita: number | null;
  anno_morte: number | null;
  note: string | null;
  qualifica: string | null;
}

export function getPersone(): Persona[] {
  return readCsv('w_persona.csv')
    .filter((r) => num(r.id) !== null)
    .map((r) => ({
      id: num(r.id)!,
      nome: str(r.nome) ?? `Person ${num(r.id)}`,
      soprannome: str(r.soprannome),
      famiglia_gens: str(r.famiglia_gens),
      genere: str(r.genere),
      provenienza: str(r.provenienza),
      anno_nascita: num(r.anno_nascita),
      anno_morte: num(r.anno_morte),
      note: str(r.note),
      qualifica: str(r.qualifica),
    }))
    .sort((a, b) => a.nome.localeCompare(b.nome, 'en'));
}

export function getPersona(id: number | string): Persona | undefined {
  const n = Number(id);
  return getPersone().find((p) => p.id === n);
}

// ─── Luogo ──────────────────────────────────────────────────────────────────

export interface Luogo {
  id: number;
  nome: string;
  tipologia: string | null;
  tipo_di_monumento: string | null;
  citta_di_appartenenza: string | null;
  provincia: string | null;
  periodo: string | null;
  anno_inizio: number | null;
  anno_fine_uso: number | null;
  note: string | null;
  /** [lng, lat] parsed from the `coordinate.coordinates` column, or null. */
  lng: number | null;
  lat: number | null;
}

function parseCoords(value: unknown): [number | null, number | null] {
  const c = clean(value);
  if (typeof c !== 'string') return [null, null];
  try {
    const arr = JSON.parse(c);
    if (Array.isArray(arr) && arr.length >= 2) {
      const lng = Number(arr[0]);
      const lat = Number(arr[1]);
      if (Number.isFinite(lng) && Number.isFinite(lat)) return [lng, lat];
    }
  } catch {
    /* malformed cell — leave as null */
  }
  return [null, null];
}

export function getLuoghi(): Luogo[] {
  return readCsv('w_luogo_di_interesse.csv')
    .filter((r) => num(r.id) !== null)
    .map((r) => {
      const [lng, lat] = parseCoords(r['coordinate.coordinates']);
      return {
        id: num(r.id)!,
        nome: str(r.nome) ?? `Place ${num(r.id)}`,
        tipologia: str(r.tipologia),
        tipo_di_monumento: str(r.tipo_di_monumento),
        citta_di_appartenenza: str(r.citta_di_appartenenza),
        provincia: str(r.provincia),
        periodo: str(r.periodo),
        anno_inizio: num(r.anno_inizio),
        anno_fine_uso: num(r.anno_fine_uso),
        note: str(r.note),
        lng,
        lat,
      };
    })
    .sort((a, b) => a.nome.localeCompare(b.nome, 'en'));
}

export function getLuogo(id: number | string): Luogo | undefined {
  const n = Number(id);
  return getLuoghi().find((l) => l.id === n);
}

// ─── Relations (junction table) ─────────────────────────────────────────────

export interface Relazione {
  id: number;
  personaId: number;
  luogoId: number;
  data: string | null;
  tipo_di_interazione: string | null;
  note: string | null;
}

/** Only rows that actually link a person to a place (the export has empty stubs). */
export function getRelazioni(): Relazione[] {
  return readCsv('w_persona_w_luogo_di_interesse.csv')
    .filter((r) => num(r.w_persona_id) !== null && num(r.w_luogo_di_interesse_id) !== null)
    .map((r) => ({
      id: num(r.id)!,
      personaId: num(r.w_persona_id)!,
      luogoId: num(r.w_luogo_di_interesse_id)!,
      data: str(r.data),
      tipo_di_interazione: str(r.tipo_di_interazione),
      note: str(r.note_relative_al_rapporto_persona_monumento),
    }));
}

/** Places linked to a given person. */
export function luoghiDiPersona(personaId: number): Luogo[] {
  const ids = new Set(getRelazioni().filter((r) => r.personaId === personaId).map((r) => r.luogoId));
  return getLuoghi().filter((l) => ids.has(l.id));
}

/** People linked to a given place. */
export function personeDiLuogo(luogoId: number): Persona[] {
  const ids = new Set(getRelazioni().filter((r) => r.luogoId === luogoId).map((r) => r.personaId));
  return getPersone().filter((p) => ids.has(p.id));
}

// ─── Formatting helpers ─────────────────────────────────────────────────────

/** -100 -> "100 BC"  ·  230 -> "AD 230"  ·  null -> "?" */
export function formatYear(year: number | null): string {
  if (year === null) return '?';
  return year < 0 ? `${-year} BC` : `AD ${year}`;
}

/** "100 BC — AD 230" (both unknown -> "—") */
export function lifespan(birth: number | null, death: number | null): string {
  if (birth === null && death === null) return '—';
  return `${formatYear(birth)} — ${formatYear(death)}`;
}
