# Cloudflare-Einrichtung — Lautstarke Freunde

Zuletzt aktualisiert: 2026-06-08
Verantwortlich: Norma (führt die Schritte im Cloudflare- und GitHub-Dashboard aus)

Dieser Leitfaden verbindet die beiden gekauften Domains über Cloudflare mit der
auf GitHub Pages gehosteten Webseite und richtet E-Mail-Weiterleitung ein.

---

## Entscheidungen (so ist es im Code bereits vorbereitet)

| Punkt | Festlegung |
|---|---|
| **Kanonische Domain** | `lautstarke-freunde.de` (mit Bindestrich) |
| **Zweite Domain** | `lautstarkefreunde.de` → 301-Weiterleitung auf die kanonische Domain |
| **Kontakt-E-Mail** | `info@lautstarke-freunde.de` (steht jetzt auf der Webseite) |
| **Hosting** | GitHub Pages (Repo `Belike/lautstarke_Freunde`, User-Page `belike.github.io`) |
| **Registrar** | GoDaddy (beide Domains dort gekauft) |

Im Code ist bereits erledigt:
- `code/public/CNAME` enthält `lautstarke-freunde.de` (teilt GitHub Pages die Domain mit).
- `code/astro.config.mjs` setzt `site: 'https://lautstarke-freunde.de'`.

---

## Übersicht der Schritte

1. Domain `lautstarke-freunde.de` in Cloudflare aufnehmen (Nameserver umstellen).
2. DNS-Einträge für GitHub Pages anlegen.
3. In GitHub Pages die Custom Domain eintragen + HTTPS erzwingen.
4. E-Mail-Weiterleitung (Cloudflare Email Routing) für `info@…` einrichten.
5. Zweite Domain `lautstarkefreunde.de` als Weiterleitung aufsetzen.
6. Prüfen.

> Reihenfolge ist wichtig: Erst DNS auf GitHub zeigen lassen (Schritt 2, **„DNS only"**),
> GitHub das Zertifikat ausstellen lassen (Schritt 3), **danach** optional den
> Cloudflare-Proxy aktivieren. Wird der Proxy zu früh eingeschaltet, kann GitHub
> kein Let's-Encrypt-Zertifikat ausstellen.

---

## Schritt 1 — Domain in Cloudflare aufnehmen

1. Bei <https://dash.cloudflare.com> anmelden → **Add a site** → `lautstarke-freunde.de`.
2. Tarif **Free** wählen. Cloudflare scannt vorhandene DNS-Einträge.
3. Cloudflare zeigt zwei **Nameserver** an (z. B. `xyz.ns.cloudflare.com` und
   `abc.ns.cloudflare.com`). Diese zwei Werte werden gleich bei GoDaddy gebraucht.
4. **Nameserver bei GoDaddy auf Cloudflare umstellen** (das ist die eigentliche
   „Übernahme" der Domain durch Cloudflare) — siehe GoDaddy-Schritte unten.
5. Auf die Aktivierung warten (meist Minuten, bei GoDaddy gelegentlich bis ~24 h).
   Cloudflare meldet per Mail „is now active".

### GoDaddy: Nameserver ändern

> Wichtig vorab: Falls bei GoDaddy für die Domain **DNSSEC aktiv** ist, **zuerst
> deaktivieren** (Domain Settings → „DNSSEC" → ausschalten). Sonst schlägt die
> DNS-Auflösung nach dem Nameserver-Wechsel fehl. DNSSEC kann später wieder über
> Cloudflare (mit dem DS-Eintrag aus Cloudflare) aktiviert werden.

1. Bei <https://account.godaddy.com/products> anmelden → Bereich **Domains**.
2. Die Domain `lautstarke-freunde.de` anklicken (oder über das **⋯**-Menü
   → **Manage DNS** / „DNS verwalten").
3. Auf der Domain-Übersicht zum Abschnitt **Nameservers** (Nameserver) scrollen
   → **Change** / „Ändern".
4. Option **„I'll use my own nameservers"** bzw. **„Enter my own nameservers
   (advanced)"** / „Eigene Nameserver verwenden" wählen.
5. Die ggf. vorhandenen GoDaddy-Nameserver **löschen** und die **zwei
   Cloudflare-Nameserver** aus Schritt 3 exakt eintragen (keine Tippfehler,
   kein abschließender Punkt).
6. **Save / Speichern** und die GoDaddy-Sicherheitsabfrage bestätigen.

GoDaddys eigene DNS-Einträge werden danach **ignoriert** — ab jetzt wird das DNS
ausschließlich in Cloudflare gepflegt (Schritt 2). Die Domain selbst bleibt bei
GoDaddy registriert (Verlängerung/Bezahlung weiterhin dort).

---

## Schritt 2 — DNS-Einträge für GitHub Pages

In Cloudflare unter **DNS → Records** für `lautstarke-freunde.de` anlegen.
**Proxy-Status zunächst auf „DNS only" (graue Wolke)** stellen — wichtig, s. o.

**Apex (`lautstarke-freunde.de`) — vier A-Einträge:**

| Type | Name | Content | Proxy |
|---|---|---|---|
| A | `@` | `185.199.108.153` | DNS only |
| A | `@` | `185.199.109.153` | DNS only |
| A | `@` | `185.199.110.153` | DNS only |
| A | `@` | `185.199.111.153` | DNS only |

**Optional zusätzlich vier AAAA-Einträge (IPv6):**

| Type | Name | Content | Proxy |
|---|---|---|---|
| AAAA | `@` | `2606:50c0:8000::153` | DNS only |
| AAAA | `@` | `2606:50c0:8001::153` | DNS only |
| AAAA | `@` | `2606:50c0:8002::153` | DNS only |
| AAAA | `@` | `2606:50c0:8003::153` | DNS only |

**www-Subdomain:**

| Type | Name | Content | Proxy |
|---|---|---|---|
| CNAME | `www` | `belike.github.io` | DNS only |

> Diese GitHub-Pages-IPs sind die offiziellen Adressen (Stand 2026). Falls GitHub
> sie ändert, in der GitHub-Pages-Doku „Managing a custom domain" nachsehen.

---

## Schritt 3 — GitHub Pages: Custom Domain + HTTPS

1. GitHub → Repo `lautstarke_Freunde` → **Settings → Pages**.
2. Sicherstellen, dass unter **Source** „GitHub Actions" gewählt ist
   (siehe `docs/deploy-guide.md`).
3. **Custom domain**: `lautstarke-freunde.de` eintragen → **Save**.
   (Die `CNAME`-Datei im Repo setzt diesen Wert ohnehin bei jedem Deploy.)
4. GitHub prüft das DNS („DNS check successful") und stellt ein Zertifikat aus.
   Das kann einige Minuten bis ~24 h dauern.
5. Sobald verfügbar: **Enforce HTTPS** aktivieren.

---

## Schritt 4 — E-Mail-Weiterleitung (`info@lautstarke-freunde.de`)

Cloudflare **Email Routing** leitet eingehende Mails kostenlos an ein bestehendes
Postfach weiter (z. B. eine private Gmail-/GMX-Adresse). Es ist **nur Empfang/
Weiterleitung** — zum Senden „als" `info@…` braucht es zusätzlich einen Mailanbieter
(siehe Hinweis unten).

1. Cloudflare → Domain `lautstarke-freunde.de` → **Email → Email Routing** → **Get started**.
2. **Destination address** angeben (das private Zielpostfach) und über die
   Bestätigungsmail verifizieren.
3. Cloudflare bietet an, die nötigen **MX- und TXT(SPF)-Einträge automatisch**
   anzulegen → zustimmen. (Diese MX-Einträge stehen neben den A-Einträgen aus
   Schritt 2 — kein Konflikt, da unterschiedliche Record-Typen.)
4. **Routing rule** anlegen:
   `info@lautstarke-freunde.de` → an das verifizierte Zielpostfach.
5. Optional **Catch-all** aktivieren, damit auch jede andere Adresse
   (`@lautstarke-freunde.de`) ankommt.

> **Senden als info@…**: Cloudflare verschickt nicht. Wenn du Mails *unter*
> `info@…` beantworten willst, entweder den Zielanbieter als „Send mail as"
> konfigurieren (z. B. Gmail mit SMTP eines Mailhosters) oder ein echtes Postfach
> bei einem Mailanbieter buchen. Für den Start reicht reines Weiterleiten.

---

## Schritt 5 — Zweite Domain `lautstarkefreunde.de` weiterleiten

Ziel: Alles, was auf `lautstarkefreunde.de` (mit/ohne `www`) landet, wird per
301 auf `https://lautstarke-freunde.de` umgeleitet — gleiche Pfade bleiben erhalten.

1. `lautstarkefreunde.de` wie in **Schritt 1** als zweite Site in Cloudflare
   aufnehmen — inkl. der GoDaddy-Nameserver-Umstellung (und ggf. DNSSEC bei
   GoDaddy vorher deaktivieren). Jede Domain hat **eigene** Cloudflare-Nameserver,
   also die für `lautstarkefreunde.de` angezeigten Werte verwenden.
2. DNS-Einträge anlegen, damit Anfragen den Cloudflare-Proxy erreichen
   (**Proxy AN, orange Wolke** — hier *gewollt*, da nur weitergeleitet wird):

   | Type | Name | Content | Proxy |
   |---|---|---|---|
   | A | `@` | `192.0.2.1` | Proxied |
   | A | `www` | `192.0.2.1` | Proxied |

   (`192.0.2.1` ist eine reservierte Blackhole-IP; durch den Proxy greift die
   Redirect-Regel, bevor je ein „Origin" kontaktiert wird.)
3. **Rules → Redirect Rules → Create rule**:
   - **When**: Hostname equals `lautstarkefreunde.de` **OR** `www.lautstarkefreunde.de`
     (oder einfacher: „Hostname contains `lautstarkefreunde.de`").
   - **Then**: Static/Dynamic redirect, **Type 301**,
     Ziel-Ausdruck: `concat("https://lautstarke-freunde.de", http.request.uri.path)`
     mit „Preserve query string".
4. Speichern und mit `https://lautstarkefreunde.de/irgendwas` testen → muss auf
   `https://lautstarke-freunde.de/irgendwas` umleiten.

> Wenn du auf der zweiten Domain *keine* Mail brauchst: nichts weiter nötig.
> Sonst dort ebenfalls Email Routing (Schritt 4) einrichten.

---

## Schritt 6 — Prüfen

- `https://lautstarke-freunde.de` öffnet die Seite, Schloss-Symbol (HTTPS) ist da.
- `https://www.lautstarke-freunde.de` funktioniert ebenfalls.
- `https://lautstarkefreunde.de` leitet auf die kanonische Domain um.
- Testmail an `info@lautstarke-freunde.de` kommt im Zielpostfach an.
- In GitHub → Settings → Pages steht „Your site is published at
  https://lautstarke-freunde.de" und „Enforce HTTPS" ist aktiv.

---

## Optional / später

- **Cloudflare-Proxy für die Hauptdomain** (orange Wolke) erst aktivieren,
  **nachdem** GitHub das Zertifikat ausgestellt hat. Dann unter **SSL/TLS** den
  Modus **„Full"** wählen (nicht „Flexible" — sonst Redirect-Schleifen).
- **DNSSEC** in Cloudflare aktivieren und den DS-Eintrag beim Registrar hinterlegen.
- **Caching/Always Use HTTPS** in Cloudflare einschalten.

---

## Wichtig vor dem Live-Gang (Freigabe-Gate)

Diese Domain-Schaltung macht die Seite **öffentlich erreichbar**. Damit greift
das Freigabe-Gate aus `docs/deploy-guide.md`:

- **Legal**: `info@lautstarke-freunde.de` muss im **Impressum** stehen
  (§ 5 DDG verlangt eine E-Mail-Adresse). Impressum & Datenschutz sind aktuell
  noch Platzhalter → der `legal`-Agent muss „Go" geben, bevor live gestellt wird.
- **Datenschutz**: Cloudflare verarbeitet als DNS/CDN und Email-Routing die
  IP-Adressen der Besucher. Das muss in der **Datenschutzerklärung** genannt
  werden (Auftragsverarbeitung / Drittland). → `legal`-Agent.
- **QA**: `qa-tester` prüft die Seite unter der echten Domain.
