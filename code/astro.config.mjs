// @ts-check
import { defineConfig } from 'astro/config';

// ---------------------------------------------------------------------------
// NORMA — EINZIGE STELLE, DIE VOR DEM ERSTEN DEPLOY ANGEPASST WERDEN MUSS
// ---------------------------------------------------------------------------
// Wähle EINEN der beiden Fälle und kommentiere den anderen aus:
//
// FALL A — Projekt-Seite (Repo heißt z. B. "lautstarke-freunde"):
//   URL wird: https://belike.github.io/lautstarke-freunde/
//   => site und base setzen:
//
//   site: 'https://belike.github.io',
//   base: '/lautstarke-freunde',
//
// FALL B — Eigene Domain (z. B. lautstarke-freunde.de) ODER User/Org-Page:
//   URL wird: https://lautstarke-freunde.de/
//   => nur site setzen, base weglassen (oder base: '/'):
//
//   site: 'https://lautstarke-freunde.de',
//
// Ohne diese Einstellung brechen interne Links auf einer Projekt-Seite!
// Weitere Infos: docs/deploy-anleitung.md
// ---------------------------------------------------------------------------

// https://astro.build/config
export default defineConfig({
  // Rein statische Ausgabe — passt zu GitHub Pages.
  output: 'static',

  // FALL B — eigene Domain (Custom Domain via Cloudflare + GitHub Pages).
  // Kanonische Domain ist lautstarke-freunde.de (mit Bindestrich); die
  // Variante lautstarkefreunde.de wird in Cloudflare darauf weitergeleitet.
  // Die Datei code/public/CNAME teilt GitHub Pages die Domain mit.
  site: 'https://lautstarke-freunde.de',
});
