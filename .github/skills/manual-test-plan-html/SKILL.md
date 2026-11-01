---
name: manual-test-plan-html
description: 'Create or update a standalone HTML manual test plan from this repository’s Playwright tests. Use when asked for manual test cases, QA test documentation, test-plan HTML, or coverage traceability.'
---

# Manual Test Plan (HTML)

Create a clear, manually executable HTML test plan grounded in the current repository. Treat Playwright tests and existing test documentation as evidence for intended workflows, not proof that those workflows passed in a browser.

## Workflow

1. Inspect the current `tests/` specs and relevant page objects, fixtures, account data, `playwright.config.ts`, `package.json`, README, and existing `docs/test-plan.md`. Read the current files; do not rely on cached summaries.
2. Identify user-visible scenarios, prerequisites, role requirements, environment restrictions, destructive actions, cleanup behavior, and known gaps from the implementation.
3. Convert each in-scope workflow into a manual test case with explicit preconditions, safe test data, numbered UI steps, and observable expected results. A human tester must be able to execute each step without reading TypeScript.
4. Preserve traceability by including a stable test-case ID and the originating spec path and test title where applicable. Mark scenarios with no automation reference as manual-only.
5. Generate or update `docs/manual-test-plan.html` by default. If the user names another output path, use that path. Do not edit application code or alter the automated tests to make the plan appear complete.
6. Validate that the output is a complete, self-contained HTML document, contains the required sections, and accurately reflects the current tests and limitations. Do not run browser tests unless separately requested.

## Test-plan accuracy and safety

- Distinguish **implemented**, **executed**, **passed**, **failed**, **skipped**, and **not verified**. Do not infer pass status from test existence or test discovery.
- Never include real passwords, tokens, cookies, or personal data. Use placeholders such as `<authorized admin username>` and `<authorized admin password>`.
- Clearly flag state-changing cases (create/update/delete), production restrictions, shared-demo risks, and cleanup expectations. Require a dedicated non-production tenant for destructive workflows.
- Describe role checks only as strongly as their assertions support. Hidden navigation demonstrates UI visibility, not direct-route or backend authorization.
- Do not turn diagnostics, intentionally failing tests, or screenshot-generation tests into normal product acceptance cases. Mention them in a separate automation notes/limitations section if relevant.
- Do not invent application behavior or UI labels. Verify steps and expected results against the live spec, page object, and existing documentation; qualify anything that cannot be confirmed.
- Keep manual steps independent of test execution order unless a real prerequisite is explicitly documented.

## HTML requirements

- Produce valid HTML5 with `lang`, UTF-8 charset, viewport metadata, a descriptive title, semantic headings, and accessible tables or lists.
- Make the plan standalone: inline CSS, no external scripts, fonts, stylesheets, tracking, or network dependencies.
- Include a compact plan overview (application, environment/base URL placeholder, prepared date, scope, and status legend), execution prerequisites, and a test-case section.
- Each test case must include: ID, title, priority, category, preconditions, test data, numbered steps with expected results, execution status, actual result/notes, and automation traceability.
- Include a limitations/risks section for skipped or restricted coverage and any evidence that was not runtime-verified.
- Use responsive styling, sufficient contrast, visible keyboard focus where interactive elements exist, and print styles for paper/PDF export. Avoid JavaScript-only interactions; values entered in a static HTML form would not persist.
- Use concise, professional language suitable for QA handoff. Keep the output readable on screen and when printed.

## Delivery

Report the generated HTML path, summarize coverage and important limitations, and state what validation was performed. Do not claim tests were run unless they were.
