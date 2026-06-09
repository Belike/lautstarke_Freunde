# buecherinhalte/

Redaktionelle Quelle der Buchinhalte — **getrennt vom Code**. Die Webseite
(`code/`) zieht diese Dateien automatisch ein (Astro Content Collection
`buecher`, siehe `code/src/content.config.ts`).

## Eine Markdown-Datei = ein Buch

Der Dateiname wird zur URL: `fanni-fuchs.md` → `/buecher/fanni-fuchs`.

Pflicht-Frontmatter (oben in der Datei, zwischen `---`):

```yaml
---
titel: Fanni Fuchs            # Buchtitel
figur: Fanni Fuchs            # Name der Figur
laut: /f/                     # trainierter Laut
untertitel: ...               # optional
akzentfarbe: "#e8662a"        # optional, CSS-Farbe der Figur
coverbild: fanni-fuchs.png    # optional, Pfad relativ zu ../grafiken
altersempfehlung: 3–6 Jahre   # optional
status: entwurf               # entwurf | review | veroeffentlicht
---
```

Darunter folgt der eigentliche Text (Markdown). Die inhaltliche Review macht
der Mensch (Norma) manuell, bevor `status` auf `veroeffentlicht` gesetzt wird.
