# Agenten-Changelog

Vom `prompt-optimizer` gepflegt. Jede Anpassung an einem Agenten- oder
Skill-Prompt wird hier protokolliert — datengetrieben und nachvollziehbar.

Format pro Eintrag:

```
## YYYY-MM-DD — <agent/skill>
- Beobachtung: <was lief im Verlauf gut/schlecht>
- Änderung: <konkreter Edit>
- Erwartete Wirkung: <was soll besser werden>
- Nächste Prüfung: <woran erkennen wir, ob es geholfen hat>
```

---

## 2026-06-03 — Initial-Setup
- Beobachtung: Projektstart, noch keine Verlaufsdaten.
- Änderung: Agenten `frontend-dev`, `designer`, `backend-dev`, `qa-tester`,
  `legal`, `cicd`, `prompt-optimizer` sowie Skill `orchestrator` angelegt.
- Erwartete Wirkung: klare Gewerkstrennung, Deploy-Gate (QA+Legal).
- Nächste Prüfung: erste echte Aufgaben beobachten und beim nächsten Zyklus
  auswerten.

## 2026-06-06 — sales (neu)
- Beobachtung: Vertriebskanal benötigt; primär Amazon KDP. Recherche zeigt:
  kein offizielles KDP-API (auch SP-API deckt KDP nicht ab), kein offizieller
  KDP-MCP-Server; nur Amazon Ads API + manuelle Report-Exporte/Drittanbieter.
- Änderung: Agent `sales` angelegt (KDP-Listing-Optimierung, Veröffentlichungs-
  Checkliste, Royalty/Preis, Ads/Attribution, Reporting). API-Realität fest im
  Prompt verankert; Mensch besitzt Account/Upload/Steuern; Freigaben für Geld &
  Außenwirkung + `legal` für kundenseitige Texte. In CLAUDE.md-Rollentabelle
  ergänzt.
- Erwartete Wirkung: realistische Sales-Vorbereitung ohne ToS-/API-Illusionen.
- Nächste Prüfung: erstes echtes KDP-Listing für „Fanni Fuchs" — ist das Paket
  copy-paste-fertig?

## 2026-06-18 — designer, frontend-dev, qa-tester, orchestrator

### designer — Positionale Selektoren verboten (Boundaries)
- Beobachtung: Bei der Mehrfiguren-Seite (Fanni + Rudi + Karlo) bestand das
  Risiko, dass Charakterfarben per `:nth-child` statt per semantischer Klasse
  gesetzt werden. Positionale Regeln brechen, sobald die DOM-Reihenfolge sich
  ändert.
- Änderung: Neue Regel unter "Boundaries": keine positionalen Selektoren für
  identitätsabhängiges Styling; stattdessen semantische Modifier-Klasse von
  `frontend-dev` verwenden (z. B. `.book-card--fanni`).
- Erwartete Wirkung: Charakterspezifisches CSS bleibt stabil bei Umordnung.
- Nächste Prüfung: Wenn eine dritte Figur (Karlo) als Launch-Ready markiert
  wird — prüfen ob alle Karten per Modifier-Klasse gestylt sind.

### designer — Theme-agnostische Komponenten (Conventions)
- Beobachtung: Ohne explizite Konvention besteht die Gefahr, dass Hex-Werte
  einzelner Figuren hart in Komponenten-CSS eingebaut werden statt über
  `--accent` zu laufen.
- Änderung: Neue Konvention unter "Conventions": Wiederverwendbare Komponenten
  leiten Figur-spezifische Farben aus `--accent` ab (per `color-mix()`); keine
  hart codierten Hex-Werte.
- Erwartete Wirkung: Neue Figuren brauchen keine CSS-Änderungen an
  Komponenten — nur `accentColor` im Frontmatter genügt.
- Nächste Prüfung: Karlo-Seite launchen und prüfen, ob kein Figur-Hex im
  Komponenten-CSS auftaucht.

### qa-tester — Effort Scoping (neuer Abschnitt)
- Beobachtung: Der Pre-Deploy-QA-Lauf war teuer (~95 Tool-Aufrufe / ~7,5 min),
  obwohl die Änderungen auf bestimmte Komponenten (Hero, Karten, Rudi-Seite)
  begrenzt waren.
- Änderung: Neuer Abschnitt "Effort scoping" vor der Checkliste: Prüftiefe an
  die geänderte Fläche koppeln — geänderte Seiten/Komponenten voll und über alle
  Breiten prüfen; unveränderte Seiten (Impressum, Datenschutz, unberührte
  Buchseiten) nur auf Erreichbarkeit, außer ein Shared-Stylesheet wurde geändert.
  Lauf-Scope oben im Bericht angeben.
- Erwartete Wirkung: Schnellere QA-Läufe bei gleicher Findungsqualität; voller
  Fokus auf das, was sich tatsächlich geändert hat.
- Nächste Prüfung: Nächster Pre-Deploy-QA-Lauf — deutlich weniger Tool-Aufrufe
  bei gleicher Findungsqualität?

### orchestrator — Multi-Figuren-Constraint im Brief (Golden rules)
- Beobachtung: Der Orchestrator übergab bei Mehrfiguren-Tasks keinen expliziten
  Hinweis an `designer` und `frontend-dev`, dass Charakter-Identität per Klasse
  ausgedrückt werden muss. Risiko: `designer` greift zu positionalen Selektoren.
- Änderung: Neue Golden Rule: Bei Multi-Figuren-Tasks explizit in beiden Briefs
  (frontend-dev + designer) festhalten, dass Charakter-Identität per
  Modifier-Klasse ausgedrückt wird, nicht per DOM-Position.
- Erwartete Wirkung: Constraint wird von Anfang an in den Task eingebettet,
  nicht erst nach einem Fehler korrigiert.
- Nächste Prüfung: Nächster Task mit mehreren Figuren-Karten — steht der
  Hinweis im Brief?

### frontend-dev — BEM-Modifier für Identitäts-Hooks (Conventions)
- Beobachtung: Ohne explizite Regel konnte `frontend-dev` Figur-Karten ohne
  Modifier-Klasse rendern und dem `designer` damit keine stabile Identitäts-
  Ankerpunkt liefern.
- Änderung: Neue Konvention unter "Conventions": Modifier-Klassen
  (`.book-card--fanni`, `.book-card--rudi`) bei figurspezifischen Komponenten
  bevorzugen statt auf positionale Selektion zu vertrauen.
- Erwartete Wirkung: `designer` hat immer einen semantischen Hook; DOM-Order-
  Änderungen brechen kein Styling.
- Nächste Prüfung: Code-Review der Figuren-Karten auf der Home-Seite — haben
  alle Cards ihre Modifier-Klasse?
