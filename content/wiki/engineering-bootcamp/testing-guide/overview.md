---
title: Testing Guide
summary: How CCAI engineers approach automated testing — scope, taxonomy, and day-to-day practice.
owner: CCAI Engineering
updated: 2026-05-27
review_by: 2026-08-27
status: stable
order: 1
---

## Purpose

Give engineers a shared vocabulary and workflow for testing so changes ship with confidence and regressions are caught early.

## Audience

All engineers. Read [Engineering Bootcamp overview](/wiki/engineering-bootcamp/overview) first if you are new to CCAI.

## What this guide covers

| Section | Topics |
| ------- | ------ |
| [Fundamentals of Testing](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/overview) | Why we test, test pyramid, ownership |
| [Testing Taxonomy](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/testing-taxonomy) | Unit, integration, E2E, and when to use each |
| [Writing Tests](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/writing-tests) | Structure, naming, assertions, and PR expectations |

## Principles

1. **Test behavior, not implementation** — refactors should not break tests unnecessarily.
2. **Fast feedback** — prefer unit and integration tests in CI; use E2E sparingly for critical paths.
3. **Tests are product code** — review, maintain, and delete obsolete tests like any other code.
4. **Flaky tests are bugs** — fix or quarantine immediately; do not ignore red CI.

## Related

- [Reliability → Reaction](/wiki/engineering-bootcamp/reliability/reaction) — production signals when tests miss issues
- [Contributing](/wiki/contributing) — wiki changes require PR review (same bar as code)
