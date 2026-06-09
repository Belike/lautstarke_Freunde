# Lautstarke Freunde — Logopedic Children's Books

> Working language of this repository is **English** (code, identifiers, comments,
> docs, agent/skill prompts). The **user-facing content stays German** — the
> product teaches German speech sounds to a German audience.

## What this is about

We design and publish children's books with a **logopedic context**: each book
playfully trains one particular speech sound. Each sound gets its own animal
character (a "friend").

- **Fanni Fuchs** → sound **/f/** (first iteration, in progress)
- More friends for more sounds will follow (e.g. /s/, /sch/, /k/, /r/ …).

The goal is to **automate** the venture as far as possible: website,
publishing, legal compliance and distribution should run through agents and
skills. The editorial/content review of the books is done by a human (Norma) —
as are business registration and strategic website decisions.

## Roles: human ↔ agents

| Task | Who |
|---|---|
| Editorial review of the books | Human (manual) |
| Business registration, authorities | Human |
| Website strategy / final sign-off | Human |
| Front-end (HTML) | `frontend-dev` agent |
| Backend (optional) | `backend-dev` agent |
| Design (CSS) | `designer` agent |
| QA — open & check the website | `qa-tester` agent |
| Law — imprint, GDPR | `legal` agent |
| CI/CD — GitHub & GitHub Pages | `cicd` agent |
| Sales & distribution (Amazon KDP first) | `sales` agent |
| Continuously improve the agents | `prompt-optimizer` agent |
| Orchestration of all agents | `orchestrator` skill |

## Technical frame (current)

- **Static website** built with **Astro**, output as static HTML/CSS,
  delivered via **GitHub Pages**. Source lives in `code/`.
- **Backend**: not required for now. If a newsletter/shop/contact form becomes
  necessary, the `backend-dev` agent checks a lean solution (static-friendly,
  e.g. form service, serverless) before building a real backend.
- **Language of website & content**: German. **Code/docs**: English.
- **Audience**: parents, speech therapists, educators.

## Way of working

- When a task touches several disciplines, the `orchestrator` skill plans the
  work and delegates to the right agents.
- Each agent stays in its discipline. If an agent reaches into someone else's
  area, it should name the responsible agent instead.
- Before publishing (deploy to GitHub Pages), `qa-tester` and `legal` must give
  the green light.

## Directory structure (actual)

```
lautstarke-freunde/
├── CLAUDE.md              # this file
├── .claude/
│   ├── agents/            # specialist sub-agents per discipline
│   └── skills/
│       └── orchestrator/  # master skill
├── book-content/          # editorial book markdown (German), kept out of code
├── graphics/              # master illustrations & extracted figures
│   └── figures/           # cut-out characters + logo (transparent PNG)
├── docs/                  # project docs (deploy guide, …)
└── code/                  # Astro project
    ├── src/
    │   ├── assets/        # optimized images (per book + figures + logo)
    │   ├── data/          # image galleries & character data
    │   ├── layouts/       # BaseLayout
    │   ├── pages/         # index, books/[...slug], imprint, privacy
    │   └── styles/        # tokens.css, main.css
    ├── scripts/           # extract_figures.py (figure/logo extraction)
    └── docs/              # technical notes (backend analysis, …)
```
