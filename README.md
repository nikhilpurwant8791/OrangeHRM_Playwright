# OrangeHRM Playwright Automation

Playwright + TypeScript UI automation for the public OrangeHRM demo application.

## Prerequisites

- Node.js 20 or newer
- npm
- Access to the target OrangeHRM environment

The public demo currently displays its example credentials on the login page. Configure credentials locally rather than committing them.

## Install

```bash
npm install
npx playwright install chromium
```

## Configure the environment

Copy `.env.example` to `.env` and set credentials there:

```text
ORANGEHRM_USERNAME=Admin
ORANGEHRM_PASSWORD=your-password
ORANGEHRM_RESTRICTED_USERNAME=
ORANGEHRM_RESTRICTED_PASSWORD=
```

`.env` is ignored by Git. The tracked `.env.dev`, `.env.demo`, and `.env.prod` profiles select an environment label and currently all point to the public OrangeHRM demo URL. Credentials remain in the ignored `.env` file. The selected label and URL are recorded in Playwright run metadata. The successful-login and employee lifecycle tests require the configured administrator credentials. The role-access test also requires an account that is not granted PIM access; it is skipped with a clear message if restricted-role credentials are not configured.

## Run tests

Choose the environment and run mode with the commands below. Headless mode is the default:

| Environment | Headless | Headed | Playwright UI Mode |
|---|---|---|---|
| Dev | `npm.cmd run test:dev` | `npm.cmd run test:dev -- --headed` | `npm.cmd run test:dev -- --ui` |
| Demo | `npm.cmd run test:demo` | `npm.cmd run test:demo -- --headed` | `npm.cmd run test:demo -- --ui` |
| Prod | `npm.cmd run test:prod` | `npm.cmd run test:prod -- --headed` | `npm.cmd run test:prod -- --ui` |

UI Mode opens the Playwright runner so you can select tests interactively.

To run a specific spec in any environment, add its path after the mode option:

```powershell
npm.cmd run test:dev -- tests\employee\employee-lifecycle.spec.ts
npm.cmd run test:demo -- --headed tests\employee\employee-lifecycle.spec.ts
npm.cmd run test:prod -- --ui
```

For Command Prompt, macOS, or Linux, use `npm` rather than `npm.cmd`; use forward slashes in test paths.

The generic commands below use the default `.env` URL and `ORANGEHRM_ENV` (defaulting to `demo`):

```powershell
npm.cmd test
npm.cmd run test:headed
npm run typecheck
npm run report
npm run test:smoke
npm run test:regression
npm run test:lifecycle
npm run test:role
```

The Playwright project targets Chromium and runs single-worker against the shared demo URL and in CI to limit contention. Screenshots, videos, and traces are retained for failed tests, and the HTML report is written to `playwright-report/`. CI uploads both report and test-result artifacts. To point a profile at a separate deployment later, edit that profile's `ORANGEHRM_BASE_URL`.

For GitHub Actions, configure the repository variables `ORANGEHRM_BASE_URL` and `ORANGEHRM_ENV`, plus the secrets `ORANGEHRM_USERNAME` and `ORANGEHRM_PASSWORD`. To run the optional role check, also configure `ORANGEHRM_RESTRICTED_USERNAME` and `ORANGEHRM_RESTRICTED_PASSWORD`.

Run only the login scenarios with:

```bash
npx playwright test tests/auth/login.spec.ts
```

The employee lifecycle creates a unique employee, checks the created record, updates its name, verifies the updated row, and deletes that record. Cleanup is armed before the create request is submitted so a delayed UI response does not leave a test-created employee behind. The role check verifies that a configured restricted account does not see the PIM navigation entry; this checks UI visibility, not server-side authorization. Configure a dedicated non-production role account for this check.

## Troubleshooting

- If the positive test is skipped, check that `.env` contains both `ORANGEHRM_USERNAME` and `ORANGEHRM_PASSWORD`.
- If the demo rejects valid credentials, confirm the target URL and account in a browser; the public demo can be rate-limited or reset.
- If Chromium is missing, run `npx playwright install chromium`.
- For a failure, inspect the HTML report and the corresponding screenshot, video, and trace under `test-results/`.
- Do not add passwords, `.env`, authentication state, screenshots, traces, or reports to source control.
