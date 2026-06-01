---
title: Locales & Style
owner: CCAI Localization
updated: 2026-05-27
order: 2
summary: Documentation for Locales & Style.
review_by: '2026-08-27'
status: stable
---

## Supported locales (target)

| Code | Language | Notes |
| ---- | -------- | ----- |
| `en` | English | Default for dev docs |
| `zh-Hans` | 简体中文 | Mainland-style terms |
| `zh-Hant` | 繁體中文 | TW/HK vocabulary differences |

## Style rules

- Pick **one Chinese variant per surface** unless product explicitly supports both
- Keep AI product names consistent (e.g. official vendor spelling)
- Use full-width punctuation in zh copy when appropriate
- Avoid machine translation without human review for external pages

## Typography

- CJK fonts with Latin fallback stacks (see Design System)
- Allow ~1.5–1.7 line height for Chinese body text
- Test button labels for truncation on mobile
