# OrangeHRM employee lifecycle test plan

## Scope

UI coverage for authentication and the requested employee lifecycle at the configured `ORANGEHRM_BASE_URL`.

## Prerequisites

- Node.js 20+ and installed npm dependencies
- Chromium installed with `npx playwright install chromium`
- `.env` copied from `.env.example`
- Valid credentials configured for the positive scenario
- A non-production, PIM-restricted account configured for the role-access scenario (optional)
- Network access to the configured OrangeHRM instance

## Scenarios

| Scenario | Steps | Expected result |
|---|---|---|
| Successful login | Open login page, enter configured username/password, submit | User reaches the OrangeHRM Dashboard URL and the Dashboard heading is visible. |
| Invalid credentials | Open login page, enter deliberately invalid values, submit | User remains on the login URL and an authentication-related error is visible. |
| Empty credentials | Open login page, submit without entering values | Login page remains visible and both username/password fields show `Required` validation. |
| Employee lifecycle | Log in as administrator, create a uniquely identified employee, update their name, find the row by employee ID, and delete it | The created and updated values are visible; after deletion, the employee ID search returns no records. |
| Restricted-role navigation | Log in with a configured account that is not granted PIM access | Dashboard is reachable but the PIM navigation entry is absent. This is a UI-visibility check, not a direct authorization test. |

## Test design

- Each scenario owns its browser page and is independent of the other scenarios.
- Locators are based on the verified accessible `Username`, `Password`, and `Login` controls.
- Assertions use Playwright web-first assertions; no fixed sleeps are used.
- The lifecycle uses a unique employee ID and removes only the record created by that test.
- Cleanup is armed before submitting employee creation and waits for either a matching row or an explicit no-results state.
- Role credentials are optional and are never embedded in test source.
- Tests use `@smoke`, `@regression`, `@lifecycle`, and `@role` tags for selection.

## Known limitations

- The public demo may be rate-limited, reset, or temporarily unavailable.
- The invalid-login message may vary by deployment or account-protection state; the page object accepts the observed OrangeHRM authentication/retry/restriction variants.
- The successful-login test is skipped when credentials are not configured, rather than using credentials embedded in source code.
- The framework targets Chromium only. Cross-browser projects and shared authenticated storage state are deferred.
- Role-navigation validation is skipped until credentials for a PIM-restricted account are configured; direct URL/backend authorization is not tested.
- The OrangeHRM public demo is shared and may change its DOM or data; validate on a dedicated environment before running destructive workflows elsewhere.
