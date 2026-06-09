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
