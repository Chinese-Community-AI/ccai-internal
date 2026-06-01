---
title: Contributing to the Wiki
summary: How developers add and maintain read-only wiki content via pull requests.
owner: CCAI Engineering
updated: 2026-05-27
review_by: 2026-08-27
status: stable
order: 1
---

## Principles

1. **Docs as code** — all content lives in `content/wiki/` and ships through git.
2. **Read-only site** — no in-app editing; this prevents accidental or unauthorized changes.
3. **Own what you write** — every page has an **owner** and **review_by** date.
4. **Stable by default** — use `status: draft` until reviewed, then `stable`.

Full authoring reference: [docs/WIKI_AUTHORING.md](https://github.com/Chinese-Community-AI/ccai-internal/blob/main/docs/WIKI_AUTHORING.md) in the repo.

## Quick start

```bash
# 1. Edit or add markdown under content/wiki/
# 2. Preview locally
npm run dev
# Open http://localhost:3000/wiki

# 3. Open a PR — describe what changed and who reviewed it
```

## Page types

| Type | Use for | Template |
| ---- | ------- | -------- |
| **Overview** | Hub for a space | `content/wiki/_templates/overview.md` |
| **Playbook** | Step-by-step how-to | `content/wiki/_templates/playbook.md` |
| **Policy** | Rules, must/shall | `content/wiki/_templates/policy.md` |

## Required frontmatter

```yaml
---
title: Human-readable title
summary: One sentence shown under the title (max ~160 chars)
owner: Team or role responsible for accuracy
updated: 2026-05-27
review_by: 2026-08-27   # when content should be re-checked
status: stable          # draft | stable | deprecated
order: 1                # sidebar order within folder
---
```

## Naming conventions

- **Folders** — `kebab-case` (e.g. `eng-bootcamp`, `ai-safety-policy`)
- **Files** — `kebab-case.md`; use `overview.md` for space landing pages
- **URLs** — mirror path: `content/wiki/foo/bar.md` → `/wiki/foo/bar`

## Register new top-level spaces

1. Create `content/wiki/your-space/overview.md`
2. Add `content/wiki/your-space/_meta.json` for child page order
3. Register in `content/wiki/_meta.json` under `spaces` with a `section`

## Review checklist (PR)

- [ ] Frontmatter complete; `summary` is accurate
- [ ] No duplicate H1 in body (title comes from frontmatter)
- [ ] Links use `/wiki/...` paths and resolve
- [ ] Tables and lists render (GFM)
- [ ] `review_by` is ≤ 6 months out for policies and safety content
