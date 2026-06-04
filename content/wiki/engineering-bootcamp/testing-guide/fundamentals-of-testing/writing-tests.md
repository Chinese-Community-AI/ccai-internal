---
title: Writing Tests
summary: Practical guide to structuring, naming, and maintaining automated tests at CCAI.
owner: CCAI Engineering
updated: 2026-05-27
review_by: 2026-08-27
status: stable
order: 2
---

## Introduction

Good tests are **readable, deterministic, and focused on one behavior**. A developer who has never seen the production code should understand what broke from the test name and failure message alone.

This page covers patterns that apply across JavaScript/TypeScript (Jest/Vitest/Playwright) and generalize to other stacks.

## Anatomy of a good test

Use **Arrange → Act → Assert** (AAA):

```typescript
test("rejects empty email on signup", () => {
  // Arrange
  const input = { email: "", password: "valid-pass-123" };

  // Act
  const result = validateSignup(input);

  // Assert
  expect(result.ok).toBe(false);
  expect(result.errors).toContain("email_required");
});
```

One logical behavior per test. Multiple `expect` calls are fine when they describe the same outcome.

## Naming conventions

| Pattern | Example |
| ------- | ------- |
| `behavior_when_condition` | `returns_404_when_page_missing` |
| Plain sentence (Vitest/Jest) | `"redirects unauthenticated users to login"` |

Avoid vague names: `test1`, `works`, `handles error`.

## File layout

| Code | Tests |
| ---- | ----- |
| `src/lib/wiki/content.ts` | `src/lib/wiki/content.test.ts` or `__tests__/content.test.ts` |
| `src/components/wiki/WikiTree.tsx` | `WikiTree.test.tsx` (co-located or parallel folder) |
| E2E | `e2e/wiki-navigation.spec.ts` |

Keep test files next to the code they protect when the team agrees on co-location.

## Assertions

- Prefer **specific matchers**: `toEqual`, `toContain`, `toHaveBeenCalledWith`
- Avoid `toBeTruthy()` when you mean an exact value
- For errors: assert **error type or code**, not only that an exception was thrown

## Test data

| Do | Don't |
| -- | ----- |
| Use factories or builders for complex objects | Copy-paste 200-line fixtures |
| Use fixed dates in unit tests (`2026-01-15`) | `new Date()` without control |
| Seed minimal DB rows in integration tests | Rely on production-like dumps |

## Mocking guidelines

- **Mock at boundaries** — HTTP client, clock, randomness — not every internal function
- Prefer **integration tests with real DB** (Docker/test DB) for repository layers when feasible
- Reset mocks in `beforeEach` to avoid order-dependent failures

## CI expectations

Every PR should:

- [ ] Pass `npm test` (or project equivalent)
- [ ] Include new or updated tests for behavior changes
- [ ] Not increase flaky-test debt (fix or delete unstable tests)

## Review checklist

- [ ] Test name describes user-visible or API behavior
- [ ] Failure message would help debug without reading implementation
- [ ] No sleeps (`setTimeout`) for synchronization — use proper waits in E2E
- [ ] No committed `.only` / `.skip` without a tracked issue

## Example: table-driven tests

For many similar inputs, use a table:

```typescript
test.each([
  ["", false],
  ["not-an-email", false],
  ["user@example.com", true],
])("validateEmail(%s) => %s", (email, expected) => {
  expect(validateEmail(email)).toBe(expected);
});
```

## Related

- [Testing Taxonomy](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/testing-taxonomy)
- [Fundamentals of Testing](/wiki/engineering-bootcamp/testing-guide/fundamentals-of-testing/overview)
- [Contributing](/wiki/contributing) — PR workflow for docs and code
