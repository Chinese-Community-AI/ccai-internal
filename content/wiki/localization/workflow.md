---
title: Translation Workflow
owner: CCAI Localization
updated: 2026-05-27
order: 3
summary: "1. **Extract** \u2014 UI strings in i18n keys (no hard-coded user text in\
  \ components)"
review_by: '2026-08-27'
status: stable
---

## String workflow

1. **Extract** — UI strings in i18n keys (no hard-coded user text in components)
2. **Translate** — CAT tool or structured JSON/YAML in repo
3. **Review** — native speaker + product sign-off
4. **QA** — pseudolocale or screenshot pass before release

## Wiki & docs

- Source of truth: English markdown in `content/wiki/`
- Optional `content/wiki-zh/` mirror via PR (future)
- Glossary maintained for repeated terms (CCAI, bootcamp names)

## Release

- Block launch if critical paths missing `zh-Hans` when marketing targets mainland
- Log locale coverage in release checklist
