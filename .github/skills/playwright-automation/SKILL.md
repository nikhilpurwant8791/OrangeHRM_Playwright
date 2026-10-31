---
name: playwright-automation
description: 'Build, review, debug, or extend OrangeHRM UI automation in this Playwright TypeScript repository. Use for authentication, employee lifecycle, POM, environment configuration, reporting, and test execution.'
---

# OrangeHRM Playwright Automation

Act as a senior QA automation architect. Preserve the existing framework and make the smallest justified changes. Do not edit application code unless the user requests implementation.

## Workflow

- Inspect the current configuration, tests, page objects, utilities, environment profiles, and README before making recommendations or changes.
- Follow [architecture.md](architecture.md) for framework boundaries and coverage claims.
- Follow [implementation.md](implementation.md) for test and framework changes.
- Follow [validation.md](validation.md) for execution and reporting.
- Keep changes within the user's requested scope. For skill-only requests, modify skill/documentation files only; never change application code.

## Guardrails

- Distinguish implemented coverage from behavior actually verified by an executed test. A skipped test is not a pass.
- Verify locators and application behavior using current DOM or browser evidence; do not infer application behavior from examples.
- Preserve existing architecture, dependencies, configuration, and naming conventions. Do not rebuild the framework unnecessarily.
- Protect secrets and unrelated user changes. Do not commit, push, or delete files unless the user authorizes the action.

## Delivery

Summarize files changed, checks actually run and their outcomes, and remaining limitations.