---
title: Performance Testing
summary: Load, stress, and regression testing to ensure releases meet latency and capacity expectations before and after deploy.
owner: CCAI Engineering
updated: 2026-05-27
review_by: 2026-08-27
status: stable
order: 4
---

## Purpose

**Performance tests** verify the system behaves under expected (and peak) load: response times, throughput, error rates, and resource usage. Run them **pre-release on staging** and **validate in production** via continuous monitoring.

Functional tests ask “does it work?” Performance tests ask “does it work **fast enough at scale**?”

## Types of performance tests

| Type | Goal | When |
| ---- | ---- | ---- |
| **Load test** | Expected traffic + headroom | Before major release |
| **Stress test** | Find breaking point | Quarterly or architecture change |
| **Soak test** | Memory leaks, drift over hours | Infra or runtime upgrades |
| **Spike test** | Sudden traffic burst | Before launches / viral events |
| **Regression test** | Compare latency vs baseline | Every release or nightly on main |

## Metrics to track

| Metric | Typical SLO input |
| ------ | ------------------- |
| **Latency** | p50, p95, p99 per endpoint |
| **Throughput** | Requests/sec sustained |
| **Error rate** | % 5xx under load |
| **Resource** | CPU, memory, DB connections, queue depth |

Align with [Reliability SLI/SLO](/wiki/engineering-bootcamp/reliability/reaction) where user-facing.

## Post-merge performance workflow

1. **Baseline** — capture p95 and RPS from staging or prod (last good release)
2. **On merge** — optional quick benchmark job on main (API subset)
3. **Pre-prod** — load test staging with **production-like** artifact
4. **Post-deploy** — compare prod dashboards for 24h; alert on regression

## Tools (examples)

| Layer | Tools |
| ----- | ----- |
| HTTP load | k6, Locust, Artillery |
| Browser | Lighthouse CI, WebPageTest |
| APM | Datadog, Grafana, Vercel Analytics |
| DB | Query plans, connection pool metrics |

Pick one standard per team; document scripts in the repo (`/perf` or `/scripts/load`).

## Performance budget (example)

Document budgets per surface:

| Surface | Budget |
| ------- | ------ |
| Wiki page TTFB | p95 < 500ms |
| API read | p95 < 200ms at 100 RPS |
| Search | p95 < 1s at 50 RPS |

CI can fail if Lighthouse score or k6 threshold regresses beyond budget.

## Best practices

- Use **realistic data volume** on staging (not empty DB)
- Warm up before measuring; discard first N requests
- Run from geography close to users (CN/global as relevant)
- Do not load test **production** without approval and rate limits

## Anti-patterns

| Anti-pattern | Why |
| ------------ | --- |
| Only testing on developer laptop | Misses network, CDN, cold start |
| One giant load test before launch only | Regressions slip in between releases |
| Optimizing average latency only | Tail latency drives user pain |
| No prod validation | Staging never matches prod exactly |

## Related

- [Build & Release Tests](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/build-release-tests)
- [Canary Testing](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/canary-testing)
- [Data Bootcamp → Metrics](/wiki/data-bootcamp/metrics)
