# Backend-Analyse: Lautstarke Freunde

**Stand:** 2026-06-05  
**Kontext:** Statische Astro-Webseite (`output: 'static'`), GitHub Pages, keine Server-Infrastruktur.  
**Zielgruppe:** Eltern, Logopäd:innen, Erzieher:innen — Kinderkontext, erhöhte DSGVO-Sensibilität.  
**Grundprinzip:** Kein eigener Server, solange ein statisch-tauglicher Drittdienst die Anforderung erfüllt.

---

## Ergebnis auf einen Blick

| Bedarf | Eigenes Backend nötig? | Empfehlung |
|---|---|---|
| Kontaktformular | Nein | Web3Forms (kostenlos, EU-Option) |
| Newsletter | Nein | Brevo (ehem. Sendinblue, EU-Hosting) |
| Shop / Buchverkauf | Nein (kurzfristig) → Optional (langfristig) | Jetzt: externe Plattformen; mittelfristig: Shopify Buy Button |

---

## 1. Kontaktformular

### Bedarf

Auf der Startseite (`index.astro`) existiert bereits ein PLATZHALTER-Kommentar für ein DSGVO-konformes Kontaktformular. Die Seite ist statisch — es gibt keinen Server, der Formulardaten entgegennehmen könnte.

### Braucht es ein eigenes Backend?

Nein. Spezialisierte Form-Backend-Services übernehmen den Empfang, die Zustellung per E-Mail und optional die Spam-Abwehr. Das statische HTML-Formular sendet direkt an deren Endpunkt.

### Optionen

#### Web3Forms
- **Funktionsweise:** Formular mit `action`-Attribut auf `https://api.web3forms.com/submit`, Access Key im HTML.
- **Preis:** Kostenfrei bis 250 Einreichungen/Monat; kostenpflichtige Pläne für mehr.
- **Serverstandort:** Infrastruktur über Cloudflare (globales CDN); keine dedizierten EU-Server deklariert.
- **Integration:** Reines HTML, kein JS zwingend erforderlich; CAPTCHA-Integration (hCaptcha) möglich ohne Cookies.
- **Aufwand:** Sehr gering — ein `<form>`-Tag mit Access Key, fertig.
- **DSGVO-Flag:** Transfer in Drittland (USA/Cloudflare) — Auftragsverarbeitungsvertrag (AVV) prüfen. **→ legal**

#### Formspree
- **Funktionsweise:** Ähnlich Web3Forms; etablierter Anbieter mit Team-Features.
- **Preis:** Kostenlos bis 50 Einreichungen/Monat; 10 $/Monat für 1.000+.
- **Serverstandort:** USA (Stripe-Backend), GDPR-Einstellungen für EU-Nutzer verfügbar (EU-Endpoint ist Pro-Feature).
- **DSGVO-Flag:** Drittland-Transfer ohne Pro-Plan; Daten landen in US-Rechenzentren. **→ legal**

#### Basin
- **Funktionsweise:** Ähnlich Formspree, etwas schlichter; API-Endpunkt für Formular-Posts.
- **Preis:** Kostenlos bis 100 Einreichungen/Monat.
- **Serverstandort:** USA.
- **DSGVO-Flag:** Drittland-Transfer. **→ legal**

#### Mailto-Fallback (ohne Drittdienst)
- **Funktionsweise:** `<a href="mailto:kontakt@lautstarke-freunde.de">` — kein Formular, kein Drittdienst.
- **Preis:** Kostenlos.
- **Datenschutz:** Minimale Datenverarbeitung, kein Drittdienst, keine Cookies. Beste DSGVO-Position.
- **Nachteil:** Schlechtere UX; E-Mail-Adresse im HTML sichtbar (Spam-Risiko); kein Spam-Schutz; kein strukturiertes Erfassen der Anfragen.

#### Eigene Serverless Function (z. B. Cloudflare Workers / Netlify Function)
- **Funktionsweise:** Kleines Skript sendet Formulardaten per SMTP oder API weiter; kein Dauer-Server.
- **Preis:** Kostenlos in niedrigen Volumina.
- **Kontrolle:** Volle Kontrolle über Datenfluss; kein Drittdienst im kritischen Pfad.
- **Aufwand:** Deutlich höher — eigenes Deployment, Secrets verwalten (SMTP-Credentials), Wartung.
- **Passt zu GitHub Pages?** GitHub Pages selbst kann keine Serverless Functions hosten. Würde einen zusätzlichen Deploy-Schritt zu Cloudflare Workers oder ähnlichem erfordern. Komplexitätszuwachs, der aktuell nicht gerechtfertigt ist.

### Empfehlung: Web3Forms + Mailto-Fallback

**Begründung:** Web3Forms ist kostenlos, hat die geringste Integrationskomplexität, und bietet mit hCaptcha Spam-Schutz ohne zwingenden Cookie-Einsatz. Als sofortiger Fallback — und solange der legal-Agent noch keine Freigabe gegeben hat — genügt ein `mailto:`-Link.

**Vorbehalt:** Der AVV mit Web3Forms und der Drittland-Transfer müssen durch den `legal`-Agent geprüft und in der Datenschutzerklärung abgebildet werden, bevor das Formular live geht.

**Aufwand:** < 1 Stunde Integration; keine laufenden Kosten bei aktuellem Anfragevolumen.

---

## 2. Newsletter-Anmeldung

### Bedarf

Noch kein Platzhalter auf der Webseite, aber absehbar sinnvoll: Eltern und Fachkräfte möchten über neue Bücher informiert werden. Angemeldete Interessenten sind eine wertvolle Zielgruppe vor Buchveröffentlichungen.

### Braucht es ein eigenes Backend?

Nein. Newsletter-Plattformen bieten einbettbare Anmeldeformulare, die direkt in statisches HTML eingebunden werden können. Die Plattform übernimmt Double-Opt-In, Listenmanagement, Versand und Abmeldelinks.

**Wichtig im Kinderkontext:** Double-Opt-In ist DSGVO-Pflicht. Da die Zielgruppe (Eltern, Fachkräfte) keine Minderjährigen sind, gilt kein erhöhtes Kinderschutzregime für die Anmeldedaten selbst — aber der Kontext des Produkts erfordert besondere Sorgfalt. **→ legal**

### Optionen

#### Brevo (ehem. Sendinblue)
- **Serverstandort:** EU (Frankreich), ISO 27001-zertifiziert, AVV inklusive.
- **Preis:** Kostenlos bis 300 E-Mails/Tag / 100.000 Kontakte; ausreichend für den Start.
- **Integration:** Einbettbares HTML-Formular oder JS-Widget; Double-Opt-In standardmäßig konfigurierbar.
- **DSGVO-Position:** Stärkste aller Optionen — EU-Hosting, AVV verfügbar, keine Drittland-Transfers.
- **DSGVO-Flag:** AVV abschließen, Datenschutzerklärung aktualisieren. **→ legal**

#### Buttondown
- **Serverstandort:** USA (mit EU-DSGVO-Einstellungen und AVV).
- **Preis:** Kostenlos bis 100 Abonnenten; 9 $/Monat für mehr.
- **Integration:** Sehr einfach, minimalistisch; gut für kleine Verlage.
- **DSGVO-Flag:** Drittland-Transfer trotz GDPR-Einstellungen, AVV prüfen. **→ legal**

#### Mailerlite
- **Serverstandort:** EU (Litauen), DSGVO-konformes Hosting, AVV verfügbar.
- **Preis:** Kostenlos bis 1.000 Abonnenten / 12.000 E-Mails/Monat.
- **Integration:** Einbettbares Formular, Double-Opt-In, Landingpage-Builder.
- **DSGVO-Flag:** EU-Hosting, AVV abschließen. **→ legal**

#### Mailchimp
- **Serverstandort:** USA; EU-Compliance-Dokumente vorhanden, aber Datentransfers in USA.
- **Preis:** Kostenlos bis 500 Kontakte.
- **DSGVO-Flag:** Drittland-Transfer, komplexere Datenschutzsituation, AVV-Prozess aufwändig. Nicht empfohlen für dieses Projekt. **→ legal**

### Empfehlung: Brevo

**Begründung:** EU-Hosting ist der entscheidende Vorteil im Kinderkontext. Brevo deckt den realistischen Bedarf der nächsten 12–18 Monate kostenlos ab, AVV ist standardmäßig abrufbar, und Double-Opt-In ist einfach konfigurierbar. Mailerlite ist eine gleichwertige Alternative mit ähnlichem DSGVO-Profil.

**Timing:** Newsletter-Anmeldung ist sinnvoll, sobald es konkrete Neuigkeiten zu kommunizieren gibt — also frühestens, wenn Fanni Fuchs kurz vor Veröffentlichung steht. Nicht überstürzt einbauen.

**Aufwand:** < 2 Stunden Integration (Formular-Embed + Double-Opt-In konfigurieren).

---

## 3. Shop / Buchverkauf

### Bedarf

Mittelfristig sollen physische und/oder digitale Bücher verkauft werden. Dies ist der komplexeste der drei Bedarfe.

### Braucht es ein eigenes Backend?

**Kurzfristig: Nein.** Externe Verkaufsplattformen decken Checkout, Zahlungsabwicklung, Steuern und (bei Print-on-Demand) Druck und Versand ab.

**Mittelfristig:** Ein eingebetteter Checkout (z. B. Shopify Buy Button) ist möglich, ohne einen eigenen Shop-Server zu betreiben — bleibt damit statisch-kompatibel.

**Langfristig:** Ein vollständiger eigener Shop wäre strategisch möglich, sprengt aber den aktuellen Rahmen und würde einen Umstieg von GitHub Pages erfordern.

### Produkttypen und ihre Auswirkung auf die Wahl

| Produkttyp | Besonderheit |
|---|---|
| Physisches Buch | Druck, Lager, Versand; Print-on-Demand eliminiert Lagerrisiko |
| Digitales Buch (PDF/EPUB) | Sofortlieferung; keine Lagerkosten; Wasserzeichen/Kopierschutz optional |

### Optionen

#### Phase 1: Verlinkung zu bestehenden Plattformen (sofort, null Aufwand)

Bücher bei einem oder mehreren Händlern listen, von der Webseite dorthin verlinken. Kein eigener Checkout, keine Datenverarbeitung auf der eigenen Seite.

**Print-on-Demand + Listing:**
- **KDP (Amazon Kindle Direct Publishing):** Physisch + digital (Kindle); weltweiter Vertrieb über Amazon; Royalties ca. 35–70 %. Kein Lagerrisiko. Nachteil: Amazon-Abhängigkeit, keine direkte Kundenbeziehung.
- **IngramSpark:** Physisch + eBook; Vertrieb in Buchhandel und Bibliotheken; professioneller, aber Setup-Gebühren (ca. 49 USD/Titel).
- **Books on Demand (BoD):** DE-basiert, Vertrieb über Buchhandel inklusive stationär. DSGVO-freundlicher da EU-Anbieter.
- **tredition:** Deutsches Unternehmen, physisch + digital, Buchhandelsvertrieb.

**Digitale Bücher (direkt):**
- **Gumroad:** Einfache Einbindung (Link oder Embed); Checkout auf Gumroad-Seite; Zahlungsabwicklung durch Gumroad. 10 % Provision + Transaktionsgebühren. Serverstandort USA — Datenfluss bei Käufer-E-Mail. **DSGVO-Flag → legal**
- **Payhip:** Ähnlich Gumroad; EU-VAT-Handling automatisch; 5 % Provision. Serverstandort UK/USA. **DSGVO-Flag → legal**
- **Digistore24:** Deutsches Unternehmen, spezialisiert auf digitale Produkte, EU-DSGVO, USt. automatisch. 7,9 % + 1 €/Verkauf Provision. Gute Ausgangslage für DE-Markt.

**Empfehlung Phase 1:** KDP für physische Bücher (Reichweite) + Digistore24 für digitale Bücher (DSGVO-Position). Verlinkung von der Webseite, kein eigener Checkout. Kein Drittdienst-Embed erforderlich.

#### Phase 2: Eingebetteter Checkout (mittelfristig, bei eigenem Branding gewünscht)

**Shopify Buy Button:**
- Shopify-Konto (29 USD/Monat Starter-Plan) + Buy Button als JS-Embed in die statische Seite.
- Checkout läuft auf Shopify-Infrastruktur (Hosted Checkout); die Astro-Seite bleibt statisch.
- Volle Kontrolle über Produktdarstellung und Branding auf der eigenen Seite.
- Shopify verarbeitet Zahlungsdaten, stellt Rechnungen, verwaltet USt.
- **DSGVO-Flag:** Shopify ist US-Unternehmen mit EU-Rechenzentren (Amsterdam); AVV und SCCs verfügbar. Tracking-Skript von Shopify auf der Seite — Cookie-Banner notwendig. **→ legal**

**Stripe Payment Links:**
- Kein eigener Shop; einfache Checkout-Links oder eingebettete Buttons.
- Stripe verarbeitet Zahlung; keine eigene Checkout-Seite nötig.
- 1,5 % + 0,25 € pro EU-Transaktion (Stripe-Gebühren).
- **Achtung:** Stripe übernimmt NICHT die steuerliche Abwicklung (USt. muss selbst berechnet werden) — komplexer bei internationalem Verkauf digitaler Güter.
- **DSGVO-Flag:** Stripe verarbeitet Zahlungsdaten; EU-Rechenzentren verfügbar; AVV abrufbar. **→ legal**

#### Phase 3: Eigener Shop (langfristig, strategische Entscheidung)

Eigener WooCommerce-, Shopify- oder Medusa-Shop. Erfordert eigenes Hosting, Wartung, deutlich mehr Aufwand. GitHub Pages ist dann nicht mehr ausreichend. **Diese Phase ist aktuell nicht empfohlen und bedarf einer menschlichen (Norma) strategischen Entscheidung.**

### Empfehlung: Gestuftes Vorgehen

1. **Jetzt:** Keine Shop-Integration auf der Webseite. Bücher erscheinen noch nicht.
2. **Bei Erstveröffentlichung (Fanni Fuchs):** KDP (physisch) + Digistore24 (digital), Verlinkung von der Webseite. Zero Backend-Aufwand.
3. **Wenn eigenes Branding wichtiger wird:** Shopify Buy Button als Embed in die statische Seite — weiterhin kein eigener Server, aber stärker branded.
4. **Vollständiger eigener Shop:** Nur, wenn Norma das strategisch entscheidet und bereit ist, GitHub Pages zu verlassen.

---

## Auswirkungen auf die Gesamtarchitektur

Die Webseite bleibt in allen empfohlenen Phasen **vollständig statisch und GitHub-Pages-kompatibel**. Keine der Empfehlungen erfordert einen eigenen Server oder eine Änderung an `astro.config.mjs`.

| Dienst | Auswirkung auf Build | Änderung an Astro-Config |
|---|---|---|
| Web3Forms (Kontakt) | Keiner — reines HTML-Formular | Keine |
| Brevo (Newsletter) | Keiner — HTML-Embed | Keine |
| KDP / Digistore24 (Shop) | Keiner — externe Links | Keine |
| Shopify Buy Button (Phase 2) | JS-Tag im HTML, kein Build-Schritt | Keine |

---

## DSGVO-Übergabe an den `legal`-Agent

Folgende Punkte gehen **vollständig an `legal`** — diese Analyse trifft keine rechtlichen Entscheidungen:

### Kontaktformular
- Prüfung AVV mit Web3Forms (Auftragsverarbeitungsvertrag, Art. 28 DSGVO).
- Bewertung des Drittland-Transfers (USA/Cloudflare) und geeignete Garantien (SCCs).
- Formulierung der Einwilligung / Hinweistexte im Formular.
- Abbildung in der Datenschutzerklärung.

### Newsletter
- Prüfung AVV mit Brevo (oder gewähltem Alternativanbieter).
- Anforderungen an Double-Opt-In-Prozess (Text der Bestätigungs-Mail, Nachweisspflicht).
- Einwilligungstext auf dem Anmeldeformular.
- Abbildung in der Datenschutzerklärung.
- Frage: Gilt erhöhter Kinderschutz für die Newsletter-Daten, weil das Produkt für Kinder ist? (Die Anmeldenden sind Erwachsene — aber der Kontext ist Kinder.)

### Shop / Buchverkauf
- Prüfung AVV mit gewähltem Plattformanbieter (Digistore24 als DE-Anbieter hat hier Vorteile).
- Bei digitalen Produkten: USt.-Behandlung / OSS-Verfahren (One-Stop-Shop) für EU-Verkäufe.
- Widerrufsrecht bei digitalen Büchern (Ausnahme nach § 356 Abs. 5 BGB, wenn Einwilligung erteilt).
- Allgemeine Geschäftsbedingungen (AGB) für den Verkauf.
- Shopify Buy Button (Phase 2): Cookie-Banner, Tracking-Skript, SCCs.
- Gumroad / Payhip (falls gewählt statt Digistore24): Drittland-Transfer USA.

---

## Priorisierung

### Jetzt (vor Launch der Webseite)
1. **Kontaktformular:** Mailto-Link als sofortiger Platzhalter. Web3Forms-Integration parallel durch `legal` freigeben lassen.
2. **Datenschutzerklärung & Impressum:** `legal`-Agent mit den oben genannten Drittdienstflüssen beauftragen — diese Seiten sind Pflicht vor Launch.

### Kurzfristig (bei/nach Launch)
3. **Newsletter:** Brevo einrichten, sobald es Neuigkeiten zu kommunizieren gibt (idealerweise kurz vor Fanni-Fuchs-Veröffentlichung).

### Mittelfristig (bei Buchveröffentlichung)
4. **Shop Phase 1:** KDP + Digistore24 einrichten, Verlinkung von der Webseite.
5. **Shop Phase 2:** Shopify Buy Button evaluieren, wenn eigene Marke stärker werden soll.

### Langfristig (strategische Entscheidung Norma)
6. **Eigener Shop:** Nur bei strategischem Bedarf, erfordert Abkehr von GitHub Pages.
