---
title: Safety Reviews
owner: CCAI Safety Council
updated: 2026-05-27
order: 3
summary: "1. Fill safety intake (link in `#safety` \u2014 template TBD)"
review_by: '2026-08-27'
status: stable
---

## When a review is required

| Trigger | Examples |
| ------- | -------- |
| New model capability | Tool use, code execution, image gen |
| New audience | Minors, enterprise, government |
| Sensitive domain | Health, elections, biometric ID |
| Large public demo | Live stream, press-facing launch |

## How to request

1. Fill safety intake (link in `#safety` — template TBD)
2. Attach PRD, eval results, and demo recording
3. Office hours: Safety + Legal + Eng triage within 5 business days

## Outcomes

| Result | Meaning |
| ------ | ------- |
| **Ship** | Proceed with noted mitigations |
| **Ship with limits** | Feature flags, geo, or waitlist |
| **Hold** | More evals or policy work needed |
| **No-go** | Do not launch as proposed |
