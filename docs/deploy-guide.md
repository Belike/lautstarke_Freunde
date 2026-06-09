# Deploy-Anleitung — Lautstarke Freunde auf GitHub Pages

Zuletzt aktualisiert: 2026-06-05  
Verantwortlich: Norma (menschliche Entscheidungen), cicd-Agent (Infrastruktur)

---

## Freigabe-Gate — vor jedem produktiven Deploy

Ein Deploy auf GitHub Pages darf erst ausgeloest werden, wenn BEIDE Gates gruen sind:

| Gate | Status | Wer gibt frei? |
|---|---|---|
| QA bestanden | OFFEN (zuletzt: "Bestanden mit Anmerkungen") | qa-tester Agent |
| Legal Go (Impressum & Datenschutz final) | **OFFEN** | legal Agent |

Solange "Legal" offen ist, ist der Deploy blockiert. Impressum und Datenschutz
sind aktuell Platzhalter — der legal-Agent muss erst "Go" signalisieren.

---

## Einmalige Schritte (von Norma auszufuehren)

### 1. Repo-Name und Domain-Strategie festlegen

Es gibt zwei Wege fuer die URL der Webseite. Entscheide dich fuer einen:

**Weg A — GitHub-Projekt-Seite (kein eigener Domain-Kauf noetig):**
- URL: `https://belike.github.io/lautstarke-freunde/` (oder wie das Repo heisst)
- Kein DNS-Setup noetig.
- In `code/astro.config.mjs` folgende Zeilen einkommentieren und anpassen:
  ```js
  site: 'https://belike.github.io',
  base: '/lautstarke-freunde',   // <-- exakter Repo-Name eintragen
  ```

**Weg B — Eigene Domain (z. B. lautstarke-freunde.de):**
- URL: `https://lautstarke-freunde.de/`
- DNS-Eintrag beim Domain-Anbieter noetig (CNAME auf `belike.github.io`).
- CNAME-Datei anlegen: `code/public/CNAME` mit genau einer Zeile:
  ```
  lautstarke-freunde.de
  ```
  (Diese Datei wird automatisch mit in den Deploy-Output kopiert.)
- In `code/astro.config.mjs`:
  ```js
  site: 'https://lautstarke-freunde.de',
  // base weglassen oder base: '/'
  ```
- Im Repo unter Settings → Pages → Custom domain eintragen, HTTPS erzwingen.

**Wichtig:** Ohne korrekte `site`/`base`-Werte funktionieren interne Links auf
einer Projekt-Seite (Weg A) nicht. Deshalb diese Werte setzen, BEVOR der erste
produktive Deploy ausgeloest wird.

### 2. GitHub-Remote verbinden (falls nicht schon geschehen)

Das Remote ist bereits eingerichtet:
```
origin  https://github.com/Belike/lautstarke_Freunde.git
```

Falls noch kein Remote existiert:
```bash
# Im Repo-Root:
git remote add origin https://github.com/Belike/lautstarke_Freunde.git
```

### 3. Repo-Settings: Pages-Quelle auf "GitHub Actions" setzen

1. GitHub.com oeffnen → Repo `lautstarke_Freunde`
2. Settings → Pages
3. Unter "Source" die Option **"GitHub Actions"** waehlen (nicht "Deploy from branch")
4. Speichern

Ohne diesen Schritt schlaegt der Workflow zwar durch, aber Pages deployt nicht.

### 4. Branch-Schutzregel pruefen (empfohlen)

Settings → Branches → Branch protection rule fuer `main`:
- "Require status checks to pass before merging" aktivieren
- Den Build-Job (`build`) als Required Check eintragen, sobald der erste
  Workflow-Lauf erfolgreich war.

---

## Laufender Ablauf (nach dem ersten Setup)

```
Code aendern
  → commit + push auf main
    → GitHub Actions startet Workflow "Deploy auf GitHub Pages"
      → Job "build": Astro baut die Seite (Node 22, Projekt in code/)
        → Job "deploy": Artefakt wird auf github-pages-Umgebung deployt
          → Seite ist live (URL in Workflow-Ausgabe, z. B. Step "Auf GitHub Pages deployen")
```

Der Workflow liegt unter `.github/workflows/deploy.yml` und laeuft automatisch
bei jedem Push auf `main`. Manueller Trigger: GitHub.com → Actions →
"Deploy auf GitHub Pages" → "Run workflow".

---

## Workflow-Status (Stand 2026-06-05)

| Pruefpunkt | Status |
|---|---|
| `actions/checkout@v4` | aktuell |
| `withastro/action@v3` | aktuell (unterstuetzt Node 22) |
| `actions/deploy-pages@v4` | aktuell |
| Permissions (contents: read, pages: write, id-token: write) | korrekt |
| Concurrency (cancel-in-progress: false) | korrekt — laufende Deploys werden nicht abgebrochen |
| `path: code` | korrekt — Astro-Projekt liegt in code/ |
| Node-Version: 22 | korrekt |

Der Workflow ist deploy-bereit. Es ist kein Build-Schritt ausserhalb des
Workflows noetig — GitHub Actions uebernimmt alles.

---

## Was ist schon erledigt?

- [x] Git-Repo initialisiert, saubere Commit-Historie
- [x] `.gitignore` vorhanden (node_modules, dist, .env, etc.)
- [x] GitHub-Remote eingerichtet (`origin → github.com/Belike/lautstarke_Freunde`)
- [x] Workflow-Datei `.github/workflows/deploy.yml` erstellt und geprueft
- [x] `astro.config.mjs` vorbereitet mit dokumentierten Platzhaltern fuer site/base
- [x] `code/public/robots.txt` vorhanden

## Was muss Norma noch tun?

1. **Domain/URL-Strategie entscheiden** (Weg A oder B, siehe oben)
2. **`site`/`base` in `code/astro.config.mjs` setzen** (eine Zeile auskommentieren)
3. **GitHub-Settings: Pages-Quelle auf "GitHub Actions" setzen** (einmalig, im Browser)
4. **Freigabe-Gate abwarten**: legal-Agent muss "Go" zu Impressum & Datenschutz geben
5. **Ersten Push auf main ausloesen** (loest den ersten Deploy aus)

---

## Secrets

Aktuell werden keine API-Secrets oder Tokens benoetigt (rein statische Seite).
Falls kuenftig ein Kontaktformular oder Newsletter-Service eingebunden wird:
Tokens niemals im Repo speichern — immer ueber GitHub Actions Secrets
(Settings → Secrets and variables → Actions → New repository secret).
