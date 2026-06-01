---
title: Metrics & Dashboards
owner: CCAI Data
updated: 2026-05-27
order: 2
summary: Documentation for Metrics & Dashboards.
review_by: '2026-08-27'
status: stable
---

## Metric definition template

| Field | Example |
| ----- | ------- |
| Name | Weekly active contributors |
| Definition | Unique users with ≥1 qualifying action in 7 days |
| Source | `events` table, `action_type in (...)` |
| Owner | Product analytics |
| Review cadence | Monthly |

## Dashboard hygiene

- One **source of truth** per metric; link it in the wiki
- Label filters (date range, platform) on every chart
- Archive dashboards nobody opened in 90 days
