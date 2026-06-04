---
title: Testing Taxonomy
summary: Definitions of unit, integration, and end-to-end tests — and a decision guide for which to write.
owner: CCAI Engineering
updated: 2026-05-27
review_by: 2026-08-27
status: stable
order: 1
---

## Overview

Use the same terms across repos so reviews and CI policies stay aligned. When in doubt, optimize for **speed and determinism** first.

## Test types

| Type | Scope | Speed | Typical tools | Use when |
| ---- | ----- | ----- | ------------- | -------- |
| **Unit** | Single function, class, or module in isolation | Fast (ms) | Jest, Vitest, pytest | Pure logic, validators, parsers |
| **Integration** | Two or more real components (DB, HTTP, file I/O) | Medium (s) | Supertest, testcontainers, MSW | Repositories, API handlers, service layers |
| **End-to-end (E2E)** | Full app stack as a user would | Slow (min) | Playwright, Cypress | Critical journeys: login, checkout, publish |
| **Snapshot** | Serialized output comparison | Fast | Jest snapshots | Stable UI text or JSON — use sparingly |
| **Contract** | Consumer/provider API agreement | Medium | Pact, OpenAPI diff | Services owned by different teams |

## Other categories (know the names)

| Term | Meaning |
| ---- | ------- |
| **Smoke test** | Minimal suite that proves “the app starts and core path works” |
| **Regression test** | Test added after a bug to prevent recurrence |
| **Characterization test** | Documents legacy behavior before refactor (not ideal design, but useful) |
| **Manual / exploratory** | Human-driven; not automated — still required for UX and edge cases |

Post-merge stages (build/release, canary, performance) are covered in [Post-merge & Deployment](/wiki/engineering-bootcamp/testing-guide/post-merge-and-deployment/overview).

## Decision guide

Answer in order:

1. **Can I test this with pure input/output and no I/O?** → **Unit test**
2. **Does it touch DB, network, or filesystem?** → **Integration test** (real or well-scoped test double)
3. **Does only the full browser flow prove it?** → **E2E test** (keep count low)
4. **Is it a visual polish issue?** → Manual QA or visual regression tool — not unit tests

## Anti-patterns

| Anti-pattern | Why it hurts |
| ------------ | ------------ |
| E2E for every branch | Slow CI, flaky pipelines, delayed feedback |
| Mocking everything in “unit” tests | Tests pass but production breaks |
| Testing private methods directly | Couples tests to implementation |
| No tests for “small” bug fixes | Same bug returns next quarter |

## Coverage expectations

- **No fixed % target** — coverage alone is misleading
- Require tests for **new logic** and **bug fixes**
- Critical paths (auth, payments, data export) should have integration or E2E coverage

## Related

- [Writing Tests](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/writing-tests)
- [Fundamentals of Testing](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/overview)
