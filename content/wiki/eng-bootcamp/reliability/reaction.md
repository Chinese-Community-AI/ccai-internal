---
title: Reaction
owner: Monetization LLM Eng Team
updated: 2026-01-15
order: 3
summary: "Service Level Indicators (SLIs) measure how your service behaves for users.\
  \ Pair SLIs with Service Level Objectives (SLOs) to set reliability targets. Teams\
  \ usi\u2026"
review_by: '2026-08-27'
status: stable
---

## 4.4. SLI / SLO

Service Level Indicators (SLIs) measure how your service behaves for users. Pair SLIs with Service Level Objectives (SLOs) to set reliability targets. Teams using structured SLI/SLO workflows report **21pp better time-to-mitigate** within SLA.

Use internal calibration tools (e.g. Excalibur) to validate that your SLIs reflect user-impacting events.

## 5. Diagnosis and Mitigation Tooling

Below are the available tooling options for diagnosis and mitigation:

| Category | Purpose | Tool | Description |
| -------- | ------- | ---- | ----------- |
| Triaging | Find on-call | WhoToCall | Routes incidents to the right owner |
| Triaging | Live health | Hawkeye | Real-time service health dashboard |
| Triaging | SLI drift | Calibration Dashboard | Compares SLI signals vs SLO targets |
| Triaging | Slow burn | Ads Slow-burn Health Dashboard | Detects gradual degradation |
| Root causing | Call graphs | AdsLandLine | Traces requests across ads stack |
| Root causing | Dependencies | Service Dependency Graph | Maps upstream/downstream services |
| Root causing | Overlap analysis | Venn Analyzer | Finds common factors across incidents |
