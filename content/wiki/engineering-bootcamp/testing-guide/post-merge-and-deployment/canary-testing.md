---
title: Canary Testing
summary: Validate a release on a small slice of traffic or users before rolling out to everyone, with automated pass/fail gates.
owner: CCAI Engineering
updated: 2026-05-27
review_by: 2026-08-27
status: stable
order: 3
---

## Purpose

A **canary** deploy exposes a new version to a **fraction** of production (or a dedicated canary environment with prod-like traffic) while monitoring for errors, latency, and business metrics. If checks fail, **roll back or halt** before full rollout.

## When to use a canary

| Change type | Canary recommended? |
| ----------- | ------------------- |
| Config / feature flag default | Often yes |
| Database migration | Yes — with backward-compatible steps |
| Copy / CSS only | Optional |
| Security patch | Yes, fast canary then full |
| Breaking API change | Avoid — use versioning instead |

## Canary flow

```
1. Deploy canary (e.g. 5% traffic or single region)
2. Run automated checks (5–30 min bake time)
3. Compare canary vs baseline metrics
4. Pass → increase to 25% → 50% → 100%
   Fail → rollback canary, incident if user-impacting
```

## What to monitor during canary

| Signal | Example threshold |
| ------ | ------------------- |
| **Error rate** | Canary 5xx ≤ baseline + small delta |
| **Latency** | p95 ≤ baseline + 10% (team-defined) |
| **Saturation** | CPU/memory within normal band |
| **Business metrics** | Signups, completions not down vs control |
| **Synthetic checks** | Playwright smoke every N minutes |

Define thresholds **before** deploy; do not tune after seeing bad numbers.

## Automated canary tests

| Type | Description |
| ---- | ----------- |
| **Synthetic monitoring** | Scripted requests hitting canary URL or header-routed traffic |
| **Comparison tests** | Same scenario on stable vs canary; diff status/body/latency |
| **Shadow traffic** | Duplicate requests to canary without affecting user response (advanced) |

Tag requests (`X-Canary: 1` or load balancer pool) so logs and metrics split cleanly.

## Rollback criteria (example policy)

Rollback immediately if any of:

- Error rate **2× baseline** for 5+ minutes
- p95 latency **+25%** vs baseline for 10+ minutes
- Critical synthetic check fails **3 times in a row**
- On-call declares SEV based on user reports

## Checklist

- [ ] Canary receives same artifact SHA as intended release
- [ ] Dashboards split baseline vs canary
- [ ] Rollback runbook linked in deploy ticket
- [ ] Feature flags can disable new behavior without full revert (when applicable)

## Related

- [Build & Release Tests](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/build-release-tests)
- [Performance Testing](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/performance-testing)
- [Reliability → Reaction](/wiki/engineering-bootcamp/reliability/reaction)
