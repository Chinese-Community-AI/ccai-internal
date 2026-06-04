---
title: Fundamentals of Testing
summary: Core concepts every CCAI engineer should know before writing or reviewing tests.
owner: CCAI Engineering
updated: 2026-05-27
review_by: 2026-08-27
status: stable
order: 1
---

## Purpose

Establish a common foundation: why tests exist, what “good” looks like, and how testing fits into delivery at CCAI.

## Why we test

| Goal | How tests help |
| ---- | -------------- |
| **Prevent regressions** | Catch breaks before users do |
| **Document behavior** | Tests show intended use of APIs and components |
| **Enable refactoring** | Safe changes when coverage is meaningful |
| **Speed up review** | Reviewers trust green CI |

Tests do **not** replace design review, manual exploration, or production monitoring.

## The test pyramid

Use more tests at the bottom (fast, isolated) and fewer at the top (slow, full-system):

```
        / E2E \           few — critical user journeys
       /-------\
      / Integr. \         some — modules working together
     /-----------\
    /    Unit     \       many — functions, classes, pure logic
   /---------------\
```

**Default:** add a unit test for new logic; add integration when boundaries matter; add E2E only for revenue- or safety-critical flows.

## What to test (priority)

1. **Business rules** — pricing, permissions, parsing, validation
2. **Public APIs** — functions and endpoints other code depends on
3. **Bug fixes** — always include a test that would have failed before the fix
4. **UI** — behavior users see (not CSS pixels), via component or E2E tests

Skip testing trivial getters, framework boilerplate, or third-party library internals.

## Ownership

| Role | Responsibility |
| ---- | ---------------- |
| **Author** | Adds tests with feature code in the same PR |
| **Reviewer** | Checks coverage of edge cases and clarity of assertions |
| **Team** | Keeps CI green; addresses flakes within one sprint |

## Pages in this section

| Page | Description |
| ---- | ----------- |
| [Testing Taxonomy](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/testing-taxonomy) | Types of tests and selection guide |
| [Writing Tests](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/writing-tests) | Practical patterns and examples |

## Related

- [Testing Guide overview](/wiki/engineering-bootcamp/testing-guide/overview)
- [Glossary → SLI/SLO](/wiki/glossary) — complement tests with production metrics
