---
title: Product Guidelines
owner: CCAI Safety Council
updated: 2026-05-27
order: 2
summary: "1. **Truthful** \u2014 no deceptive impersonation; label AI-generated content"
review_by: '2026-08-27'
status: stable
---

## Design principles

1. **Truthful** — no deceptive impersonation; label AI-generated content
2. **Bounded** — refuse harmful requests; avoid open-ended advice in regulated domains
3. **Private** — minimize retention of sensitive user data
4. **Controllable** — kill switch, rate limits, abuse monitoring

## Content policy (summary)

| Disallowed | Action |
| ---------- | ------ |
| Harassment, hate | Block + log |
| Illegal instructions | Refuse |
| Non-consensual intimate imagery | Refuse + report per policy |
| Medical / legal / financial advice as authoritative | Disclaim + refer to professionals |

## Launch checklist

- [ ] Red-team script for top abuse cases
- [ ] User-visible AI disclosure where required
- [ ] Incident response owner named
- [ ] Rollback plan tested
