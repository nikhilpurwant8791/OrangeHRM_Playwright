# Test Implementation Standards

Apply these standards only when the user requests implementation. For a skill-only or review-only task, do not edit application code.

## Locators and assertions

- Verify selectors against the current OrangeHRM DOM or browser state before using them.
- Prefer accessible locators such as `getByRole`, `getByLabel`, and `getByPlaceholder`; use CSS only where justified by the actual DOM.
- Avoid brittle XPath, generated classes, fixed sleeps, and arbitrary timeout increases.
- Wait for observable state and assert the resulting business outcome, not just that an action was attempted.
- Keep page objects focused on interactions and locators; put business-level expectations in specs, following existing patterns.

## Test design and data

- Use descriptive business-oriented test names and the repository's existing tags (`@smoke`, `@regression`, `@lifecycle`, `@role`) where they fit.
- Keep tests isolated. Reuse existing page objects/utilities and Playwright's built-in fixtures.
- Generate unique IDs for new employees. Arm cleanup before submitting a create operation because the server may save the record even if the UI wait fails.
- Before deciding a record does not exist, wait for a matching row or an explicit no-results state. Never suppress cleanup failures.
- Delete only records created by the test. Treat the public demo as shared, mutable, and potentially resettable.
- Role assertions must state exactly what they prove. Hidden navigation proves visibility only, not route or backend authorization.

## Credentials and typing

- Use the existing environment variables: administrator credentials are `ORANGEHRM_USERNAME` and `ORANGEHRM_PASSWORD`; optional restricted-role credentials are `ORANGEHRM_RESTRICTED_USERNAME` and `ORANGEHRM_RESTRICTED_PASSWORD`.
- Keep secrets out of source, logs, screenshots, traces, and committed environment files.
- Preserve TypeScript strictness and formatting. Use meaningful types; avoid `any`, unnecessary dependencies, and wrappers around Playwright APIs.

## Scope control

Implement only requested scenarios and necessary support. Verify workflows and expected outcomes before coding. Document uncertainty rather than inventing selectors, application behavior, or permissions.

References: [Playwright locators](https://playwright.dev/docs/locators), [Playwright authentication](https://playwright.dev/docs/auth).