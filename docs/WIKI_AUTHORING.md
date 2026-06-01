# Wiki authoring guide

CCAI Wiki content is **Markdown in git** (`content/wiki/`). The site is **read-only**; changes merge via pull request.

## Information architecture

```
content/wiki/
├── _meta.json              # Top-level spaces + sidebar sections
├── index.md                # Wiki home (/wiki)
├── glossary.md             # Canonical terms
├── contributing.md         # How to edit (this workflow)
├── _templates/             # Copy-paste starters (not published)
└── <space>/                # e.g. eng-bootcamp/
    ├── _meta.json          # Child page titles & order
    ├── overview.md         # Space landing (/wiki/<space>/overview)
    └── <topic>.md
```

### Sidebar sections

Defined in [`content/wiki/_meta.json`](../content/wiki/_meta.json):

| Section | Spaces |
| ------- | ------ |
| Start here | General Onboarding, Glossary, Contributing |
| Role bootcamps | Eng, Product, Design, Marketing, Community, Data, Operations |
| Programs & policy | Research, AI Safety, Partnerships, University, Localization |
| Open source & community | Open Source, Volunteer & Contributor |

## Frontmatter (required)

| Field | Required | Description |
| ----- | -------- | ----------- |
| `title` | Yes | Page heading |
| `summary` | Yes | One line under title; used in search |
| `owner` | Yes | Team accountable for accuracy |
| `updated` | Yes | Last meaningful edit (ISO date) |
| `review_by` | Yes | Re-review deadline (typically +3–6 months) |
| `status` | Yes | `draft`, `stable`, or `deprecated` |
| `order` | Yes | Sort order among siblings |

## Writing rules

1. **Do not repeat the title as `# H1` in the body** — the UI renders `title` from frontmatter.
2. Start body with `##` sections.
3. Prefer **tables** for comparisons; **checklists** for procedures.
4. Link internally with `/wiki/path` (not relative file paths).
5. Use **stable slugs** — URL is `/wiki/<slug>`; renaming breaks bookmarks.
6. Mark outdated pages `status: deprecated` before removing content.

## Page lifecycle

| Status | Meaning |
| ------ | ------- |
| `draft` | Work in progress; may be incomplete |
| `stable` | Reviewed and safe for the org to rely on |
| `deprecated` | Superseded; keep until links are updated |

## Local preview

```bash
npm install
npm run dev
# http://localhost:3000/wiki
```

## PR checklist

- [ ] Frontmatter complete
- [ ] `summary` matches content
- [ ] `review_by` set appropriately
- [ ] No secrets or personal data
- [ ] Builds: `npm run build`
