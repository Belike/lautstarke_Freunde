# Lautstarke Freunde — Logopädische Kinderbücher

Webseite und Veröffentlichungs-Setup für logopädische Kinderbücher. Jedes Buch
trainiert spielerisch einen Laut über eine Tierfigur. Erste Iteration:
**Fanni Fuchs** für den Laut **/f/**.

## Projektstruktur

```
lautstarke-freunde/
├── code/                 # Astro-Webseite (der eigentliche Web-Code)
│   ├── src/
│   │   ├── pages/        # Seiten (index, buecher/[slug], impressum, datenschutz)
│   │   ├── layouts/      # BaseLayout
│   │   ├── styles/       # Design-Tokens (designer-Agent)
│   │   └── content.config.ts   # bindet ../buecherinhalte ein
│   └── public/           # statische Assets (robots.txt, favicon, …)
├── buecherinhalte/       # Redaktion: ein Markdown pro Buch (Quelle der Wahrheit)
├── grafiken/             # Original-Illustrationen & Figuren
├── .github/workflows/    # GitHub-Actions-Deploy auf GitHub Pages
└── .claude/              # Agenten & Orchestrator-Skill (Automatisierung)
```

Inhalt (`buecherinhalte/`, `grafiken/`) ist bewusst vom Code (`code/`)
getrennt. Die Webseite zieht die Inhalte automatisch ein.

## Lokale Entwicklung

> **Voraussetzung: Node ≥ 18.20.8** (empfohlen Node 22 LTS).
> Aktuell installiert ist Node 14 — bitte vorher aktualisieren, sonst startet
> Astro nicht. Der GitHub-Actions-Deploy nutzt unabhängig davon Node 22.

```bash
cd code
npm install      # einmalig
npm run dev      # lokale Vorschau (http://localhost:4321)
npm run build    # Produktions-Build nach code/dist/
```

## Veröffentlichung

Push auf `main` löst den Workflow `.github/workflows/deploy.yml` aus, der die
Seite baut und auf GitHub Pages deployt. Einmalig nötig: in den Repo-Settings
unter *Pages* die Quelle auf *GitHub Actions* stellen (macht der `cicd`-Agent).

**Vor jedem produktiven Deploy** müssen QA (`qa-tester`) und Recht (`legal`)
freigegeben haben.

## Automatisierung (`.claude/`)

| Agent / Skill | Aufgabe |
|---|---|
| `orchestrator` (Skill) | plant & verteilt Aufgaben an die Agenten |
| `frontend-dev` | HTML / Seitenstruktur |
| `designer` | CSS / Design |
| `backend-dev` | dynamisches Verhalten (prüft erst statische Alternative) |
| `qa-tester` | Webseite im Browser prüfen |
| `legal` | Impressum & DSGVO |
| `cicd` | GitHub & GitHub Pages |
| `prompt-optimizer` | verbessert die Agenten laufend |
