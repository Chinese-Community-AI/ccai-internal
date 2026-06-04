---
title: Post-merge & Deployment Testing
summary: Tests and checks that run after merge — release gates, canary validation, and performance verification.
owner: CCAI Engineering
updated: 2026-05-27
review_by: 2026-08-27
status: stable
order: 1
---

## Purpose

Pre-merge tests catch bugs in isolation. **Post-merge and post-deployment** tests prove the **integrated system** still builds, releases safely, and meets performance expectations in environments closer to production.

## When this applies

| Stage | What runs |
| ----- | --------- |
| **After merge to main** | CI build, release candidate tests, deploy to staging |
| **Before full production** | Canary or phased rollout with automated checks |
| **After deploy** | Smoke tests, performance baselines, monitoring alerts |

## Pipeline mental model

```
PR (pre-merge)     merge to main        deploy staging/canary      production
     │                    │                        │                      │
     ▼                    ▼                        ▼                      ▼
 unit / integration   build & release tests    canary tests          perf + SLO checks
 lint / typecheck     artifact promotion       traffic slice           dashboards
 optional E2E         staging smoke            auto rollback           on-call ready
```

## Pages in this section

| Page | Description |
| ---- | ----------- |
| [Build & Release Tests](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/build-release-tests) | CI after merge, artifacts, release smoke |
| [Canary Testing](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/canary-testing) | Partial rollout and validation before 100% |
| [Performance Testing](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/performance-testing) | Load, latency, and regression budgets |

## Principles

1. **Main must stay green** — broken main blocks releases for everyone.
2. **Staging should mirror prod** — same build artifact, similar config (scaled down is OK).
3. **Automate rollback triggers** — canary failures should not require heroics.
4. **Measure in production** — post-deploy metrics complement pre-deploy tests.

## Related

- [Fundamentals of Testing](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/overview) — pre-merge unit/integration/E2E
- [Reliability → Reaction](/wiki/engineering-bootcamp/reliability/reaction) — SLI/SLO when deploy checks miss issues
- [Data Bootcamp → Metrics](/wiki/data-bootcamp/metrics) — dashboards for deploy and perf signals
