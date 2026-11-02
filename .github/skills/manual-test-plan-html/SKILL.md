---
name: manual-test-plan-html
description: 'Create or improve a risk-based, traceable manual QA test plan as standalone HTML from project requirements, Playwright tests, and verified product behavior. Use for manual test plans, test cases, QA coverage, test documentation, or HTML test-plan requests.'
---

# Risk-Based Manual Test Planning

Produce an actionable plan that helps a tester make a release-quality assessment, not merely a list of automated test names. Ground every claim in supplied requirements, current repository evidence, or explicitly labeled assumptions. The deliverable is a manual test plan in HTML; do not change application code or automated tests unless separately requested.

## 1. Establish scope and evidence

1. Read the user’s acceptance criteria and inspect the current relevant specs, page objects, fixtures, configuration, environment examples, README, and existing test documentation. Inspect additional source only when needed to verify a behavior or prerequisite. Do not rely on stale summaries.
2. Record the system under test, in-scope capabilities, explicit exclusions, user roles, supported environments, dependencies, and evidence sources. Separate confirmed facts from assumptions and open questions; do not silently fill requirement gaps.
3. Check what each automated scenario actually asserts, including its skip conditions and cleanup. Use test titles as traceability, not as proof of adequate coverage or successful execution.
4. Identify risks using business impact and likelihood. Prioritize high-impact access control, data integrity, destructive operations, and critical user journeys where relevant. Explain the rationale briefly; do not assign arbitrary risk scores.
5. If a missing decision prevents safe or accurate planning (for example, target environment, authorized role, or whether destructive testing is permitted), ask a focused clarification. Otherwise proceed with clearly labeled assumptions and safe placeholders.

## 2. Design the coverage

1. Build a coverage map from each requirement or feature to one or more test-case IDs. Mark requirements with no verified coverage as gaps; distinguish manual-only coverage from automation references.
2. Select relevant test design techniques: positive and negative paths, equivalence classes, boundary values, state transitions, role/permission combinations, and recovery/cleanup. Apply only techniques justified by the requirements and observable product behavior; avoid redundant cases.
3. Give cases stable IDs (for example `AUTH-001` or `EMP-003`), concise titles, priority (`P1` critical, `P2` important, `P3` lower risk), and test type. Prioritize by risk, not by implementation convenience.
4. Make every case independently executable. Include role, starting state, prerequisites, non-sensitive data, numbered user actions, an observable expected result for each meaningful step, and cleanup/rollback. Do not refer testers to source code to learn how to run a case.
5. State entry criteria and practical completion/exit criteria. Do not invent release thresholds; label suggested criteria as recommendations when the project has not defined them.

## 3. Protect users and environments

- Never place passwords, tokens, cookies, personal data, or other secrets in the plan. Use placeholders and identify the authorized credential source without exposing it.
- Identify destructive or state-changing actions, required permission, safe test tenant, test-data ownership, and cleanup. Do not direct testers to mutate production or shared demo data without explicit authorization and safeguards.
- Represent permissions accurately. A hidden menu or disabled control proves only a UI state; direct-route, API, and backend authorization require their own evidence and cases.
- Separate product acceptance scenarios from diagnostics, intentionally failing automation, and artifact-generation tests. Record such automation-only behavior in notes when it affects interpretation.
- Do not invent UI labels, validation rules, expected messages, supported browsers, or outcomes. Verify them in current evidence or label the expectation as requiring confirmation.
- Keep cases independent unless a dependency is essential; document the dependency and provide a safe recovery path.

## 4. Author the HTML deliverable

Create or update `docs/manual-test-plan.html` by default; honor an explicit output path from the user. Reuse [the HTML template](./references/html-template.html) as a starting point and adapt it to the actual scope rather than leaving generic placeholders.

The plan should contain, where applicable:

- Document title, purpose, scope, exclusions, owner/version or prepared date, target environment, and status legend.
- Requirements-to-test coverage matrix with requirement/source, test-case IDs, and gaps or unverified areas.
- Risk-based test approach, entry criteria, exit criteria, environment/access prerequisites, and test-data/cleanup policy.
- Executable test cases with ID, title, priority/risk rationale, test type, requirement traceability, role, preconditions, data, numbered action/expected-result steps, status, actual result/evidence, defect reference, and cleanup.
- Execution summary and limitations, including skipped, blocked, unverified, manual-only, or environment-constrained coverage.

Use semantic HTML5, accessible headings and tables, readable responsive styling, adequate contrast, and print styles. Keep it self-contained with inline CSS and no external scripts, fonts, stylesheets, trackers, or network dependencies. Avoid controls that imply execution results persist when they do not.

## 5. Validate and report

1. Check that the document is complete HTML5, self-contained, readable on narrow screens and in print, and contains no unfilled generic placeholders or sensitive values.
2. Cross-check every test step, expected result, trace link, environment limitation, and coverage claim against the current evidence. Ensure every in-scope requirement is mapped or explicitly reported as a gap.
3. Do not run browser tests unless requested. Clearly distinguish test implementation from actual run status: **not executed**, **passed**, **failed**, **blocked**, or **skipped**. Never claim a test passed because it exists or was discovered.
4. Report the output path, scope covered, material risks/gaps, and validation performed. Mention if test execution was not performed.
