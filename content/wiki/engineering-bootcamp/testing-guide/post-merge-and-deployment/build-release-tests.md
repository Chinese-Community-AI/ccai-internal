---
title: Build & Release Tests
summary: Automated checks after merge that validate builds, artifacts, and release readiness before wider deployment.
owner: CCAI Engineering
updated: 2026-05-27
review_by: 2026-08-27
status: stable
order: 2
---

## Purpose

Confirm that merged code **compiles, packages, and deploys** the same way it did on the PR — and that the **release candidate** is safe to promote.

Pre-merge CI runs on a branch snapshot; post-merge CI runs on **main** and produces **immutable artifacts** used downstream.

## Typical post-merge pipeline

| Step | What it validates | Fail action |
| ---- | ----------------- | ----------- |
| **Build** | Typecheck, compile, bundle | Block artifact; notify channel |
| **Unit + integration** | Full suite on main (not just PR diff) | Block release |
| **Lint / security scan** | ESLint, dependency audit, SAST | Block or warn per policy |
| **Package artifact** | Docker image, static export, server bundle | Tag with git SHA |
| **Staging deploy** | Deploy artifact to staging | Roll back staging |
| **Release smoke tests** | Critical paths on staging URL | Block prod promotion |

## Release smoke tests

Minimal automated checks on **staging** after deploy:

- [ ] App health endpoint returns 200
- [ ] Auth login flow (if applicable)
- [ ] One read path + one write path for core product
- [ ] Wiki or docs site loads (`/wiki` smoke if applicable)

Keep smoke suites **under 5 minutes** so releases are not blocked by slow E2E.

## Release vs build

| Term | Meaning |
| ---- | ------- |
| **Build** | Produce runnable artifact from source |
| **Release** | Promote a tested artifact to an environment (staging → prod) |
| **Release test** | Tests run against the **deployed artifact**, not source tree |

Same git SHA from green main → staging → prod. Do not rebuild differently per environment without explicit reason.

## Checklist before promoting to production

- [ ] Main CI green including post-merge jobs
- [ ] Artifact tagged with commit SHA
- [ ] Staging smoke passed on that artifact
- [ ] Changelog / release notes updated (if user-facing)
- [ ] On-call aware if risky change (see Reliability)

## Anti-patterns

| Anti-pattern | Fix |
| ------------ | --- |
| Deploy from local laptop | CI-only deploys from artifacts |
| Skip main CI “because PR was green” | Main can diverge via merge order |
| Different env vars undocumented | `.env.example` + staging parity doc |
| Manual-only release verification | Automate smoke; manual for edge cases only |

## Related

- [Canary Testing](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/canary-testing)
- [Performance Testing](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/performance-testing)
- [Writing Tests](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/writing-tests)
